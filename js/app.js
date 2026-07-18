/**
 * app.js — Main Application Entry Point
 * DevOps Atlas Learning Portal
 */

import { Theme } from './modules/theme.js';
import { Progress } from './modules/progress.js';
import { router } from './modules/router.js';

// Pages
import { renderDashboard } from './pages/dashboard.js';
import { renderLabsPage } from './pages/labs.js';
import { renderRoadmapPage } from './pages/roadmap.js';
import { renderProjectsPage } from './pages/projects.js';
import { renderResourcesPage } from './pages/resources.js';
import { renderInterviewPage } from './pages/interview.js';

const app = {
  init() {
    // 1. Initialise Modules
    Theme.init();
    Progress.init();

    // Wire global Theme toggle
    document.getElementById('btn-theme-toggle')?.addEventListener('click', () => {
      Theme.toggle();
    });

    // 2. Setup Router
    const mainContainer = document.getElementById('main-content');
    
    // Helper to update active nav link
    const updateNav = (path) => {
      document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        // Extract base path (e.g., #/labs from #/labs/123)
        const basePath = '/' + (href.split('/')[1] || '');
        const currentBasePath = '/' + (path.split('/')[1] || '');
        
        if (basePath === currentBasePath) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    };

    router.before((path) => {
      updateNav(path);
      // Scroll to top on navigation
      window.scrollTo(0, 0);
      return true;
    });

    router
      .on('/', () => renderDashboard(mainContainer))
      .on('/labs', () => renderLabsPage(mainContainer))
      .on('/roadmap', () => renderRoadmapPage(mainContainer))
      .on('/projects', () => renderProjectsPage(mainContainer))
      .on('/resources', () => renderResourcesPage(mainContainer))
      .on('/interview', () => renderInterviewPage(mainContainer));

    // 3. Start App
    router.start();

    // 4. Global Event Listeners
    window.addEventListener('progress:reset', () => {
      // Re-render current page to reflect reset state
      router._onHashChange();
    });
  }
};

// Bootstrap when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
