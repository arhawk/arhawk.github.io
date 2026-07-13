import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import {
  about,
  capabilities,
  capabilityProjectMatches,
  certificates,
  competitions,
  contact,
  experience,
  foundations,
  foundationProjectMatches,
  getProjectTagLabels,
  projectData,
  publications,
  tagSectionTitles,
  technologies,
  technologyProjectMatches
} from './data';
import { downloadResumePdf, downloadResumeTex } from './lib/generateResumeTex';
import { hasItems } from './lib/hasItems';

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
            <strong>{about.name}</strong>
            <small>{about.title}</small>
          </span>
        </Link>
        <nav className="nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/resume">Resume</NavLink>
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
  const featuredProjects = about.home.selectedWork.featuredSlugs
    .map((slug) => projectData.find((project) => project.slug === slug))
    .filter(Boolean);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Portfolio</p>
          <h1>{about.home.headline}</h1>
          <p className="lead">{about.summary}</p>
          <div className="actions">
            <Link className="button primary" to="/projects">
              View Projects
            </Link>
            <Link className="button" to="/resume">
              Resume
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
              <strong>{about.location}</strong>
            </li>
            <li>
              <span>Target roles</span>
              <strong>{about.targetRoles.join(' · ')}</strong>
            </li>
            <li>
              <span>Current Focus</span>
              <strong>{about.home.quickProfile.currentFocus}</strong>
            </li>
            <li>
              <span>Working Style</span>
              <strong>{about.home.quickProfile.workingStyle}</strong>
            </li>
          </ul>
        </aside>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Why me</p>
            <h2>{about.home.whyMe.title}</h2>
          </div>
        </div>
        <div className="featured-grid">
          {about.home.whyMe.cards.map((card) => (
            <article key={card.title} className="card">
              <div className="card-head">
                <span className="chip">{card.chip}</span>
                <span className="status">{card.status}</span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2>{about.home.selectedWork.title}</h2>
          </div>
          <Link to="/projects">Browse projects</Link>
        </div>
        <div className="featured-grid">
          {featuredProjects.map((project) => (
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
      <p className="eyebrow">About</p>
      <h1>{about.aboutPage.title}</h1>
      <p className="lead">{about.about}</p>

      <div className="resume-stack">
        {hasItems(about.aboutPage.path) ? (
          <div className="panel">
            <h2>My path</h2>
            <ul className="list">
              {about.aboutPage.path.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {hasItems(about.aboutPage.goodAt) || hasItems(about.aboutPage.buildingToward) ? (
          <div className="two-col">
            {hasItems(about.aboutPage.goodAt) ? (
              <div className="panel">
                <h2>What I am good at</h2>
                <ul className="list">
                  {about.aboutPage.goodAt.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {hasItems(about.aboutPage.buildingToward) ? (
              <div className="panel">
                <h2>What I am building toward</h2>
                <ul className="list">
                  {about.aboutPage.buildingToward.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}

        {hasItems(about.aboutPage.differentiators) ? (
          <div className="panel">
            <h2>What differentiates me</h2>
            <ul className="list">
              {about.aboutPage.differentiators.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ResumePage() {
  const showProfileProjectsRow =
    hasItems(about.education) || hasItems(about.technicalFocus) || hasItems(projectData);
  const showSummaryStrengthsRow = about.summary || hasItems(about.uniqueStrengths);

  return (
    <section className="page">
      <div className="section-head">
        <div>
          <p className="eyebrow">Resume</p>
          <h1>{about.resumePage.title}</h1>
          <p className="lead">{about.resumePage.lead}</p>
        </div>
        <div className="resume-export-actions">
          <button type="button" className="button primary" onClick={downloadResumePdf}>
            Download PDF
          </button>
          <button type="button" className="button" onClick={downloadResumeTex}>
            Download LaTeX
          </button>
        </div>
      </div>

      <p className="resume-note">
        Download a ready-to-share PDF or the LaTeX source compiled from the same resume data.
      </p>

      <div className="resume-stack">
        {showSummaryStrengthsRow ? (
          <div className="resume-summary-grid">
            {about.summary ? (
              <div className="panel resume-paired-panel">
                <h2>Professional Summary</h2>
                <p>{about.summary}</p>
                {hasItems(about.summaryPoints) ? (
                  <ul className="list">
                    {about.summaryPoints.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}

            {hasItems(about.uniqueStrengths) ? (
              <div className="panel resume-paired-panel">
                <h2>Professional Strengths</h2>
                <ul className="list">
                  {about.uniqueStrengths.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}

        {showProfileProjectsRow ? (
          <div className="resume-profile-grid">
            <div className="resume-sidebar resume-paired-column">
              {hasItems(about.education) ? (
                <div className="panel resume-sidebar-panel">
                  <h2>Education</h2>
                  {about.education.map((item) => (
                    <article key={`${item.org}-${item.period}`} className="resume-item">
                      <span>{item.period}</span>
                      <h3>{item.title}</h3>
                      <p>{item.org}</p>
                      <small>{item.notes}</small>
                      {item.highlights ? <p className="education-highlight">{item.highlights}</p> : null}
                    </article>
                  ))}
                </div>
              ) : null}

              {hasItems(about.technicalFocus) ? (
                <div className="panel resume-sidebar-panel">
                  <h2>Technical Focus</h2>
                  <ul className="list">
                    {about.technicalFocus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            {hasItems(projectData) ? (
              <div className="panel resume-paired-panel resume-projects-panel">
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
            ) : null}
          </div>
        ) : null}

        {hasItems(experience) ? (
          <div className="panel">
            <h2>Experience</h2>
            {experience.map((item) => (
              <article key={`${item.company}-${item.period}`} className="resume-item">
                <span>{item.period}</span>
                <h3>{item.role}</h3>
                <p>{item.company}</p>
                {item.location ? <small>{item.location}</small> : null}
                {hasItems(item.bullets) ? (
                  <ul className="list">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        ) : null}

        {hasItems(certificates) ? (
          <div className="panel">
            <h2>Certificates</h2>
            <ul className="list">
              {certificates.map((item) => (
                <li key={`${item.name}-${item.date}`}>
                  {item.name} — {item.issuer} ({item.date})
                  {item.url ? (
                    <>
                      {' '}
                      <a href={item.url} target="_blank" rel="noreferrer">
                        Link
                      </a>
                    </>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {hasItems(publications) ? (
          <div className="panel">
            <h2>Publications</h2>
            <ul className="list">
              {publications.map((item) => (
                <li key={`${item.title}-${item.date}`}>
                  {item.title} — {item.venue} ({item.date})
                  {item.url ? (
                    <>
                      {' '}
                      <a href={item.url} target="_blank" rel="noreferrer">
                        Link
                      </a>
                    </>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {hasItems(competitions) ? (
          <div className="panel">
            <h2>Competitions</h2>
            <ul className="list">
              {competitions.map((item) => (
                <li key={`${item.name}-${item.date}`}>
                  {item.name} — {item.result} ({item.date})
                  {item.url ? (
                    <>
                      {' '}
                      <a href={item.url} target="_blank" rel="noreferrer">
                        Link
                      </a>
                    </>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
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
          <h1>{about.projectsPage.title}</h1>
          <p className="lead">{about.projectsPage.lead}</p>
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

      <div className="one-col">
        <div className="panel">
          <h2>Skill taxonomy</h2>
          <ul className="list skill-taxonomy-list">
            <li>
              <span className="skill-taxonomy-term">Capabilities</span>
              <span className="skill-taxonomy-desc">
                competencies supported by project evidence.
              </span>
            </li>
            <li>
              <span className="skill-taxonomy-term">Technologies</span>
              <span className="skill-taxonomy-desc">tools and platforms used in delivery.</span>
            </li>
            <li>
              <span className="skill-taxonomy-term">Foundations</span>
              <span className="skill-taxonomy-desc">
                core concepts and theory demonstrated in the work.
              </span>
            </li>
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
      <h1>{contact.page.title}</h1>
      <p className="lead">{contact.page.lead}</p>

      <div className="two-col">
        <div className="panel">
          <h2>Reach me at</h2>
          <ul className="list">
            {contact.email ? (
              <li>
                Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            ) : null}
            {contact.github ? (
              <li>
                GitHub: <a href={contact.github}>{contact.github}</a>
              </li>
            ) : null}
            {contact.linkedin ? (
              <li>
                LinkedIn: <a href={contact.linkedin}>{contact.linkedin}</a>
              </li>
            ) : null}
          </ul>
        </div>
        {hasItems(contact.openTo) ? (
          <div className="panel">
            <h2>What I am open to</h2>
            <ul className="list">
              {contact.openTo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
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
  const navigate = useNavigate();
  const { activeTag, activeProjects, handleTagClick, closeTag } = useTagMatchesModal();

  const openProject = () => {
    navigate(`/projects/${project.slug}`);
  };

  return (
    <article
      className="card card-clickable"
      role="link"
      tabIndex={0}
      onClick={openProject}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openProject();
        }
      }}
      aria-label={`Open ${project.title} project details`}
    >
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
        stopEventPropagation
      />
      <TagSection
        title="Capabilities"
        sectionKey="capabilities"
        items={getProjectTagLabels(project, 'capabilities').slice(0, 4)}
        compact
        onTagClick={handleTagClick}
        activeTag={activeTag}
        stopEventPropagation
      />
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

function TagCloud({ items, sectionKey, onTagClick, activeTag, stopEventPropagation = false }) {
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
            onClick={(event) => {
              if (stopEventPropagation) {
                event.stopPropagation();
              }
              onTagClick(sectionKey, item);
            }}
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
  activeTag,
  stopEventPropagation = false
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
        stopEventPropagation={stopEventPropagation}
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

  return createPortal(
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
                  View projects
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="modal-empty">No projects matched this tag.</p>
        )}
      </div>
    </div>,
    document.body
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
