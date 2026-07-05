import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom';
import {
  capabilities,
  capabilityProjectMatches,
  foundations,
  foundationProjectMatches,
  getProjectTagLabels,
  portfolio,
  projectData,
  tagSectionTitles,
  technologies,
  technologyProjectMatches
} from './data/projects';

const projectTagMatches = {
  capabilities: capabilityProjectMatches,
  technologies: technologyProjectMatches,
  foundations: foundationProjectMatches
};

function useTagMatchesModal() {
  const [activeTag, setActiveTag] = useState(null);

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

  const activeProjects = activeTag
    ? projectTagMatches[activeTag.sectionKey]?.get(activeTag.label) ?? []
    : [];

  return {
    activeTag,
    activeProjects,
    handleTagClick,
    closeTag: () => setActiveTag(null)
  };
}

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
  const featuredProjects = projectData.slice(0, 2);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Portfolio</p>
          <h1>Practical data and software work, built with evidence and clarity.</h1>
          <p className="lead">{portfolio.summary}</p>
          <div className="actions">
            <Link className="button primary" to="/projects">
              View Featured Project
            </Link>
            <Link className="button" to="/contact">
              Contact
            </Link>
          </div>
        </div>

        <aside className="panel profile-card">
          <h2>Quick Profile</h2>
          <ul className="facts">
            <li>
              <span>Location</span>
              <strong>{portfolio.location}</strong>
            </li>
            <li>
              <span>Current Focus</span>
              <strong>Applied data, AI, and software delivery</strong>
            </li>
            <li>
              <span>Working Style</span>
              <strong>Structured, responsive, and maintainable</strong>
            </li>
          </ul>
        </aside>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2>Featured work, presented cleanly.</h2>
          </div>
          <Link to="/projects">Browse projects</Link>
        </div>
        <div className="featured-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
          <MoreProjectsCard />
        </div>
      </section>

      <section className="two-col">
        <div className="panel">
          <h2>What this portfolio emphasizes</h2>
          <ul className="list">
            <li>Clear problem framing before implementation.</li>
            <li>Visible project evidence instead of filler content.</li>
            <li>Route pages with distinct roles so each page adds information.</li>
          </ul>
        </div>
        <div className="panel">
          <h2>Education</h2>
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
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <section className="page">
      <p className="eyebrow">About</p>
      <h1>Identity, working style, and the kind of problems I like to solve.</h1>
      <p className="lead">
        {portfolio.about}
      </p>

      <div className="resume-stack">
        <div className="panel">
          <h2>Identity</h2>
          <ul className="list">
            <li>Early-career technical professional focused on data, AI, and software delivery.</li>
            <li>Comfortable moving between implementation details and product framing.</li>
            <li>Interested in practical work that is useful to users, not just technically complete.</li>
          </ul>
        </div>
        <div className="two-col">
          <div className="panel">
            <h2>Working Style</h2>
            <ul className="list">
              <li>I turn ambiguity into a concrete plan, then execute against it.</li>
              <li>I value maintainability, testing, and clear documentation.</li>
              <li>I prefer small, understandable systems that can be reviewed easily.</li>
            </ul>
          </div>
          <div className="panel">
            <h2>Current Focus</h2>
            <ul className="list">
              <li>Deepening applied data and AI capability.</li>
              <li>Building a stronger evidence trail across projects and resumes.</li>
              <li>Improving collaboration habits across technical and non-technical contexts.</li>
            </ul>
          </div>
        </div>
        <div className="panel">
          <h2>What differentiates me</h2>
          <ul className="list">
            <li>I connect engineering work to business and user outcomes.</li>
            <li>I can move quickly without losing the structure needed for reliable delivery.</li>
            <li>I use AI-assisted tools, but I still validate the output and keep the result explainable.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function ResumePage() {
  return (
    <section className="page">
      <p className="eyebrow">Resume</p>
      <h1>Structured summary for recruiter review.</h1>
      <p className="lead">
        The sections below keep the content compact while preserving the main evidence points.
      </p>

      <div className="resume-stack">
        <div className="panel">
          <h2>Professional Summary</h2>
          <p>{portfolio.summary}</p>
          <ul className="list">
            {portfolio.summaryPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="two-col">
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
            <h2>Project Experience</h2>
            {projectData.map((project) => (
              <article key={project.slug} className="resume-item">
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.projectType}</p>
                <small>{project.myContribution}</small>
              </article>
            ))}
          </div>
        </div>

        <div className="two-col">
          <div className="panel">
            <h2>Technical Focus</h2>
            <ul className="list">
              <li>Data analysis, dashboarding, and reporting.</li>
              <li>Applied AI and machine learning workflows.</li>
              <li>Web application architecture and collaborative interfaces.</li>
            </ul>
          </div>
          <div className="panel">
            <h2>Professional Strengths</h2>
            <ul className="list">
              {portfolio.uniqueStrengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsPage() {
  return (
    <section className="page">
      <div className="section-head">
        <div>
          <p className="eyebrow">Projects</p>
          <h1>Public project evidence.</h1>
          <p className="lead">
            The site presents the featured project first, with supporting project evidence below.
          </p>
        </div>
      </div>

      <div className="grid">
        {projectData.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projectData.find((item) => item.slug === slug);
  const { activeTag, activeProjects, handleTagClick, closeTag } = useTagMatchesModal();

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

  const links = [
    { href: project.githubUrl, label: 'GitHub repo' },
    { href: project.demoUrl, label: 'Live demo' },
    { href: project.backendHealthUrl, label: 'Backend health' }
  ].filter((link) => Boolean(link.href));

  return (
    <section className="page">
      <p className="eyebrow">{project.category}</p>
      <h1>{project.title}</h1>
      <p className="lead">{project.summary}</p>

      <div className="detail-grid">
        <article className="panel detail-main">
          <DetailSection title="Project Type" content={project.projectType} />
          <DetailSection title="My Contribution" content={project.myContribution} />
          <DetailSection title="Problem" content={project.problem} />
          <DetailSection title="What I Built" content={project.whatBuilt} />
          <DetailSection title="Data & Methods" content={project.dataMethods} />
          <DetailSection title="Engineering Highlights" content={project.engineeringHighlights} />
          <DetailSection title="Results" content={project.results} />
          <DetailSection title="Limitations" content={project.limitations} />
          <DetailSection title="Next Steps" content={project.nextSteps} />
          <DetailSection title="Reproducibility" content={project.reproducibility} />
        </article>

        <aside className="panel detail-side">
          <TagSection
            title="Capabilities"
            sectionKey="capabilities"
            items={getProjectTagLabels(project, 'capabilities')}
            onTagClick={handleTagClick}
            activeTag={activeTag}
          />
          <TagSection
            title="Technologies"
            sectionKey="technologies"
            items={getProjectTagLabels(project, 'technologies')}
            onTagClick={handleTagClick}
            activeTag={activeTag}
          />
          <TagSection
            title="Foundations"
            sectionKey="foundations"
            items={getProjectTagLabels(project, 'foundations')}
            onTagClick={handleTagClick}
            activeTag={activeTag}
          />

          <h2>Links</h2>
          <div className="stack-links">
            {links.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>

          <h2>Status</h2>
          <p>{project.status}</p>
        </aside>
      </div>

      {activeTag ? (
        <TagProjectsModal
          tag={activeTag.label}
          sectionTitle={tagSectionTitles[activeTag.sectionKey]}
          projects={activeProjects}
          onClose={closeTag}
        />
      ) : null}
    </section>
  );
}

function SkillsPage() {
  const { activeTag, activeProjects, handleTagClick, closeTag } = useTagMatchesModal();

  return (
    <section className="page">
      <p className="eyebrow">Skills</p>
      <h1>Evidence-led skills, grouped by how they show up in the public project.</h1>
      <p className="lead">
        Click any tag to see the project that demonstrates it. The lists below are derived only
        from visible project data.
      </p>

      <div className="skill-grid">
        <SkillSection
          title="Capabilities"
          groups={capabilities}
          sectionKey="capabilities"
          onTagClick={handleTagClick}
          activeTag={activeTag}
        />
        <SkillSection
          title="Technologies"
          groups={technologies}
          sectionKey="technologies"
          onTagClick={handleTagClick}
          activeTag={activeTag}
        />
        <SkillSection
          title="Foundations"
          groups={foundations}
          sectionKey="foundations"
          onTagClick={handleTagClick}
          activeTag={activeTag}
        />
      </div>

      <div className="two-col">
        <div className="panel">
          <h2>Additional Academic Background</h2>
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
          <h2>How to read this page</h2>
          <ul className="list">
            <li>Capabilities show what the project evidence supports.</li>
            <li>Technologies show the tools used in the project.</li>
            <li>Foundations show the underlying concepts demonstrated by the work.</li>
          </ul>
        </div>
      </div>

      {activeTag ? (
        <TagProjectsModal
          tag={activeTag.label}
          sectionTitle={tagSectionTitles[activeTag.sectionKey]}
          projects={activeProjects}
          onClose={closeTag}
        />
      ) : null}
    </section>
  );
}

function ContactPage() {
  return (
    <section className="page">
      <p className="eyebrow">Contact</p>
      <h1>Recruiter-friendly contact details.</h1>
      <p className="lead">
        Best for graduate roles, internships, and junior opportunities in AI, data science, and
        software.
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
          <h2>What I am open to</h2>
          <ul className="list">
            <li>Graduate and junior roles in software, data, and applied AI.</li>
            <li>Project work with clear scope, feedback loops, and delivery expectations.</li>
            <li>Technical conversations with hiring teams and recruiters.</li>
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
  const { activeTag, activeProjects, handleTagClick, closeTag } = useTagMatchesModal();

  return (
    <article className="card">
      <div className="card-head">
        <span className="chip">{project.category}</span>
        <span className="status">{project.status}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <TagSection
        title="Technologies"
        sectionKey="technologies"
        items={getProjectTagLabels(project, 'technologies').slice(0, 4)}
        compact
        onTagClick={handleTagClick}
        activeTag={activeTag}
      />
      <TagSection
        title="Capabilities"
        sectionKey="capabilities"
        items={getProjectTagLabels(project, 'capabilities').slice(0, 4)}
        compact
        onTagClick={handleTagClick}
        activeTag={activeTag}
      />
      <div className="card-actions">
        <Link className="text-link" to={`/projects/${project.slug}`}>
          View details
        </Link>
      </div>
      {activeTag ? (
        <TagProjectsModal
          tag={activeTag.label}
          sectionTitle={tagSectionTitles[activeTag.sectionKey]}
          projects={activeProjects}
          onClose={closeTag}
        />
      ) : null}
    </article>
  );
}

function MoreProjectsCard() {
  return (
    <article className="card card-placeholder">
      <div className="card-head">
        <span className="chip">More work</span>
        <span className="status">Reserved</span>
      </div>
      <h3>Third project slot</h3>
      <p>
        This space is ready for the next project, so the home page can stay balanced with three
        columns instead of leaving a blank gap.
      </p>
      <div className="card-actions">
        <Link className="text-link" to="/projects">
          Browse all projects
        </Link>
      </div>
    </article>
  );
}

function DetailSection({ title, content }) {
  if (!content) {
    return null;
  }

  return (
    <section className="detail-section">
      <h2>{title}</h2>
      <p>{content}</p>
    </section>
  );
}

function TagCloud({ items, sectionKey, onTagClick, activeTag }) {
  return (
    <div className="tags">
      {items.map((item) => {
        if (!onTagClick) {
          return (
            <span key={item} className="tag">
              {item}
            </span>
          );
        }

        const isActive = activeTag?.sectionKey === sectionKey && activeTag?.label === item;

        return (
          <button
            key={item}
            type="button"
            className={`tag tag-button${isActive ? ' active' : ''}`}
            onClick={() => onTagClick(sectionKey, item)}
            aria-haspopup="dialog"
            aria-pressed={isActive}
            aria-label={`Show projects with ${item}`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

function TagSection({
  title,
  sectionKey,
  items,
  compact = false,
  onTagClick,
  activeTag
}) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={compact ? 'mini-section' : 'detail-section'}>
      <h2>{title}</h2>
      <TagCloud
        items={items}
        sectionKey={sectionKey}
        onTagClick={onTagClick}
        activeTag={activeTag}
      />
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
            <p className="eyebrow">Tag matches</p>
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

function SkillSection({ title, groups, sectionKey, onTagClick, activeTag }) {
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
            <TagCloud
              items={group.items}
              sectionKey={sectionKey}
              onTagClick={onTagClick}
              activeTag={activeTag}
            />
          </section>
        ))}
      </div>
    </article>
  );
}

export default App;
