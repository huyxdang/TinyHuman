/**
 * Mock data generator for TinyUser frontend demo.
 * Generates 1,500 nodes with persona data and ~3,000 edges.
 * No backend needed — everything is procedural.
 */

// --- Census-weighted distributions (from persona_specification.json) ---

const PROVINCES = [
  { name: 'Ho Chi Minh City', region: 'Southeast', weight: 0.1381 },
  { name: 'Hanoi', region: 'Red River Delta', weight: 0.0869 },
  { name: 'Hai Phong', region: 'Red River Delta', weight: 0.0460 },
  { name: 'Can Tho', region: 'Mekong Delta', weight: 0.0414 },
  { name: 'Da Nang', region: 'South Central', weight: 0.0302 },
  { name: 'Dong Nai', region: 'Southeast', weight: 0.0443 },
  { name: 'Bac Ninh', region: 'Red River Delta', weight: 0.0357 },
  { name: 'Thanh Hoa', region: 'North Central', weight: 0.0427 },
  { name: 'Nghe An', region: 'North Central', weight: 0.0378 },
  { name: 'An Giang', region: 'Mekong Delta', weight: 0.0489 },
  { name: 'Dong Thap', region: 'Mekong Delta', weight: 0.0431 },
  { name: 'Vinh Long', region: 'Mekong Delta', weight: 0.0420 },
  { name: 'Ninh Binh', region: 'Red River Delta', weight: 0.0435 },
  { name: 'Phu Tho', region: 'Northeast', weight: 0.0397 },
  { name: 'Lam Dong', region: 'Central Highlands', weight: 0.0382 },
  { name: 'Gia Lai', region: 'Central Highlands', weight: 0.0354 },
  { name: 'Dak Lak', region: 'Central Highlands', weight: 0.0330 },
  { name: 'Tay Ninh', region: 'Southeast', weight: 0.0321 },
  { name: 'Khanh Hoa', region: 'South Central', weight: 0.0221 },
  { name: 'Ca Mau', region: 'Mekong Delta', weight: 0.0257 },
  { name: 'Hue', region: 'North Central', weight: 0.0141 },
  { name: 'Thai Nguyen', region: 'Northeast', weight: 0.0178 },
  { name: 'Lao Cai', region: 'Northwest', weight: 0.0175 },
  { name: 'Son La', region: 'Northwest', weight: 0.0139 },
];

const AGE_BRACKETS = [
  { range: '18-24', weight: 0.145 },
  { range: '25-34', weight: 0.220 },
  { range: '35-44', weight: 0.205 },
  { range: '45-54', weight: 0.170 },
  { range: '55-64', weight: 0.140 },
  { range: '65+', weight: 0.120 },
];

