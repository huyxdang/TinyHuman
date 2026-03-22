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

    vec3 color = vColor * 0.85 + 0.15; // slightly lifted, not pure saturated

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
  grouped,
  chatPanelOpen,
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
    grouped: false,
    chatPanelOpen: false,
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
    camera.position.set(0, 0, 26);

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
        if (s.grouped && s.clusters.length > 0) {
          // Grouped mode: move nodes to cluster centers
          const clusterMap = {};
          s.clusters.forEach(c => { clusterMap[c.id] = c; });

          for (let i = 0; i < count; i++) {
            const n = nodeList[i];
            const i3 = i * 3;

            if (n.clusterId !== null && n.clusterId !== undefined && clusterMap[n.clusterId]) {
              const cluster = clusterMap[n.clusterId];
              const center = cluster.center;
              const cc = hexToRgb(cluster.color);
              const jitter = 5;

              targetPos[i3] = center.x + (Math.random() - 0.5) * jitter * 2;
              targetPos[i3 + 1] = center.y + (Math.random() - 0.5) * jitter * 2;
              targetPos[i3 + 2] = center.z + (Math.random() - 0.5) * jitter * 2;

              targetColor[i3] = cc[0];
              targetColor[i3 + 1] = cc[1];
              targetColor[i3 + 2] = cc[2];
              targetAlpha[i] = 0.85;
              targetSize[i] = n.size;
            } else {
              targetPos[i3] = basePos[i3] * 1.8;
              targetPos[i3 + 1] = basePos[i3 + 1] * 1.8;
              targetPos[i3 + 2] = basePos[i3 + 2] * 1.8;
              targetColor[i3] = 0.8;
              targetColor[i3 + 1] = 0.78;
              targetColor[i3 + 2] = 0.75;
              targetAlpha[i] = 0.06;
              targetSize[i] = n.size;
            }
          }

          // Color edges by cluster
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
              edgeColorAttr.array[i6] = cc[0]; edgeColorAttr.array[i6+1] = cc[1]; edgeColorAttr.array[i6+2] = cc[2];
              edgeColorAttr.array[i6+3] = cc[0]; edgeColorAttr.array[i6+4] = cc[1]; edgeColorAttr.array[i6+5] = cc[2];
            } else {
              for (let c = 0; c < 6; c++) edgeColorAttr.array[i6+c] = 0.0;
            }
          }
          edgeColorAttr.needsUpdate = true;
          edgeMaterial.opacity = 0.5;
        } else {
          // Spread out mode (default hero)
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

          // Reset edge colors to black
          const edgeList = s.edges;
          const edgeCount = Math.min(edgeList.length, maxEdges);
          for (let i = 0; i < edgeCount; i++) {
            const i6 = i * 6;
            for (let c = 0; c < 6; c++) edgeColorAttr.array[i6+c] = 0.0;
          }
          edgeColorAttr.needsUpdate = true;
          edgeMaterial.opacity = 0.12;
        }
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

      // Node shaking during chat phase (when drawer is closed)
      if (s.phase === 'results' && !s.chatPanelOpen) {
        const shakeAmp = 0.04;
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          positionAttr.array[i3] += Math.sin(time * 8 + i * 1.7) * shakeAmp;
          positionAttr.array[i3 + 1] += Math.cos(time * 7 + i * 2.3) * shakeAmp;
          positionAttr.array[i3 + 2] += Math.sin(time * 9 + i * 0.9) * shakeAmp;
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
      if (stateRef.current.three?.updateLabels) stateRef.current.three.updateLabels();
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
        if (onNodeClick) onNodeClick(n, event.clientX, event.clientY);
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

    // --- Name labels overlay ---
    const labelsDiv = document.createElement('div');
    labelsDiv.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:1;';
    container.appendChild(labelsDiv);

    let labelEls = [];
    let lastLabelUpdateMs = 0;
    let labelsShown = false;
    const vec = new THREE.Vector3();

    function rebuildLabels() {
      labelsDiv.innerHTML = '';
      labelEls = [];
      const nodeList = stateRef.current.nodes;
      for (let i = 0; i < nodeList.length; i++) {
        const el = document.createElement('div');
        el.textContent = nodeList[i].label || nodeList[i].persona?.name || '';
        el.style.cssText = [
          'position:absolute',
          'left:0',
          'top:0',
          'font-size:9px',
          'line-height:1',
          'color:#2d241d',
          'font-family:DM Sans,sans-serif',
          'white-space:nowrap',
          'padding:2px 6px',
          'border:1px solid rgba(45,36,29,0.08)',
          'border-radius:999px',
          'background:rgba(248,246,242,0.72)',
          'opacity:0',
          'will-change:transform,opacity',
          'contain:layout style paint',
        ].join(';');
        labelsDiv.appendChild(el);
        labelEls.push(el);
      }
    }

    function updateLabels(nowMs = performance.now()) {
      const showLabels = stateRef.current.phase === 'hero' || stateRef.current.phase === 'input';
      if (!showLabels) {
        if (labelsShown) {
          labelsDiv.style.opacity = '0';
          labelsShown = false;
        }
        return;
      }

      if (!labelsShown) {
        labelsDiv.style.opacity = '1';
        labelsShown = true;
      }

      if (nowMs - lastLabelUpdateMs < 33) return;
      lastLabelUpdateMs = nowMs;

      const w = renderer.domElement.clientWidth;
      const h = renderer.domElement.clientHeight;
      for (let i = 0; i < labelEls.length; i++) {
        const i3 = i * 3;
        vec.set(positionAttr.array[i3], positionAttr.array[i3 + 1], positionAttr.array[i3 + 2]);
        vec.project(camera);
        const x = (vec.x * 0.5 + 0.5) * w;
        const y = (-vec.y * 0.5 + 0.5) * h;
        const el = labelEls[i];
        if (!el.textContent || vec.z > 1 || x < -120 || x > w + 120 || y < -40 || y > h + 40) {
          el.style.opacity = '0';
        } else {
          el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y + 8)}px, 0) translate(-50%, 0)`;
          el.style.opacity = vec.z > 0.7 ? '0.35' : '0.9';
        }
      }
    }

    stateRef.current.three.updateLabels = updateLabels;
    stateRef.current.three.rebuildLabels = rebuildLabels;
    stateRef.current.three.labelsDiv = labelsDiv;

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
      if (labelsDiv.parentNode) labelsDiv.parentNode.removeChild(labelsDiv);
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
    stateRef.current.three.rebuildLabels();
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

  useEffect(() => {
    stateRef.current.grouped = grouped;
    if (stateRef.current.three && stateRef.current.phase === 'hero') {
      stateRef.current.three.applyPhaseTargets();
    }
  }, [grouped]);

  useEffect(() => {
    stateRef.current.chatPanelOpen = chatPanelOpen;
  }, [chatPanelOpen]);

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
