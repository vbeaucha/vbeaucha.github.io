export interface SubContext {
  label: string
  type: 'internal' | 'consulting'
  description: string
  bullets: string[]
}

export interface ExperienceEntry {
  company: string
  period: string
  role: string
  context?: string
  bullets: string[]
  subContexts?: SubContext[]
}

export interface SkillCategory {
  label: string
  items: string[]
}

export interface TutorialCard {
  id: 'git' | 'vim'
  title: string
  description: string
}

export interface CVData {
  name: { first: string; last: string }
  title: string
  contact: {
    email: string
    location: string
    linkedin: string
    github: string
  }
  about: string
  experiences: ExperienceEntry[]
  skills: SkillCategory[]
  education: { school: string; degree: string; specialization: string }
  openSource: { project: string; description: string; url: string }[]
  tutorials: TutorialCard[]
}

export const cv: CVData = {
  name: { first: 'Valentin', last: 'Beauchamp' },
  title: 'Lead DevOps / SRE',
  contact: {
    email: 'vbeaucha77@gmail.com',
    location: 'Croix, France',
    linkedin: 'valentin-beauchamp',
    github: 'vbeaucha',
  },
  about:
    'Cloud Native architecture expert and Kubernetes/PostgreSQL technical lead with 8+ years driving reliability and scalability of critical production systems. Co-defined the DevOps platform vision alongside a CTO, building GitOps workflows and SRE culture from the ground up. Hands-on with self-managed PostgreSQL clusters, Karpenter auto-scaling and DORA-driven engineering. Writing custom Rust extensions and Go tooling to maximise team efficiency and reduce infrastructure costs.',
  experiences: [
    {
      company: 'Adzuna',
      period: 'Jan. 2024 – Present',
      role: 'Lead DevOps / Infrastructure',
      context: 'Job search platform — 18 microservices, 8M+ daily requests',
      bullets: [
        'Infra & Networking: Technical lead for Kubernetes on AWS (2 clusters, 10–20 nodes) with Karpenter auto-scaling, VPC design, AWS NLB and Traefik in-cluster routing. Scaled from 20K applications/month to 50K/day while capping costs at $4k/month.',
        'SRE & Reliability: 99.9% SLA on 18 microservices — 8M+ requests/day and 70.9M PostgreSQL queries/day on a multi-AZ setup with cross-region DRP. DORA metrics: daily deployments, <15% change failure rate, post-mortem driven incident culture.',
        'IaC & GitOps: Full automation via OpenTofu/Atlantis, ArgoCD, GitHub Actions and CircleCI.',
        'Data & Event-Driven: Self-managed PostgreSQL cluster with Patroni HA on Kubernetes; authored Rust extensions handling S3 archive reads, Elasticsearch sync indexing and parallel-safe function execution. Kafka + Debezium CDC pipelines.',
        'Security & Compliance: ISO 27001 and GDPR-compliant infrastructure. Secret management via HashiCorp Vault and Vaultwarden.',
        'Observability: Prometheus, Grafana, OpenTelemetry, Telegraf, OpenObserve; Velero backup strategy.',
        'Internal Go SDK: Co-designed a full Go SDK covering database connection management and OpenTelemetry-native metrics, traces and log shipping.',
        'Platform & Leadership: Co-defined the DevOps platform vision with the CTO. Coached a team of 4 developers on DevOps practices.',
      ],
    },
    {
      company: 'Weaverize',
      period: '2021 – 2024',
      role: 'Embedded Engineer / DevOps',
      subContexts: [
        {
          label: 'Store Management SaaS',
          type: 'consulting',
          description: 'GCP / GKE — mission de consulting',
          bullets: [
            'Cloud Infrastructure: GCP/GKE',
            'Data: PostgreSQL (Aiven) & MongoDB (Atlas) administration.',
            'CI/CD: GitHub Actions, automated deployments and DevEx tooling.',
            'SRE: SLI/SLO management, Datadog monitoring, DRP strategy.',
            'Mentoring: 4 dev teams (5 each) on DevOps best practices.',
          ],
        },
        {
          label: 'SpreadTheLive',
          type: 'internal',
          description: 'Live streaming platform — Kubernetes / OVHCloud',
          bullets: [
            'Cloud Infrastructure: Kubernetes on OVHCloud; Terraform, Helm.',
            'SRE: SLI/SLO management, Datadog monitoring, DRP strategy.',
            'Mentoring: Guided 2 interns'
          ],
        },
      ],
      bullets: [],
    },
    {
      company: 'University of Lille',
      period: '2017 – 2021',
      role: 'Research Engineer',
      bullets: [
        'Medical Platform: Designed and deployed an embedded medical application across 10 clinics in Europe.',
        'Embedded Systems: High-performance C++ application design.',
        'XR & Real-Time: VR experience development (Unity / C#).',
        "Mentoring: Tutored 4 Master's AR/VR students; Git/GitLab expert.",
      ],
    },
  ],
  skills: [
    { label: 'Languages', items: ['Go', 'Rust','C++'] },
    { label: 'Database', items: ['PostgreSQL', 'Debezium', 'MongoDB'] },
    { label: 'Event-Driven', items: ['Kafka', 'NATS'] },
    { label: 'Containers', items: ['Docker', 'containerd', 'Podman', 'Kubernetes', 'Helm', 'Karpenter'] },
    { label: 'IaC', items: ['Terraform', 'OpenTofu', 'ArgoCD', 'Atlantis'] },
    { label: 'CI/CD', items: ['GitHub Actions', 'CircleCI'] },
    { label: 'Cloud', items: ['AWS', 'GCP'] },
    { label: 'Observability', items: ['Prometheus', 'Grafana', 'OpenObserve', 'Datadog', 'OpenTelemetry', 'Telegraf'] },
  ],
  education: {
    school: "Polytech'Lille",
    degree: 'Computer Engineering',
    specialization: 'Microelectronics & Automation',
  },
  openSource: [
    {
      project: 'Crunchy-data',
      description: 'PostgreSQL Operator for Kubernetes',
      url: 'https://github.com/CrunchyData/postgres-operator',
    },
    {
      project: 'Kubernetes',
      description: 'Kubelet volume metrics exporter',
      url: 'https://github.com/vbeaucha/kubelet-volume-stats-exporter',
    },
    {
      project: 'ZomboDB',
      description: 'PostgreSQL extension — PG16 & PG17 support',
      url: 'https://github.com/vbeaucha/zombodb/tree/vbeaucha/support-pg16-pg17',
    },
  ],
  tutorials: [
    {
      id: 'git',
      title: 'Git Tutorial',
      description: 'A comprehensive guide to mastering Git, from basic concepts to advanced techniques.',
    },
    {
      id: 'vim',
      title: 'Vim Tutorial',
      description: 'A simple and practical introduction to Vim.',
    },
  ],
}
