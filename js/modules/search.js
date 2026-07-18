/**
 * search.js — Full-Text Search Across Labs
 * DevOps Atlas Learning Portal
 */

import { LABS } from '../data/labs.js';

const Search = {
  _index: null,

  /**
   * Build a simple inverted index for fast searching
   */
  buildIndex() {
    this._index = LABS.map(lab => ({
      id: lab.id,
      searchable: [
        lab.title,
        lab.platform,
        lab.description || '',
        ...(lab.technology || []),
        ...(lab.tags || []),
        lab.difficulty,
        lab.interviewRelevance,
      ].join(' ').toLowerCase(),
      lab,
    }));
  },

  /**
   * Search labs by query string
   * @param {string} query
   * @param {object} [filters] — optional pre-filter
   * @returns {object[]} matching lab objects
   */
  search(query, filters = {}) {
    if (!this._index) this.buildIndex();

    let results = this._index;

    // Apply pre-filters
    if (filters.technology) {
      results = results.filter(item =>
        item.lab.technology.includes(filters.technology)
      );
    }
    if (filters.difficulty) {
      results = results.filter(item =>
        item.lab.difficulty === filters.difficulty
      );
    }
    if (filters.platform) {
      results = results.filter(item =>
        item.lab.platform === filters.platform
      );
    }
    if (filters.week) {
      results = results.filter(item =>
        item.lab.week === parseInt(filters.week, 10)
      );
    }
    if (filters.freeForever !== undefined) {
      results = results.filter(item =>
        item.lab.freeForever === filters.freeForever
      );
    }
    if (filters.interviewRelevance) {
      results = results.filter(item =>
        item.lab.interviewRelevance === filters.interviewRelevance
      );
    }
    if (filters.noCreditCard) {
      results = results.filter(item => !item.lab.creditCardRequired);
    }

    // Text search
    const q = (query || '').trim().toLowerCase();
    if (q) {
      const terms = q.split(/\s+/).filter(Boolean);
      results = results.filter(item =>
        terms.every(term => item.searchable.includes(term))
      );
    }

    return results.map(item => item.lab);
  },

  /**
   * Highlight matching terms in a string
   */
  highlight(text, query) {
    if (!query || !query.trim()) return text;
    const terms = query.trim().split(/\s+/).filter(Boolean);
    let result = text;
    terms.forEach(term => {
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      result = result.replace(
        new RegExp(`(${escaped})`, 'gi'),
        '<mark class="search-highlight">$1</mark>'
      );
    });
    return result;
  },

  /**
   * Get search suggestions based on partial input
   */
  suggest(partial, limit = 5) {
    if (!this._index) this.buildIndex();
    const q = partial.toLowerCase();
    if (!q || q.length < 2) return [];

    const seen = new Set();
    const suggestions = [];

    for (const item of this._index) {
      if (suggestions.length >= limit) break;
      if (item.lab.title.toLowerCase().includes(q) && !seen.has(item.lab.id)) {
        seen.add(item.lab.id);
        suggestions.push(item.lab.title);
      }
    }

    return suggestions;
  }
};

export { Search };
