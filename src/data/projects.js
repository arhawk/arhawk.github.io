export const portfolio = {
  name: 'Zehao Liu',
  title: 'Data / AI Graduate',
  location: 'Sydney, Australia',
  email: 'zliu5660@gmail.com',
  github: 'https://github.com/arhawk',
  linkedin: 'https://www.linkedin.com/in/zehao-liu-4428a7273/',
  summary:
    'An early-career technical professional combining engineering execution with product awareness, currently strengthening data and AI capabilities while building reliable, user-focused systems.',
  about:
    'I learn new tools quickly, turn them into repeatable workflows, and pay attention to usability, delivery pace, and long-term maintainability.',
  education: [
    {
      period: 'Feb 2025 - Present',
      org: 'The University of Sydney',
      title: 'Master of Computer Science',
      notes: 'Data Science and AI stream, Sydney, Australia'
    },
    {
      period: 'Sep 2019 - Jun 2024',
      org: 'Wilfrid Laurier University',
      title: 'Honours Bachelor of Computer Science and Mathematics',
      notes: 'Waterloo, Canada'
    }
  ],
  selfEvaluation: [
    'Strong technical learning ability with a track record of quickly picking up new tools and turning them into reusable workflows.',
    'Product-minded approach that values not only implementation, but also usability, delivery pace, and maintainability.',
    'Able to structure complex problems around goals, constraints, priorities, and risk, then turn that plan into execution.',
    'Habitual in execution and review: I use data and feedback to keep improving implementation details and collaboration habits.',
    'Ongoing growth area: improving cross-cultural communication and influence so I can build consensus more effectively in multi-role teams.'
  ],
  uniqueStrengths: [
    'I combine engineering and product perspectives, which helps me connect implementation work to business goals and user experience.',
    'I can break down complex tasks quickly and use prioritization plus risk control to improve delivery certainty and quality.',
    'I use AI-assisted coding, research, documentation, and debugging effectively while still validating outputs and keeping them explainable.',
    'I have cross-functional collaboration experience and can support Jira management, documentation, reporting, and client communication.',
    'I stay steady under fast-paced or high-pressure conditions, balancing detail quality with response speed to keep key work on track.'
  ],
  summaryPoints: [
    'Positioned as an early-career technical professional with both engineering execution and product awareness.',
    'Continuously strengthening data and AI capability while expanding cross-team collaboration skills.',
    'Target roles include AI applications, data science, software development, and cybersecurity, with a focus on creating measurable value in real business contexts.'
  ]
};
// Keep project-backed tags separate by intent so the Skills page can read as evidence first,
// then tools/platforms, then broader foundations underneath.

export const capabilityTaxonomy = [
  {
    group: 'Data Analysis & Reporting',
    capabilities: [
      { label: 'Data Cleaning' },
      { label: 'Dashboard Design' },
      { label: 'KPI Reporting' },
      { label: 'Data Visualization' }
    ]
  },
  {
    group: 'Machine Learning & AI',
    capabilities: [
      { label: 'Model Evaluation' },
      { label: 'Feature Engineering' },
      { label: 'Prompt Engineering' }
    ]
  },
  {
    group: 'Data Engineering & Automation',
    capabilities: [
      { label: 'ETL Pipelines', aliases: ['ETL / ELT Pipelines', 'ELT Pipelines'] },
      { label: 'Workflow Automation' }
    ]
  },
  {
    group: 'Software Delivery',
    capabilities: [
      { label: 'Testing' },
      { label: 'Responsive UI' },
      { label: 'Real-time Collaboration', aliases: ['Collaboration'] },
      { label: 'Software Architecture' },
      { label: 'Deployment' }
    ]
  },
  {
    group: 'Collaboration & Communication',
    capabilities: [
      { label: 'Documentation' },
      { label: 'Project Scoping' },
      { label: 'Pull Requests' },
      { label: 'Code Review' },
      { label: 'Stakeholder Communication' }
    ]
  }
];

export const technologyTaxonomy = [
  {
    group: 'App Runtime & Frameworks',
    technologies: [
      { label: 'React' },
      { label: 'Vite' },
      { label: 'Python' },
      { label: 'JavaScript', aliases: ['Vanilla JavaScript'] },
      { label: 'HTML / CSS', aliases: ['HTML', 'CSS'] },
      { label: 'Node.js' },
      { label: 'MQTT' },
      { label: 'WebSocket', aliases: ['WebSocket relay'] },
      { label: 'Pandas' },
      { label: 'Scikit-learn' },
      { label: 'Streamlit' }
    ]
  },
  {
    group: 'Data & BI Tools',
    technologies: [
      { label: 'SQL' },
      { label: 'Excel' },
      { label: 'Power BI' },
      { label: 'PostgreSQL' },
      { label: 'TF-IDF' }
    ]
  },
  {
    group: 'Delivery & Automation',
    technologies: [
      { label: 'Docker' },
      { label: 'GitHub Actions' },
      { label: 'Render' },
      { label: 'Vercel' },
      { label: 'Playwright' }
    ]
  },
  {
    group: 'Visualization & Interfaces',
    technologies: [
      { label: 'Konva.js' },
      { label: 'Matplotlib' },
      { label: 'ggplot2' }
    ]
  }
];

