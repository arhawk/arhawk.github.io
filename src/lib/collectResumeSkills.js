import { getProjectTagLabels } from '../data/projects';
import { hasItems } from './hasItems';

export const collectResumeSkillLabels = (projects) => {
  const labels = new Set();

  for (const project of projects) {
    for (const label of getProjectTagLabels(project, 'technologies')) {
      labels.add(label);
    }
  }

  return [...labels].sort((a, b) => a.localeCompare(b));
};

export const getProjectResumeBullets = (project) => {
  if (hasItems(project.resumeBullets)) {
    return project.resumeBullets;
  }

  return [project.myContribution, project.results].filter(Boolean);
};
