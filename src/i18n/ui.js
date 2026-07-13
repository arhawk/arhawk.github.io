export const ui = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      resume: 'Resume',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact'
    },
    langSwitch: {
      en: 'EN',
      zh: '中文',
      label: 'Language'
    },
    home: {
      viewProjects: 'View Projects',
      resume: 'Resume',
      contact: 'Contact',
      quickProfile: 'Quick Profile',
      location: 'Location',
      targetRoles: 'Target roles',
      currentFocus: 'Current Focus',
      workingStyle: 'Working Style',
      browseProjects: 'Browse projects'
    },
    about: {
      title: 'About',
      background: 'Background',
      howIWork: 'How I work',
      stillLearning: 'What I am still learning'
    },
    resume: {
      title: 'Resume',
      downloadPdf: 'Download PDF',
      downloadLatex: 'Download LaTeX',
      exportNote: 'Downloaded PDF / LaTeX are the official English resume.',
      professionalSummary: 'Professional Summary',
      professionalStrengths: 'Professional Strengths',
      education: 'Education',
      technicalFocus: 'Technical Focus',
      projectExperience: 'Project Experience',
      skills: 'Skills',
      experience: 'Experience',
      certificates: 'Certificates',
      publications: 'Publications',
      competitions: 'Competitions',
      link: 'Link'
    },
    projects: {
      title: 'Projects',
      notFound: 'Project not found',
      notFoundLead: 'That project page does not exist.',
      backToProjects: 'Back to Projects',
      projectType: 'Project Type',
      myContribution: 'My Contribution',
      problem: 'Problem',
      whatBuilt: 'What I Built',
      dataMethods: 'Data & Methods',
      engineeringHighlights: 'Engineering Highlights',
      results: 'Results',
      limitations: 'Limitations',
      nextSteps: 'Next Steps',
      reproducibility: 'Reproducibility',
      capabilities: 'Capabilities',
      technologies: 'Technologies',
      foundations: 'Foundations',
      links: 'Links',
      status: 'Status',
      githubRepo: 'GitHub repo',
      liveDemo: 'Live demo',
      backendHealth: 'Backend health'
    },
    skills: {
      title: 'Skills',
      capabilities: 'Capabilities',
      technologies: 'Technologies',
      foundations: 'Foundations',
      taxonomy: 'Skill taxonomy',
      capabilitiesDesc: 'competencies supported by project evidence.',
      technologiesDesc: 'tools and platforms used in delivery.',
      foundationsDesc: 'core concepts and theory demonstrated in the work.'
    },
    contact: {
      title: 'Contact',
      reachMe: 'Reach me at',
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      openTo: 'What I am open to'
    },
    notFound: {
      title: 'Page not found',
      lead: 'Use the navigation to return to the portfolio.',
      goHome: 'Go Home'
    },
    modal: {
      tagMatches: 'Tag matches',
      close: 'Close',
      viewProject: 'View project',
      noMatches: 'No projects matched this tag.',
      projectCount: (count) => `${count} project${count === 1 ? '' : 's'}`
    },
    aria: {
      openProject: (title) => `Open ${title} project details`,
      showProjectsWith: (tag) => `Show projects with ${tag}`,
      switchToEn: 'Switch to English',
      switchToZh: 'Switch to Chinese'
    }
  },
  zh: {
    nav: {
      home: '首页',
      about: '关于',
      resume: '简历',
      projects: '项目',
      skills: '技能',
      contact: '联系'
    },
    langSwitch: {
      en: 'EN',
      zh: '中文',
      label: '语言'
    },
    home: {
      viewProjects: '看项目',
      resume: '简历',
      contact: '联系我',
      quickProfile: '快速了解',
      location: '所在地',
      targetRoles: '目标岗位',
      currentFocus: '当前方向',
      workingStyle: '工作风格',
      browseProjects: '浏览全部项目'
    },
    about: {
      title: '关于我',
      background: '背景',
      howIWork: '我怎么工作',
      stillLearning: '还在提升'
    },
    resume: {
      title: '简历',
      downloadPdf: '下载 PDF',
      downloadLatex: '下载 LaTeX',
      exportNote: '下载的 PDF / LaTeX 为英文正式版简历。',
      professionalSummary: '个人简介',
      professionalStrengths: '核心优势',
      education: '教育背景',
      technicalFocus: '技术方向',
      projectExperience: '项目经历',
      skills: '技能',
      experience: '工作经历',
      certificates: '证书',
      publications: '发表',
      competitions: '竞赛',
      link: '链接'
    },
    projects: {
      title: '项目',
      notFound: '项目不存在',
      notFoundLead: '找不到这个项目页面。',
      backToProjects: '返回项目列表',
      projectType: '项目类型',
      myContribution: '我的贡献',
      problem: '要解决的问题',
      whatBuilt: '做了什么',
      dataMethods: '数据与方法',
      engineeringHighlights: '工程亮点',
      results: '结果',
      limitations: '局限',
      nextSteps: '下一步',
      reproducibility: '如何复现',
      capabilities: 'Capabilities',
      technologies: 'Technologies',
      foundations: 'Foundations',
      links: '相关链接',
      status: '状态',
      githubRepo: 'GitHub 仓库',
      liveDemo: '在线演示',
      backendHealth: '后端健康检查'
    },
    skills: {
      title: '技能',
      capabilities: 'Capabilities',
      technologies: 'Technologies',
      foundations: 'Foundations',
      taxonomy: '分类说明',
      capabilitiesDesc: '有项目作品支撑的能力。',
      technologiesDesc: '实际交付里用过的工具和平台。',
      foundationsDesc: '作品里体现的基础概念和理论。'
    },
    contact: {
      title: '联系',
      reachMe: '怎么联系我',
      email: '邮箱',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      openTo: '我在找什么机会'
    },
    notFound: {
      title: '页面不存在',
      lead: '请用导航栏回到作品集。',
      goHome: '回首页'
    },
    modal: {
      tagMatches: '相关项目',
      close: '关闭',
      viewProject: '查看项目',
      noMatches: '没有项目带这个标签。',
      projectCount: (count) => `${count} 个项目`
    },
    aria: {
      openProject: (title) => `打开 ${title} 项目详情`,
      showProjectsWith: (tag) => `查看带 ${tag} 标签的项目`,
      switchToEn: '切换到英文',
      switchToZh: '切换到中文'
    }
  }
};

const getByPath = (object, path) =>
  path.split('.').reduce((current, key) => current?.[key], object);

export const getUi = (locale, path) => {
  const value = getByPath(ui[locale], path) ?? getByPath(ui.en, path);

  if (typeof value === 'function') {
    return value;
  }

  return value ?? path;
};
