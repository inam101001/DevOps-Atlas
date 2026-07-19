# DevOps Atlas

**DevOps Atlas** is a personal, fully client-side learning portal designed to help you track your progress as you master DevOps and Cloud Engineering. It curates over 200 high-quality, truly free, browser-based labs, interactive projects, and a structured 10-week roadmap to take you from a beginner to a job-ready Junior DevOps Engineer.

## Features

- 🗺️ **10-Week Roadmap:** A structured, week-by-week learning path covering everything from Linux and Bash to Kubernetes, CI/CD, Terraform, and Cloud (AWS/GCP/Azure).
- 🔬 **200+ Free Labs:** A searchable, filterable database of hands-on labs from platforms like KillerCoda, Play with Docker, and Linux Journey that require zero setup and no credit card.
- 🏗️ **40 Real-World Projects:** Tiered project challenges (from beginner to portfolio-ready) to help you build practical, interview-ready skills.
- 📊 **Progress Tracking:** Interactive checkboxes that track your completed labs, calculate your progress percentage, and update your statistics. All progress is saved automatically to your browser's local storage.
- 🎨 **Modern SPA Architecture:** A blazing-fast Single Page Application built entirely with vanilla HTML, CSS, and JavaScript. No backend or web server is required.
- 🌓 **Dark/Light Mode:** Built-in theme toggling with persistent user preference.

## How to Use

Because DevOps Atlas is a completely client-side application, you do not need to install Node.js, run an `npm` script, or start a local server to use it.

1. **Open the App:** Simply double-click the `index.html` file in the root directory to open it in your default web browser (or drag and drop it into an open browser window).
2. **Track Progress:** Navigate to the "Lab Browser" or "Roadmap" and click the checkboxes next to the labs you complete. Your dashboard stats will automatically update.
3. **Save/Export Data:** Your progress is saved automatically in your browser's `localStorage`. If you need to switch devices or clear your browser data, go to the Dashboard and click **Export Progress** to download a JSON backup.

## Project Structure

The project is structured in a clean, modular way using native web technologies:

```text
DevOps Atlas/
├── index.html            # Main application shell and entry point
├── README.md             # Project documentation
├── css/                  # Modular CSS stylesheets
│   ├── base.css          # Typography and resets
│   ├── components.css    # Cards, buttons, inputs, modals
│   ├── layout.css        # Grid and main shell structure
│   ├── navigation.css    # Sidebar and top navbar styling
│   ├── progress.css      # Progress bars, rings, and checkboxes
│   └── themes.css        # CSS variables for light/dark themes
└── js/                   # Application logic
    ├── app.js            # Main JS entry point
    ├── data/             # Static database
    │   ├── labs.js       # Array of 200+ lab objects
    │   ├── projects.js   # Array of 40 project challenges
    │   └── roadmap.js    # 10-week curriculum definitions
    ├── modules/          # Reusable logic components
    │   ├── filters.js    # Filter state management
    │   ├── progress.js   # LocalStorage data handler
    │   ├── render.js     # Shared DOM rendering helpers
    │   ├── router.js     # Hash-based SPA routing
    │   ├── search.js     # Full-text inverted index search
    │   └── theme.js      # Dark/light mode persistence
    └── pages/            # View controllers for each route
        ├── dashboard.js  
        ├── interview.js  
        ├── labs.js       
        ├── projects.js   
        ├── resources.js  
        └── roadmap.js    
```

## Technologies Used

- **HTML5:** Semantic markup.
- **CSS3:** Custom properties (variables), Flexbox, CSS Grid, and responsive media queries.
- **Vanilla JavaScript (ES6+):** ES modules, native DOM manipulation, and the HTML5 `localStorage` API. No external JS frameworks or libraries were used.

## Author & Purpose

This project was built to solve the "tutorial hell" problem by providing a central hub for entirely free, hands-on, and browser-based DevOps training environments. 

Happy Learning!
