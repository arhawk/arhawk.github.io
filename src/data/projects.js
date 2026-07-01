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

export const projectData = [
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
  },
  {
    slug: 'sales-performance-dashboard',
    title: 'Sales Performance Dashboard',
    category: 'Data Analytics',
    summary: 'A stakeholder-friendly dashboard that tracks revenue, margin, and regional performance.',
    technologies: ['SQL', 'Power BI', 'Excel'],
    capabilities: [
      'Data Cleaning',
      'Dashboard Design',
      'KPI Reporting',
      'Data Visualization',
      'Stakeholder Communication'
    ],
    foundations: ['Statistics', 'Data Modeling', 'Business Intelligence'],
    demoUrl: 'https://example.com/demo',
    githubUrl: 'https://github.com/your-handle/sales-dashboard',
    reportUrl: 'https://example.com/report',
    status: 'Complete',
    problem:
      'The team needed a fast way to understand sales performance across products and regions without digging through spreadsheets.',
    whatBuilt:
      'I built a dashboard with KPI cards, trend views, and drill-down filters so non-technical users could answer common business questions quickly.',
    dataMethods:
      'I cleaned the source extracts, standardised date and region fields, defined core metrics, and validated totals against the raw data before publishing.',
    results:
      'The dashboard reduced manual reporting work and gave a single source of truth for weekly performance review.',
    limitations:
      'The current version uses scheduled extracts rather than a live warehouse connection.',
    nextSteps:
      'Connect to an automated pipeline, add anomaly alerts, and extend the model to forecast future sales.',
    reproducibility:
      'Dashboard logic, metric definitions, and assumptions are documented in the linked report and repository.'
  },
  {
    slug: 'customer-churn-pipeline',
    title: 'Customer Churn Pipeline',
    category: 'Data Engineering',
    summary: 'An automated pipeline that prepares customer data and scores churn risk on a schedule.',
    technologies: ['Python', 'Pandas', 'PostgreSQL', 'Docker', 'GitHub Actions'],
    capabilities: [
      'ETL Pipelines',
      'Data Cleaning',
      'Feature Engineering',
      'Model Evaluation',
      'Workflow Automation',
      'Code Review'
    ],
    foundations: ['ETL Fundamentals', 'Data Modeling', 'Machine Learning Fundamentals', 'Version Control'],
    demoUrl: 'https://example.com/demo',
    githubUrl: 'https://github.com/your-handle/churn-pipeline',
    reportUrl: 'https://example.com/report',
    status: 'In progress',
    problem:
      'Customer success wanted a repeatable way to identify accounts at risk of churn using operational data.',
    whatBuilt:
      'I created a modular pipeline that ingests raw tables, transforms features, trains a baseline model, and writes scoring outputs for downstream use.',
    dataMethods:
      'The pipeline includes schema checks, missing value handling, feature engineering, and train/test separation to reduce leakage.',
    results:
      'The workflow produces a stable churn score table that can be consumed by analysts or business users.',
    limitations:
      'The model is intentionally simple and tuned for interpretability over maximum accuracy.',
    nextSteps:
      'Add orchestration, parameter tracking, and a monitored production deployment.',
    reproducibility:
      'Each step is scripted and the repository includes a reproducible local environment.'
  },
  {
    slug: 'support-ticket-classifier',
    title: 'Support Ticket Classifier',
    category: 'AI / ML',
    summary: 'A lightweight text classifier that routes support requests into priority categories.',
    technologies: ['Python', 'Scikit-learn', 'TF-IDF', 'Streamlit'],
    capabilities: [
      'Model Evaluation',
      'Feature Engineering',
      'Prompt Engineering',
      'Documentation',
      'Stakeholder Communication'
    ],
    foundations: ['Machine Learning Fundamentals', 'NLP Fundamentals', 'Text Representation'],
    demoUrl: 'https://example.com/demo',
    githubUrl: 'https://github.com/your-handle/ticket-classifier',
    reportUrl: 'https://example.com/report',
    status: 'Complete',
    problem:
      'Support teams needed a way to triage incoming tickets faster and more consistently.',
    whatBuilt:
      'I trained a baseline text classification model and wrapped it in a simple interface so the result could be reviewed by non-technical users.',
    dataMethods:
      'I cleaned text, removed obvious noise, split the data into train and validation sets, and compared several baseline models.',
    results:
      'The classifier improved triage speed and provided a useful starting point for human review.',
    limitations:
      'Performance depends on the quality and balance of the training set.',
    nextSteps:
      'Test transformer-based models, add active learning, and monitor drift after deployment.',
    reproducibility:
      'The repository includes preprocessing code, model training scripts, and evaluation notes.'
  }
];

export const projectCategories = [
  'All',
  'Data Analytics',
  'Data Engineering',
  'AI / ML',
  'Software Engineering'
];

const capabilityLookup = buildLookup(capabilityTaxonomy, 'capabilities');
const technologyLookup = buildLookup(technologyTaxonomy, 'technologies');
const foundationLookup = buildLookup(foundationsTaxonomy, 'foundations');

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
