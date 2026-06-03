import projects from '../data/projects.json';

const grid = document.getElementById('case-studies-grid');

if (grid) {
  projects.forEach(project => {
    const card = document.createElement('article');
    card.classList.add('project-card');

    if (project.type === 'flagship') {
      card.classList.add('project-card--flagship');
    }

    // Assign role type for CSS styling
    card.dataset.roleType = project.roleType || 'default';

    card.innerHTML = `
      <div class="project-card__visual" style="background: ${project.visualStyle}">
        ${project.type === 'flagship' ? '<span class="badge badge--flagship">Flagship Project</span>' : ''}
      </div>
      <div class="project-card__content">
        <div class="project-card__meta">
            <span class="project-card__role">${project.role}</span>
        </div>
        <h3 class="project-card__title">${project.title}</h3>
        <p class="project-card__focus">${project.focus}</p>
        <p class="project-card__summary">${project.summary}</p>
        <div class="project-card__tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
      <div class="project-card__actions">
        <a href="${project.link}" class="link-case-study">Read Case Study <span class="arrow">&rarr;</span></a>
      </div>
    `;

    grid.appendChild(card);
  });
}

// Page load transition
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-loaded');
});

// Scroll animation observer for fade-in elements
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

setTimeout(() => {
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}, 100);