const JOBS_BY_REGION = {
  Southeast: [
    { title: 'Software engineer', industry: 'Technology', education: 'university', income: '15-30M', platform: 'Google', lang: 'english' },
    { title: 'Marketing specialist', industry: 'Retail & e-commerce', education: 'university', income: '7-15M', platform: 'Facebook', lang: 'mixed' },
    { title: 'Grab driver', industry: 'Transportation & logistics', education: 'secondary', income: '3-7M', platform: 'Zalo', lang: 'vietnamese' },
    { title: 'Factory worker', industry: 'Manufacturing', education: 'vocational', income: '3-7M', platform: 'Zalo', lang: 'vietnamese' },
    { title: 'Bank teller', industry: 'Banking & finance', education: 'university', income: '7-15M', platform: 'Facebook', lang: 'vietnamese' },
    { title: 'Shopee seller', industry: 'Retail & e-commerce', education: 'secondary', income: '7-15M', platform: 'Shopee', lang: 'vietnamese' },
    { title: 'Accountant', industry: 'Banking & finance', education: 'university', income: '7-15M', platform: 'Google', lang: 'mixed' },
    { title: 'UI/UX designer', industry: 'Technology', education: 'university', income: '15-30M', platform: 'Google', lang: 'english' },
    { title: 'Street food vendor', industry: 'Food & beverage', education: 'primary', income: '<3M VND/month', platform: 'Zalo', lang: 'vietnamese' },
    { title: 'Logistics coordinator', industry: 'Transportation & logistics', education: 'university', income: '7-15M', platform: 'Zalo', lang: 'vietnamese' },
  ],
  'Red River Delta': [
    { title: 'Government clerk', industry: 'Government', education: 'university', income: '7-15M', platform: 'Zalo', lang: 'vietnamese' },
    { title: 'High school teacher', industry: 'Education', education: 'university', income: '7-15M', platform: 'Facebook', lang: 'vietnamese' },
    { title: 'Factory worker', industry: 'Manufacturing', education: 'vocational', income: '3-7M', platform: 'Zalo', lang: 'vietnamese' },
    { title: 'Small business owner', industry: 'Retail & e-commerce', education: 'vocational', income: '7-15M', platform: 'Facebook', lang: 'vietnamese' },
    { title: 'Nurse', industry: 'Healthcare', education: 'vocational', income: '3-7M', platform: 'Zalo', lang: 'vietnamese' },
    { title: 'Construction worker', industry: 'Construction', education: 'secondary', income: '3-7M', platform: 'Zalo', lang: 'vietnamese' },
    { title: 'University lecturer', industry: 'Education', education: 'postgraduate', income: '15-30M', platform: 'Google', lang: 'mixed' },
  ],
  'Mekong Delta': [
    { title: 'Rice farmer', industry: 'Agriculture & aquaculture', education: 'primary', income: '<3M VND/month', platform: 'Zalo', lang: 'vietnamese' },
    { title: 'Shrimp farmer', industry: 'Agriculture & aquaculture', education: 'secondary', income: '3-7M', platform: 'Zalo', lang: 'vietnamese' },
    { title: 'Fish trader', industry: 'Agriculture & aquaculture', education: 'secondary', income: '3-7M', platform: 'Facebook', lang: 'vietnamese' },
    { title: 'Street food vendor', industry: 'Food & beverage', education: 'primary', income: '<3M VND/month', platform: 'Zalo', lang: 'vietnamese' },
    { title: 'Primary school teacher', industry: 'Education', education: 'university', income: '3-7M', platform: 'Facebook', lang: 'vietnamese' },
    { title: 'Boat mechanic', industry: 'Transportation & logistics', education: 'vocational', income: '3-7M', platform: 'Zalo', lang: 'vietnamese' },
  ],
  'North Central': [
    { title: 'Farmer', industry: 'Agriculture & aquaculture', education: 'primary', income: '<3M VND/month', platform: 'Zalo', lang: 'vietnamese' },
    { title: 'Teacher', industry: 'Education', education: 'university', income: '3-7M', platform: 'Facebook', lang: 'vietnamese' },
    { title: 'Carpenter', industry: 'Construction', education: 'vocational', income: '3-7M', platform: 'Zalo', lang: 'vietnamese' },
    { title: 'Market vendor', industry: 'Retail & e-commerce', education: 'secondary', income: '3-7M', platform: 'Facebook', lang: 'vietnamese' },
    { title: 'Government clerk', industry: 'Government', education: 'university', income: '7-15M', platform: 'Zalo', lang: 'vietnamese' },
  ],
  'South Central': [
    { title: 'Tour guide', industry: 'Tourism & hospitality', education: 'university', income: '7-15M', platform: 'Facebook', lang: 'mixed' },
    { title: 'Hotel front desk manager', industry: 'Tourism & hospitality', education: 'university', income: '7-15M', platform: 'Zalo', lang: 'mixed' },
    { title: 'Fisherman', industry: 'Agriculture & aquaculture', education: 'primary', income: '3-7M', platform: 'Zalo', lang: 'vietnamese' },
    { title: 'Restaurant owner', industry: 'Food & beverage', education: 'secondary', income: '7-15M', platform: 'Facebook', lang: 'vietnamese' },
    { title: 'Souvenir shop owner', industry: 'Retail & e-commerce', education: 'secondary', income: '3-7M', platform: 'Facebook', lang: 'vietnamese' },
  ],
  'Central Highlands': [
    { title: 'Coffee farmer', industry: 'Agriculture & aquaculture', education: 'primary', income: '3-7M', platform: 'Zalo', lang: 'vietnamese' },
    { title: 'Rubber plantation worker', industry: 'Agriculture & aquaculture', education: 'primary', income: '<3M VND/month', platform: 'Zalo', lang: 'vietnamese' },
    { title: 'Teacher', industry: 'Education', education: 'university', income: '3-7M', platform: 'Facebook', lang: 'vietnamese' },
    { title: 'Small trader', industry: 'Retail & e-commerce', education: 'secondary', income: '3-7M', platform: 'Facebook', lang: 'vietnamese' },
  ],
  Northeast: [
    { title: 'Tea farmer', industry: 'Agriculture & aquaculture', education: 'primary', income: '<3M VND/month', platform: 'Zalo', lang: 'vietnamese' },
    { title: 'Miner', industry: 'Manufacturing', education: 'vocational', income: '3-7M', platform: 'Zalo', lang: 'vietnamese' },
    { title: 'Border trader', industry: 'Retail & e-commerce', education: 'secondary', income: '3-7M', platform: 'Facebook', lang: 'vietnamese' },
    { title: 'Teacher', industry: 'Education', education: 'university', income: '3-7M', platform: 'Facebook', lang: 'vietnamese' },
    { title: 'Factory worker', industry: 'Manufacturing', education: 'vocational', income: '3-7M', platform: 'Zalo', lang: 'vietnamese' },
  ],
  Northwest: [
    { title: 'Farmer', industry: 'Agriculture & aquaculture', education: 'no_formal', income: '<3M VND/month', platform: 'Zalo', lang: 'vietnamese' },
    { title: 'Teacher', industry: 'Education', education: 'university', income: '3-7M', platform: 'Facebook', lang: 'vietnamese' },
    { title: 'Handicraft worker', industry: 'Manufacturing', education: 'primary', income: '<3M VND/month', platform: 'none/offline', lang: 'vietnamese' },
    { title: 'Construction worker', industry: 'Construction', education: 'primary', income: '3-7M', platform: 'Zalo', lang: 'vietnamese' },
  ],
};

