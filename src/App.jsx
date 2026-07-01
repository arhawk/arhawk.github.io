import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom';
import { useState } from 'react';
import { portfolio, projectCategories, projectData, skills } from './data/projects';

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
          <p className="eyebrow">Data / AI Graduate Portfolio</p>
          <h1>Clean, practical work that turns data into useful decisions.</h1>
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
              <span>Focus</span>
              <strong>Analytics, engineering, ML</strong>
            </li>
            <li>
              <span>Style</span>
              <strong>Minimal, reproducible, recruiter-friendly</strong>
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
          <h2>What I bring</h2>
          <ul className="list">
            <li>Strong data fundamentals and clear metric thinking</li>
            <li>Ability to move from analysis to a working prototype</li>
            <li>Comfort with stakeholder-friendly communication</li>
          </ul>
        </div>
        <div className="panel">
          <h2>How I work</h2>
          <ul className="list">
            <li>Start with the problem, not the tool</li>
            <li>Keep pipelines and assumptions documented</li>
            <li>Prefer simple, maintainable solutions that can ship</li>
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
        Use this page as a polished online resume summary. You can replace the placeholder
        content with your exact education and experience.
      </p>

      <div className="timeline">
        <div className="panel">
          <h2>Summary</h2>
          <p>
            Data / AI graduate focused on analytics, engineering fundamentals, and applied machine
            learning. Comfortable with SQL, Python, dashboarding, and lightweight web delivery.
          </p>
        </div>
        <div className="panel">
          <h2>Education</h2>
          {portfolio.education.map((item) => (
            <article key={item.org} className="resume-item">
              <span>{item.period}</span>
              <h3>{item.title}</h3>
              <p>{item.org}</p>
              <small>{item.notes}</small>
            </article>
          ))}
        </div>
        <div className="panel">
          <h2>Experience</h2>
          {portfolio.experience.map((item) => (
            <article key={item.org} className="resume-item">
              <span>{item.period}</span>
              <h3>{item.title}</h3>
              <p>{item.org}</p>
              <small>{item.notes}</small>
            </article>
          ))}
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
          <DetailSection title="Problem" content={project.problem} />
          <DetailSection title="What I Built" content={project.whatBuilt} />
          <DetailSection title="Data & Methods" content={project.dataMethods} />
          <DetailSection title="Results" content={project.results} />
          <DetailSection title="Limitations & Next Steps" content={`${project.limitations} ${project.nextSteps}`} />
          <DetailSection title="GitHub Repo / Reproducibility" content={project.reproducibility} />
        </article>

        <aside className="panel detail-side">
          <h2>Tech Stack</h2>
          <div className="tags">
            {project.techStack.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>

          <h2>Demo / Dashboard</h2>
          <div className="stack-links">
            {project.demoUrl ? (
              <a href={project.demoUrl} target="_blank" rel="noreferrer">
                Open demo
              </a>
            ) : null}
            {project.backendHealthUrl ? (
              <a href={project.backendHealthUrl} target="_blank" rel="noreferrer">
                Backend health
              </a>
            ) : null}
            {project.reportUrl ? (
              <a href={project.reportUrl} target="_blank" rel="noreferrer">
                Read report
              </a>
            ) : null}
            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                View GitHub
              </a>
            ) : null}
          </div>

          <h2>Status</h2>
          <p>{project.status}</p>
        </aside>
      </div>
    </section>
  );
}

function SkillsPage() {
  return (
    <section className="page">
      <h1>Skills</h1>
      <p className="lead">A quick scan of the tools and methods I use most often.</p>
      <div className="skill-grid">
        {skills.map((group) => (
          <article key={group.group} className="panel">
            <h2>{group.group}</h2>
            <div className="tags">
              {group.items.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="page">
      <h1>Contact</h1>
      <p className="lead">
        Best for graduate roles, internships, analytics work, and AI/data engineering projects.
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
          <h2>What to include in an enquiry</h2>
          <ul className="list">
            <li>Role title and team</li>
            <li>Project type or hiring timeline</li>
            <li>Relevant stack, data sources, or domain context</li>
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
      <div className="tags">
        {project.techStack.slice(0, 4).map((tech) => (
          <span key={tech} className="tag">
            {tech}
          </span>
        ))}
      </div>
      <div className="card-actions">
        <Link className="text-link" to={`/projects/${project.slug}`}>
          View details
        </Link>
        <a href={project.githubUrl} target="_blank" rel="noreferrer">
          GitHub
        </a>
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

export default App;