export const foundationsTaxonomy = [
  {
    group: 'Software Foundations',
    foundations: [
      { label: 'Web Fundamentals' },
      { label: 'Event-Driven Systems' },
      { label: 'Version Control' },
      { label: 'Object-Oriented Programming', aliases: ['OOP'] }
    ]
  },
  {
    group: 'Data Foundations',
    foundations: [
      { label: 'Statistics' },
      { label: 'Data Modeling' },
      { label: 'Business Intelligence' },
      { label: 'ETL Fundamentals' }
    ]
  },
  {
    group: 'AI Foundations',
    foundations: [
      { label: 'Machine Learning Fundamentals' },
      { label: 'NLP Fundamentals', aliases: ['Natural Language Processing', 'NLP'] },
      { label: 'Text Representation' }
    ]
  }
];

const normalizeValue = (value) => value.trim().toLowerCase().replace(/\s+/g, ' ');

const buildLookup = (taxonomy, fieldName) => {
  const lookup = new Map();

  for (const group of taxonomy) {
    for (const item of group[fieldName]) {
      const aliases = [item.label, ...(item.aliases ?? [])];
      for (const alias of aliases) {
        lookup.set(normalizeValue(alias), { group: group.group, label: item.label });
      }
    }
  }

  return lookup;
};

const collectGroupedValues = (projects, sourceKey, taxonomy, lookup) => {
  const grouped = new Map(taxonomy.map((group) => [group.group, new Set()]));

  for (const project of projects) {
    const projectValues = project[sourceKey] ?? [];

    for (const value of projectValues) {
      const normalized = normalizeValue(value);
      const match = lookup.get(normalized);

      if (match) {
        grouped.get(match.group).add(match.label);
      }
    }
  }

  return taxonomy
    .map((group) => ({
      group: group.group,
      items: [...grouped.get(group.group)]
    }))
    .filter((group) => group.items.length > 0);
};

const collectProjectMatches = (projects, sourceKey, taxonomy, lookup) => {
  const grouped = new Map();

  for (const project of projects) {
    const projectValues = project[sourceKey] ?? [];
    const matchedLabels = new Set();

    for (const value of projectValues) {
      const normalized = normalizeValue(value);
      const match = lookup.get(normalized);

      if (match) {
        matchedLabels.add(match.label);
      }
    }

    for (const label of matchedLabels) {
      if (!grouped.has(label)) {
        grouped.set(label, []);
      }

      grouped.get(label).push(project);
    }
  }

  return grouped;
};

const sectionLookups = {
  capabilities: null,
  technologies: null,
  foundations: null
};

