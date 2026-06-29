export const portfolio = {
  name: 'Your Name',
  title: 'Data / AI Graduate',
  location: 'Sydney, Australia',
  email: 'you@example.com',
  github: 'https://github.com/your-handle',
  linkedin: 'https://www.linkedin.com/in/your-handle/',
  summary:
    'I build clean, reliable data products and AI prototypes that help teams move from raw data to decisions.',
  about:
    'I am a data and AI graduate focused on analytics, engineering fundamentals, and practical machine learning. I like projects that combine clear problem framing, tidy data pipelines, and simple interfaces people can actually use.',
  education: [
    {
      period: '2021 - 2025',
      org: 'Bachelor / Graduate Study',
      title: 'Data, Analytics, or AI major',
      notes: 'Tailor this section to your actual degree, institution, and graduation date.'
    }
  ],
  experience: [
    {
      period: 'Internship / Project Work',
      org: 'Team or Organisation Name',
      title: 'Data / AI Projects',
      notes: 'Add your internships, capstones, or relevant part-time work here.'
    }
  ]
};

export const skills = [
  {
    group: 'Data Analytics',
    items: ['Excel', 'SQL', 'Tableau', 'Power BI', 'Exploratory analysis', 'KPI reporting']
  },
  {
    group: 'Data Engineering',
    items: ['Python', 'Pandas', 'ETL pipelines', 'APIs', 'Data quality checks', 'PostgreSQL']
  },
  {
    group: 'AI / ML',
    items: ['Scikit-learn', 'Model evaluation', 'Feature engineering', 'Prompting', 'Experiment tracking']
  },
  {
    group: 'Tools',
    items: ['Git', 'GitHub', 'Vite', 'React', 'Docker', 'Linux']
  }
];

export const projectData = [
  {
    slug: 'sales-performance-dashboard',
    title: 'Sales Performance Dashboard',
    category: 'Data Analytics',
    summary: 'A stakeholder-friendly dashboard that tracks revenue, margin, and regional performance.',
    techStack: ['SQL', 'Power BI', 'Excel', 'Data modeling'],
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
    techStack: ['Python', 'Pandas', 'PostgreSQL', 'Docker', 'GitHub Actions'],
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
    techStack: ['Python', 'Scikit-learn', 'TF-IDF', 'Streamlit'],
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

export const projectCategories = ['All', 'Data Analytics', 'Data Engineering', 'AI / ML'];
