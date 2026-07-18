/**
 * router.js — Hash-Based SPA Router
 * DevOps Atlas Learning Portal
 *
 * Works from file:// — no server required.
 * Routes: #/, #/labs, #/roadmap, #/projects, #/resources, #/interview
 */

class Router {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.beforeEach = null;
    this._bound = this._onHashChange.bind(this);
  }

  /**
   * Register a route handler
   * @param {string} path  — e.g. '/', '/labs', '/roadmap'
   * @param {Function} handler — called when route activates
   */
  on(path, handler) {
    this.routes.set(path, handler);
    return this;
  }

  /**
   * Register a guard called before every navigation
   */
  before(fn) {
    this.beforeEach = fn;
    return this;
  }

  /**
   * Start listening for hash changes
   */
  start() {
    window.addEventListener('hashchange', this._bound);
    // Navigate to current hash on load
    this._onHashChange();
  }

  /**
   * Stop listening
   */
  stop() {
    window.removeEventListener('hashchange', this._bound);
  }

  /**
   * Programmatic navigation
   */
  navigate(path) {
    window.location.hash = path;
  }

  /**
   * Get current route path
   */
  getCurrentPath() {
    return this._getPath();
  }

  _getPath() {
    const hash = window.location.hash;
    if (!hash || hash === '#') return '/';
    return hash.replace(/^#/, '') || '/';
  }

  _onHashChange() {
    const path = this._getPath();

    // Run guard if registered
    if (this.beforeEach) {
      const proceed = this.beforeEach(path, this.currentRoute);
      if (proceed === false) return;
    }

    // Try exact match first
    let handler = this.routes.get(path);

    // Fallback to base path (e.g. '/labs/detail/123' → '/labs')
    if (!handler) {
      for (const [routePath, routeHandler] of this.routes) {
        if (path.startsWith(routePath) && routePath !== '/') {
          handler = routeHandler;
          break;
        }
      }
    }

    // Fallback to 404 or home
    if (!handler) {
      handler = this.routes.get('/') || (() => {});
    }

    this.currentRoute = path;
    handler(path);
  }
}

// Singleton instance
const router = new Router();

export { router };
