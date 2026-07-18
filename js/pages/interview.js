/**
 * interview.js (page) — Interview Prep
 * DevOps Atlas Learning Portal
 */

function renderInterviewPage(container) {
  container.innerHTML = `
    <div class="page-content">
      <div class="page-header">
        <h1>🎤 Interview Prep</h1>
        <p class="page-subtitle">
          Common DevOps interview questions organized by category.
        </p>
      </div>

      <div class="card mb-8">
        <div class="section-title mb-4">🐧 Linux & General</div>
        <div class="accordion">
          <div class="accordion-item">
            <div class="accordion-header">
              <div class="accordion-question">What is the Linux boot process?</div>
              <span class="accordion-chevron">▼</span>
            </div>
            <div class="accordion-body">
              <div class="accordion-content">
                BIOS/UEFI → MBR/GPT → GRUB (Bootloader) → Kernel → Init/Systemd → Runlevels/Targets.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <div class="accordion-header">
              <div class="accordion-question">How do you troubleshoot a server that is unreachable?</div>
              <span class="accordion-chevron">▼</span>
            </div>
            <div class="accordion-body">
              <div class="accordion-content">
                1. Ping the IP (ICMP).<br>
                2. Check DNS resolution (nslookup/dig).<br>
                3. Trace route (traceroute).<br>
                4. Check if port is open (telnet/nc).<br>
                5. Check server logs and firewall rules (iptables/ufw).
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mb-8">
        <div class="section-title mb-4">🐳 Docker</div>
        <div class="accordion">
          <div class="accordion-item">
            <div class="accordion-header">
              <div class="accordion-question">What is the difference between a container and a virtual machine?</div>
              <span class="accordion-chevron">▼</span>
            </div>
            <div class="accordion-body">
              <div class="accordion-content">
                VMs virtualize the hardware and require a full guest OS. Containers virtualize the OS kernel and share it, making them lightweight and fast to start.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <div class="accordion-header">
              <div class="accordion-question">CMD vs ENTRYPOINT?</div>
              <span class="accordion-chevron">▼</span>
            </div>
            <div class="accordion-body">
              <div class="accordion-content">
                ENTRYPOINT specifies the executable that should run when the container starts. CMD provides default arguments to that executable (or the executable itself if ENTRYPOINT isn't defined). CMD can be overridden easily at the command line.
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card mb-8">
        <div class="section-title mb-4">☸️ Kubernetes</div>
        <div class="accordion">
          <div class="accordion-item">
            <div class="accordion-header">
              <div class="accordion-question">What happens when a node fails in Kubernetes?</div>
              <span class="accordion-chevron">▼</span>
            </div>
            <div class="accordion-body">
              <div class="accordion-content">
                The control plane marks the node as NotReady. After a timeout (default 5 mins), the Pods on that node are marked for deletion. The ReplicaSet/Deployment controller notices the desired state doesn't match the actual state and schedules new Pods on healthy nodes.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <div class="accordion-header">
              <div class="accordion-question">NodePort vs LoadBalancer vs Ingress?</div>
              <span class="accordion-chevron">▼</span>
            </div>
            <div class="accordion-body">
              <div class="accordion-content">
                <b>NodePort</b>: Opens a specific port on all nodes.<br>
                <b>LoadBalancer</b>: Provisions an external cloud load balancer pointing to the NodePort.<br>
                <b>Ingress</b>: A smart router (Layer 7) that routes HTTP/HTTPS traffic to Services based on host/path rules, using a single external IP.
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `;

  // Wire accordions
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      item.classList.toggle('open');
    });
  });
}

export { renderInterviewPage };
