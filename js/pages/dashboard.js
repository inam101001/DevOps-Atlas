/**
 * dashboard.js — Dashboard Page
 * DevOps Atlas Learning Portal
 */

import { Progress } from '../modules/progress.js';
import { LABS, getLabsByWeek } from '../data/labs.js';
import { ROADMAP } from '../data/roadmap.js';
import {
  renderStatCard, renderProgressRing,
  renderLabCard, wireCheckboxes, showToast
} from '../modules/render.js';

function renderDashboard(container) {
  const stats = Progress.getStats();
  const currentWeek = Progress.getCurrentWeek();
  const weekData = ROADMAP.find(r => r.week === currentWeek);
  const weekLabs = getLabsByWeek(currentWeek);

  // Next recommended lab: first incomplete in current week
  const nextLab = weekLabs.find(l => !Progress.isCompleted(l.id));

  container.innerHTML = `
    <div class="page-content" id="dashboard-content">
      <!-- Page Header -->
      <div class="page-header">
        <h1>👋 Welcome to <span class="gradient-text">DevOps Atlas</span></h1>
        <p class="page-subtitle">
          Your personal learning hub for DevOps &amp; Cloud engineering.
          Track your progress across 200+ free labs and build real skills.
        </p>
      </div>

      <!-- Stats Row -->
      <div class="grid-stats section">
        ${renderStatCard({
          icon: '📚', value: stats.done,
          label: 'Labs Completed', sublabel: `of ${stats.total} total`,
          color: 'var(--brand-primary)'
        })}
        ${renderStatCard({
          icon: '⏱', value: `${stats.doneHours}h`,
          label: 'Hours Practiced', sublabel: `of ${stats.totalHours}h total`,
          color: 'var(--brand-accent)'
        })}
        ${renderStatCard({
          icon: '🔥', value: `${stats.percentage}%`,
          label: 'Overall Progress', sublabel: `${stats.remaining} labs remaining`,
          color: 'var(--brand-secondary)'
        })}
        ${renderStatCard({
          icon: '📅', value: `Week ${currentWeek}`,
          label: 'Current Week', sublabel: weekData ? weekData.title : '',
          color: 'var(--brand-warning)'
        })}
      </div>

      <!-- Overall Progress + Next Lab -->
      <div class="grid-2 section" style="gap: var(--space-8);">

        <!-- Progress Ring -->
        <div class="card card-glass">
          <div class="section-title mb-4">📊 Overall Progress</div>
          <div class="flex items-center gap-8 flex-wrap">
            ${renderProgressRing(stats.percentage, 140, 10)}
            <div class="tech-progress-list" style="flex: 1; min-width: 200px;">
              ${['Kubernetes', 'Docker', 'Terraform', 'Linux', 'GitHub Actions', 'ArgoCD']
                .filter(t => stats.techStats[t])
                .map(tech => {
                  const ts = stats.techStats[tech];
                  const pct = Math.round((ts.done / ts.total) * 100);
                  return `
                    <div class="tech-progress-item">
                      <div class="tech-progress-header">
                        <span class="tech-progress-name">${tech}</span>
                        <span class="tech-progress-count">${ts.done}/${ts.total}</span>
                      </div>
                      <div class="progress-bar thin">
                        <div class="progress-fill" style="width: ${pct}%"></div>
                      </div>
                    </div>
                  `;
                }).join('')}
            </div>
          </div>
        </div>

        <!-- Current Week + Next Recommended -->
        <div class="card card-glass">
          <div class="section-title mb-4">
            ${weekData ? weekData.emoji : '📅'} Current Focus — Week ${currentWeek}
          </div>
          ${weekData ? `
            <div class="mb-4">
              <div class="text-lg font-bold" style="color: var(--text-primary);">
                ${weekData.title}
              </div>
              <div class="text-sm" style="color: var(--text-muted);">
                ${weekData.subtitle}
              </div>
            </div>

            <!-- Week Progress Bar -->
            <div class="progress-labeled mb-6">
              <div class="progress-header">
                <span class="progress-label">Week ${currentWeek} progress</span>
                <span class="progress-value">
                  ${stats.weekStats[currentWeek]?.done || 0} / ${stats.weekStats[currentWeek]?.total || 0}
                </span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${
                  stats.weekStats[currentWeek]?.total > 0
                    ? Math.round((stats.weekStats[currentWeek].done / stats.weekStats[currentWeek].total) * 100)
                    : 0
                }%"></div>
              </div>
            </div>

            ${nextLab ? `
              <div class="text-xs font-semibold mb-2" style="color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em;">
                ⚡ NEXT RECOMMENDED
              </div>
              <div style="
                background: var(--bg-highlight);
                border: 1px solid var(--border-brand);
                border-radius: var(--radius-md);
                padding: var(--space-4);
              ">
                <div class="font-semibold" style="color: var(--text-primary); margin-bottom: 4px;">
                  ${nextLab.title}
                </div>
                <div class="text-xs" style="color: var(--text-muted); margin-bottom: 12px;">
                  📍 ${nextLab.platform} · ⏱ ${nextLab.durationMin}m
                </div>
                <a href="${nextLab.url}" target="_blank" rel="noopener noreferrer"
                   class="btn btn-primary btn-sm">
                  Start Lab →
                </a>
              </div>
            ` : `
              <div style="text-align: center; padding: var(--space-4);">
                <div style="font-size: 2rem;">🎉</div>
                <div class="font-bold" style="color: var(--brand-accent);">Week ${currentWeek} Complete!</div>
                <div class="text-sm" style="color: var(--text-muted);">Move to Week ${currentWeek + 1}</div>
              </div>
            `}

            <div class="flex gap-2 mt-4">
              ${currentWeek > 1 ? `<button class="btn btn-ghost btn-sm" id="btn-prev-week">← Prev</button>` : ''}
              ${currentWeek < 10 ? `<button class="btn btn-secondary btn-sm" id="btn-next-week">Next Week →</button>` : ''}
              <a href="#/roadmap" class="btn btn-ghost btn-sm">View Full Roadmap →</a>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- This Week's Labs -->
      <div class="section">
        <div class="section-header">
          <div class="section-title">
            <span class="icon">📋</span>
            Week ${currentWeek} Labs
          </div>
          <a href="#/labs" class="btn btn-ghost btn-sm">View All Labs →</a>
        </div>
        <div class="grid-cards" id="week-labs-grid">
          ${weekLabs.slice(0, 6).map(lab => renderLabCard(lab)).join('')}
        </div>
        ${weekLabs.length > 6 ? `
          <div class="text-center mt-6">
            <a href="#/labs" class="btn btn-secondary">
              View all ${weekLabs.length} labs for Week ${currentWeek} →
            </a>
          </div>
        ` : ''}
      </div>

      <!-- 10-Week Roadmap Mini Preview -->
      <div class="section">
        <div class="section-header">
          <div class="section-title"><span class="icon">🗺️</span> Learning Roadmap</div>
          <a href="#/roadmap" class="btn btn-ghost btn-sm">View Full Roadmap →</a>
        </div>
        <div style="display: flex; flex-direction: column; gap: var(--space-2);">
          ${ROADMAP.map(w => {
            const ws = stats.weekStats[w.week] || { done: 0, total: 0 };
            const pct = ws.total > 0 ? Math.round((ws.done / ws.total) * 100) : 0;
            const isActive = w.week === currentWeek;
            return `
              <div style="
                display: grid;
                grid-template-columns: 80px 1fr 60px;
                align-items: center;
                gap: var(--space-4);
                padding: var(--space-3) var(--space-4);
                background: ${isActive ? 'var(--bg-highlight)' : 'var(--bg-card)'};
                border: 1px solid ${isActive ? 'var(--border-brand)' : 'var(--border-subtle)'};
                border-radius: var(--radius-md);
                cursor: pointer;
                transition: all var(--transition-fast);
              " onclick="window.location.hash='/roadmap'">
                <div class="text-sm font-semibold" style="color: ${isActive ? 'var(--brand-primary)' : 'var(--text-muted)'};">
                  ${w.emoji} Week ${w.week}
                </div>
                <div>
                  <div class="text-sm font-semibold" style="color: var(--text-primary); margin-bottom: 4px;">
                    ${w.title}
                  </div>
                  <div class="progress-bar thin">
                    <div class="progress-fill" style="width: ${pct}%;"></div>
                  </div>
                </div>
                <div class="text-xs font-bold" style="color: var(--text-muted); text-align: right;">
                  ${ws.done}/${ws.total}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="section">
        <div class="section-title mb-4"><span class="icon">⚡</span> Quick Actions</div>
        <div class="grid-cards-sm">
          <a href="#/projects" class="resource-card">
            <div class="resource-card-icon">🏗️</div>
            <div class="resource-card-content">
              <div class="resource-card-title">Project Challenges</div>
              <div class="resource-card-desc">40 real-world projects to build your portfolio</div>
            </div>
          </a>
          <a href="#/interview" class="resource-card">
            <div class="resource-card-icon">🎤</div>
            <div class="resource-card-content">
              <div class="resource-card-title">Interview Prep</div>
              <div class="resource-card-desc">Common DevOps interview questions & answers</div>
            </div>
          </a>
          <a href="#/resources" class="resource-card">
            <div class="resource-card-icon">📖</div>
            <div class="resource-card-content">
              <div class="resource-card-title">Free Resources</div>
              <div class="resource-card-desc">Cheat sheets, ebooks, GitHub repos, YouTube</div>
            </div>
          </a>
          <div class="resource-card" style="cursor: pointer;" id="btn-export-progress">
            <div class="resource-card-icon">💾</div>
            <div class="resource-card-content">
              <div class="resource-card-title">Export Progress</div>
              <div class="resource-card-desc">Save your progress as JSON to back up or share</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // ── Wire checkboxes ──────────────────────────────────
  const grid = document.getElementById('week-labs-grid');
  if (grid) wireCheckboxes(grid);

  // ── Week navigation ──────────────────────────────────
  document.getElementById('btn-prev-week')?.addEventListener('click', () => {
    if (currentWeek > 1) {
      Progress.setCurrentWeek(currentWeek - 1);
      renderDashboard(container);
    }
  });

  document.getElementById('btn-next-week')?.addEventListener('click', () => {
    if (currentWeek < 10) {
      Progress.setCurrentWeek(currentWeek + 1);
      renderDashboard(container);
    }
  });

  // ── Export progress ──────────────────────────────────
  document.getElementById('btn-export-progress')?.addEventListener('click', () => {
    const json = Progress.export();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'devops-atlas-progress.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Progress exported!', 'success');
  });
}

export { renderDashboard };
