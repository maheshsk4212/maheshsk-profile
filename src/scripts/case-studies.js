import projects from '../data/projects.json';

const ACCESS_PASSWORD = 'mahesh-ux'; // Professional access password

function checkAuth() {
    document.body.classList.add('page-loaded');
    const isAuth = sessionStorage.getItem('case_study_auth') === 'true';
    const gateEl = document.getElementById('password-gate');
    
    if (isAuth) {
        document.body.classList.remove('body--locked');
        if (gateEl) gateEl.style.display = 'none';
        renderProjects();
    } else {
        document.body.classList.add('body--locked');
        if (gateEl) gateEl.style.display = 'flex';
        setupPasswordListener();
    }
}

function setupPasswordListener() {
    const form = document.getElementById('password-form');
    const input = document.getElementById('case-study-pass');
    const errorEl = document.getElementById('password-error');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (input.value === ACCESS_PASSWORD) {
                sessionStorage.setItem('case_study_auth', 'true');
                document.body.classList.remove('body--locked');
                const gateEl = document.getElementById('password-gate');
                if (gateEl) {
                    gateEl.style.opacity = '0';
                    setTimeout(() => {
                        gateEl.style.display = 'none';
                    }, 300);
                }
                renderProjects();
            } else {
                errorEl.textContent = 'Incorrect password. Please try again.';
                input.value = '';
                input.focus();
            }
        });
    }
}

function renderProjects() {
    const grid = document.getElementById('case-studies-grid');
    if (!grid) return;
    
    // Clear any loading indicator or existing content
    grid.innerHTML = '';
    
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

// Initial authentication check on load
checkAuth();
