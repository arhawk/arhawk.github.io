import { about } from '../data/about';
import { contact } from '../data/contact';
import { aboutZh } from '../data/zh/about';
import { contactZh } from '../data/zh/contact';
import { projectCopyZh } from '../data/zh/projects';
import { groupTitlesZh } from './groupTitles.zh';

const PROJECT_COPY_FIELDS = [
  'category',
  'summary',
  'problem',
  'whatBuilt',
  'dataMethods',
  'results',
  'limitations',
  'nextSteps',
  'reproducibility',
  'projectType',
  'myContribution',
  'engineeringHighlights'
];

export const getDisplayName = (locale) => (locale === 'zh' ? aboutZh.nameZh : about.name);

export const getAbout = (locale) => {
  if (locale === 'en') {
    return about;
  }

  return {
    ...about,
    title: aboutZh.title,
    location: aboutZh.location,
    summary: aboutZh.summary,
    about: aboutZh.about,
    uniqueStrengths: aboutZh.uniqueStrengths,
    summaryPoints: aboutZh.summaryPoints,
    technicalFocus: aboutZh.technicalFocus,
    education: about.education.map((item, index) => ({
      ...item,
      title: aboutZh.education[index]?.title ?? item.title,
      notes: aboutZh.education[index]?.notes ?? item.notes,
      highlights: aboutZh.education[index]?.highlights ?? item.highlights
    })),
    home: {
      ...about.home,
      headline: aboutZh.home.headline,
      lead: aboutZh.home.lead,
      quickProfile: aboutZh.home.quickProfile,
      whyMe: aboutZh.home.whyMe,
      selectedWork: {
        ...about.home.selectedWork,
        title: aboutZh.home.selectedWork.title
      }
    },
    aboutPage: aboutZh.aboutPage
  };
};

export const getContact = (locale) => {
  if (locale === 'en') {
    return contact;
  }

  return {
    ...contact,
    openTo: contactZh.openTo
  };
};

export const getProjectCopy = (locale, project) => {
  if (locale === 'en') {
    return project;
  }

  const zhCopy = projectCopyZh[project.slug];

  if (!zhCopy) {
    return project;
  }

  const localized = { ...project };

  for (const field of PROJECT_COPY_FIELDS) {
    if (zhCopy[field]) {
      localized[field] = zhCopy[field];
    }
  }

  return localized;
};

export const getGroupTitle = (locale, groupKey) => {
  if (locale === 'en') {
    return groupKey;
  }

  return groupTitlesZh[groupKey] ?? groupKey;
};