const FRUSTRATIONS_BY_INDUSTRY = {
  Technology: [
    'Our codebase has zero documentation and the senior dev just quit',
    'I spend half my day in meetings instead of coding',
    'The company uses 5 different tools and none of them talk to each other',
    'Sprint deadlines are always unrealistic',
    'Legacy systems nobody wants to touch but everyone depends on',
    'No proper CI/CD pipeline — deploys are manual and scary',
    'Hiring takes forever and good candidates get poached',
    'Product requirements change mid-sprint constantly',
  ],
  'Retail & e-commerce': [
    'Customer messages come from 5 platforms and I miss half of them',
    'Inventory tracking is done in a spreadsheet that breaks weekly',
    'Shipping costs eat all my margins on small orders',
    'Shopee keeps changing their algorithm and my sales drop',
    'I can\'t find reliable suppliers who deliver on time',
    'Returns are a nightmare to process and track',
    'Competitors copy my product photos the next day',
    'Facebook ad costs keep going up but conversion goes down',
  ],
  'Banking & finance': [
    'Too much paperwork for every single transaction',
    'Our internal systems are from 2005 and crash twice a week',
    'Customers complain about slow service at the branch',
    'Compliance requirements change faster than we can adapt',
    'Manual reconciliation takes hours every day',
    'The mobile banking app has terrible UX and customers call us instead',
  ],
  'Agriculture & aquaculture': [
    'Crop prices dropped but input costs went up 30%',
    'Saltwater intrusion is getting worse every dry season',
    'I can\'t get a loan without weeks of paperwork',
    'Weather forecasts are unreliable for my farming decisions',
    'Middlemen take most of the profit — I can\'t reach buyers directly',
    'Pests are getting resistant to the usual treatments',
    'No cold storage nearby so produce spoils in transport',
  ],
  Education: [
    'Class sizes are too big — 45 students per class is common',
    'Parents demand more results but resources stay the same',
    'Grading 200 papers by hand every week is exhausting',
    'No budget for updated textbooks or teaching materials',
    'Students in remote areas have no internet for online lessons',
    'Administrative paperwork eats into teaching time',
  ],
  'Tourism & hospitality': [
    'Guest complaints pile up and there\'s no system to track them',
    'I manually update room availability across 3 booking platforms',
    'Staff scheduling is done on paper and always has conflicts',
    'Off-season months are brutal — revenue drops 70%',
    'Online reviews can destroy our reputation overnight',
    'Tour cancellations due to weather have no backup plan',
  ],
  'Food & beverage': [
    'Ingredient prices change daily and I can\'t adjust menu prices that fast',
    'Delivery platforms take 25% commission — barely profitable',
    'Food safety inspections have gotten stricter but guidance is vague',
    'Staff turnover is constant — training never ends',
    'Peak hours are chaos — orders get mixed up constantly',
    'Waste management is expensive and inefficient',
  ],
  Manufacturing: [
    'Quality control catches problems too late in the line',
    'Machine downtime costs us millions per year',
    'Workers keep leaving for factories that pay slightly more',
    'Supply chain disruptions are getting more frequent',
    'Safety incidents happen because training is insufficient',
    'Overtime is mandatory but barely pays more than regular hours',
  ],
  Healthcare: [
    'Patient records are still on paper at many facilities',
    'Equipment maintenance is always behind schedule',
    'Night shifts are understaffed and dangerous',
    'Insurance paperwork takes longer than the actual treatment',
    'Rural clinics lack basic diagnostic equipment',
  ],
  Government: [
    'Citizens wait hours for simple paperwork',
    'Digital transformation is slow — everything still needs stamps and signatures',
    'Budget allocation doesn\'t match actual needs',
    'Coordination between departments is terrible',
    'Public complaints go into a black hole',
  ],
  Construction: [
    'Material prices fluctuate wildly mid-project',
    'Safety regulations are ignored under schedule pressure',
    'Weather delays have no good contingency plans',
    'Workers are undertrained on new building codes',
    'Payment from contractors is always late',
  ],
  'Transportation & logistics': [
    'Route planning is manual and inefficient',
    'Fuel costs eat into already thin margins',
    'Package tracking is unreliable — customers call constantly',
    'Traffic in major cities makes delivery times unpredictable',
    'Vehicle maintenance is reactive instead of preventive',
  ],
};

