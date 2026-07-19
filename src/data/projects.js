// Project data and skill taxonomies. Profile and contact live in about.js and contact.js.
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
      { label: 'Streamlit' },
      { label: 'TensorFlow / Keras', aliases: ['TensorFlow', 'Keras'] },
      { label: 'NumPy' },
      { label: 'R' },
      { label: 'XGBoost' },
      { label: 'LightGBM' },
      { label: 'CatBoost' },
      { label: 'caret' }
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
      { label: 'Text Representation' },
      { label: 'Computer Vision' }
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
      'A maintained NEM data pipeline with Bash CLI orchestration, 14-rule QC gates, CI-enforced mart validation, MQTT publishing, and a Streamlit dashboard as the live consumer.',
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
      'The project needed an auditable way to ingest multi-source NEM electricity data, validate publish-ready artifacts, stream updates live, and keep a responsive dashboard without a durable database.',
    whatBuilt:
      'I built a multi-stage pipeline (raw → staging → mart → validate) with Bash CLI entry points, structured pass/fail QC reports and run manifests, MQTT publishing, and a Streamlit interface with summary cards, trends, maps, and tables as the downstream consumer.',
    dataMethods:
      'Deterministic cleaning and metadata alignment produce layered CSV artifacts; QC checks cover schema, uniqueness, null rates, staging/mart consistency, and publish payload fields. Ruff, pytest, and GitHub Actions gate releases—tracked mart data must pass validate before CI goes green.',
    results:
      'Pipeline runs produce QC reports and manifest metadata; validated data publishes over MQTT with stable local and Render deployment paths, plus fallback replay when the stream is stale or unavailable.',
    limitations:
      'The live cache is in-memory rather than persistent, so it is designed for monitoring and demo use instead of long-term historical storage.',
    nextSteps:
      'Add durable storage, richer alerting, and stronger operational monitoring for longer-running deployments.',
    reproducibility:
      'The repository includes the pipeline CLI, QC rules and thresholds, publisher, dashboard, broker configuration, RUNBOOK, and data-processing documentation needed to reproduce the full flow.',
    projectType: 'Applied data systems project',
    myContribution:
      'I designed and implemented ingestion, QC validation, publishing, and dashboard layers, then documented runbook, deployment, and fallback behavior for collaborators.',
    engineeringHighlights:
      'Bash pipeline CLI with fail-fast validate gate; 14-rule QC layer with baseline thresholds and JSON/Markdown/HTML reports; run-level manifest metadata; CI-integrated mart validation; MQTT topic design; bounded StreamCache; Streamlit rendering with a custom Leaflet map component.',
    resumeBullets: [
      'Built a maintained Python NEM data pipeline with Bash CLI orchestration, layered CSV artifacts, structured pass/fail QC reports, and run-level manifest metadata before MQTT publish.',
      'Implemented automated data cleansing verification (row counts, duplicate keys, null-rate thresholds, per-state coordinate bounds, staging/mart consistency) with fixture and tracked-data test coverage in CI.',
      'Delivered a Streamlit real-time dashboard with a custom Leaflet map component, bounded in-memory stream cache, reconnect monitoring, and optional disk snapshot persistence as the pipeline consumer.'
    ]
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
    status: 'Complete',
    problem:
      'Teachers and presenters needed a browser-native workspace for building non-linear lesson boards that could mix text, media, embeds, and interactions without the friction of a full slide deck editor.',
    whatBuilt:
      'The team built a collaborative authoring system for teaching and presentation use, with editable pages, styled text, sticky notes, images, shapes, iframes, local videos, JavaScript code runners, ranking activities, attachments, connections, and Edit / Present modes.',
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
    projectType: 'Collaborative software engineering project',
    myContribution:
      'I contributed across product scoping, frontend canvas implementation, Edit/Present mode workflows, WebSocket collaboration, documentation, testing, and deployment.',
    engineeringHighlights:
      'Key engineering work included canvas pan and zoom interactions, component-based editing, mode switching between Edit and Present views, local JSON / HTML / PROJ export workflows, WebSocket room sharing, and a testable architecture for future maintainers.'
  },
  {
    slug: 'medical-image-ml-algorithm',
    title: 'Medical Image ML Algorithm',
    category: 'AI / ML',
    summary:
      'A histopathology image classification case study comparing Random Forest, MLP, and CNN on a 9-class medical imaging dataset, with Grad-CAM interpretability and structured error analysis.',
    technologies: [
      'Python',
      'NumPy',
      'Pandas',
      'Scikit-learn',
      'TensorFlow / Keras',
      'Matplotlib'
    ],
    capabilities: [
      'Model Evaluation',
      'Feature Engineering',
      'Documentation',
      'Testing',
      'Stakeholder Communication'
    ],
    foundations: [
      'Machine Learning Fundamentals',
      'Statistics',
      'Computer Vision'
    ],
    githubUrl: 'https://github.com/arhawk/Medical-image-ML-algorithm',
    status: 'Complete',
    problem:
      'Automated tissue classification from histopathology tiles supports computer-aided diagnosis, but it was unclear which model family would generalize best on identical data and evaluation criteria.',
    whatBuilt:
      'I rebuilt the analysis workflow as a reproducible Python package with CLI entry points, cached RF GridSearch, CNN training with Apple Silicon GPU support, Grad-CAM visualizations, and cross-model error analysis.',
    dataMethods:
      'The pipeline loads 28×28 RGB NumPy arrays (32,000 train / 8,000 test), normalizes pixels to [0, 1], applies PCA for RF and MLP baselines, and trains a hand-crafted CNN on raw tensors with L2, BatchNorm, dropout, and early stopping.',
    results:
      'The CNN reached 90.1% test accuracy, outperforming PCA + Random Forest (65.7%) and PCA + MLP (69.3%). Grad-CAM and confusion-matrix analysis highlighted where spatial features helped and which tissue classes were most often confused.',
    limitations:
      'Images are small 28×28 tiles rather than full-resolution pathology slides, and the MLP baseline is sensitive to GPU mixed-precision settings on Apple Silicon.',
    nextSteps:
      'Extend to higher-resolution inputs, compare against transfer-learning baselines, and add calibration and threshold tuning for clinical review workflows.',
    reproducibility:
      'The repository includes a pyproject.toml package, setup scripts, `medimg-train` CLI, cached tuning artifacts, and a portfolio write-up in docs/SHOWCASE.md.',
    projectType: 'End-to-end ML engineering project',
    myContribution:
      'I designed the end-to-end pipeline, implemented the CLI and model training code, added Grad-CAM and error analysis, and documented reproducible setup for local and Apple Silicon runs.',
    engineeringHighlights:
      'Key engineering work included packaging the notebook into `src/medical_image_ml`, caching RF GridSearch results, runtime tuning for TensorFlow Metal, and automated figure export for portfolio presentation.',
    resumeBullets: [
      'Performed large-scale processing of 32,000 training and 8,000 test histopathology tiles with normalization, held-out evaluation, and reproducible CLI workflows.',
      'Ensured data quality through confusion-matrix review, Grad-CAM interpretability checks, and structured error analysis across nine tissue classes.',
      'Maintained a documented Python package with cached GridSearch artifacts and command-line training entry points for repeatable analysis.'
    ]
  },
  {
    slug: 'eduattain-prediction',
    title: 'EduAttain Prediction',
    category: 'Data Analytics',
    summary:
      'A predictive analytics pipeline that estimates highest educational attainment (ISCED 2011) from ABS microdata using EDA, feature cleaning, and ensemble classifiers in R and Python.',
    technologies: ['R', 'Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'LightGBM', 'CatBoost', 'caret', 'ggplot2'],
    capabilities: [
      'Data Cleaning',
      'Model Evaluation',
      'Feature Engineering',
      'Documentation',
      'Stakeholder Communication'
    ],
    foundations: ['Statistics', 'Data Modeling', 'Machine Learning Fundamentals'],
    githubUrl: 'https://github.com/arhawk/eduAttain-prediction',
    status: 'Complete',
    problem:
      'Policy and workforce planning need clearer insight into how demographic, socioeconomic, geographic, and apprenticeship-related factors relate to individuals’ highest educational attainment in Australia.',
    whatBuilt:
      'The team built an end-to-end analysis of ABS Microdata TableBuilder records, cleaned and encoded 146 survey variables, explored class imbalance and missingness, and compared classical and gradient-boosting classifiers for 10-way ISCED prediction.',
    dataMethods:
      'We ingested 40,976 records, cross-checked ABS metadata against 146 coded fields, removed unmatched and weight-only columns, treated unknown codes as missing, and used stratified train/test splits with macro-F1 and accuracy for multi-class evaluation.',
    results:
      'The workflow produced a cleaned modeling dataset, exploratory reports, and tuned XGBoost, LightGBM, and CatBoost pipelines alongside R baselines such as Random Forest and SVM for highest-attainment classification.',
    limitations:
      'The survey data is heavily categorical with high-cardinality fields, so feature selection and interpretability remain challenging without stronger regularization or domain-driven grouping.',
    nextSteps:
      'Add feature-importance reporting for policy audiences, test grouped encodings for sparse categories, and evaluate cost-sensitive metrics for minority attainment classes.',
    reproducibility:
      'The repository includes staged R Markdown notebooks, a cleaned CSV export, metadata crosswalk scripts, and a Python pipeline with RandomizedSearchCV for reproducible boosting-model tuning.',
    projectType: 'Collaborative predictive analytics project',
    myContribution:
      'I contributed to data ingestion and cleaning against ABS metadata, exploratory analysis, model benchmarking, and the Python automation for XGBoost, LightGBM, and CatBoost tuning.',
    engineeringHighlights:
      'Key engineering work included parsing semi-structured ABS metadata, reconciling encoding mismatches across 146 variables, and building a reusable Python script with auto-detected target columns and stratified cross-validation.',
    resumeBullets: [
      'Cleansed and verified 40,976 ABS microdata records by cross-checking metadata against 146 coded survey fields and resolving encoding mismatches.',
      'Handled missingness, class imbalance, and unknown survey codes before producing a cleaned modeling dataset for downstream analysis.',
      'Built reproducible R and Python benchmarking workflows with stratified evaluation and stakeholder-ready exploratory reports.'
    ]
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
