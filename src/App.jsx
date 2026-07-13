import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import {
  capabilities,
  capabilityProjectMatches,
  certificates,
  competitions,
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
import { getAbout, getContact, getDisplayName, getGroupTitle, getProjectCopy } from './i18n/getLocalized';
import { useLocale } from './i18n/LanguageContext';
import { getUi } from './i18n/ui';
import { downloadResumePdf, downloadResumeTex } from './lib/generateResumeTex';
import { collectResumeSkillLabels } from './lib/collectResumeSkills';
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

function LanguageSwitch() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="lang-switch" role="group" aria-label={getUi(locale, 'langSwitch.label')}>
      <button
        type="button"
        className={`lang-switch-btn${locale === 'en' ? ' active' : ''}`}
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        aria-label={getUi(locale, 'aria.switchToEn')}
      >
        {getUi(locale, 'langSwitch.en')}
      </button>
      <span className="lang-switch-divider" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        className={`lang-switch-btn${locale === 'zh' ? ' active' : ''}`}
        onClick={() => setLocale('zh')}
        aria-pressed={locale === 'zh'}
        aria-label={getUi(locale, 'aria.switchToZh')}
      >
        {getUi(locale, 'langSwitch.zh')}
      </button>
    </div>
  );
}

function App() {
  const { locale } = useLocale();
  const localizedAbout = getAbout(locale);

  return (
    <div className="shell">
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand-mark" />
          <span>
            <strong>{getDisplayName(locale)}</strong>
            <small>{localizedAbout.title}</small>
          </span>
        </Link>
        <div className="topbar-actions">
          <nav className="nav">
            <NavLink to="/" end>
              {getUi(locale, 'nav.home')}
            </NavLink>
            <NavLink to="/about">{getUi(locale, 'nav.about')}</NavLink>
            <NavLink to="/resume">{getUi(locale, 'nav.resume')}</NavLink>
            <NavLink to="/projects">{getUi(locale, 'nav.projects')}</NavLink>
            <NavLink to="/skills">{getUi(locale, 'nav.skills')}</NavLink>
            <NavLink to="/contact">{getUi(locale, 'nav.contact')}</NavLink>
          </nav>
          <LanguageSwitch />
        </div>
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
  const { locale } = useLocale();
  const localizedAbout = getAbout(locale);
  const featuredProjects = localizedAbout.home.selectedWork.featuredSlugs
    .map((slug) => projectData.find((project) => project.slug === slug))
    .filter(Boolean);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1 className="hero-headline">{localizedAbout.home.headline}</h1>
          <p className="lead">{localizedAbout.home.lead}</p>
          <div className="actions">
            <Link className="button primary" to="/projects">
              {getUi(locale, 'home.viewProjects')}
            </Link>
            <Link className="button" to="/resume">
              {getUi(locale, 'home.resume')}
            </Link>
            <Link className="button" to="/contact">
              {getUi(locale, 'home.contact')}
            </Link>
          </div>
        </div>

        <aside className="panel profile-card">
          <h2>{getUi(locale, 'home.quickProfile')}</h2>
          <ul className="facts">
            <li>
              <span>{getUi(locale, 'home.location')}</span>
              <strong>{localizedAbout.location}</strong>
            </li>
            <li>
              <span>{getUi(locale, 'home.targetRoles')}</span>
              <strong>{localizedAbout.targetRoles.join(' · ')}</strong>
            </li>
            <li>
              <span>{getUi(locale, 'home.currentFocus')}</span>
              <strong>{localizedAbout.home.quickProfile.currentFocus}</strong>
            </li>
            <li>
              <span>{getUi(locale, 'home.workingStyle')}</span>
              <strong>{localizedAbout.home.quickProfile.workingStyle}</strong>
            </li>
          </ul>
        </aside>
      </section>

      <section className="section">
        <h2>{localizedAbout.home.whyMe.title}</h2>
        <div className="featured-grid">
          {localizedAbout.home.whyMe.cards.map((card) => (
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
          <h2>{localizedAbout.home.selectedWork.title}</h2>
          <Link to="/projects">{getUi(locale, 'home.browseProjects')}</Link>
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
  const { locale } = useLocale();
  const localizedAbout = getAbout(locale);

  return (
    <section className="page">
      <h1>{getUi(locale, 'about.title')}</h1>
      <p className="lead">{localizedAbout.about}</p>

      <div className="about-sections">
        {hasItems(localizedAbout.aboutPage.path) ? (
          <article className="panel">
            <h2>{getUi(locale, 'about.background')}</h2>
            <div className="about-prose">
              {localizedAbout.aboutPage.path.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </article>
        ) : null}

        {hasItems(localizedAbout.aboutPage.goodAt) ? (
          <article className="panel">
            <h2>{getUi(locale, 'about.howIWork')}</h2>
            <ul className="list">
              {localizedAbout.aboutPage.goodAt.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ) : null}

        {hasItems(localizedAbout.aboutPage.buildingToward) ? (
          <article className="panel">
            <h2>{getUi(locale, 'about.stillLearning')}</h2>
            <ul className="list">
              {localizedAbout.aboutPage.buildingToward.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ) : null}
      </div>
    </section>
  );
}

function ResumePage() {
  const { locale } = useLocale();
  const localizedAbout = getAbout(locale);
  const resumeSkills = collectResumeSkillLabels(projectData);
  const showProfileProjectsRow =
    hasItems(localizedAbout.education) ||
    hasItems(localizedAbout.technicalFocus) ||
    hasItems(resumeSkills) ||
    hasItems(projectData);
  const showSummaryStrengthsRow = localizedAbout.summary || hasItems(localizedAbout.uniqueStrengths);

  return (
    <section className="page">
      <div className="section-head">
        <h1>{getUi(locale, 'resume.title')}</h1>
        <div className="resume-export-actions">
          <div className="resume-export-buttons">
            <button type="button" className="button primary" onClick={downloadResumePdf}>
              {getUi(locale, 'resume.downloadPdf')}
            </button>
            <button type="button" className="button" onClick={downloadResumeTex}>
              {getUi(locale, 'resume.downloadLatex')}
            </button>
          </div>
          <p className="resume-export-note">{getUi(locale, 'resume.exportNote')}</p>
        </div>
      </div>

      <div className="resume-stack">
        {showSummaryStrengthsRow ? (
          <div className="resume-summary-stack">
            {localizedAbout.summary ? (
              <article className="panel resume-paired-panel">
                <h2>{getUi(locale, 'resume.professionalSummary')}</h2>
                <p>{localizedAbout.summary}</p>
                {hasItems(localizedAbout.summaryPoints) ? (
                  <ul className="list resume-highlight-list">
                    {localizedAbout.summaryPoints.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ) : null}

            {hasItems(localizedAbout.uniqueStrengths) ? (
              <article className="panel resume-paired-panel">
                <h2>{getUi(locale, 'resume.professionalStrengths')}</h2>
                <ul className="list resume-highlight-list">
                  {localizedAbout.uniqueStrengths.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ) : null}
          </div>
        ) : null}

        {showProfileProjectsRow ? (
          <div className="resume-profile-grid">
            <div className="resume-sidebar resume-paired-column">
              {hasItems(localizedAbout.education) ? (
                <div className="panel resume-sidebar-panel">
                  <h2>{getUi(locale, 'resume.education')}</h2>
                  {localizedAbout.education.map((item) => (
                    <article key={`${item.org}-${item.period}`} className="resume-item resume-subheading-item">
                      <div className="resume-subheading">
                        <div className="resume-subheading-row">
                          <strong className="resume-subheading-primary">{item.org}</strong>
                          {item.notes ? <span className="resume-subheading-meta">{item.notes}</span> : null}
                        </div>
                        <div className="resume-subheading-row resume-subheading-row-secondary">
                          <em className="resume-subheading-secondary">{item.title}</em>
                          <span className="resume-subheading-meta">{item.period}</span>
                        </div>
                      </div>
                      {item.highlights ? (
                        <ul className="list resume-subheading-details">
                          <li>{item.highlights}</li>
                        </ul>
                      ) : null}
                    </article>
                  ))}
                </div>
              ) : null}

              {hasItems(localizedAbout.technicalFocus) ? (
                <article className="panel resume-sidebar-panel">
                  <h2>{getUi(locale, 'resume.technicalFocus')}</h2>
                  <ul className="list resume-highlight-list">
                    {localizedAbout.technicalFocus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ) : null}
            </div>

            <div className="resume-main-column resume-paired-column">
              {hasItems(projectData) ? (
                <div className="panel resume-paired-panel resume-projects-panel">
                  <h2>
                    <Link className="resume-nav-link" to="/projects">
                      {getUi(locale, 'resume.projectExperience')}
                    </Link>
                  </h2>
                  {projectData.map((project) => {
                    const localizedProject = getProjectCopy(locale, project);

                    return (
                      <article key={project.slug} className="resume-item">
                        <span>{localizedProject.category}</span>
                        <h3>
                          <Link className="resume-nav-link" to={`/projects/${project.slug}`}>
                            {project.title}
                          </Link>
                        </h3>
                      </article>
                    );
                  })}
                </div>
              ) : null}

              {hasItems(resumeSkills) ? (
                <div className="panel resume-sidebar-panel">
                  <h2>
                    <Link className="resume-nav-link" to="/skills">
                      {getUi(locale, 'resume.skills')}
                    </Link>
                  </h2>
                  <p>{resumeSkills.join(', ')}</p>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {hasItems(experience) ? (
          <div className="panel">
            <h2>{getUi(locale, 'resume.experience')}</h2>
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
            <h2>{getUi(locale, 'resume.certificates')}</h2>
            <ul className="list">
              {certificates.map((item) => (
                <li key={`${item.name}-${item.date}`}>
                  {item.name} — {item.issuer} ({item.date})
                  {item.url ? (
                    <>
                      {' '}
                      <a href={item.url} target="_blank" rel="noreferrer">
                        {getUi(locale, 'resume.link')}
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
            <h2>{getUi(locale, 'resume.publications')}</h2>
            <ul className="list">
              {publications.map((item) => (
                <li key={`${item.title}-${item.date}`}>
                  {item.title} — {item.venue} ({item.date})
                  {item.url ? (
                    <>
                      {' '}
                      <a href={item.url} target="_blank" rel="noreferrer">
                        {getUi(locale, 'resume.link')}
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
            <h2>{getUi(locale, 'resume.competitions')}</h2>
            <ul className="list">
              {competitions.map((item) => (
                <li key={`${item.name}-${item.date}`}>
                  {item.name} — {item.result} ({item.date})
                  {item.url ? (
                    <>
                      {' '}
                      <a href={item.url} target="_blank" rel="noreferrer">
                        {getUi(locale, 'resume.link')}
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
  const { locale } = useLocale();

  return (
    <section className="page">
      <h1>{getUi(locale, 'projects.title')}</h1>

      <div className="grid">
        {projectData.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectDetailPage() {
  const { locale } = useLocale();
  const { slug } = useParams();
  const project = projectData.find((item) => item.slug === slug);
  const { activeTag, activeProjects, handleTagClick, closeTag } = useTagMatchesModal();

  if (!project) {
    return (
      <section className="page">
        <h1>{getUi(locale, 'projects.notFound')}</h1>
        <p className="lead">{getUi(locale, 'projects.notFoundLead')}</p>
        <Link className="button primary" to="/projects">
          {getUi(locale, 'projects.backToProjects')}
        </Link>
      </section>
    );
  }

  const localizedProject = getProjectCopy(locale, project);
  const links = [
    { href: project.githubUrl, label: getUi(locale, 'projects.githubRepo') },
    { href: project.demoUrl, label: getUi(locale, 'projects.liveDemo') },
    { href: project.backendHealthUrl, label: getUi(locale, 'projects.backendHealth') }
  ].filter((link) => Boolean(link.href));

  return (
    <section className="page">
      <p className="eyebrow">{localizedProject.category}</p>
      <h1>{project.title}</h1>
      <p className="lead">{localizedProject.summary}</p>

      <div className="detail-grid">
        <article className="panel detail-main">
          <DetailSection title={getUi(locale, 'projects.projectType')} content={localizedProject.projectType} />
          <DetailSection
            title={getUi(locale, 'projects.myContribution')}
            content={localizedProject.myContribution}
          />
          <DetailSection title={getUi(locale, 'projects.problem')} content={localizedProject.problem} />
          <DetailSection title={getUi(locale, 'projects.whatBuilt')} content={localizedProject.whatBuilt} />
          <DetailSection title={getUi(locale, 'projects.dataMethods')} content={localizedProject.dataMethods} />
          <DetailSection
            title={getUi(locale, 'projects.engineeringHighlights')}
            content={localizedProject.engineeringHighlights}
          />
          <DetailSection title={getUi(locale, 'projects.results')} content={localizedProject.results} />
          <DetailSection title={getUi(locale, 'projects.limitations')} content={localizedProject.limitations} />
          <DetailSection title={getUi(locale, 'projects.nextSteps')} content={localizedProject.nextSteps} />
          <DetailSection
            title={getUi(locale, 'projects.reproducibility')}
            content={localizedProject.reproducibility}
          />
        </article>

        <aside className="panel detail-side">
          <TagSection
            title={getUi(locale, 'projects.capabilities')}
            sectionKey="capabilities"
            items={getProjectTagLabels(project, 'capabilities')}
            onTagClick={handleTagClick}
            activeTag={activeTag}
          />
          <TagSection
            title={getUi(locale, 'projects.technologies')}
            sectionKey="technologies"
            items={getProjectTagLabels(project, 'technologies')}
            onTagClick={handleTagClick}
            activeTag={activeTag}
          />
          <TagSection
            title={getUi(locale, 'projects.foundations')}
            sectionKey="foundations"
            items={getProjectTagLabels(project, 'foundations')}
            onTagClick={handleTagClick}
            activeTag={activeTag}
          />

          <h2>{getUi(locale, 'projects.links')}</h2>
          <div className="stack-links">
            {links.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>

          <h2>{getUi(locale, 'projects.status')}</h2>
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
  const { locale } = useLocale();
  const { activeTag, activeProjects, handleTagClick, closeTag } = useTagMatchesModal();

  return (
    <section className="page">
      <h1>{getUi(locale, 'skills.title')}</h1>

      <div className="skill-grid">
        <SkillSection
          title={getUi(locale, 'skills.capabilities')}
          groups={capabilities}
          sectionKey="capabilities"
          onTagClick={handleTagClick}
          activeTag={activeTag}
        />
        <SkillSection
          title={getUi(locale, 'skills.technologies')}
          groups={technologies}
          sectionKey="technologies"
          onTagClick={handleTagClick}
          activeTag={activeTag}
        />
        <SkillSection
          title={getUi(locale, 'skills.foundations')}
          groups={foundations}
          sectionKey="foundations"
          onTagClick={handleTagClick}
          activeTag={activeTag}
        />
      </div>

      <div className="one-col">
        <div className="panel">
          <h2>{getUi(locale, 'skills.taxonomy')}</h2>
          <ul className="list skill-taxonomy-list">
            <li>
              <span className="skill-taxonomy-term">{getUi(locale, 'skills.capabilities')}</span>
              <span className="skill-taxonomy-desc">{getUi(locale, 'skills.capabilitiesDesc')}</span>
            </li>
            <li>
              <span className="skill-taxonomy-term">{getUi(locale, 'skills.technologies')}</span>
              <span className="skill-taxonomy-desc">{getUi(locale, 'skills.technologiesDesc')}</span>
            </li>
            <li>
              <span className="skill-taxonomy-term">{getUi(locale, 'skills.foundations')}</span>
              <span className="skill-taxonomy-desc">{getUi(locale, 'skills.foundationsDesc')}</span>
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
  const { locale } = useLocale();
  const localizedContact = getContact(locale);

  return (
    <section className="page">
      <h1>{getUi(locale, 'contact.title')}</h1>

      <div className="two-col">
        <div className="panel">
          <h2>{getUi(locale, 'contact.reachMe')}</h2>
          <ul className="list">
            {localizedContact.email ? (
              <li>
                {getUi(locale, 'contact.email')}:{' '}
                <a href={`mailto:${localizedContact.email}`}>{localizedContact.email}</a>
              </li>
            ) : null}
            {localizedContact.github ? (
              <li>
                {getUi(locale, 'contact.github')}: <a href={localizedContact.github}>{localizedContact.github}</a>
              </li>
            ) : null}
            {localizedContact.linkedin ? (
              <li>
                {getUi(locale, 'contact.linkedin')}:{' '}
                <a href={localizedContact.linkedin}>{localizedContact.linkedin}</a>
              </li>
            ) : null}
          </ul>
        </div>
        {hasItems(localizedContact.openTo) ? (
          <div className="panel">
            <h2>{getUi(locale, 'contact.openTo')}</h2>
            <ul className="list">
              {localizedContact.openTo.map((item) => (
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
  const { locale } = useLocale();

  return (
    <section className="page">
      <h1>{getUi(locale, 'notFound.title')}</h1>
      <p className="lead">{getUi(locale, 'notFound.lead')}</p>
      <Link className="button primary" to="/">
        {getUi(locale, 'notFound.goHome')}
      </Link>
    </section>
  );
}

function ProjectCard({ project }) {
  const { locale } = useLocale();
  const localizedProject = getProjectCopy(locale, project);
  const navigate = useNavigate();
  const { activeTag, activeProjects, handleTagClick, closeTag } = useTagMatchesModal();

  const shouldIgnoreCardNavigation = (event) =>
    Boolean(event.target.closest('button, a, .tags, .mini-section'));

  const openProject = () => {
    navigate(`/projects/${project.slug}`);
  };

  return (
    <article
      className="card card-clickable"
      role="link"
      tabIndex={0}
      onClick={(event) => {
        if (shouldIgnoreCardNavigation(event)) {
          return;
        }

        openProject();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openProject();
        }
      }}
      aria-label={getUi(locale, 'aria.openProject')(project.title)}
    >
      <div className="card-head">
        <span className="chip">{localizedProject.category}</span>
        <span className="status">{project.status}</span>
      </div>
      <h3>{project.title}</h3>
      <p>{localizedProject.summary}</p>
      <TagSection
        title={getUi(locale, 'projects.technologies')}
        sectionKey="technologies"
        items={getProjectTagLabels(project, 'technologies').slice(0, 4)}
        compact
        onTagClick={handleTagClick}
        activeTag={activeTag}
        stopEventPropagation
      />
      <TagSection
        title={getUi(locale, 'projects.capabilities')}
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
  const { locale } = useLocale();

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
                event.preventDefault();
                event.stopPropagation();
              }
              onTagClick(sectionKey, item);
            }}
            aria-haspopup="dialog"
            aria-pressed={isActive}
            aria-label={getUi(locale, 'aria.showProjectsWith')(item)}
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
  const { locale } = useLocale();
  const closeButtonRef = useRef(null);
  const lastFocusedElementRef = useRef(null);
  const projectCountLabel = getUi(locale, 'modal.projectCount');

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
    if (event.target !== event.currentTarget) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    window.setTimeout(() => onClose(), 0);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    onClose();
  };

  return createPortal(
    <div className="modal-backdrop" onClick={handleBackdropClick} onMouseDown={(event) => event.stopPropagation()}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tag-projects-title"
        aria-describedby="tag-projects-summary"
        onClick={(event) => event.stopPropagation()}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">{getUi(locale, 'modal.tagMatches')}</p>
            <h2 id="tag-projects-title">{tag}</h2>
            <p id="tag-projects-summary" className="modal-summary">
              {sectionTitle} · {projectCountLabel(projects.length)}
            </p>
          </div>
          <button ref={closeButtonRef} type="button" className="modal-close" onClick={handleClose}>
            {getUi(locale, 'modal.close')}
          </button>
        </div>

        {projects.length ? (
          <ul className="modal-list">
            {projects.map((project) => {
              const localizedProject = getProjectCopy(locale, project);

              return (
                <li key={project.slug} className="modal-item">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{localizedProject.category}</p>
                  </div>
                  <Link className="text-link modal-link" to={`/projects/${project.slug}`}>
                    {getUi(locale, 'modal.viewProject')}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="modal-empty">{getUi(locale, 'modal.noMatches')}</p>
        )}
      </div>
    </div>,
    document.body
  );
}

function SkillSection({ title, groups, sectionKey, onTagClick, activeTag }) {
  const { locale } = useLocale();

  if (!groups.length) {
    return null;
  }

  return (
    <article className="panel">
      <h2>{title}</h2>
      <div className="skill-groups">
        {groups.map((group) => (
          <section key={group.group} className="skill-group">
            <h3>{getGroupTitle(locale, group.group)}</h3>
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
