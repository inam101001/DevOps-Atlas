/**
 * projects.js — 40 Real-World DevOps Project Challenges
 * DevOps Atlas Learning Portal
 */

const PROJECTS = [
  /* ── Tier 1: Docker Projects (1-8) ───────────────────────── */
  {
    id: 'p01',
    number: '01',
    title: 'Flask API Behind Nginx with Docker Compose',
    description: 'Build a Python Flask REST API and deploy it behind an Nginx reverse proxy using Docker Compose. Add a PostgreSQL database and pgAdmin. Configure environment variables properly.',
    difficulty: 'beginner',
    technology: ['Docker', 'Nginx', 'Linux'],
    estimatedHours: 3,
    skills: ['Dockerfile', 'Docker Compose', 'Nginx config', 'Reverse proxy', 'PostgreSQL'],
    whatYouLearn: [
      'Multi-container Docker Compose setup',
      'Nginx as a reverse proxy to a backend',
      'Database containers with volumes',
      'Environment variable management',
    ],
    deliverable: 'Running multi-container app accessible on port 80 with DB persistence'
  },
  {
    id: 'p02',
    number: '02',
    title: 'Multi-Stage Docker Build for Node.js App',
    description: 'Take a Node.js Express application and write a multi-stage Dockerfile that produces an image under 100MB. Compare single-stage vs multi-stage image sizes. Add a non-root user.',
    difficulty: 'beginner',
    technology: ['Docker'],
    estimatedHours: 2,
    skills: ['Multi-stage builds', 'Layer optimisation', 'Alpine images', 'Non-root users'],
    whatYouLearn: [
      'How multi-stage builds reduce image size',
      'Docker layer caching strategies',
      'Container security basics',
      'Build ARG vs ENV',
    ],
    deliverable: 'Production Docker image under 100MB with security hardening'
  },
  {
    id: 'p03',
    number: '03',
    title: 'Docker Swarm Cluster with Rolling Updates',
    description: 'Set up a 3-node Docker Swarm cluster using Play with Docker. Deploy a service with 5 replicas, perform a rolling update, simulate node failure, and watch Swarm recover.',
    difficulty: 'intermediate',
    technology: ['Docker'],
    estimatedHours: 4,
    skills: ['Docker Swarm', 'Services', 'Rolling updates', 'Fault tolerance'],
    whatYouLearn: [
      'Container orchestration concepts',
      'Service discovery in Swarm',
      'Rolling update strategies',
      'High availability patterns',
    ],
    deliverable: 'HA Docker Swarm cluster with zero-downtime rolling updates'
  },
  {
    id: 'p04',
    number: '04',
    title: 'Private Docker Registry with Authentication',
    description: 'Set up a private Docker registry using the official registry:2 image. Add Nginx as TLS termination and authentication. Push and pull images from your private registry.',
    difficulty: 'intermediate',
    technology: ['Docker', 'Nginx', 'Security'],
    estimatedHours: 3,
    skills: ['Docker registry', 'TLS', 'Basic auth', 'Nginx config'],
    whatYouLearn: [
      'Running a private image registry',
      'TLS certificate configuration',
      'Image versioning and tagging',
      'Registry security',
    ],
    deliverable: 'Private Docker registry with HTTPS and authentication'
  },
  {
    id: 'p05',
    number: '05',
    title: 'Containerise a Microservices Application',
    description: 'Take a sample 3-service microservices app (API gateway, user service, product service). Write Dockerfiles for each, compose them with Docker Compose, set up inter-service networking.',
    difficulty: 'intermediate',
    technology: ['Docker'],
    estimatedHours: 5,
    skills: ['Microservices', 'Service communication', 'Docker networks', 'API gateway'],
    whatYouLearn: [
      'Microservices communication patterns',
      'Docker internal DNS for service discovery',
      'Health checks in Docker Compose',
      'Dependency management between services',
    ],
    deliverable: 'Fully containerised microservices app with service-to-service communication'
  },

  /* ── Tier 2: Kubernetes Projects (6-15) ─────────────────── */
  {
    id: 'p06',
    number: '06',
    title: 'Deploy a Microservices App on Kubernetes',
    description: 'Take the Docker Compose microservices app and convert it to Kubernetes manifests. Create Deployments, Services, ConfigMaps, and Secrets. Use KillerCoda or Play with Kubernetes.',
    difficulty: 'intermediate',
    technology: ['Kubernetes'],
    estimatedHours: 5,
    skills: ['Deployments', 'Services', 'ConfigMaps', 'Secrets', 'kubectl'],
    whatYouLearn: [
      'Translating Docker Compose to K8s manifests',
      'Service discovery in Kubernetes',
      'Configuration and secret management',
      'kubectl troubleshooting',
    ],
    deliverable: 'Microservices app running on Kubernetes with proper networking'
  },
  {
    id: 'p07',
    number: '07',
    title: 'Zero-Downtime Rolling Updates on Kubernetes',
    description: 'Deploy a web app to Kubernetes, then simulate a version upgrade using rolling updates. Configure readiness and liveness probes. Test rollback after a bad deployment.',
    difficulty: 'intermediate',
    technology: ['Kubernetes'],
    estimatedHours: 3,
    skills: ['Rolling updates', 'Probes', 'Rollbacks', 'Deployment strategy'],
    whatYouLearn: [
      'Rolling update vs recreate strategy',
      'Readiness and liveness probes',
      'How to safely roll back a deployment',
      'Surge and unavailable settings',
    ],
    deliverable: 'Zero-downtime deployment workflow with automated rollback'
  },
  {
    id: 'p08',
    number: '08',
    title: 'Kubernetes RBAC for a Multi-Team Cluster',
    description: 'Create a Kubernetes cluster shared by two teams (dev and ops). Set up separate namespaces, Roles, RoleBindings, and ServiceAccounts. Verify access isolation between teams.',
    difficulty: 'intermediate',
    technology: ['Kubernetes', 'Security'],
    estimatedHours: 4,
    skills: ['RBAC', 'Namespaces', 'ServiceAccounts', 'Role', 'ClusterRole'],
    whatYouLearn: [
      'Multi-tenant Kubernetes setup',
      'Principle of least privilege in K8s',
      'ServiceAccount token usage',
      'kubectl auth can-i verification',
    ],
    deliverable: 'Multi-team Kubernetes cluster with full access isolation'
  },
  {
    id: 'p09',
    number: '09',
    title: 'Auto-Scaling App with HPA and Load Testing',
    description: 'Deploy a CPU-intensive web app, configure HPA, then use Apache Bench or k6 to generate load. Watch pods scale up automatically. Verify scale-down after load drops.',
    difficulty: 'intermediate',
    technology: ['Kubernetes'],
    estimatedHours: 4,
    skills: ['HPA', 'Metrics Server', 'Load testing', 'Autoscaling'],
    whatYouLearn: [
      'Metrics Server setup and configuration',
      'Writing effective HPA specs',
      'Load testing tools (k6, ab)',
      'Cost vs performance tradeoffs',
    ],
    deliverable: 'Application that auto-scales under load with HPA'
  },
  {
    id: 'p10',
    number: '10',
    title: 'StatefulSet: Deploy a PostgreSQL HA Cluster',
    description: 'Deploy PostgreSQL as a Kubernetes StatefulSet with persistent volumes. Set up primary-replica replication. Test failover. Implement a backup CronJob to save dumps to a volume.',
    difficulty: 'advanced',
    technology: ['Kubernetes'],
    estimatedHours: 6,
    skills: ['StatefulSet', 'PersistentVolumes', 'CronJob', 'Database backup', 'Replication'],
    whatYouLearn: [
      'StatefulSet vs Deployment patterns',
      'Stable network identities for pods',
      'Database backup automation',
      'Storage class configuration',
    ],
    deliverable: 'HA PostgreSQL cluster with automated backups'
  },
  {
    id: 'p11',
    number: '11',
    title: 'Ingress with TLS, Path, and Host Routing',
    description: 'Install Nginx Ingress Controller, configure TLS with self-signed certificates, and route traffic to multiple services via both path-based and host-based routing rules.',
    difficulty: 'intermediate',
    technology: ['Kubernetes', 'Nginx', 'Security'],
    estimatedHours: 4,
    skills: ['Ingress', 'Nginx Ingress', 'TLS', 'Host routing', 'Path routing'],
    whatYouLearn: [
      'Nginx Ingress Controller setup',
      'TLS termination at the ingress layer',
      'Host vs path-based routing',
      'Cert-Manager for automatic certificates',
    ],
    deliverable: 'Production-ready ingress routing multiple services with TLS'
  },
  {
    id: 'p12',
    number: '12',
    title: 'Network Policies — Zero Trust K8s Cluster',
    description: 'Start with an open cluster, then progressively apply Network Policies to restrict all pod-to-pod traffic. Allow only required communication paths. Verify isolation with curl tests.',
    difficulty: 'advanced',
    technology: ['Kubernetes', 'Networking', 'Security'],
    estimatedHours: 5,
    skills: ['Network Policies', 'Calico', 'Zero-trust', 'Pod isolation'],
    whatYouLearn: [
      'Default-deny networking approach',
      'Namespace and pod selectors in policies',
      'Debugging network policy issues',
      'The principle of zero-trust networking',
    ],
    deliverable: 'Zero-trust Kubernetes cluster with verified traffic isolation'
  },

  /* ── Tier 3: CI/CD Projects (13-20) ─────────────────────── */
  {
    id: 'p13',
    number: '13',
    title: 'GitHub Actions: Full CI Pipeline for a Python App',
    description: 'Create a GitHub Actions workflow that runs on PRs: lint with flake8, test with pytest, check coverage, build Docker image, and push to GHCR. Fail the PR if any check fails.',
    difficulty: 'intermediate',
    technology: ['GitHub Actions', 'Docker', 'CI/CD'],
    estimatedHours: 4,
    skills: ['GitHub Actions', 'Python testing', 'Coverage', 'Docker build', 'GHCR'],
    whatYouLearn: [
      'Writing production-grade CI workflows',
      'GitHub Actions secrets and contexts',
      'Caching pip dependencies in Actions',
      'PR checks and status reporting',
    ],
    deliverable: 'Full CI pipeline that blocks merges on test failure'
  },
  {
    id: 'p14',
    number: '14',
    title: 'GitHub Actions: CD Pipeline to Kubernetes',
    description: 'Extend the CI pipeline: on merge to main, update the Kubernetes deployment image tag via kubectl or kustomize. Use GitHub secrets for kubeconfig. Notify Slack on deployment.',
    difficulty: 'intermediate',
    technology: ['GitHub Actions', 'Kubernetes', 'CI/CD'],
    estimatedHours: 5,
    skills: ['Deployment automation', 'kubectl in CI', 'Kubernetes secrets', 'Slack webhooks'],
    whatYouLearn: [
      'Secure kubeconfig handling in CI',
      'Image tag update automation',
      'Slack webhook notifications',
      'Deployment environment approvals',
    ],
    deliverable: 'Fully automated CD pipeline to Kubernetes with Slack notifications'
  },
  {
    id: 'p15',
    number: '15',
    title: 'Jenkins Declarative Pipeline with Docker',
    description: 'Set up Jenkins in Docker, connect it to a GitHub repository, and write a Jenkinsfile with stages: Checkout → Build → Test → Docker Build → Push to Registry → Deploy.',
    difficulty: 'intermediate',
    technology: ['Jenkins', 'Docker', 'CI/CD'],
    estimatedHours: 5,
    skills: ['Jenkinsfile', 'Pipeline stages', 'Docker agents', 'GitHub webhook', 'Credentials'],
    whatYouLearn: [
      'Jenkins declarative pipeline syntax',
      'Using Docker as Jenkins agent',
      'Managing credentials in Jenkins',
      'Webhook configuration for auto-trigger',
    ],
    deliverable: 'Full 6-stage Jenkins pipeline triggered by GitHub push'
  },
  {
    id: 'p16',
    number: '16',
    title: 'Multi-Environment CI/CD with GitHub Actions',
    description: 'Build a CI/CD pipeline that deploys to dev on every push, staging on PR merge, and production only after manual approval. Use GitHub Environments and protection rules.',
    difficulty: 'advanced',
    technology: ['GitHub Actions', 'CI/CD'],
    estimatedHours: 5,
    skills: ['GitHub Environments', 'Protection rules', 'Manual approval', 'Multi-stage CD'],
    whatYouLearn: [
      'GitHub Environments and protection rules',
      'Manual approval gates in GitHub Actions',
      'Environment-specific secrets',
      'Deployment promotion strategies',
    ],
    deliverable: 'Three-environment CD pipeline with approval gate for production'
  },

  /* ── Tier 4: Infrastructure as Code (17-22) ─────────────── */
  {
    id: 'p17',
    number: '17',
    title: 'Terraform: Provision a Complete AWS VPC',
    description: 'Using only Terraform, provision an AWS VPC with public and private subnets across 2 AZs, NAT Gateway, Internet Gateway, security groups, and route tables. Store state in S3.',
    difficulty: 'intermediate',
    technology: ['Terraform', 'AWS'],
    estimatedHours: 5,
    skills: ['Terraform', 'AWS VPC', 'Subnets', 'NAT Gateway', 'Remote state'],
    whatYouLearn: [
      'Terraform resource dependencies',
      'Multi-AZ architecture patterns',
      'Remote state with S3 and DynamoDB locking',
      'Terraform output values',
    ],
    deliverable: 'Production-ready AWS VPC entirely managed by Terraform'
  },
  {
    id: 'p18',
    number: '18',
    title: 'Terraform Modules: Reusable VPC & EC2 Module',
    description: 'Refactor the VPC Terraform code into reusable modules. Create a VPC module and an EC2 module. Use them together in a root module for two environments: dev and prod.',
    difficulty: 'intermediate',
    technology: ['Terraform'],
    estimatedHours: 4,
    skills: ['Terraform modules', 'Input variables', 'Output values', 'Module composition'],
    whatYouLearn: [
      'Module design and interface design',
      'Input validation and defaults',
      'Module registry publishing',
      'DRY infrastructure code',
    ],
    deliverable: 'Reusable Terraform modules for VPC and EC2 with two environments'
  },
  {
    id: 'p19',
    number: '19',
    title: 'Ansible: Automate a Web Server Farm',
    description: 'Use Ansible to configure 3 Ubuntu servers: install Nginx, deploy a static site, configure SSL with self-signed certs, set up log rotation, and create system users with SSH keys.',
    difficulty: 'intermediate',
    technology: ['Ansible', 'Linux', 'Nginx'],
    estimatedHours: 4,
    skills: ['Ansible playbooks', 'Roles', 'Templates', 'Inventory', 'Jinja2'],
    whatYouLearn: [
      'Idempotent configuration management',
      'Ansible role structure',
      'Jinja2 templating for configs',
      'Ansible vault for secrets',
    ],
    deliverable: 'Fully configured web server fleet managed entirely by Ansible'
  },
  {
    id: 'p20',
    number: '20',
    title: 'Terraform + Ansible: Full Infrastructure + Config',
    description: 'Combine Terraform and Ansible: Terraform provisions EC2 instances, Ansible configures them. Use Terraform\'s local-exec to run Ansible after provisioning. Fully automated.',
    difficulty: 'advanced',
    technology: ['Terraform', 'Ansible', 'AWS'],
    estimatedHours: 6,
    skills: ['Terraform + Ansible integration', 'Dynamic inventory', 'local-exec', 'Automation'],
    whatYouLearn: [
      'Combining IaC and configuration management',
      'Dynamic Ansible inventory from Terraform output',
      'Full infrastructure automation from zero',
      'Handling SSH key provisioning',
    ],
    deliverable: 'Single terraform apply command provisions and fully configures EC2 fleet'
  },

  /* ── Tier 5: GitOps & ArgoCD Projects (21-26) ─────────── */
  {
    id: 'p21',
    number: '21',
    title: 'ArgoCD: GitOps Deployment Pipeline',
    description: 'Set up ArgoCD on a K8s cluster. Create an Application that syncs from a GitHub repo. Push a change to Git and watch ArgoCD automatically sync the cluster. Enable auto-sync.',
    difficulty: 'intermediate',
    technology: ['ArgoCD', 'Kubernetes', 'GitHub'],
    estimatedHours: 4,
    skills: ['ArgoCD', 'GitOps', 'Auto-sync', 'Drift detection', 'Application CRDs'],
    whatYouLearn: [
      'GitOps principles in practice',
      'ArgoCD application management',
      'Handling drift detection',
      'Manual sync vs auto-sync',
    ],
    deliverable: 'GitOps workflow where Git is the single source of truth'
  },
  {
    id: 'p22',
    number: '22',
    title: 'ArgoCD + Helm: Multi-Environment GitOps',
    description: 'Create an ArgoCD App-of-Apps pattern for dev/staging/prod environments. Each uses the same Helm chart with different values.yaml overrides. Deployments are fully Git-driven.',
    difficulty: 'advanced',
    technology: ['ArgoCD', 'Helm', 'Kubernetes'],
    estimatedHours: 6,
    skills: ['App-of-Apps', 'Helm value overrides', 'ApplicationSet', 'Environment promotion'],
    whatYouLearn: [
      'App-of-Apps pattern in ArgoCD',
      'Helm value hierarchy for environments',
      'ApplicationSet controller',
      'Progressive environment promotion',
    ],
    deliverable: 'Multi-environment GitOps with ArgoCD ApplicationSets'
  },
  {
    id: 'p23',
    number: '23',
    title: 'Argo Rollouts: Canary Deployment',
    description: 'Replace a standard Kubernetes Deployment with an Argo Rollout. Configure a canary strategy that sends 10% → 30% → 100% of traffic progressively. Add Prometheus analysis for automatic promotion.',
    difficulty: 'advanced',
    technology: ['ArgoCD', 'Kubernetes', 'Prometheus'],
    estimatedHours: 5,
    skills: ['Argo Rollouts', 'Canary deployment', 'Traffic splitting', 'Analysis templates'],
    whatYouLearn: [
      'Progressive delivery patterns',
      'Automated canary analysis',
      'Traffic splitting in Kubernetes',
      'Rollout promotion and abort',
    ],
    deliverable: 'Production canary deployment with automated metrics-based promotion'
  },

  /* ── Tier 6: Monitoring Projects (24-28) ─────────────── */
  {
    id: 'p24',
    number: '24',
    title: 'Full Monitoring Stack for a Kubernetes Cluster',
    description: 'Deploy kube-prometheus-stack via Helm. Set up dashboards for cluster resources, node metrics, and application latency/errors. Configure alerts for PodCrashLooping and high CPU.',
    difficulty: 'intermediate',
    technology: ['Kubernetes', 'Prometheus', 'Grafana'],
    estimatedHours: 5,
    skills: ['Prometheus Operator', 'ServiceMonitor', 'Grafana dashboards', 'AlertManager'],
    whatYouLearn: [
      'Prometheus Operator and CRDs',
      'ServiceMonitor for automatic scraping',
      'Building Grafana dashboards from scratch',
      'Writing meaningful alert rules',
    ],
    deliverable: 'Full observability stack with dashboards and automated alerting'
  },
  {
    id: 'p25',
    number: '25',
    title: 'Custom Application Metrics with Prometheus',
    description: 'Instrument a Python/Node.js application with Prometheus client libraries. Expose /metrics endpoint. Create a ServiceMonitor, write PromQL queries, and build a Grafana dashboard.',
    difficulty: 'intermediate',
    technology: ['Kubernetes', 'Prometheus'],
    estimatedHours: 4,
    skills: ['Prometheus client', 'Custom metrics', 'Counters', 'Histograms', 'PromQL'],
    whatYouLearn: [
      'Instrumenting application code',
      'Prometheus metric types (Counter, Gauge, Histogram)',
      'Writing PromQL for latency percentiles',
      'SLI/SLO concepts',
    ],
    deliverable: 'Application with custom metrics, PromQL queries, and Grafana dashboard'
  },
  {
    id: 'p26',
    number: '26',
    title: 'Log Aggregation with ELK Stack',
    description: 'Deploy Elasticsearch, Logstash (or Fluentd), and Kibana on Kubernetes. Configure Fluentd as a DaemonSet to collect pod logs. Create Kibana dashboards for log analysis.',
    difficulty: 'advanced',
    technology: ['Kubernetes', 'Prometheus'],
    estimatedHours: 6,
    skills: ['Elasticsearch', 'Kibana', 'Fluentd DaemonSet', 'Log parsing', 'Index patterns'],
    whatYouLearn: [
      'Centralised log aggregation',
      'DaemonSet for cluster-wide log collection',
      'Log parsing with Grok patterns',
      'Kibana search and visualization',
    ],
    deliverable: 'Centralised logging system collecting all pod logs into searchable Kibana'
  },

  /* ── Tier 7: AWS Projects (27-32) ────────────────────── */
  {
    id: 'p27',
    number: '27',
    title: 'Serverless API with AWS Lambda & API Gateway',
    description: 'Build a REST API using AWS Lambda functions in Python. Set up API Gateway as the HTTP frontend. Use DynamoDB for storage. Deploy everything using AWS SAM or Terraform.',
    difficulty: 'intermediate',
    technology: ['AWS'],
    estimatedHours: 5,
    skills: ['Lambda', 'API Gateway', 'DynamoDB', 'IAM roles', 'SAM or Terraform'],
    whatYouLearn: [
      'Serverless architecture patterns',
      'Lambda function deployment',
      'API Gateway integration',
      'Event-driven design',
    ],
    deliverable: 'Fully serverless REST API deployed on AWS with IaC'
  },
  {
    id: 'p28',
    number: '28',
    title: 'EKS: Deploy Production Kubernetes on AWS',
    description: 'Use eksctl or Terraform to create an EKS cluster. Configure node groups, IRSA for pod IAM permissions, AWS Load Balancer Controller, and Cluster Autoscaler. Deploy a sample app.',
    difficulty: 'advanced',
    technology: ['AWS', 'Kubernetes', 'Terraform'],
    estimatedHours: 8,
    skills: ['EKS', 'eksctl', 'IRSA', 'AWS LBC', 'Cluster Autoscaler'],
    whatYouLearn: [
      'Production-grade EKS setup',
      'IRSA (IAM Roles for Service Accounts)',
      'AWS Load Balancer Controller',
      'Cost-optimised node group configuration',
    ],
    deliverable: 'Production-ready EKS cluster with autoscaling and IAM integration'
  },
  {
    id: 'p29',
    number: '29',
    title: 'AWS CodePipeline: Full CI/CD for ECS',
    description: 'Create a CodePipeline that triggers on GitHub commits, runs CodeBuild to build and push Docker image to ECR, then deploys to ECS with blue-green deployment via CodeDeploy.',
    difficulty: 'advanced',
    technology: ['AWS', 'Docker', 'CI/CD'],
    estimatedHours: 7,
    skills: ['CodePipeline', 'CodeBuild', 'ECR', 'ECS', 'CodeDeploy', 'Blue-green'],
    whatYouLearn: [
      'Native AWS CI/CD toolchain',
      'ECR image lifecycle management',
      'Blue-green deployment on ECS',
      'CodeBuild buildspec.yml',
    ],
    deliverable: 'End-to-end AWS native CI/CD pipeline with zero-downtime deployments'
  },

  /* ── Tier 8: Full End-to-End Projects (30-40) ────────── */
  {
    id: 'p30',
    number: '30',
    title: 'Production-Like Microservices Platform',
    description: 'Build a complete platform: 3-service microservices app, Kubernetes cluster (KillerCoda), Helm charts, ArgoCD for GitOps, GitHub Actions CI, Prometheus/Grafana monitoring, and Nginx ingress with TLS.',
    difficulty: 'advanced',
    technology: ['Kubernetes', 'Docker', 'ArgoCD', 'Prometheus', 'Grafana', 'GitHub Actions', 'Helm'],
    estimatedHours: 20,
    skills: ['Everything covered in the roadmap'],
    whatYouLearn: [
      'How all DevOps tools fit together in practice',
      'End-to-end ownership of a platform',
      'Production-grade configuration management',
      'Observability from day one',
    ],
    deliverable: 'A full production-like platform you can demo in interviews'
  },
  {
    id: 'p31',
    number: '31',
    title: 'Disaster Recovery: Backup & Restore Kubernetes',
    description: 'Set up Velero for Kubernetes backup. Backup all resources and PVCs. Simulate a disaster by deleting the namespace. Restore from backup and verify applications come back correctly.',
    difficulty: 'advanced',
    technology: ['Kubernetes'],
    estimatedHours: 5,
    skills: ['Velero', 'Backup', 'Restore', 'PVC backup', 'Disaster recovery'],
    whatYouLearn: [
      'Kubernetes disaster recovery strategy',
      'Velero installation and configuration',
      'Backup schedules and retention',
      'Testing restore procedures',
    ],
    deliverable: 'Tested backup and restore procedure for a Kubernetes cluster'
  },
  {
    id: 'p32',
    number: '32',
    title: 'Security Scanning in CI/CD Pipeline',
    description: 'Add security scanning to your GitHub Actions pipeline: Trivy for container image scanning, Checkov for Terraform/K8s IaC scanning, OWASP ZAP for DAST. Block pipeline on critical findings.',
    difficulty: 'advanced',
    technology: ['GitHub Actions', 'Docker', 'Security', 'Kubernetes'],
    estimatedHours: 4,
    skills: ['Trivy', 'Checkov', 'SAST', 'DAST', 'Security gates in CI'],
    whatYouLearn: [
      'DevSecOps principles',
      'Container image vulnerability scanning',
      'Infrastructure security scanning',
      'Security as a pipeline gate',
    ],
    deliverable: 'CI/CD pipeline with automated security scanning and enforcement'
  },
  {
    id: 'p33',
    number: '33',
    title: 'Cost Optimisation: Kubernetes Resource Requests & Limits',
    description: 'Audit a Kubernetes cluster for over-provisioned pods. Use kubectl top and Goldilocks to get recommendations. Set correct resource requests/limits and use LimitRange/ResourceQuota.',
    difficulty: 'intermediate',
    technology: ['Kubernetes'],
    estimatedHours: 3,
    skills: ['Resource requests', 'Limits', 'LimitRange', 'ResourceQuota', 'Goldilocks', 'VPA'],
    whatYouLearn: [
      'Kubernetes resource management',
      'How requests and limits affect scheduling',
      'Quality of Service classes',
      'Cost optimisation at the cluster level',
    ],
    deliverable: 'Optimised cluster with right-sized resource configurations'
  },
  {
    id: 'p34',
    number: '34',
    title: 'Deploy a Full Observability Stack (Loki + Tempo)',
    description: 'Add Loki for log aggregation and Tempo for distributed tracing to your existing Prometheus/Grafana setup. Create a unified Grafana dashboard showing metrics, logs, and traces correlated.',
    difficulty: 'advanced',
    technology: ['Kubernetes', 'Grafana', 'Prometheus'],
    estimatedHours: 7,
    skills: ['Loki', 'Tempo', 'Grafana datasources', 'Distributed tracing', 'Log correlation'],
    whatYouLearn: [
      'The three pillars of observability',
      'Distributed tracing concepts',
      'Grafana Loki log querying (LogQL)',
      'Correlating metrics, logs, and traces',
    ],
    deliverable: 'Complete observability stack: metrics + logs + traces in Grafana'
  },
  {
    id: 'p35',
    number: '35',
    title: 'Chaos Engineering: Simulate Failures with Chaos Monkey',
    description: 'Install Chaos Mesh or Chaos Monkey on your Kubernetes cluster. Design and run chaos experiments: kill random pods, simulate network latency, test your application\'s resilience.',
    difficulty: 'advanced',
    technology: ['Kubernetes'],
    estimatedHours: 5,
    skills: ['Chaos Engineering', 'Chaos Mesh', 'Resilience testing', 'SRE practices'],
    whatYouLearn: [
      'Chaos engineering principles',
      'Identifying single points of failure',
      'Designing resilient microservices',
      'Runbook creation for failure scenarios',
    ],
    deliverable: 'Chaos engineering report proving application resilience'
  },
  {
    id: 'p36',
    number: '36',
    title: 'Terraform: Multi-Cloud Infrastructure (AWS + GCP)',
    description: 'Use Terraform with multiple providers to deploy infrastructure on both AWS and GCP simultaneously. Deploy an application to both clouds behind a global load balancer (Cloudflare).',
    difficulty: 'advanced',
    technology: ['Terraform', 'AWS', 'GCP'],
    estimatedHours: 8,
    skills: ['Multi-cloud', 'Terraform providers', 'Global load balancing', 'DNS failover'],
    whatYouLearn: [
      'Multi-cloud architecture design',
      'Terraform workspace management',
      'Global load balancing and DNS',
      'Cloud-agnostic Terraform modules',
    ],
    deliverable: 'Application deployed on two clouds with global traffic routing'
  },
  {
    id: 'p37',
    number: '37',
    title: 'Service Mesh with Istio: Traffic Management',
    description: 'Install Istio on a Kubernetes cluster. Implement traffic management: weighted routing, circuit breaking, retries, and timeout policies. Visualise with Kiali. Enable mTLS between services.',
    difficulty: 'advanced',
    technology: ['Kubernetes'],
    estimatedHours: 7,
    skills: ['Istio', 'VirtualService', 'DestinationRule', 'Kiali', 'mTLS', 'Circuit breaking'],
    whatYouLearn: [
      'Service mesh architecture and benefits',
      'Fine-grained traffic control',
      'Service-to-service mTLS encryption',
      'Observability via Kiali, Jaeger, Prometheus',
    ],
    deliverable: 'Service mesh with canary routing, circuit breaking, and mTLS'
  },
  {
    id: 'p38',
    number: '38',
    title: 'Platform Engineering: Internal Developer Platform',
    description: 'Build a simple Internal Developer Platform (IDP) using Backstage or Port. Register services, expose documentation, automate developer self-service (new repo scaffolding, deploy button).',
    difficulty: 'advanced',
    technology: ['Kubernetes', 'CI/CD'],
    estimatedHours: 10,
    skills: ['Backstage', 'Developer portal', 'Software catalogue', 'Self-service', 'Golden paths'],
    whatYouLearn: [
      'Platform engineering concepts',
      'Internal Developer Portal setup',
      'Golden path templates',
      'Reducing developer cognitive load',
    ],
    deliverable: 'Working Internal Developer Platform with self-service deployment'
  },
  {
    id: 'p39',
    number: '39',
    title: 'GitHub Actions: Automated Release Management',
    description: 'Create a GitHub Actions workflow for semantic versioning and automated releases. On merge to main: bump version, generate CHANGELOG, create GitHub Release, build and tag Docker image.',
    difficulty: 'intermediate',
    technology: ['GitHub Actions', 'CI/CD'],
    estimatedHours: 3,
    skills: ['Semantic versioning', 'Conventional commits', 'CHANGELOG generation', 'GitHub Releases'],
    whatYouLearn: [
      'Semantic versioning conventions',
      'Conventional commits standard',
      'Automated release notes generation',
      'Release artifact management',
    ],
    deliverable: 'Fully automated release pipeline with semantic versioning'
  },
  {
    id: 'p40',
    number: '40',
    title: 'Complete DevOps Portfolio Project',
    description: 'Your capstone. Deploy a real web application end-to-end: Terraform provisions AWS infra, Ansible configures servers, Docker containerises the app, Kubernetes orchestrates it, GitHub Actions deploys it, ArgoCD manages GitOps, Prometheus monitors it. Document everything.',
    difficulty: 'advanced',
    technology: ['Kubernetes', 'Docker', 'Terraform', 'Ansible', 'GitHub Actions', 'ArgoCD', 'Prometheus', 'AWS'],
    estimatedHours: 30,
    skills: ['Everything. This is your portfolio project.'],
    whatYouLearn: [
      'How to architect a real production system',
      'Integrating all DevOps tools together',
      'Writing production-grade documentation',
      'How to present this in an interview',
    ],
    deliverable: 'Your DevOps portfolio project — ready to show in interviews'
  },
];

export { PROJECTS };
