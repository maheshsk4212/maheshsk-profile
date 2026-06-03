import projects from '../data/projects.json';

const params = new URLSearchParams(window.location.search);
const projectId = parseInt(params.get('id'));
const project = projects.find(p => p.id === projectId);

if (project) {
    document.title = `${project.title} | Case Study — Mahesh SK`;

    // ── Hero Title & Subtitle ─────────────────────────────────────────────────
    document.getElementById('project-title').textContent = project.title;
    const subtitleEl = document.getElementById('project-subtitle');
    if (subtitleEl && project.subtitle) subtitleEl.textContent = project.subtitle;

    // ── Summary Grid ──────────────────────────────────────────────────────────
    const summaryData = {
        Client:   project.client   || project.title.split('–')[0].trim(),
        Country:  project.country  || 'Global',
        Platform: project.platform || 'Web / Mobile',
        Role:     project.role,
        Duration: project.duration || '12 Months',
        ...(project.team ? { Team: project.team } : {})
    };

    const summaryHTML = `
        <div class="summary-grid">
            ${Object.entries(summaryData).map(([key, value]) => `
                <div class="summary-item">
                    <span class="summary-label">${key}</span>
                    <span class="summary-value">${value}</span>
                </div>
            `).join('')}
        </div>
        ${project.responsibilities ? `
        <div class="responsibilities-bar">
            <span class="responsibilities-label">My Responsibilities</span>
            <div class="responsibilities-tags">
                ${project.responsibilities.map(r => `<span class="resp-tag">${r}</span>`).join('')}
            </div>
        </div>` : ''}
    `;
    document.getElementById('summary-box').innerHTML = summaryHTML;

    // ── Content ───────────────────────────────────────────────────────────────
    const content = project.content || {};
    let sectionsHTML = '';

    // 1. Overview
    if (content.overview) {
        sectionsHTML += `
        <section class="project-section fade-in">
            <h2 class="project-section__title">Project Overview</h2>
            <p class="project-section__text project-section__text--lead">${content.overview}</p>
        </section>`;
    }

    // 2. Challenges
    if (content.challenges && content.challenges.length > 0) {
        sectionsHTML += `
        <section class="project-section fade-in">
            <h2 class="project-section__title">Challenges</h2>
            <div class="challenge-grid">
                ${content.challenges.map((c, i) => `
                    <div class="challenge-card">
                        <span class="challenge-number">${String(i + 1).padStart(2, '0')}</span>
                        <h3 class="challenge-title">${c.title}</h3>
                        <p class="challenge-desc">${c.description}</p>
                    </div>
                `).join('')}
            </div>
        </section>`;
    }

    // 3. Discovery
    if (content.discovery) {
        const disc = content.discovery;
        sectionsHTML += `
        <section class="project-section fade-in">
            <h2 class="project-section__title">Discovery & Research</h2>
            <p class="project-section__text">${disc.description}</p>
            ${disc.activities && disc.activities.length > 0 ? `
            <ul class="activity-list">
                ${disc.activities.map(a => `<li class="activity-item"><span class="activity-dot"></span>${a}</li>`).join('')}
            </ul>` : ''}
            ${disc.image ? `
            <div class="section-image-wrap">
                <img src="${disc.image}" alt="Discovery — ${project.title}" class="section-image" loading="lazy">
            </div>` : ''}
        </section>`;
    }

    // 3.1 Design System Strategy (New)
    if (content.strategy) {
        const strat = content.strategy;
        sectionsHTML += `
        <section class="project-section fade-in">
            <h2 class="project-section__title">Design System Strategy</h2>
            <p class="project-section__text project-section__text--lead">${strat.goal}</p>
            ${strat.principles && strat.principles.length > 0 ? `
            <div class="principles-grid">
                ${strat.principles.map(p => `
                    <div class="principle-card">
                        <h3 class="principle-title">${p.title}</h3>
                        <p class="principle-desc">${p.description}</p>
                    </div>
                `).join('')}
            </div>` : ''}
        </section>`;
    }

    // 3.2 Component Architecture (New)
    if (content.componentArchitecture) {
        const ca = content.componentArchitecture;
        sectionsHTML += `
        <section class="project-section fade-in">
            <h2 class="project-section__title">Component Architecture</h2>
            <p class="project-section__text">${ca.description}</p>
            <div class="component-architecture-grid">
                ${ca.categories.map(cat => `
                    <div class="component-category-card">
                        <h3 class="component-category-title">${cat.title}</h3>
                        <p class="component-category-details">${cat.details}</p>
                    </div>
                `).join('')}
            </div>
            ${ca.beforeAfter ? `
            <div class="before-after-container">
                <h3 class="before-after-header">Component Audit: ${ca.beforeAfter.component}</h3>
                <div class="before-after-grid">
                    <div class="before-after-card before-after-card--before">
                        <span class="badge badge--before">Legacy (Before)</span>
                        <p>${ca.beforeAfter.before}</p>
                    </div>
                    <div class="before-after-card before-after-card--after">
                        <span class="badge badge--after">Standardized (After)</span>
                        <p>${ca.beforeAfter.after}</p>
                    </div>
                </div>
            </div>` : ''}
        </section>`;
    }

    // 3.3 Accessibility Framework (New)
    if (content.accessibilityFramework) {
        const af = content.accessibilityFramework;
        sectionsHTML += `
        <section class="project-section fade-in">
            <h2 class="project-section__title">Accessibility Framework</h2>
            <p class="project-section__text">${af.description}</p>
            <div class="accessibility-grid">
                ${af.pillars.map(p => `
                    <div class="accessibility-card">
                        <h3 class="accessibility-title">${p.title}</h3>
                        <p class="accessibility-desc">${p.description}</p>
                    </div>
                `).join('')}
            </div>
        </section>`;
    }

    // 3.4 Applying the System Across Modules (New)
    if (content.crossModule) {
        const cm = content.crossModule;
        sectionsHTML += `
        <section class="project-section fade-in">
            <h2 class="project-section__title">Applying the System Across Modules</h2>
            <p class="project-section__text">${cm.description}</p>
            <div class="cross-module-grid">
                ${cm.modules.map(mod => `
                    <div class="cross-module-card">
                        <h3 class="cross-module-title">${mod.name}</h3>
                        <p class="cross-module-details">${mod.details}</p>
                    </div>
                `).join('')}
            </div>
            <div class="shared-summary-card">
                <p class="shared-summary-text">${cm.sharedSummary}</p>
            </div>
        </section>`;
    }

    // 3.5 Governance & Team Leadership (New)
    if (content.governance) {
        const gov = content.governance;
        sectionsHTML += `
        <section class="project-section fade-in">
            <h2 class="project-section__title">Governance & Team Leadership</h2>
            <blockquote class="leadership-quote">
                <p>${gov.leadership}</p>
            </blockquote>
            <h3 class="governance-process-title">Governance Workflow</h3>
            <div class="governance-flow">
                ${gov.process.map((step, i) => {
                    const parts = step.split(':');
                    const title = parts[0];
                    const desc = parts.slice(1).join(':');
                    return `
                    <div class="governance-step">
                        <div class="gov-step-num">0${i + 1}</div>
                        <div class="gov-step-content">
                            <h4 class="gov-step-title">${title.trim()}</h4>
                            <p class="gov-step-desc">${desc ? desc.trim() : ''}</p>
                        </div>
                    </div>
                    ${i < gov.process.length - 1 ? '<div class="gov-step-arrow">→</div>' : ''}
                    `;
                }).join('')}
            </div>
        </section>`;
    }

    // 4. Legacy problem text (for backward compat)
    if (!content.overview && content.problem) {
        sectionsHTML += `
        <section class="project-section fade-in">
            <h2 class="project-section__title">The Problem</h2>
            <p class="project-section__text">${content.problem}</p>
        </section>`;
    }

    // 5. Personas
    if (content.personas && content.personas.length > 0) {
        sectionsHTML += `
        <section class="project-section fade-in">
            <h2 class="project-section__title">User Personas</h2>
            <div class="persona-grid">
                ${content.personas.map(p => `
                    <div class="persona-card">
                        <div class="persona-avatar">${p.name.charAt(0)}</div>
                        <h3 class="persona-name">${p.name}</h3>
                        <p class="persona-desc">${p.description}</p>
                    </div>
                `).join('')}
            </div>
        </section>`;
    }

    // 6. Journey Map
    if (content.journeyMap) {
        const jm = content.journeyMap;
        sectionsHTML += `
        <section class="project-section fade-in">
            <h2 class="project-section__title">Customer Journey Mapping</h2>
            <p class="project-section__text">${jm.description}</p>
            ${jm.image ? `
            <div class="section-image-wrap">
                <img src="${jm.image}" alt="Journey Map — ${project.title}" class="section-image" loading="lazy">
            </div>` : ''}
        </section>`;
    }

    // 7. Design Approach
    if (content.designApproach) {
        const da = content.designApproach;
        sectionsHTML += `
        <section class="project-section fade-in">
            <h2 class="project-section__title">Design Approach</h2>
            <p class="project-section__text">${da.description}</p>
            ${da.principles && da.principles.length > 0 ? `
            <div class="principles-grid">
                ${da.principles.map(p => `
                    <div class="principle-card">
                        <span class="principle-bullet">→</span>
                        <p>${p}</p>
                    </div>
                `).join('')}
            </div>` : ''}
            ${da.image ? `
            <div class="section-image-wrap">
                <p class="section-image__caption">Annotated wireframes mapping OBDX customisation decisions to user needs and regulatory requirements.</p>
                <img src="${da.image}" alt="Wireframes — ${project.title}" class="section-image" loading="lazy">
            </div>` : ''}
            ${da.screensImage ? `
            <div class="section-image-wrap" style="margin-top:28px;">
                <p class="section-image__caption">From wireframe to final product — the NMB OBDX mobile experience across key user journeys.</p>
                <img src="${da.screensImage}" alt="Final Screens — ${project.title}" class="section-image" loading="lazy">
            </div>` : ''}
        </section>`;
    }

    // 8. Process Timeline
    if (content.process && content.process.length > 0) {
        sectionsHTML += `
        <section class="project-section fade-in">
            <h2 class="project-section__title">Design Process</h2>
            <div class="process-timeline">
                ${content.process.map((step, i) => `
                    <div class="process-step">
                        <div class="process-step__number">${String(i + 1).padStart(2, '0')}</div>
                        <div class="process-step__label">${step}</div>
                    </div>
                    ${i < content.process.length - 1 ? '<div class="process-step__connector"></div>' : ''}
                `).join('')}
            </div>
        </section>`;
    }

    // 9. Solution
    if (content.solution) {
        const screens = content.screens;
        let screensHTML = '';
        if (screens) {
            screensHTML = `
            <div class="section-image-wrap">
                <p class="section-image__caption">${screens.description}</p>
                <img src="${screens.image}" alt="Mobile Screens — ${project.title}" class="section-image" loading="lazy">
            </div>`;
            if (screens.desktopImage) {
                const caption = screens.desktopCaption || "Corporate banking desktop dashboard — real-time cash flow analytics, multi-account overview, and FX exchange rates designed for CFOs and corporate treasurers.";
                screensHTML += `
            <div class="section-image-wrap" style="margin-top:28px;">
                <p class="section-image__caption">${caption}</p>
                <img src="${screens.desktopImage}" alt="Desktop Dashboard — ${project.title}" class="section-image" loading="lazy">
            </div>`;
            }
            if (screens.adminImage) {
                const caption = screens.adminCaption || "Team members & roles admin module — granular access control with Maker/Checker/Viewer role assignment and real-time status management.";
                screensHTML += `
            <div class="section-image-wrap" style="margin-top:28px;">
                <p class="section-image__caption">${caption}</p>
                <img src="${screens.adminImage}" alt="Admin Screens — ${project.title}" class="section-image" loading="lazy">
            </div>`;
            }
        }
        sectionsHTML += `
        <section class="project-section fade-in">
            <h2 class="project-section__title">The Solution</h2>
            <p class="project-section__text">${content.solution}</p>
            ${screensHTML}
        </section>`;
    }

    // 10. Key Deliverables
    if (content.deliverables && content.deliverables.length > 0) {
        sectionsHTML += `
        <section class="project-section fade-in">
            <h2 class="project-section__title">Key Deliverables</h2>
            <div class="deliverables-grid">
                ${content.deliverables.map((d, i) => `
                    <div class="deliverable-item">
                        <span class="deliverable-icon">◆</span>
                        <span>${d}</span>
                    </div>
                `).join('')}
            </div>
        </section>`;
    }

    // 11. Impact Stats
    const impacts = content.impact || [];
    if (Array.isArray(impacts) && impacts.length > 0) {
        const impactHTML = typeof impacts[0] === 'object'
            ? `<div class="impact-stats-grid">
                ${impacts.map(item => `
                    <div class="impact-stat-card">
                        <span class="impact-stat__number">${item.metric}</span>
                        <span class="impact-stat__label">${item.label}</span>
                    </div>
                `).join('')}
              </div>`
            : `<ul class="impact-list">${impacts.map(i => `<li>${i}</li>`).join('')}</ul>`;

        sectionsHTML += `
        <section class="project-section fade-in">
            <h2 class="project-section__title">Impact & Outcomes</h2>
            ${impactHTML}
        </section>`;
    }

    // 12. Leadership
    if (content.leadership) {
        sectionsHTML += `
        <section class="project-section fade-in">
            <h2 class="project-section__title">Leadership & Strategy</h2>
            <blockquote class="leadership-quote">
                <p>${content.leadership}</p>
            </blockquote>
        </section>`;
    }

    // 12.1 Key Learnings (New)
    if (content.learnings) {
        sectionsHTML += `
        <section class="project-section fade-in">
            <h2 class="project-section__title">Key Learnings</h2>
            <div class="learnings-grid">
                ${content.learnings.map((item, i) => `
                    <div class="learning-card">
                        <span class="learning-number">0${i + 1}</span>
                        <h3 class="learning-title">${item.title}</h3>
                        <p class="learning-desc">${item.description}</p>
                    </div>
                `).join('')}
            </div>
        </section>`;
    }

    // 13. Reflection
    if (content.reflection) {
        sectionsHTML += `
        <section class="project-section fade-in project-section--reflection">
            <h2 class="project-section__title">Reflection</h2>
            <blockquote class="reflection-quote">
                <p>${content.reflection}</p>
            </blockquote>
        </section>`;
    }

    // 14. Full Image Gallery (remaining images)
    if (content.images && content.images.length > 0) {
        sectionsHTML += `
        <section class="project-section fade-in">
            <h2 class="project-section__title">Project Gallery</h2>
            <div class="project-gallery">
                ${content.images.map((img, i) => `
                    <div class="project-gallery__item">
                        <img src="${img}" alt="${project.title} — Design Artifact ${i + 1}" loading="lazy">
                    </div>
                `).join('')}
            </div>
        </section>`;
    }

    document.getElementById('project-content').innerHTML = sectionsHTML;

    // ── Scroll animations ─────────────────────────────────────────────────────
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.08 });

    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }, 100);

    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('page-loaded');
    });

} else {
    document.body.innerHTML = '<h1>Project not found</h1><a href="/">Return home</a>';
}
