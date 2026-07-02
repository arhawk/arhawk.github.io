import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  capabilities,
  capabilityProjectMatches,
  foundations,
  foundationProjectMatches,
  portfolio,
  projectCategories,
  projectData,
  technologies,
  technologyProjectMatches
} from './data/projects';

function App() {
  return (
    <div className="shell">
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand-mark" />
          <span>
            <strong>{portfolio.name}</strong>
            <small>{portfolio.title}</small>
          </span>
        </Link>
        <nav className="nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/resume">Resume</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/skills">Skills</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

function HomePage() {
  const featured = projectData.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">English Resume Portfolio</p>
          <h1>Engineering-first, product-aware, and practical with data and AI.</h1>
          <p className="lead">{portfolio.summary}</p>
          <div className="actions">
            <Link className="button primary" to="/projects">
              View Projects
            </Link>
            <Link className="button" to="/contact">
              Contact
            </Link>
          </div>
        </div>
        <aside className="panel">
          <h2>Quick Profile</h2>
          <ul className="facts">
            <li>
              <span>Location</span>
              <strong>{portfolio.location}</strong>
            </li>
            <li>
              <span>Education</span>
              <strong>{portfolio.education[0].title}</strong>
            </li>
            <li>
              <span>Strengths</span>
              <strong>Fast learning, structured analysis, reliable execution</strong>
            </li>
          </ul>
        </aside>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Featured Projects</h2>
          <Link to="/projects">All projects</Link>
        </div>
        <div className="grid">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="two-col">
        <div className="panel">
          <h2>Education Snapshot</h2>
          <ul className="list">
            {portfolio.education.map((item) => (
              <li key={`${item.org}-${item.period}`}>
                <strong>{item.title}</strong>
                <div>
                  {item.org} | {item.period}
                </div>
                <small>{item.notes}</small>
              </li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h2>Core Strengths</h2>
          <ul className="list">
            {portfolio.uniqueStrengths.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <section className="page">
      <h1>About</h1>
      <p className="lead">{portfolio.about}</p>
      <div className="two-col">
        <div className="panel">
          <h2>Snapshot</h2>
          <ul className="list">
            <li>Based in Sydney and focused on data, AI, and software work.</li>
            <li>I like building practical systems that are easy to understand and maintain.</li>
            <li>I care about both implementation quality and the user experience around it.</li>
          </ul>
        </div>
        <div className="panel">
          <h2>Current Focus</h2>
          <ul className="list">
            <li>Strengthening data science, AI, and software engineering skills.</li>
            <li>Building portfolio projects that show real technical execution.</li>
            <li>Preparing for graduate roles and junior opportunities in applied tech.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function ResumePage() {
  return (
    <section className="page">
      <h1>Resume</h1>
      <p className="lead">
        Education, self-evaluation, unique strengths, and a concise professional summary.
      </p>

      <div className="timeline">
        <div className="panel">
          <h2>Professional Summary</h2>
          <p>{portfolio.summary}</p>
          <ul className="list">
            {portfolio.summaryPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h2>Education</h2>
          {portfolio.education.map((item) => (
            <article key={`${item.org}-${item.period}`} className="resume-item">
              <span>{item.period}</span>
              <h3>{item.title}</h3>
              <p>{item.org}</p>
              <small>{item.notes}</small>
            </article>
          ))}
        </div>
        <div className="panel">
          <h2>Self-Evaluation</h2>
          <ul className="list">
            {portfolio.selfEvaluation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h2>Unique Strengths</h2>
          <ul className="list">
            {portfolio.uniqueStrengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const visibleProjects =
    activeCategory === 'All'
      ? projectData
      : projectData.filter((project) => project.category === activeCategory);

  return (
    <section className="page">
      <div className="section-head">
        <div>
          <h1>Projects</h1>
          <p className="lead">Simple cards first, with detail pages for deeper review.</p>
        </div>
      </div>

      <div className="chips" aria-label="Project categories">
        {projectCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={`chip chip-button ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projectData.find((item) => item.slug === slug);

  if (!project) {
    return (
      <section className="page">
        <h1>Project not found</h1>
        <p className="lead">That project page does not exist.</p>
        <Link className="button primary" to="/projects">
          Back to Projects
        </Link>
      </section>
    );
  }

  return (
    <section className="page">
      <p className="eyebrow">{project.category}</p>
      <h1>{project.title}</h1>
      <p className="lead">{project.summary}</p>

      <div className="detail-grid">
        <article className="panel detail-main">
          {project.projectType ? <DetailSection title="Project Type" content={project.projectType} /> : null}
          {project.myContribution ? (
            <DetailSection title="My Contribution" content={project.myContribution} />
          ) : null}
          <DetailSection title="Problem" content={project.problem} />
          <DetailSection title="What I Built" content={project.whatBuilt} />
          <DetailSection title="Data & Methods" content={project.dataMethods} />
          {project.engineeringHighlights ? (
            <DetailSection title="Engineering Highlights" content={project.engineeringHighlights} />
          ) : null}
          <DetailSection title="Results" content={project.results} />
          <DetailSection title="Limitations & Next Steps" content={`${project.limitations} ${project.nextSteps}`} />
          <DetailSection title="GitHub Repo / Reproducibility" content={project.reproducibility} />
        </article>

        <aside className="panel detail-side">
          <TagSection title="Technologies Used" items={project.technologies} />
          <TagSection title="Capabilities Demonstrated" items={project.capabilities} />
          <TagSection title="Foundations" items={project.foundations} />

          <h2>Demo / Dashboard</h2>
          <div className="stack-links">
            {[
              project.demoUrl && { href: project.demoUrl, label: 'Open demo' },
              project.githubUrl && { href: project.githubUrl, label: 'View GitHub' },
              project.reportUrl && { href: project.reportUrl, label: 'Report' }
            ]
              .filter(Boolean)
              .map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
          </div>

          <h2>Status</h2>
          <p>{project.status}</p>
        </aside>
      </div>
    </section>
  );
}

function SkillsPage() {
  const [activeTag, setActiveTag] = useState(null);
  const skillProjectMatches = {
    capabilities: capabilityProjectMatches,
    technologies: technologyProjectMatches,
    foundations: foundationProjectMatches
  };
  const sectionTitles = {
    capabilities: 'Project Capabilities',
    technologies: 'Project Technologies',
    foundations: 'Broader Skills & Foundations'
  };

  useEffect(() => {
    if (!activeTag) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeTag]);

  const handleTagClick = (sectionKey, label) => {
    setActiveTag((current) =>
      current?.sectionKey === sectionKey && current?.label === label ? null : { sectionKey, label }
    );
  };

  const activeProjects = activeTag ? skillProjectMatches[activeTag.sectionKey].get(activeTag.label) ?? [] : [];

  return (
    <section className="page">
      <h1>Skills</h1>
      <p className="lead">
        Project evidence first. Click any tag to see the projects that use it, with supporting
        technologies and broader foundations grouped underneath for a cleaner portfolio view.
      </p>
      <div className="skill-grid">
        <SkillSection
          title="Project Capabilities"
          groups={capabilities}
          sectionKey="capabilities"
          onTagClick={handleTagClick}
        />
        <SkillSection
          title="Project Technologies"
          groups={technologies}
          sectionKey="technologies"
          onTagClick={handleTagClick}
        />
        <SkillSection
          title="Broader Skills &amp; Foundations"
          groups={foundations}
          sectionKey="foundations"
          onTagClick={handleTagClick}
        />
      </div>
      {activeTag ? (
        <TagProjectsModal
          tag={activeTag.label}
          sectionTitle={sectionTitles[activeTag.sectionKey]}
          projects={activeProjects}
          onClose={() => setActiveTag(null)}
        />
      ) : null}
    </section>
  );
}

function ContactPage() {
  return (
    <section className="page">
      <h1>Contact</h1>
      <p className="lead">
        Best for graduate roles, internships, and opportunities in AI, data science, software, or cybersecurity.
      </p>
      <div className="two-col">
        <div className="panel">
          <h2>Reach me at</h2>
          <ul className="list">
            <li>
              Email: <a href={`mailto:${portfolio.email}`}>{portfolio.email}</a>
            </li>
            <li>
              GitHub: <a href={portfolio.github}>{portfolio.github}</a>
            </li>
            <li>
              LinkedIn: <a href={portfolio.linkedin}>{portfolio.linkedin}</a>
            </li>
          </ul>
        </div>
        <div className="panel">
          <h2>Open To</h2>
          <ul className="list">
            <li>Graduate roles, internships, and junior software, data, or AI opportunities.</li>
            <li>Project collaborations, technical discussions, and role referrals.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function NotFoundPage() {
  return (
    <section className="page">
      <h1>Page not found</h1>
      <p className="lead">Use the navigation to return to the portfolio.</p>
      <Link className="button primary" to="/">
        Go Home
      </Link>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="card">
      <div className="card-head">
        <span className="chip">{project.category}</span>
        <span className="status">{project.status}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <TagSection title="Technologies Used" items={project.technologies.slice(0, 4)} compact />
      <TagSection title="Capabilities Demonstrated" items={project.capabilities.slice(0, 4)} compact />
      <div className="card-actions">
        <Link className="text-link" to={`/projects/${project.slug}`}>
          View details
        </Link>
      </div>
    </article>
  );
}

function DetailSection({ title, content }) {
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      <p>{content}</p>
    </section>
  );
}

function TagSection({ title, items, compact = false }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={compact ? 'mini-section' : 'detail-section'}>
      <h2>{title}</h2>
      <div className="tags">
        {items.map((item) => (
          <span key={item} className="tag">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function TagProjectsModal({ tag, sectionTitle, projects, onClose }) {
  const closeButtonRef = useRef(null);
  const lastFocusedElementRef = useRef(null);

  useEffect(() => {
    lastFocusedElementRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    return () => {
      if (lastFocusedElementRef.current instanceof HTMLElement) {
        lastFocusedElementRef.current.focus();
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tag-projects-title"
        aria-describedby="tag-projects-summary"
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">Skill matches</p>
            <h2 id="tag-projects-title">{tag}</h2>
            <p id="tag-projects-summary" className="modal-summary">
              {sectionTitle} · {projects.length} project{projects.length === 1 ? '' : 's'}
            </p>
          </div>
          <button ref={closeButtonRef} type="button" className="modal-close" onClick={onClose}>
            Close
          </button>
        </div>

        {projects.length ? (
          <ul className="modal-list">
            {projects.map((project) => (
              <li key={project.slug} className="modal-item">
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.category}</p>
                </div>
                <Link className="text-link modal-link" to={`/projects/${project.slug}`}>
                  View project
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="modal-empty">No projects matched this tag.</p>
        )}
      </div>
    </div>
  );
}

function SkillSection({ title, groups, sectionKey, onTagClick }) {
  if (!groups.length) {
    return null;
  }

  return (
    <article className="panel">
      <h2>{title}</h2>
      <div className="skill-groups">
        {groups.map((group) => (
          <section key={group.group} className="skill-group">
            <h3>{group.group}</h3>
            <div className="tags">
              {group.items.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="tag tag-button"
                  onClick={() => onTagClick(sectionKey, item)}
                  aria-haspopup="dialog"
                  aria-label={`Show projects with ${item}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

export default App;
