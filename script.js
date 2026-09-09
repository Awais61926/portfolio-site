const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = [...document.querySelectorAll('.nav-links a:not(.nav-contact)')];
const sections = [...document.querySelectorAll('main section[id]')];
const projectGrid = document.querySelector('#project-grid');
const projectDetail = document.querySelector('#project-detail');
const filterButtons = [...document.querySelectorAll('.filter-chip')];
const roleButtons = [...document.querySelectorAll('.role-chip')];
const fitResult = document.querySelector('#fit-result');
const workflowButtons = [...document.querySelectorAll('.workflow-step')];
const workflowDisplay = document.querySelector('#workflow-display');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

// Contact details were placeholders in the supplied resume. Add a confirmed email
// here once available. A production launch should use a secure form endpoint.
const contactRecipient = 'Awais619261@gmail.com';

const projects = [
  {
    id: 'churn',
    category: ['ai', 'data'],
    tone: 'ai',
    label: 'AI & Machine Learning',
    title: 'Customer Churn Prediction',
    short: 'End-to-end bank customer churn classification with Random Forest.',
    description: 'Built an independent machine-learning workflow to predict whether a bank customer would exit. The work covered exploration, preprocessing, feature preparation, training, testing, and classification evaluation.',
    tools: ['Python', 'Pandas', 'Scikit-learn', 'Random Forest'],
    outcome: 'Classification workflow from exploration through evaluation.',
  },
  {
    id: 'order',
    category: ['ai', 'data'],
    tone: 'ai',
    label: 'Machine Learning',
    title: 'Order Prediction Application',
    short: 'Linear Regression for practical order forecasting.',
    description: 'Developed a supervised learning application that processes historical order data, trains a Linear Regression model, evaluates performance, and visualises regression results.',
    tools: ['Python', 'NumPy', 'Scikit-learn', 'Matplotlib'],
    outcome: 'Regression workflow with visualised model results.',
  },
  {
    id: 'warehouse',
    category: ['data'],
    tone: 'data',
    label: 'Data Engineering',
    title: 'SQL Data Warehouse',
    short: 'A CSV-to-warehouse ETL pipeline using Medallion Architecture.',
    description: 'Designed and implemented a structured SQL Data Warehouse with Bronze, Silver, and Gold layers. The project transformed raw CSV data into analytical datasets for downstream reporting and insights.',
    tools: ['SQL Server', 'SSMS', 'ETL', 'Medallion Architecture'],
    outcome: 'Structured raw CSV inputs into analytical warehouse layers.',
  },
  {
    id: 'ventures',
    category: ['data'],
    tone: 'data',
    label: 'SQL Analytics',
    title: '365 Ventures / 360 Store',
    short: 'Business analysis across 60,000+ sales records.',
    description: 'Performed SQL-based business analysis on a large retail transaction dataset, using filters, grouping, joins, aggregations, CASE statements, and date functions to identify patterns and generate actionable insights.',
    tools: ['SQL Server', 'DQL', 'Business Intelligence', '60,000+ records'],
    outcome: 'Business questions answered with reusable analytical queries.',
  },
  {
    id: 'adventureworks',
    category: ['data'],
    tone: 'systems',
    label: 'Data Analysis',
    title: 'AdventureWorks Analysis',
    short: 'Business-oriented SQL analysis across relational data.',
    description: 'Explored sales, product, customer, employee, and operational data in AdventureWorks. Applied joins, aggregation, filtering, subqueries, CTEs, and conditional logic to answer analytical business questions.',
    tools: ['AdventureWorks', 'SQL Server', 'CTEs', 'Analytics'],
    outcome: 'Relational data explored through business-focused SQL analysis.',
  },
  {
    id: 'lms',
    category: ['apps'],
    tone: 'apps',
    label: 'Mobile Application',
    title: 'Learning Management System',
    short: 'A mobile LMS with Firebase-backed course content and sessions.',
    description: 'Developed a React Native learning-management application with course content stored in Firestore, images in Firebase Storage, responsive screens, and session handling through AsyncStorage.',
    tools: ['React Native', 'Expo', 'Firebase', 'Firestore'],
    outcome: 'Mobile learning experience backed by cloud data and storage.',
  },
  {
    id: 'technest',
    category: ['apps'],
    tone: 'apps',
    label: 'Full-Stack Development',
    title: 'TechNest — MERN E-Commerce',
    short: 'Team-built e-commerce platform for technology accessories.',
    description: 'Contributed to frontend development, UI/UX, requirements and design documentation, UML diagrams, planning, and delivery within an incremental software-development process.',
    tools: ['MongoDB', 'Express', 'React', 'Node.js'],
    outcome: 'Frontend and product documentation contribution within a team build.',
  },
  {
    id: 'uikit',
    category: ['apps'],
    tone: 'systems',
    label: 'Mobile UI Development',
    title: 'Mobile UI Kit',
    short: 'Figma designs translated into reusable React Native interfaces.',
    description: 'Converted a mobile UI kit from Figma into responsive React Native components, with an emphasis on reusable elements, visual consistency, and a smooth mobile experience.',
    tools: ['React Native', 'Expo', 'Figma', 'UI Components'],
    outcome: 'Reusable mobile interfaces translated from a Figma UI kit.',
  },
];

