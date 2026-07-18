/**
 * projects.js (page) — 40 Real-World Project Challenges
 * DevOps Atlas Learning Portal
 */

import { PROJECTS } from '../data/projects.js';
import { renderProjectCard, techBadge, difficultyBadge } from '../modules/render.js';

let _activeFilter = 'all';

function renderProjectsPage(container) {
  container.innerHTML = `
    <div class="page-content">
      <div class="page-header">
        <h1>🏗️ Project Challenges</h1>
        <p class="page-subtitle">
          40 real-world DevOps projects ordered from beginner to portfolio-ready.
          These are the kinds of tasks you'll encounter in actual DevOps roles.
        </p>
      </div>

      <!-- Stats Banner -->
      <div class="card card-glass mb-8" style="
        background: linear-gradient(135deg, rgba(56,189,248,0.08), rgba(129,140,248,0.08));
        border-color: var(--border-brand);
      ">
        <div class="flex items-center gap-8 flex-wrap">
          <div class="text-center">
            <div class="text-3xl font-extrabold gradient-text">40</div>
            <div class="text-sm" style="color: var(--text-muted);">Projects</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-extrabold" style="color: var(--brand-accent);">
              ${PROJECTS.reduce((a, p) => a + p.estimatedHours, 0)}h
            </div>
            <div class="text-sm" style="color: var(--text-muted);">Total Hours</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-extrabold" style="color: var(--brand-secondary);">8</div>
            <div class="text-sm" style="color: var(--text-muted);">Tiers</div>
          </div>
          <div style="flex: 1; min-width: 200px;">
            <p class="text-sm" style="color: var(--text-secondary); line-height: 1.7;">
              Complete these in order for a progression from Docker basics to
              a production-ready platform you can demo in job interviews.
            </p>
          </div>
        </div>
      </div>

      <!-- Tier Filters -->
      <div class="filter-bar mb-8">
        ${['all', 'beginner', 'intermediate', 'advanced'].map(f => `
          <button
            class="filter-pill ${_activeFilter === f ? 'active' : ''}"
            data-filter="${f}"
          >
            ${f === 'all' ? '📋 All Projects' :
              f === 'beginner' ? '🟢 Beginner' :
              f === 'intermediate' ? '🟡 Intermediate' : '🔴 Advanced'}
          </button>
        `).join('')}
      </div>

      <!-- Tier Sections -->
      <div id="projects-content">
        ${renderProjectTiers()}
      </div>
    </div>
  `;

  // ── Wire difficulty filter ───────────────────────────
  container.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      _activeFilter = btn.dataset.filter;
      container.querySelectorAll('[data-filter]').forEach(b => {
        b.classList.toggle('active', b.dataset.filter === _activeFilter);
      });
      document.getElementById('projects-content').innerHTML = renderProjectTiers();
      wireProjectExpand();
    });
  });

  wireProjectExpand();
}

function renderProjectTiers() {
  const tiers = [
    { key: 'docker',       label: '🐳 Docker Projects',           range: [1, 5],  color: 'var(--badge-docker)' },
    { key: 'kubernetes',   label: '☸️ Kubernetes Projects',       range: [6, 12], color: 'var(--badge-k8s)' },
    { key: 'cicd',         label: '⚙️ CI/CD Pipeline Projects',   range: [13, 16],color: 'var(--badge-jenkins)' },
    { key: 'iac',          label: '🏗️ Infrastructure as Code',    range: [17, 20],color: 'var(--badge-terraform)' },
    { key: 'gitops',       label: '🔄 GitOps & ArgoCD',           range: [21, 23],color: 'var(--badge-argocd)' },
    { key: 'monitoring',   label: '📊 Monitoring & Observability', range: [24, 26],color: 'var(--badge-prometheus)' },
    { key: 'aws',          label: '☁️ AWS Projects',              range: [27, 29],color: 'var(--badge-aws)' },
    { key: 'capstone',     label: '🚀 Capstone & Full Platform',  range: [30, 40],color: 'var(--badge-gcp)' },
  ];

  return tiers.map(tier => {
    let projects = PROJECTS.filter(p => {
      const num = parseInt(p.number, 10);
      return num >= tier.range[0] && num <= tier.range[1];
    });

    if (_activeFilter !== 'all') {
      projects = projects.filter(p => p.difficulty === _activeFilter);
    }

    if (projects.length === 0) return '';

    return `
      <div class="section">
        <div class="section-header">
          <div class="section-title" style="color: ${tier.color};">
            ${tier.label}
          </div>
          <span class="badge badge-platform">${projects.length} projects</span>
        </div>
        <div class="grid-cards">
          ${projects.map(p => renderExpandableProjectCard(p)).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function renderExpandableProjectCard(project) {
  return `
    <div class="project-card" data-project-id="${project.id}" style="cursor: default;">
      <div class="project-card-number">PROJECT ${project.number}</div>
      <div class="project-card-title">${project.title}</div>
      <p class="project-card-desc">${project.description}</p>

      <div class="flex flex-wrap gap-2">
        ${project.technology.slice(0, 4).map(techBadge).join('')}
        ${difficultyBadge(project.difficulty)}
        <span class="badge badge-platform">⏱ ~${project.estimatedHours}h</span>
      </div>

      <!-- Expandable details -->
      <div class="project-expand-btn mt-4" data-target="project-details-${project.id}">
        <button class="btn btn-ghost btn-sm" style="width: 100%; justify-content: space-between;">
          <span>View Details</span>
          <span class="expand-chevron">▼</span>
        </button>
      </div>

      <div id="project-details-${project.id}" style="display: none; margin-top: 16px;">
        <div class="divider" style="margin: 12px 0;"></div>

        <div class="mb-4">
          <div class="text-xs font-semibold mb-2" style="color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em;">
            What you'll learn
          </div>
          <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 6px;">
            ${(project.whatYouLearn || []).map(item => `
              <li class="flex gap-2 text-sm" style="color: var(--text-secondary);">
                <span style="color: var(--brand-accent); flex-shrink: 0;">→</span>${item}
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="mb-4">
          <div class="text-xs font-semibold mb-2" style="color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em;">
            Skills practiced
          </div>
          <div class="flex flex-wrap gap-1">
            ${(project.skills || []).map(s => `<span class="badge badge-platform text-xs">${s}</span>`).join('')}
          </div>
        </div>

        <div style="
          background: var(--bg-highlight);
          border: 1px solid var(--border-brand);
          border-radius: var(--radius-md);
          padding: 12px 16px;
        ">
          <div class="text-xs font-semibold mb-1" style="color: var(--brand-primary); text-transform: uppercase; letter-spacing: 0.06em;">
            Deliverable
          </div>
          <p class="text-sm" style="color: var(--text-secondary);">${project.deliverable}</p>
        </div>
      </div>
    </div>
  `;
}

function wireProjectExpand() {
  document.querySelectorAll('.project-expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const target = document.getElementById(targetId);
      const chevron = btn.querySelector('.expand-chevron');
      const btnEl = btn.querySelector('button span:first-child');

      if (!target) return;

      const isHidden = target.style.display === 'none';
      target.style.display = isHidden ? 'block' : 'none';
      if (chevron) chevron.style.transform = isHidden ? 'rotate(180deg)' : '';
      if (btnEl) btnEl.textContent = isHidden ? 'Hide Details' : 'View Details';
    });
  });
}

export { renderProjectsPage };
