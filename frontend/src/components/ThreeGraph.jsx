import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- Shaders ---

const NODE_VERTEX = `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aAlpha;

  varying vec3 vColor;
  varying float vAlpha;

  uniform float uPixelRatio;

  void main() {
    vColor = aColor;
    vAlpha = aAlpha;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio * (180.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const NODE_FRAGMENT = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    // Solid fill with thin white stroke at the edge
    float strokeOuter = 0.5;
    float strokeInner = 0.38;
    float edge = smoothstep(strokeOuter, strokeOuter - 0.02, dist); // anti-alias outer
    float strokeMask = smoothstep(strokeInner, strokeInner + 0.04, dist);

    vec3 fill = vColor * 0.85 + 0.15; // slightly lifted, not pure saturated
    vec3 stroke = vec3(0.15); // dark border
    vec3 color = mix(fill, stroke, strokeMask * 0.85);

    gl_FragColor = vec4(color, edge * vAlpha);
  }
`;

// --- Component ---

export default function ThreeGraph({
  phase,
  nodes,
  edges,
  clusters,
  selectedNodeId,
  hoveredClusterId,
  onNodeClick,
  onNodeHover,
}) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    phase: 'hero',
    nodes: [],
    edges: [],
    clusters: [],
    selectedNodeId: null,
    hoveredClusterId: null,
    hoveredNodeIndex: null,
  });

  // --- Initialize Three.js ---
  useEffect(() => {

    const container = containerRef.current;
    if (!container) return;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f6f2);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 30);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 20;
    controls.maxDistance = 70;
    controls.enablePan = false;

    // Raycaster
    const raycaster = new THREE.Raycaster();
    raycaster.params.Points.threshold = 1.2;
    const mouse = new THREE.Vector2();

    // --- Create node mesh ---
    const maxNodes = 1500;
    const positionAttr = new THREE.Float32BufferAttribute(new Float32Array(maxNodes * 3), 3);
    const colorAttr = new THREE.Float32BufferAttribute(new Float32Array(maxNodes * 3), 3);
    const sizeAttr = new THREE.Float32BufferAttribute(new Float32Array(maxNodes), 1);
    const alphaAttr = new THREE.Float32BufferAttribute(new Float32Array(maxNodes), 1);

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', positionAttr);
    nodeGeometry.setAttribute('aColor', colorAttr);
    nodeGeometry.setAttribute('aSize', sizeAttr);
    nodeGeometry.setAttribute('aAlpha', alphaAttr);

    const nodeMaterial = new THREE.ShaderMaterial({
      vertexShader: NODE_VERTEX,
      fragmentShader: NODE_FRAGMENT,
      uniforms: {
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      transparent: true,
      depthWrite: false,
    });

    const nodesMesh = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodesMesh);

    // --- Create edge mesh ---
    const maxEdges = 5000;
    const edgePosAttr = new THREE.Float32BufferAttribute(new Float32Array(maxEdges * 6), 3);
    const edgeColorAttr = new THREE.Float32BufferAttribute(new Float32Array(maxEdges * 6), 3);

    const edgeGeometry = new THREE.BufferGeometry();
    edgeGeometry.setAttribute('position', edgePosAttr);
    edgeGeometry.setAttribute('color', edgeColorAttr);

    const edgeMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });

    const edgesMesh = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    scene.add(edgesMesh);

    // --- Emoji textures ---
    function createEmojiTexture(emoji) {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.font = `${size * 0.75}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emoji, size / 2, size / 2);
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    }

    const heartTexture = createEmojiTexture('❤️');
    const thumbsDownTexture = createEmojiTexture('👎');

    // Active emoji sprites
    const emojiSprites = [];

    function spawnEmoji(x, y, z, accepted) {
      const mat = new THREE.SpriteMaterial({
        map: accepted ? heartTexture : thumbsDownTexture,
        transparent: true,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(mat);
      sprite.position.set(x, y, z);
      sprite.scale.set(2.5, 2.5, 1);
      scene.add(sprite);
      emojiSprites.push({
        sprite,
        startY: y,
        velocity: 0.015 + Math.random() * 0.01,
        life: 1.0,
        decay: 0.0015 + Math.random() * 0.001,
      });
    }

    function updateEmojis() {
      for (let i = emojiSprites.length - 1; i >= 0; i--) {
        const e = emojiSprites[i];
        e.sprite.position.y += e.velocity;
        e.life -= e.decay;
        e.sprite.material.opacity = Math.max(0, e.life);
        e.sprite.scale.setScalar(2.5 * Math.max(0.3, e.life));
        if (e.life <= 0) {
          scene.remove(e.sprite);
          e.sprite.material.dispose();
          emojiSprites.splice(i, 1);
        }
      }
    }

    // --- Store target positions and colors ---
    const targetPos = new Float32Array(maxNodes * 3);
    const targetColor = new Float32Array(maxNodes * 3);
    const targetAlpha = new Float32Array(maxNodes);
    const targetSize = new Float32Array(maxNodes);
    const basePos = new Float32Array(maxNodes * 3); // original positions for drift

    // --- Sync nodes to GPU ---
    function syncNodes(nodeList) {
      const count = Math.min(nodeList.length, maxNodes);
      nodeGeometry.setDrawRange(0, count);

      for (let i = 0; i < count; i++) {
        const n = nodeList[i];
        const i3 = i * 3;

        positionAttr.array[i3] = n.x;
        positionAttr.array[i3 + 1] = n.y;
        positionAttr.array[i3 + 2] = n.z;

        targetPos[i3] = n.x;
        targetPos[i3 + 1] = n.y;
        targetPos[i3 + 2] = n.z;

        basePos[i3] = n.x;
        basePos[i3 + 1] = n.y;
        basePos[i3 + 2] = n.z;

        colorAttr.array[i3] = n.color[0];
        colorAttr.array[i3 + 1] = n.color[1];
        colorAttr.array[i3 + 2] = n.color[2];

        targetColor[i3] = n.color[0];
        targetColor[i3 + 1] = n.color[1];
        targetColor[i3 + 2] = n.color[2];

        sizeAttr.array[i] = n.size;
        targetSize[i] = n.size;

        alphaAttr.array[i] = n.alpha;
        targetAlpha[i] = n.alpha;
      }

      positionAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;
      sizeAttr.needsUpdate = true;
      alphaAttr.needsUpdate = true;
    }

    function syncEdges(edgeList, nodeList) {
      const count = Math.min(edgeList.length, maxEdges);
      edgeGeometry.setDrawRange(0, count * 2);

      for (let i = 0; i < count; i++) {
        const [a, b] = edgeList[i];
        const i6 = i * 6;
        const na = nodeList[a];
        const nb = nodeList[b];
        if (!na || !nb) continue;

        edgePosAttr.array[i6] = na.x;
        edgePosAttr.array[i6 + 1] = na.y;
        edgePosAttr.array[i6 + 2] = na.z;
        edgePosAttr.array[i6 + 3] = nb.x;
        edgePosAttr.array[i6 + 4] = nb.y;
        edgePosAttr.array[i6 + 5] = nb.z;

        // Black
        const grey = 0.0;
        for (let c = 0; c < 6; c++) {
          edgeColorAttr.array[i6 + c] = grey;
        }
      }

      edgePosAttr.needsUpdate = true;
      edgeColorAttr.needsUpdate = true;
    }

    // --- Phase transitions ---
    function applyPhaseTargets() {
      const s = stateRef.current;
      const nodeList = s.nodes;
      const count = Math.min(nodeList.length, maxNodes);

      if (s.phase === 'hero') {
        for (let i = 0; i < count; i++) {
          const n = nodeList[i];
          const i3 = i * 3;
          targetPos[i3] = basePos[i3];
          targetPos[i3 + 1] = basePos[i3 + 1];
          targetPos[i3 + 2] = basePos[i3 + 2];
          targetColor[i3] = n.color[0];
          targetColor[i3 + 1] = n.color[1];
          targetColor[i3 + 2] = n.color[2];
          targetAlpha[i] = n.alpha;
          targetSize[i] = n.size;
        }
        edgeMaterial.opacity = 0.12;
      } else if (s.phase === 'clustering' || s.phase === 'scanning' || s.phase === 'results') {
        const clusterList = s.clusters;
        if (!clusterList.length) return;

        // Build cluster lookup
        const clusterMap = {};
        clusterList.forEach(c => {
          clusterMap[c.id] = c;
        });

        for (let i = 0; i < count; i++) {
          const n = nodeList[i];
          const i3 = i * 3;

          if (n.clusterId !== null && n.clusterId !== undefined && clusterMap[n.clusterId]) {
            const cluster = clusterMap[n.clusterId];
            const center = cluster.center;

            // Parse cluster hex color
            const cc = hexToRgb(cluster.color);

            // Target: cluster center + jitter
            const jitter = 5;
            targetPos[i3] = center.x + (Math.random() - 0.5) * jitter * 2;
            targetPos[i3 + 1] = center.y + (Math.random() - 0.5) * jitter * 2;
            targetPos[i3 + 2] = center.z + (Math.random() - 0.5) * jitter * 2;

            targetColor[i3] = cc[0];
            targetColor[i3 + 1] = cc[1];
            targetColor[i3 + 2] = cc[2];

            targetAlpha[i] = 0.85;
            targetSize[i] = 6.0 + n.matchScore * 6.0;
          } else {
            // Non-matching: push out and fade
            targetPos[i3] = basePos[i3] * 1.8;
            targetPos[i3 + 1] = basePos[i3 + 1] * 1.8;
            targetPos[i3 + 2] = basePos[i3 + 2] * 1.8;

            targetColor[i3] = 0.8;
            targetColor[i3 + 1] = 0.78;
            targetColor[i3 + 2] = 0.75;

            targetAlpha[i] = 0.06;
            targetSize[i] = 4.0;
          }
        }

        // Update edges: color by cluster, fade non-matching
        const edgeList = s.edges;
        const edgeCount = Math.min(edgeList.length, maxEdges);
        for (let i = 0; i < edgeCount; i++) {
          const [a, b] = edgeList[i];
          const na = nodeList[a];
          const nb = nodeList[b];
          if (!na || !nb) continue;

          const i6 = i * 6;

          if (na.clusterId !== null && na.clusterId === nb.clusterId && clusterMap[na.clusterId]) {
            const cc = hexToRgb(clusterMap[na.clusterId].color);
            // Both vertices same cluster color
            edgeColorAttr.array[i6] = cc[0];
            edgeColorAttr.array[i6 + 1] = cc[1];
            edgeColorAttr.array[i6 + 2] = cc[2];
            edgeColorAttr.array[i6 + 3] = cc[0];
            edgeColorAttr.array[i6 + 4] = cc[1];
            edgeColorAttr.array[i6 + 5] = cc[2];
          } else {
            // Dim non-matching edges
            for (let c = 0; c < 6; c++) {
              edgeColorAttr.array[i6 + c] = 0.0;
            }
          }
        }
        edgeColorAttr.needsUpdate = true;
        edgeMaterial.opacity = 0.5;

        // For scanning/results: color found clusters green, invisible red
        if (s.phase === 'scanning' || s.phase === 'results') {
          for (let i = 0; i < count; i++) {
            const n = nodeList[i];
            if (n.clusterId === null || n.clusterId === undefined) continue;
            const cluster = clusterMap[n.clusterId];
            if (!cluster || !cluster.scanned) continue;

            const i3 = i * 3;
            if (cluster.found) {
              // Brighten toward green
              targetColor[i3] = targetColor[i3] * 0.5 + 0.13 * 0.5;
              targetColor[i3 + 1] = targetColor[i3 + 1] * 0.5 + 0.77 * 0.5;
              targetColor[i3 + 2] = targetColor[i3 + 2] * 0.5 + 0.29 * 0.5;
            } else {
              // Tint toward red
              targetColor[i3] = targetColor[i3] * 0.5 + 0.94 * 0.5;
              targetColor[i3 + 1] = targetColor[i3 + 1] * 0.5 + 0.27 * 0.5;
              targetColor[i3 + 2] = targetColor[i3 + 2] * 0.5 + 0.27 * 0.5;
            }
          }
        }
      }
    }

    // --- Hover/select highlights ---
    function applyHighlights() {
      const s = stateRef.current;
      const nodeList = s.nodes;
      const count = Math.min(nodeList.length, maxNodes);

      // Hovered cluster: brighten that cluster, dim others
      if (s.hoveredClusterId !== null && s.hoveredClusterId !== undefined) {
        for (let i = 0; i < count; i++) {
          const n = nodeList[i];
          if (n.clusterId === s.hoveredClusterId) {
            targetAlpha[i] = 1.0;
            targetSize[i] = (6.0 + n.matchScore * 6.0) * 1.3;
          } else if (n.clusterId !== null) {
            targetAlpha[i] = 0.25;
          }
        }
      }

      // Hovered node: enlarge
      if (s.hoveredNodeIndex !== null && s.hoveredNodeIndex < count) {
        targetSize[s.hoveredNodeIndex] = 8.0;
        targetAlpha[s.hoveredNodeIndex] = 1.0;
      }

      // Selected node: pulse (handled in animate loop)
    }

    // --- Animation loop ---
    const lerpSpeed = 0.04;
    let animFrame;

    function animate() {
      animFrame = requestAnimationFrame(animate);

      const time = performance.now() * 0.001;
      const s = stateRef.current;
      const count = Math.min(s.nodes.length, maxNodes);

      // Lerp positions, colors, sizes, alphas toward targets
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        positionAttr.array[i3] += (targetPos[i3] - positionAttr.array[i3]) * lerpSpeed;
        positionAttr.array[i3 + 1] += (targetPos[i3 + 1] - positionAttr.array[i3 + 1]) * lerpSpeed;
        positionAttr.array[i3 + 2] += (targetPos[i3 + 2] - positionAttr.array[i3 + 2]) * lerpSpeed;

        colorAttr.array[i3] += (targetColor[i3] - colorAttr.array[i3]) * lerpSpeed;
        colorAttr.array[i3 + 1] += (targetColor[i3 + 1] - colorAttr.array[i3 + 1]) * lerpSpeed;
        colorAttr.array[i3 + 2] += (targetColor[i3 + 2] - colorAttr.array[i3 + 2]) * lerpSpeed;

        alphaAttr.array[i] += (targetAlpha[i] - alphaAttr.array[i]) * lerpSpeed;
        sizeAttr.array[i] += (targetSize[i] - sizeAttr.array[i]) * lerpSpeed;
      }

      // Gentle drift in hero mode
      if (s.phase === 'hero') {
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          const drift = 0.12;
          positionAttr.array[i3] += Math.sin(time * 0.3 + i * 0.37) * drift * 0.01;
          positionAttr.array[i3 + 1] += Math.cos(time * 0.25 + i * 0.41) * drift * 0.01;
          positionAttr.array[i3 + 2] += Math.sin(time * 0.2 + i * 0.29) * drift * 0.01;
        }
      }

      // Selected node pulse
      if (s.selectedNodeId !== null) {
        const idx = s.nodes.findIndex(n => n.id === s.selectedNodeId);
        if (idx !== -1) {
          const pulse = 6.0 + Math.sin(time * 3) * 2.0;
          sizeAttr.array[idx] = pulse;
          alphaAttr.array[idx] = 1.0;
        }
      }

      positionAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;
      sizeAttr.needsUpdate = true;
      alphaAttr.needsUpdate = true;

      // Update edge positions to follow nodes
      const edgeList = s.edges;
      const edgeCount = Math.min(edgeList.length, maxEdges);
      for (let i = 0; i < edgeCount; i++) {
        const [a, b] = edgeList[i];
        const i6 = i * 6;
        edgePosAttr.array[i6] = positionAttr.array[a * 3];
        edgePosAttr.array[i6 + 1] = positionAttr.array[a * 3 + 1];
        edgePosAttr.array[i6 + 2] = positionAttr.array[a * 3 + 2];
        edgePosAttr.array[i6 + 3] = positionAttr.array[b * 3];
        edgePosAttr.array[i6 + 4] = positionAttr.array[b * 3 + 1];
        edgePosAttr.array[i6 + 5] = positionAttr.array[b * 3 + 2];
      }
      edgePosAttr.needsUpdate = true;

      // Update flying emojis
      updateEmojis();

      controls.update();
      renderer.render(scene, camera);
    }

    // --- Event handlers ---
    function onPointerMove(event) {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(nodesMesh);

      if (intersects.length > 0) {
        const idx = intersects[0].index;
        stateRef.current.hoveredNodeIndex = idx;
        container.style.cursor = 'pointer';

        if (onNodeHover) {
          const n = stateRef.current.nodes[idx];
          onNodeHover(n, event.clientX, event.clientY);
        }
      } else {
        if (stateRef.current.hoveredNodeIndex !== null) {
          stateRef.current.hoveredNodeIndex = null;
          container.style.cursor = 'default';
          if (onNodeHover) onNodeHover(null, 0, 0);
        }
      }
    }

    function onClick(event) {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(nodesMesh);

      if (intersects.length > 0) {
        const idx = intersects[0].index;
        const n = stateRef.current.nodes[idx];
        if (onNodeClick) onNodeClick(n);
      }
    }

    function onResize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('click', onClick);
    window.addEventListener('resize', onResize);

    // Store refs for prop-driven updates
    stateRef.current.three = {
      scene, camera, renderer, controls,
      nodesMesh, edgesMesh,
      positionAttr, colorAttr, sizeAttr, alphaAttr,
      edgePosAttr, edgeColorAttr, edgeMaterial,
      targetPos, targetColor, targetAlpha, targetSize, basePos,
      syncNodes, syncEdges, applyPhaseTargets, applyHighlights, spawnEmoji,
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      // Clean up emojis
      emojiSprites.forEach(e => {
        scene.remove(e.sprite);
        e.sprite.material.dispose();
      });
      emojiSprites.length = 0;
      heartTexture.dispose();
      thumbsDownTexture.dispose();
      renderer.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      edgeGeometry.dispose();
      edgeMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      stateRef.current.three = null;
    };
  }, []);

  // --- React to node data changes ---
  useEffect(() => {
    if (!nodes || !stateRef.current.three) return;
    stateRef.current.nodes = nodes;
    stateRef.current.three.syncNodes(nodes);
  }, [nodes]);

  useEffect(() => {
    if (!edges || !stateRef.current.three) return;
    stateRef.current.edges = edges;
    stateRef.current.three.syncEdges(edges, stateRef.current.nodes);
  }, [edges]);

  // --- React to phase changes ---
  const emojiTimersRef = useRef([]);

  useEffect(() => {
    const prevPhase = stateRef.current.phase;
    stateRef.current.phase = phase;
    if (stateRef.current.three) {
      stateRef.current.three.applyPhaseTargets();

      // Spawn emojis when entering clustering phase
      if (phase === 'clustering' && prevPhase !== 'clustering') {
        // Clear any previous emoji timers
        emojiTimersRef.current.forEach(clearTimeout);
        emojiTimersRef.current = [];

        const nodeList = stateRef.current.nodes;
        const posAttr = stateRef.current.three.positionAttr;

        // Sample a subset of nodes for emojis (not all 1500 — ~150 for performance)
        const sampleRate = Math.max(1, Math.floor(nodeList.length / 150));
        const sampled = nodeList.filter((_, i) => i % sampleRate === 0);

        // Stagger spawning over ~8 seconds, trickling in naturally
        // Early: sparse, then a wave in the middle, then trailing off
        sampled.forEach((node, i) => {
          // Use a skewed distribution — most answers come in the middle
          const r = Math.random();
          const skewed = Math.pow(r, 0.6); // front-loads slightly but spreads out
          const jitter = (Math.random() - 0.5) * 800; // +/- 400ms noise
          const delay = skewed * 7000 + jitter + 500; // 0.5s to ~8s

          const t = setTimeout(() => {
            if (!stateRef.current.three) return;
            const i3 = node.id * 3;
            const x = posAttr.array[i3];
            const y = posAttr.array[i3 + 1];
            const z = posAttr.array[i3 + 2];
            const accepted = node.matchScore > 0.55;
            stateRef.current.three.spawnEmoji(x, y, z, accepted);
          }, Math.max(100, delay));
          emojiTimersRef.current.push(t);
        });
      }
    }
  }, [phase, clusters]);

  useEffect(() => {
    stateRef.current.clusters = clusters || [];
    if (stateRef.current.three) {
      stateRef.current.three.applyPhaseTargets();
    }
  }, [clusters]);

  useEffect(() => {
    stateRef.current.selectedNodeId = selectedNodeId;
  }, [selectedNodeId]);

  useEffect(() => {
    stateRef.current.hoveredClusterId = hoveredClusterId;
    if (stateRef.current.three && stateRef.current.phase !== 'hero') {
      stateRef.current.three.applyPhaseTargets();
      stateRef.current.three.applyHighlights();
    }
  }, [hoveredClusterId]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
    />
  );
}

// --- Utility ---

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}