const roleData = {
  ai: {
    kicker: 'Best fit: AI & Machine Learning',
    title: 'AI & ML work with a practical foundation.',
    copy: 'Current AI internship experience paired with independent classification and regression projects. Strongest when the role values a learner who can move through the full workflow, not just train a model.',
    focus: 'Python · Scikit-learn · Predictive modelling',
    evidence: 'Customer Churn Prediction and Order Prediction Application',
    projects: ['Customer Churn Prediction', 'Order Prediction Application'],
  },
  analytics: {
    kicker: 'Best fit: Data Analytics',
    title: 'Analysis that turns data into useful questions.',
    copy: 'SQL, data cleaning, exploratory analysis, visualisation, and business-oriented querying across retail and relational datasets.',
    focus: 'SQL · EDA · Data visualisation',
    evidence: '365 Ventures / 360 Store analysis across 60,000+ sales records',
    projects: ['365 Ventures / 360 Store', 'AdventureWorks Analysis'],
  },
  engineering: {
    kicker: 'Best fit: Data Engineering',
    title: 'Structured data foundations for reliable analysis.',
    copy: 'Experience designing a staged SQL warehouse pipeline, transforming raw CSV data, and preparing clean analytical datasets using a Medallion Architecture.',
    focus: 'SQL Server · ETL · Data warehousing',
    evidence: 'SQL Data Warehouse with Bronze, Silver, and Gold layers',
    projects: ['SQL Data Warehouse', 'AdventureWorks Analysis'],
  },
  apps: {
    kicker: 'Best fit: Apps & Web',
    title: 'Software foundations that support the data work.',
    copy: 'Software Engineering background with hands-on experience building mobile interfaces, integrating Firebase services, contributing to full-stack work, and testing product experiences.',
    focus: 'React Native · Firebase · MERN stack',
    evidence: 'Learning Management System and TechNest e-commerce platform',
    projects: ['Learning Management System', 'TechNest — MERN E-Commerce'],
  },
};

const workflowData = {
  explore: {
    number: '01 / Explore',
    title: 'Start by finding the signal.',
    copy: 'Load the data, understand its structure, inspect meaningful attributes, and frame the question before moving to a model or an analytical query.',
    skills: ['Pandas', 'NumPy', 'EDA', 'SQL'],
    evidence: 'Used during customer churn, order prediction, AdventureWorks, and retail analytics work.',
  },
  prepare: {
    number: '02 / Prepare',
    title: 'Turn raw inputs into dependable foundations.',
    copy: 'Clean data, shape features, apply transformations, and make the pipeline understandable enough for the next step to be trustworthy.',
    skills: ['Data cleaning', 'Preprocessing', 'ETL', 'Medallion Architecture'],
    evidence: 'Demonstrated in the SQL Data Warehouse and machine-learning projects.',
  },
  train: {
    number: '03 / Train',
    title: 'Choose a method that fits the question.',
    copy: 'Build supervised-learning workflows with the right model family for the task, from classification for churn to regression for order prediction.',
    skills: ['Scikit-learn', 'Random Forest', 'Linear Regression', 'Train / test split'],
    evidence: 'Applied in Customer Churn Prediction and Order Prediction Application.',
  },
  evaluate: {
    number: '04 / Evaluate',
    title: 'Check the result before trusting it.',
    copy: 'Evaluate model performance with suitable methods and review results in the context of the original problem—not only as an isolated output.',
    skills: ['Classification metrics', 'Regression evaluation', 'Validation', 'Analysis'],
    evidence: 'Part of the end-to-end workflows developed during AI and ML practice.',
  },
  communicate: {
    number: '05 / Communicate',
    title: 'Make the answer useful to people.',
    copy: 'Use clear queries, visualisations, dashboards, and straightforward narratives so an insight is easier to act on and share.',
    skills: ['Matplotlib', 'Plotly', 'Streamlit', 'SQL reporting'],
    evidence: 'Used across sales analysis, regression visualisation, and data-driven project work.',
  },
};