const REGION_COLORS = {
  Southeast:            [0.98, 0.56, 0.35],
  'Red River Delta':    [0.31, 0.80, 0.77],
  'Mekong Delta':       [0.59, 0.81, 0.70],
  'North Central':      [0.27, 0.72, 0.82],
  'South Central':      [1.00, 0.52, 0.63],
  'Central Highlands':  [0.48, 0.41, 0.93],
  Northeast:            [0.56, 0.74, 0.93],
  Northwest:            [0.97, 0.86, 0.44],
};

const CLUSTER_COLORS = [
  '#FF6B35',
  '#4ECDC4',
  '#7B68EE',
  '#FF85A2',
  '#45B7D1',
  '#96CEB4',
  '#DDA0DD',
  '#F7DC6F',
];

const MOCK_SEARCH_DATA = {
  Technology:                   { query: 'project management tool for developers', queryVi: 'công cụ quản lý dự án phần mềm', competitors: ['Jira', 'Notion', 'Linear'] },
  'Retail & e-commerce':        { query: 'e-commerce management tool', queryVi: 'công cụ quản lý đơn hàng online', competitors: ['Shopee Center', 'Haravan', 'Sapo'] },
  'Banking & finance':          { query: 'banking automation software', queryVi: 'phần mềm tự động hóa ngân hàng', competitors: ['FIS', 'Temenos', 'Finastra'] },
  'Agriculture & aquaculture':  { query: 'farm management app', queryVi: 'giá nông sản hôm nay tra cứu', competitors: ['Facebook groups', 'Zalo groups'] },
  Education:                    { query: 'classroom management software', queryVi: 'phần mềm quản lý lớp học', competitors: ['Google Classroom', 'ClassDojo'] },
  'Tourism & hospitality':      { query: 'hotel management system', queryVi: 'phần mềm quản lý khách sạn', competitors: ['Cloudbeds', 'ezCloud', 'hotel.vn'] },
  'Food & beverage':            { query: 'restaurant POS system', queryVi: 'phần mềm quản lý quán ăn', competitors: ['KiotViet', 'iPOS', 'CukCuk'] },
  Manufacturing:                { query: 'factory production management', queryVi: 'phần mềm quản lý sản xuất', competitors: ['SAP', 'Oracle', 'Odoo'] },
  Healthcare:                   { query: 'clinic management software', queryVi: 'phần mềm quản lý phòng khám', competitors: ['FPT Healthcare', 'VNPT-HIS'] },
  Government:                   { query: 'public service digitization', queryVi: 'phần mềm hành chính công', competitors: ['VNPT', 'FPT IS'] },
  Construction:                 { query: 'construction project estimator', queryVi: 'phần mềm dự toán xây dựng', competitors: ['Dự Toán GXD', 'Excel templates'] },
  'Transportation & logistics': { query: 'fleet management software', queryVi: 'phần mềm quản lý vận tải', competitors: ['Abivin', 'LogiNext'] },
};

// --- Utility ---

