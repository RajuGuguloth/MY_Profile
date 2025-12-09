// ---------------------------
// Theme Toggle with localStorage
// ---------------------------
const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const storedTheme = localStorage.getItem('theme-preference');
if (storedTheme === 'dark') body.classList.add('dark');
if (storedTheme === 'light') body.classList.remove('dark');

const setTheme = () => {
  const isDark = body.classList.toggle('dark');
  localStorage.setItem('theme-preference', isDark ? 'dark' : 'light');
};

themeToggle.addEventListener('click', setTheme);

// ---------------------------
// Mobile nav toggle
// ---------------------------
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
navLinks.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-link')) {
    navLinks.classList.remove('open');
  }
});

// ---------------------------
// Smooth active link highlighting
// ---------------------------
const sections = document.querySelectorAll('section');
const navLinkElements = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinkElements.forEach((link) => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach((section) => observer.observe(section));

// ---------------------------
// Scroll reveal animations
// ---------------------------
const animatedEls = document.querySelectorAll('[data-animate]');
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

animatedEls.forEach((el) => revealObserver.observe(el));

// ---------------------------
// Typewriter effect (hero subheading)
// ---------------------------
const roles = [
  'Data Scientist',
  'Machine Learning Engineer',
  'Deep Learning Enthusiast',
  'NLP Practitioner',
];
const typeTarget = document.getElementById('typewriter');
let roleIndex = 0;
let charIndex = 0;
let typing = true;

const type = () => {
  const current = roles[roleIndex % roles.length];
  if (typing) {
    charIndex++;
    if (charIndex === current.length + 1) {
      typing = false;
      setTimeout(type, 1200);
      return;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      typing = true;
      roleIndex++;
    }
  }
  typeTarget.textContent = `${current.slice(0, charIndex)}${typing ? '|' : ''}`;
  setTimeout(type, typing ? 90 : 40);
};
type();

// ---------------------------
// Project data from GitHub (live)
// ---------------------------
const projectGrid = document.getElementById('project-grid');
const githubUser = 'RajuGuguloth';
const keywords = [
  'data',
  'science',
  'ml',
  'machine',
  'learning',
  'ai',
  'deep',
  'vision',
  'nlp',
  'cloud',
  'pytorch',
  'tensorflow',
  'forecast',
  'predict',
  'model',
  'analysis',
];

const accents = ['#22d3ee', '#a78bfa', '#f472b6', '#34d399', '#f59e0b', '#60a5fa', '#7dd3fc'];

const isRelevantRepo = (repo) => {
  const text = `${repo.name} ${repo.description || ''} ${(repo.topics || []).join(' ')}`.toLowerCase();
  return keywords.some((kw) => text.includes(kw));
};

const thumbTemplates = [
  `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="18" width="176" height="124" rx="18" fill="rgba(255,255,255,0.08)" stroke="currentColor" stroke-width="4"/>
    <polyline points="20,110 60,70 100,90 140,40 180,70" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="60" cy="70" r="7" fill="currentColor"/>
    <circle cx="140" cy="40" r="7" fill="currentColor"/>
  </svg>`,
  `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="20" width="168" height="120" rx="18" fill="rgba(255,255,255,0.08)" stroke="currentColor" stroke-width="4"/>
    <path d="M40 120 C60 60, 140 60, 160 120" stroke="currentColor" stroke-width="6" fill="none"/>
    <rect x="60" y="60" width="30" height="20" rx="6" fill="currentColor" opacity="0.2"/>
    <rect x="110" y="60" width="30" height="20" rx="6" fill="currentColor" opacity="0.2"/>
  </svg>`,
  `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="24" width="160" height="112" rx="18" fill="rgba(255,255,255,0.08)" stroke="currentColor" stroke-width="4"/>
    <polygon points="40,120 80,60 110,100 150,40 170,120" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/>
    <circle cx="110" cy="100" r="7" fill="currentColor"/>
  </svg>`,
  `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="20" width="168" height="120" rx="18" fill="rgba(255,255,255,0.08)" stroke="currentColor" stroke-width="4"/>
    <rect x="40" y="90" width="30" height="40" rx="8" fill="currentColor" opacity="0.7"/>
    <rect x="90" y="70" width="30" height="60" rx="8" fill="currentColor" opacity="0.9"/>
    <rect x="140" y="50" width="30" height="80" rx="8" fill="currentColor" opacity="0.5"/>
    <path d="M36 60 Q80 20 164 60" stroke="currentColor" stroke-width="6" fill="none" stroke-linecap="round"/>
  </svg>`,
];

const makeThumbSVG = (accent, index) => thumbTemplates[index % thumbTemplates.length];

const renderRepoCard = (repo, index) => {
  const card = document.createElement('article');
  card.className = 'card glass project-card';
  card.dataset.animate = '';

  const thumb = document.createElement('div');
  thumb.className = 'thumb gradient';
  thumb.style.color = accents[index % accents.length];
  thumb.innerHTML = makeThumbSVG(accents[index % accents.length], index);

  const title = document.createElement('h4');
  title.textContent = repo.name.replace(/-/g, ' ');

  const desc = document.createElement('p');
  desc.textContent = repo.description || 'GitHub project focused on data, ML, AI, or cloud.';

  const badges = document.createElement('div');
  badges.className = 'badge-row';
  (repo.topics || []).slice(0, 4).forEach((topic) => {
    const span = document.createElement('span');
    span.className = 'badge';
    span.textContent = topic;
    badges.appendChild(span);
  });
  const language = repo.language;
  if (language) {
    const span = document.createElement('span');
    span.className = 'badge';
    span.textContent = language;
    badges.appendChild(span);
  }

  const actions = document.createElement('div');
  actions.className = 'card-actions';
  const repoLink = document.createElement('a');
  repoLink.href = repo.html_url;
  repoLink.target = '_blank';
  repoLink.rel = 'noopener';
  repoLink.textContent = 'View on GitHub';
  actions.appendChild(repoLink);

  card.append(thumb, title, desc, badges, actions);
  projectGrid.appendChild(card);
  revealObserver.observe(card);
};

const loadRepos = async () => {
  projectGrid.innerHTML = '<p>Loading repositories…</p>';
  try {
    const res = await fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100&sort=updated`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const repos = await res.json();
    const seen = new Set();
    const relevant = repos
      .filter(isRelevantRepo)
      .filter((repo) => {
        const norm = repo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        if (seen.has(norm)) return false;
        // avoid duplicate sentiment projects
        if (norm.includes('sentiment') && seen.has('sentiment')) return false;
        seen.add(norm);
        if (norm.includes('sentiment')) seen.add('sentiment');
        return true;
      })
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
    projectGrid.innerHTML = '';
    if (!relevant.length) {
      projectGrid.innerHTML = '<p>No relevant repositories found. Please add data/ML/AI/cloud keywords to repo descriptions.</p>';
      return;
    }
    relevant.forEach((repo, idx) => renderRepoCard(repo, idx));
  } catch (err) {
    console.error(err);
    projectGrid.innerHTML = `
      <p>Unable to load repositories right now. GitHub rate limits may apply.</p>
      <p>Please refresh or check network connectivity.</p>
    `;
  }
};

loadRepos();

// ---------------------------
// Blog data (sample stories)
// ---------------------------
const blogPosts = [
  {
    title: 'How I Prepared for My Data Science Internship',
    excerpt: 'Curriculum design, portfolio projects, and reproducibility tips that helped me land ML internship offers.',
    body: `
      I focused on reproducible ML projects with clear READMEs, experiment tracking via W&B, and clean notebooks-to-scripts refactors.
      Practicing take-home assignments under time constraints helped me ship faster. I also reviewed statistics fundamentals and SQL.
    `,
    accent: '#22d3ee',
  },
  {
    title: 'Building a CNN from Scratch for Image Classification',
    excerpt: 'From dataloaders to training loops, here is how I iterated on a CNN for an iNaturalist-style dataset.',
    body: `
      I benchmarked vanilla CNNs, then fine-tuned ResNet variants. Key lessons: aggressive augmentation, cosine LR scheduling,
      and early-stop on macro-F1. Visualization of misclassifications guided label cleaning.
    `,
    accent: '#a78bfa',
  },
  {
    title: 'Roman to Devanagari: Sequence-to-Sequence NLP Project',
    excerpt: 'Sequence models with attention to map Roman script to Devanagari, plus evaluation choices for script accuracy.',
    body: `
      Tokenization choices mattered. I tried character-level seq2seq with Bahdanau attention and compared to Transformer baselines.
      CER and BLEU provided complementary signals. Inference used beam search with temperature scaling to balance accuracy and fluency.
    `,
    accent: '#f472b6',
  },
  {
    title: 'Using W&B for Experiment Tracking in Deep Learning',
    excerpt: 'Practical workflows for logging metrics, artifacts, and hyperparameter sweeps without slowing down iteration.',
    body: `
      I templated a logging helper, captured system metrics, and synced config to the UI. Sweeps with Bayesian search surfaced better
      learning rates quickly. Model cards summarizing metrics + caveats helped stakeholders understand trade-offs.
    `,
    accent: '#34d399',
  },
  {
    title: 'What I Learned from My First Industry ML Project',
    excerpt: 'Scoping, baselines, stakeholder check-ins, and the importance of clear acceptance criteria in ML projects.',
    body: `
      Starting with a rule-based baseline aligned expectations and revealed data quality gaps. Weekly demos with clear metrics
      (precision, recall, latency) kept the team aligned. Shipping small, testable increments beat large rewrites.
    `,
    accent: '#f59e0b',
  },
];

const blogGrid = document.getElementById('blog-grid');
const blogModal = document.getElementById('blog-modal');
const modalBody = blogModal.querySelector('.modal-body');
const modalClose = blogModal.querySelector('.modal-close');

blogPosts.forEach((post) => {
  const card = document.createElement('article');
  card.className = 'card glass blog-card';
  card.dataset.animate = '';

  const thumb = document.createElement('div');
  thumb.className = 'thumb gradient';
  thumb.style.color = post.accent;
  thumb.innerHTML = `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="20" width="180" height="100" rx="14" fill="rgba(255,255,255,0.1)" stroke="currentColor" stroke-width="4"/>
    <path d="M30 50 H170" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>
    <path d="M30 70 H150" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity="0.7"/>
    <path d="M30 90 H120" stroke="currentColor" stroke-width="6" stroke-linecap="round" opacity="0.5"/>
  </svg>`;

  const title = document.createElement('h4');
  title.textContent = post.title;

  const excerpt = document.createElement('p');
  excerpt.textContent = post.excerpt;

  const readMore = document.createElement('button');
  readMore.className = 'btn ghost';
  readMore.textContent = 'Read more';
  readMore.addEventListener('click', () => openBlog(post));

  card.append(thumb, title, excerpt, readMore);
  blogGrid.appendChild(card);
  revealObserver.observe(card);
});

const openBlog = (post) => {
  modalBody.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.body}</p>
  `;
  blogModal.classList.add('open');
  blogModal.setAttribute('aria-hidden', 'false');
};

modalClose.addEventListener('click', () => {
  blogModal.classList.remove('open');
  blogModal.setAttribute('aria-hidden', 'true');
});

blogModal.addEventListener('click', (e) => {
  if (e.target === blogModal) {
    blogModal.classList.remove('open');
    blogModal.setAttribute('aria-hidden', 'true');
  }
});

// ---------------------------
// Lightweight animated background
// ---------------------------
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
resize();
window.addEventListener('resize', resize);

const initParticles = () => {
  particles = Array.from({ length: 40 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
  }));
};
initParticles();

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(34, 211, 238, 0.5)';
    ctx.fill();
  });
  requestAnimationFrame(animate);
};
animate();

// ---------------------------
// Accessibility: close modal on Escape
// ---------------------------
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && blogModal.classList.contains('open')) {
    blogModal.classList.remove('open');
    blogModal.setAttribute('aria-hidden', 'true');
  }
});