let activeProjectId = 'churn';
let activeFilter = 'all';

function renderProjectDetail(project) {
  projectDetail.innerHTML = `
    <div class="detail-index">PROJECT ${String(projects.indexOf(project) + 1).padStart(2, '0')} / ${project.label}</div>
    <div class="detail-copy">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    </div>
    <div class="detail-stack">
      <p class="detail-outcome">${project.outcome}</p>
      <p class="detail-tools-label">Tools &amp; methods</p>
      <div>${project.tools.map((tool) => `<b>${tool}</b>`).join('')}</div>
    </div>
  `;
}

function renderProjectGrid() {
  const visibleProjects = projects.filter((project) => activeFilter === 'all' || project.category.includes(activeFilter));

  if (!visibleProjects.some((project) => project.id === activeProjectId)) {
    activeProjectId = visibleProjects[0].id;
  }

  projectGrid.innerHTML = visibleProjects.map((project) => {
    const index = String(projects.indexOf(project) + 1).padStart(2, '0');
    const isSelected = project.id === activeProjectId;
    return `
      <button class="project-card tone-${project.tone}${isSelected ? ' is-selected' : ''}" type="button" data-project="${project.id}" aria-pressed="${isSelected}">
        <span class="card-index">${index} / 08</span>
        <span class="card-category">${project.label}</span>
        <h3>${project.title}</h3>
        <p>${project.short}</p>
        <span class="card-tags">${project.tools.slice(0, 2).map((tool) => `<b>${tool}</b>`).join('')}</span>
      </button>
    `;
  }).join('');

  renderProjectDetail(projects.find((project) => project.id === activeProjectId));
}

function renderFit(role) {
  const data = roleData[role];
  fitResult.innerHTML = `
    <p class="fit-kicker">${data.kicker}</p>
    <h3>${data.title}</h3>
    <p class="fit-copy">${data.copy}</p>
    <div class="fit-evidence">
      <div><span>Core focus</span><strong>${data.focus}</strong></div>
      <div><span>Portfolio evidence</span><strong>${data.evidence}</strong></div>
    </div>
    <div class="fit-projects">${data.projects.map((project) => `<b>${project}</b>`).join('')}</div>
  `;
}

function renderWorkflow(step) {
  const data = workflowData[step];
  workflowDisplay.innerHTML = `
    <p class="workflow-number">${data.number}</p>
    <h3>${data.title}</h3>
    <p class="workflow-copy">${data.copy}</p>
    <div class="workflow-bottom">
      <div><span>Skills in play</span><p class="workflow-skills">${data.skills.map((skill) => `<b>${skill}</b>`).join('')}</p></div>
      <div><span>Evidence</span><p>${data.evidence}</p></div>
    </div>
  `;
}

document.querySelector('#year').textContent = new Date().getFullYear();

// Social/contact links
const socialLinks = {
  email: 'mailto:Awais619261@gmail.com',
  phone: 'tel:+923329979920',
  linkedin: 'https://www.linkedin.com/in/muhammad-awais-8833b928',
  github: 'https://github.com/Awais61926',
};

document.querySelectorAll('[data-social]').forEach((link) => {
  const target = socialLinks[link.dataset.social];
  if (target) link.href = target;
});

// Animated metric counters for the recruiter snapshot.
const metricCounters = document.querySelectorAll('[data-count]');
metricCounters.forEach((counter) => {
  const target = Number(counter.dataset.count);
  if (!Number.isFinite(target)) return;

  const animateCounter = () => {
    const duration = 900;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(target * eased).toString().padStart(2, '0');
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      animateCounter();
      observer.disconnect();
    }
  }, { threshold: 0.6 });

  counterObserver.observe(counter);
});