function weightedRandom(items, weightKey = 'weight') {
  const total = items.reduce((s, i) => s + i[weightKey], 0);
  let r = Math.random() * total;
  for (const item of items) {
    r -= item[weightKey];
    if (r <= 0) return item;
  }
  return items[items.length - 1];
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

// --- Node generation ---

export function generateNodes(count = 1500) {
  const nodes = [];

  for (let i = 0; i < count; i++) {
    const province = weightedRandom(PROVINCES);
    const age = weightedRandom(AGE_BRACKETS);
    const gender = Math.random() < 0.49 ? 'male' : 'female';
    const jobs = JOBS_BY_REGION[province.region] || JOBS_BY_REGION.Southeast;
    const job = pick(jobs);
    const frustrations = FRUSTRATIONS_BY_INDUSTRY[job.industry]
      ? pickN(FRUSTRATIONS_BY_INDUSTRY[job.industry], 3)
      : ['No specific frustrations recorded'];

    // Fibonacci sphere + noise for organic distribution
    const phi = Math.acos(1 - 2 * (i + 0.5) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 28 + Math.random() * 16;
    const noise = 0.25;

    const baseX = Math.sin(phi) * Math.cos(theta);
    const baseY = Math.sin(phi) * Math.sin(theta);
    const baseZ = Math.cos(phi);

    const regionColor = REGION_COLORS[province.region] || [0.7, 0.7, 0.7];

    nodes.push({
      id: i,
      // Initial position
      x: (baseX + (Math.random() - 0.5) * noise) * r,
      y: (baseY + (Math.random() - 0.5) * noise) * r,
      z: (baseZ + (Math.random() - 0.5) * noise) * r,
      // Visual
      color: regionColor,
      size: 2.5 + Math.random() * 2.5,
      alpha: 0.75 + Math.random() * 0.25,
      // Persona
      persona: {
        age: age.range,
        gender,
        province: province.name,
        region: province.region,
        jobTitle: job.title,
        industry: job.industry,
        companySize: pick(['solo/freelance', 'micro (<10)', 'small (10-50)', 'medium (50-200)', 'large (200-1000)']),
        educationLevel: job.education,
        incomeBracket: job.income,
        primaryPlatform: job.platform,
        searchLanguage: job.lang,
        frustrations,
      },
      // Matching (set during product run)
      matchScore: 0,
      clusterId: null,
    });
  }

  return nodes;
}

// --- Edge generation ---

export function generateEdges(nodes, maxEdges = 3500) {
  const edges = [];
  const byRegion = {};

  nodes.forEach((node, i) => {
    const region = node.persona.region;
    if (!byRegion[region]) byRegion[region] = [];
    byRegion[region].push(i);
  });

  // Connect nodes within same region
  const seen = new Set();
  for (const region of Object.keys(byRegion)) {
    const indices = byRegion[region];
    const target = Math.floor(maxEdges * (indices.length / nodes.length));
    let added = 0;
    let attempts = 0;
    while (added < target && attempts < target * 3) {
      attempts++;
      const a = pick(indices);
      const b = pick(indices);
      if (a === b) continue;
      const key = Math.min(a, b) + '-' + Math.max(a, b);
      if (seen.has(key)) continue;
      seen.add(key);

      // Also prefer nodes with same industry (higher edge probability)
      if (nodes[a].persona.industry !== nodes[b].persona.industry && Math.random() > 0.3) continue;

      edges.push([a, b]);
      added++;
    }
  }

  // Add a few cross-region edges for same industry
  const byIndustry = {};
  nodes.forEach((node, i) => {
    const ind = node.persona.industry;
    if (!byIndustry[ind]) byIndustry[ind] = [];
    byIndustry[ind].push(i);
  });
  let crossEdges = 0;
  for (const industry of Object.keys(byIndustry)) {
    const indices = byIndustry[industry];
    if (indices.length < 2) continue;
    for (let e = 0; e < Math.min(30, indices.length); e++) {
      const a = pick(indices);
      const b = pick(indices);
      if (a === b) continue;
      const key = Math.min(a, b) + '-' + Math.max(a, b);
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([a, b]);
      crossEdges++;
      if (crossEdges > 500) break;
    }
    if (crossEdges > 500) break;
  }

  return edges;
}

// --- Product simulation ---

export function simulateProduct(nodes, productInput) {
  // Determine which industries are "relevant" to the product
  // In a real system this comes from Claude + cosine similarity
  // For mock: pick 3-5 industries as matching
  const allIndustries = [...new Set(nodes.map(n => n.persona.industry))];
  const matchingIndustries = pickN(allIndustries, 3 + Math.floor(Math.random() * 3));

  // Assign match scores
  const updatedNodes = nodes.map(node => {
    const isMatchingIndustry = matchingIndustries.includes(node.persona.industry);
    let matchScore = 0;

    if (isMatchingIndustry) {
      // Strong match: 0.55 - 0.95
      matchScore = 0.55 + Math.random() * 0.4;
    } else {
      // Weak/no match: 0 - 0.45
      matchScore = Math.random() * 0.45;
    }

    return { ...node, matchScore };
  });

  // Filter qualifying nodes (score > 0.55)
  const qualifying = updatedNodes.filter(n => n.matchScore > 0.55);

  // Group by industry for clusters
  const industryGroups = {};
  qualifying.forEach(node => {
    const ind = node.persona.industry;
    if (!industryGroups[ind]) industryGroups[ind] = [];
    industryGroups[ind].push(node.id);
  });

  // Build clusters from top industries by count
  const sortedIndustries = Object.entries(industryGroups)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 7);

  // Place cluster centers on a sphere
  const clusters = sortedIndustries.map(([industry, nodeIds], i) => {
    const phi = Math.acos(1 - 2 * (i + 0.5) / sortedIndustries.length);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 22;

    const searchData = MOCK_SEARCH_DATA[industry] || {
      query: `best ${industry.toLowerCase()} tool`,
      queryVi: `phần mềm ${industry.toLowerCase()}`,
      competitors: ['Google', 'Facebook'],
    };

    // 40% chance product is found
    const found = Math.random() > 0.55;
    const rank = found ? Math.floor(Math.random() * 8) + 1 : null;

    // Build representative segment name
    const sampleNodes = nodeIds.slice(0, 20).map(id => updatedNodes[id]);
    const topProvinces = getMostCommon(sampleNodes.map(n => n.persona.province), 2);
    const topAge = getMostCommon(sampleNodes.map(n => n.persona.age), 1);

    return {
      id: i,
      name: `${industry} in ${topProvinces.join(' & ')} (${topAge[0]})`,
      industry,
      color: CLUSTER_COLORS[i % CLUSTER_COLORS.length],
      nodeIds,
      size: nodeIds.length,
      center: {
        x: Math.sin(phi) * Math.cos(theta) * r,
        y: Math.sin(phi) * Math.sin(theta) * r,
        z: Math.cos(phi) * r,
      },
      // Search result
      found,
      rank,
      topQuery: searchData.queryVi,
      competitors: searchData.competitors,
      scanned: false,
    };
  });

  // Assign cluster IDs to qualifying nodes
  clusters.forEach(cluster => {
    cluster.nodeIds.forEach(id => {
      updatedNodes[id].clusterId = cluster.id;
    });
  });

  // Calculate discoverability
  const scannedClusters = clusters.filter(c => c.found);
  const foundPersonas = scannedClusters.reduce((sum, c) => sum + c.size, 0);
  const totalQualifying = qualifying.length;
  const discoverability = totalQualifying > 0
    ? Math.round((foundPersonas / totalQualifying) * 100)
    : 0;

  return {
    nodes: updatedNodes,
    clusters,
    qualifying: qualifying.length,
    discoverability,
    matchingIndustries,
  };
}

function getMostCommon(arr, n) {
  const counts = {};
  arr.forEach(v => { counts[v] = (counts[v] || 0) + 1; });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([k]) => k);
}

