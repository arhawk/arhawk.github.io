// Internal use only: template projects for future portfolio expansion.
export const projectTemplates = [
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