renderProjectGrid();
renderFit('ai');
renderWorkflow('explore');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navLinks.classList.toggle('is-open', !isOpen);
});

navLinks?.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    menuButton?.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-open');
  }
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle('is-selected', isSelected);
      item.setAttribute('aria-pressed', String(isSelected));
    });
    renderProjectGrid();
  });
});

projectGrid?.addEventListener('click', (event) => {
  const card = event.target.closest('[data-project]');
  if (!card) return;
  activeProjectId = card.dataset.project;
  renderProjectGrid();
});

roleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    roleButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle('is-selected', isSelected);
      item.setAttribute('aria-selected', String(isSelected));
    });
    renderFit(button.dataset.role);
  });
});

workflowButtons.forEach((button) => {
  button.addEventListener('click', () => {
    workflowButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle('is-selected', isSelected);
      item.setAttribute('aria-selected', String(isSelected));
    });
    renderWorkflow(button.dataset.step);
  });
});

document.querySelectorAll('.journey-item > button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.journey-item');
    const shouldOpen = !item.classList.contains('is-open');
    document.querySelectorAll('.journey-item').forEach((journeyItem) => {
      journeyItem.classList.remove('is-open');
      journeyItem.querySelector('button').setAttribute('aria-expanded', 'false');
    });
    if (shouldOpen) {
      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const active = entries.find((entry) => entry.isIntersecting);
    if (!active) return;
    navItems.forEach((item) => {
      item.classList.toggle('is-active', item.getAttribute('href') === `#${active.target.id}`);
    });
  },
  { rootMargin: '-30% 0px -60% 0px' }
);

sections.forEach((section) => sectionObserver.observe(section));

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('pointermove', (event) => {
    document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
  }, { passive: true });
}

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  if (!contactRecipient) {
    formStatus.textContent = 'Direct contact delivery will be enabled when the verified email address is added.';
    return;
  }

  const formData = new FormData(contactForm);
  const subject = `${formData.get('project-type')} inquiry from ${formData.get('name')}`;
  const body = [
    `Name: ${formData.get('name')}`,
    `Email: ${formData.get('email')}`,
    `Topic: ${formData.get('project-type')}`,
    '',
    formData.get('message'),
  ].join('\n');

  window.location.href = `mailto:${encodeURIComponent(contactRecipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  formStatus.textContent = 'Your email app is opening with the inquiry.';
});


// Lightweight recruiter engagement helpers
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
progressBar.setAttribute('aria-hidden', 'true');
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}, { passive: true });

// Give project cards a subtle 3D response without affecting reduced-motion users.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  projectGrid?.addEventListener('pointermove', (event) => {
    const card = event.target.closest('.project-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 4;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -4;
    card.style.setProperty('--tilt-x', `${y}deg`);
    card.style.setProperty('--tilt-y', `${x}deg`);
  });
  projectGrid?.addEventListener('pointerout', (event) => {
    const card = event.target.closest('.project-card');
    if (!card) return;
    card.style.removeProperty('--tilt-x');
    card.style.removeProperty('--tilt-y');
  });
}


// ============================================================
// Premium portfolio interactions
// ============================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth anchor scrolling with a small offset for the sticky header.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const id = anchor.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;

    event.preventDefault();
    const header = document.querySelector('header');
    const offset = (header?.offsetHeight || 0) + 18;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  });
});

// Add a small magnetic lift to primary action buttons.
if (!prefersReducedMotion) {
  document.querySelectorAll('.hero-actions a, .contact-form button, .nav-contact, .nav-resume').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.08;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.08;
      element.style.transform = `translate(${x}px, ${y}px)`;
    });

    element.addEventListener('pointerleave', () => {
      element.style.transform = '';
    });
  });
}

// Give contact cards a gentle spotlight that follows the pointer.
if (!prefersReducedMotion) {
  document.querySelectorAll('.connect-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
    });
  });
}

// Keep the scroll-progress indicator correct after dynamic layout changes.
window.addEventListener('resize', () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}, { passive: true });