// --- Mock search result details for node detail panel ---

export function generateNodeSearchResult(node, cluster) {
  if (!cluster) return null;

  const searchData = MOCK_SEARCH_DATA[node.persona.industry] || MOCK_SEARCH_DATA.Technology;
  const query = node.persona.searchLanguage === 'english' ? searchData.query : searchData.queryVi;

  const topResults = (searchData.competitors || []).map((comp, i) => ({
    rank: i + 1,
    title: comp,
    url: `https://${comp.toLowerCase().replace(/\s+/g, '')}.com`,
  }));

  // Maybe insert product at the cluster rank
  if (cluster.found && cluster.rank) {
    topResults.splice(cluster.rank - 1, 0, {
      rank: cluster.rank,
      title: 'Your Product',
      url: 'https://yourproduct.com',
      isProduct: true,
    });
    // Re-number ranks
    topResults.forEach((r, i) => { r.rank = i + 1; });
  }

  return {
    query,
    found: cluster.found,
    rank: cluster.rank,
    steps: [
      { done: true, text: `Navigated to ${node.persona.searchLanguage === 'english' ? 'google.com' : 'google.com.vn'}` },
      { done: true, text: `Typed "${query}"` },
      { done: true, text: 'Extracted search results (page 1)' },
      { done: cluster.found, text: cluster.found ? `Product found at rank #${cluster.rank}` : 'Product URL not found in results' },
    ],
    topResults,
  };
}
