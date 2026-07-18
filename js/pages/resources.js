/**
 * resources.js (page) — External Resources & References
 * DevOps Atlas Learning Portal
 */

function renderResourcesPage(container) {
  container.innerHTML = `
    <div class="page-content">
      <div class="page-header">
        <h1>📖 Free Resources</h1>
        <p class="page-subtitle">
          A curated collection of cheat sheets, official documentation, GitHub repositories, and YouTube channels.
        </p>
      </div>

      <div class="grid-cards">
        
        <!-- Cheat Sheets -->
        <div class="card">
          <div class="section-title mb-4">📄 Cheat Sheets</div>
          <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px;">
            <li><a href="https://devhints.io/bash" target="_blank" rel="noopener noreferrer">Bash scripting cheatsheet</a></li>
            <li><a href="https://training.github.com/downloads/github-git-cheat-sheet.pdf" target="_blank" rel="noopener noreferrer">Git commands cheat sheet</a></li>
            <li><a href="https://docs.docker.com/get-started/docker_cheatsheet.pdf" target="_blank" rel="noopener noreferrer">Docker CLI cheat sheet</a></li>
            <li><a href="https://kubernetes.io/docs/reference/kubectl/cheatsheet/" target="_blank" rel="noopener noreferrer">kubectl cheat sheet</a></li>
            <li><a href="https://promlabs.com/promql-cheat-sheet/" target="_blank" rel="noopener noreferrer">PromQL cheat sheet</a></li>
          </ul>
        </div>

        <!-- GitHub Repos -->
        <div class="card">
          <div class="section-title mb-4">🐙 GitHub Repositories</div>
          <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px;">
            <li><a href="https://github.com/MichaelCade/90DaysOfDevOps" target="_blank" rel="noopener noreferrer">90DaysOfDevOps</a></li>
            <li><a href="https://github.com/bregman-arie/devops-exercises" target="_blank" rel="noopener noreferrer">DevOps Exercises</a></li>
            <li><a href="https://github.com/techiescamp/kubernetes-learning-path" target="_blank" rel="noopener noreferrer">Kubernetes Learning Path</a></li>
            <li><a href="https://github.com/kamranahmedse/developer-roadmap" target="_blank" rel="noopener noreferrer">DevOps Roadmap</a></li>
          </ul>
        </div>

        <!-- YouTube Channels -->
        <div class="card">
          <div class="section-title mb-4">📺 YouTube Channels</div>
          <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px;">
            <li><a href="https://www.youtube.com/c/TechWorldwithNana" target="_blank" rel="noopener noreferrer">TechWorld with Nana</a></li>
            <li><a href="https://www.youtube.com/c/NetworkChuck" target="_blank" rel="noopener noreferrer">NetworkChuck</a></li>
            <li><a href="https://www.youtube.com/c/ChristianLempa" target="_blank" rel="noopener noreferrer">Christian Lempa</a></li>
            <li><a href="https://www.youtube.com/c/Pelotech" target="_blank" rel="noopener noreferrer">Jeff Geerling</a></li>
            <li><a href="https://www.youtube.com/@KunalKushwaha" target="_blank" rel="noopener noreferrer">Kunal Kushwaha</a></li>
          </ul>
        </div>
        
        <!-- Official Docs -->
        <div class="card">
          <div class="section-title mb-4">📚 Official Docs</div>
          <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px;">
            <li><a href="https://kubernetes.io/docs/home/" target="_blank" rel="noopener noreferrer">Kubernetes Documentation</a></li>
            <li><a href="https://docs.docker.com/" target="_blank" rel="noopener noreferrer">Docker Documentation</a></li>
            <li><a href="https://developer.hashicorp.com/terraform/docs" target="_blank" rel="noopener noreferrer">Terraform Documentation</a></li>
            <li><a href="https://argo-cd.readthedocs.io/en/stable/" target="_blank" rel="noopener noreferrer">ArgoCD Documentation</a></li>
            <li><a href="https://docs.ansible.com/" target="_blank" rel="noopener noreferrer">Ansible Documentation</a></li>
          </ul>
        </div>

      </div>
    </div>
  `;
}

export { renderResourcesPage };