export const projectData = [
  {
    slug: 'nem-monitoring-dashboard',
    title: 'NEM Monitoring Dashboard',
    category: 'Data Engineering',
    summary:
      'A near-real-time electricity monitoring dashboard that prepares CSV data, publishes updates over MQTT, and renders live facility metrics in Streamlit.',
    technologies: ['Python', 'Pandas', 'MQTT', 'Streamlit', 'Docker', 'GitHub Actions', 'Render'],
    capabilities: [
      'Data Cleaning',
      'Dashboard Design',
      'Data Visualization',
      'Workflow Automation',
      'Deployment',
      'Documentation',
      'Testing',
      'Stakeholder Communication'
    ],
    foundations: [
      'ETL Fundamentals',
      'Event-Driven Systems',
      'Data Modeling',
      'Version Control'
    ],
    demoUrl: 'https://nem-monitoring-dashboard.onrender.com/',
    githubUrl: 'https://github.com/arhawk/NEM-Monitoring-Dashboard',
    status: 'Complete',
    problem:
      'The project needed a reliable way to take raw NEM electricity data, clean it, publish it as a live stream, and keep the dashboard responsive without depending on a durable database.',
    whatBuilt:
      'I built a full local-to-cloud pipeline with CSV preparation, MQTT publishing, an in-memory dashboard cache, and a Streamlit interface for summary cards, trend lines, maps, and tables.',
    dataMethods:
      'The pipeline fetches and normalizes facility and market data, preserves missing optional values as missing, and separates data preparation from live dashboard rendering so each stage stays testable.',
    results:
      'The dashboard presents live facility updates with stable local and Render deployment paths, plus a fallback replay mode when the stream is stale or unavailable.',
    limitations:
      'The live cache is in-memory rather than persistent, so it is designed for monitoring and demo use instead of long-term historical storage.',
    nextSteps:
      'Add durable storage, richer alerting, and stronger operational monitoring for longer-running deployments.',
    reproducibility:
      'The repository includes the publisher, dashboard, broker configuration, deployment notes, and the data-processing documentation needed to reproduce the flow.',
    projectType: 'Applied data systems project',
    myContribution:
      'I designed and implemented the ingestion, publishing, and dashboard layers, then documented the deployment and fallback behavior.',
    engineeringHighlights:
      'Key engineering work included MQTT topic design, bounded in-memory caching, conditional fallback replay, Streamlit rendering, and a separation between local broker mode and the Render deployment path.'
  },
  {
    slug: 'infinite-canvas-studio',
    title: 'Infinite Canvas Studio',
    category: 'Software Engineering',
    summary:
      'A browser-based teaching and presentation platform for authoring non-linear lesson boards on an infinite canvas with live collaboration.',
    technologies: ['Vite', 'Vanilla JavaScript', 'Konva.js', 'Node.js', 'WebSocket relay', 'Render', 'Vercel'],
    capabilities: [
      'Responsive UI',
      'Real-time Collaboration',
      'Software Architecture',
      'Testing',
      'Deployment',
      'Documentation',
      'Project Scoping',
      'Pull Requests'
    ],
    foundations: [
      'Web Fundamentals',
      'Event-Driven Systems',
      'Object-Oriented Programming',
      'Version Control'
    ],
    demoUrl: 'https://infinite-canvas-studio.vercel.app',
    githubUrl: 'https://github.com/arhawk/CS61-3-USYD2026',
    backendHealthUrl: 'https://infinite-canvas-studio.onrender.com/health',
    status: 'Complete',
    problem:
      'Teachers and presenters needed a browser-native workspace for building non-linear lesson boards that could mix text, media, embeds, and interactions without the friction of a full slide deck editor.',
    whatBuilt:
      'I built a collaborative authoring system for teaching and presentation use, with editable pages, styled text, sticky notes, images, shapes, iframes, local videos, JavaScript code runners, ranking activities, attachments, connections, and Edit / Present modes.',
    dataMethods:
      'The frontend uses a class-based architecture with App, ModeManager, and StageController plus plugin, tool, command, and component base classes. Save / load, undo / redo, room sharing, and export flows are handled through explicit document state and message passing.',
    results:
      'The app supports temporary online rooms for collaboration, separate frontend and relay deployments, and export paths for JSON, single-file HTML, and PROJ folder formats.',
    limitations:
      'The hosted demo is intentionally ephemeral and does not keep long-term cloud state.',
    nextSteps:
      'Add durable storage, richer presence indicators, and more collaborative editing controls for larger teaching sessions.',
    reproducibility:
      'The repository documents the frontend, the Node.js WebSocket relay, the deployment split between Vercel and Render, and the core testing approach with unit and Playwright E2E coverage.',
    projectType: 'Collaborative course project',
    myContribution:
      'I contributed across product scoping, frontend implementation, collaboration workflow, documentation, and deployment.',
    engineeringHighlights:
      'Key engineering work included canvas pan and zoom interactions, component-based editing, mode switching between Edit and Present views, local JSON / HTML / PROJ export workflows, WebSocket room sharing, and a testable architecture for future maintainers.'
  }
];

const capabilityLookup = buildLookup(capabilityTaxonomy, 'capabilities');
const technologyLookup = buildLookup(technologyTaxonomy, 'technologies');
const foundationLookup = buildLookup(foundationsTaxonomy, 'foundations');

sectionLookups.capabilities = capabilityLookup;
sectionLookups.technologies = technologyLookup;
sectionLookups.foundations = foundationLookup;

export const capabilities = collectGroupedValues(
  projectData,
  'capabilities',
  capabilityTaxonomy,
  capabilityLookup
);

export const technologies = collectGroupedValues(
  projectData,
  'technologies',
  technologyTaxonomy,
  technologyLookup
);

export const foundations = collectGroupedValues(
  projectData,
  'foundations',
  foundationsTaxonomy,
  foundationLookup
);

export const capabilityProjectMatches = collectProjectMatches(
  projectData,
  'capabilities',
  capabilityTaxonomy,
  capabilityLookup
);

export const technologyProjectMatches = collectProjectMatches(
  projectData,
  'technologies',
  technologyTaxonomy,
  technologyLookup
);

export const foundationProjectMatches = collectProjectMatches(
  projectData,
  'foundations',
  foundationsTaxonomy,
  foundationLookup
);

export const tagSectionTitles = {
  capabilities: 'Capabilities',
  technologies: 'Technologies',
  foundations: 'Foundations'
};

export const resolveProjectTagLabel = (sectionKey, value) => {
  const lookup = sectionLookups[sectionKey];

  if (!lookup) {
    return value.trim();
  }

  const match = lookup.get(normalizeValue(value));

  return match?.label ?? value.trim();
};

export const getProjectTagLabels = (project, sectionKey) => {
  const values = project[sectionKey] ?? [];
  const labels = [];
  const seen = new Set();

  for (const value of values) {
    const label = resolveProjectTagLabel(sectionKey, value);

    if (!seen.has(label)) {
      seen.add(label);
      labels.push(label);
    }
  }

  return labels;
};
