export const personalData = {
  name: "Ausaaf Nabi",
  title: "Software Engineer | Distributed Systems & ML Infrastructure",
  email: "nabiausaaf@gmail.com",
  location: "Eindhoven, Netherlands",
  website: "https://ausaafnabi.github.io",
  githubUsername: "ausaafnabi",
  summary:
    "Software engineer specializing in high-performance computing, distributed systems, and ML infrastructure, with a track record spanning GPU-accelerated computation, industrial automation, and autonomous robotics. I own systems end-to-end - from CUDA-level performance engineering to the architecture and cross-team coordination needed to ship them in production. Currently building autonomous robotic swarm systems, with a research background in GPU-accelerated bioinformatics published in Oxford GigaScience.",
  availableFor: ["Full-time", "Freelance", "Consulting"],
  social: [
    {
      name: "GitHub",
      url: "https://github.com/ausaafnabi",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/ausaaf-nabi",
    },
  ],
  experience: [
    {
      position: "Software Engineer",
      company: "Antfarm",
      period: "August 2025 - Present",
      achievements: [
        "Building autonomous robotic swarm systems, including coordination, control, and ROS-based integration",
        "Working across the ML and distributed systems stack for real-time robotic decision-making",
        "Applying large language models and event-driven architecture to swarm coordination problems",
      ],
    },
    {
      position: "Software Architect - B2B",
      company: "AmberFlux EdgeAI Private Limited",
      period: "February 2025 - July 2025",
      achievements: [
        "Architected workplace safety management software to evaluate employee effectiveness",
        "Partnered with the backend team to design internal systems for domain knowledge transfer across the organization",
        "Led development of realistic digital avatars for virtual sessions in collaboration with a cross-functional team",
      ],
    },
    {
      position: "Software Engineer",
      company: "VIRSIGN",
      period: "January 2024 - February 2025",
      achievements: [
        "Built an AI automation system for bridge, gantry, and portal boom crane operations",
        "Designed robust ETL data pipelines for data retention and continuous model training",
        "Engineered a Dockerized FastAPI backend for model deployment, with Prometheus/Grafana observability",
        "Developed a large-scale file synchronization protocol for decentralized OTA updates and file transfer",
        "Built Kafka-powered real-time data processing pipelines",
      ],
    },
    {
      position: "Bioinformatics Researcher",
      company: "BioCluster MIPT, Lab Medvedeva",
      period: "October 2022 - May 2024",
      achievements: [
        "Developed a massively parallel GPU distance-calculation toolkit for single-cell RNA sequence analysis and clustering",
        "Benchmarked and tested the toolkit across multiple cores on an HPC cluster using SLURM",
        "Co-authored scientific publications and contributed to ongoing research discussions",
      ],
    },
    {
      position: "Software Architect",
      company: "AmberFlux EdgeAI Private Limited",
      period: "November 2022 - January 2024",
      achievements: [
        "Designed software systems for AI-driven car repair and maintenance for a US-based client",
        "Institutionalized formal engineering methodologies to improve software delivery management",
        "Built optimized CI/CD deployment pipelines for cloud infrastructure",
        "Owned multiple concurrent workstreams across the SDLC",
      ],
    },
    {
      position: "Software Developer, Multi-access Edge Computing",
      company: "AmberFlux EdgeAI Private Limited",
      period: "July 2021 - October 2022",
      achievements: [
        "Built 5G multi-access edge computing (MEC) use cases and deployed applications to AWS",
        "Contributed to a diabetic retinopathy and macular disease prediction system using retinal imaging with computationally lightweight ML models",
      ],
    },
  ],
  education: [
    {
      degree: "Masters in Applied Physics and Mathematics",
      institution: "Moscow Institute of Physics and Technology (MIPT)",
      period: "October 2022 - June 2024",
      description:
        "Specialized in Applied Bioinformatics. Full scholarship via Opendoors Olympiad (Computer Science). GPA: 3.62.",
    },
    {
      degree: "Bachelor's in Computer Science",
      institution: "University of Delhi",
      period: "August 2019 - July 2022",
      description:
        "Focused on core computer science subjects and participated in academic and extracurricular tech projects.",
    },
  ],
  skills: {
    programmingLanguages: [
      { name: "Python", level: 95 },
      { name: "CUDA C++", level: 90 },
      { name: "SQL", level: 85 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "R", level: 80 },
      { name: "Golang", level: 75 },
      { name: "Java", level: 70 },
    ],
    frameworks: [
      { name: "System Architecture", level: 90 },
      { name: "FastAPI", level: 85 },
      { name: "TensorFlow", level: 85 },
      { name: "Event-Driven Systems", level: 80 },
      { name: "PyTorch", level: 80 },
      { name: "React", level: 80 },
      { name: "Next.js", level: 75 },
      { name: "ROS (Robot Operating System)", level: 75 },
      { name: "Django", level: 75 },
      { name: "Spring Boot", level: 65 },
    ],
    developerTools: [
      { name: "Docker", level: 90 },
      { name: "Git", level: 90 },
      { name: "Kafka", level: 80 },
      { name: "CI/CD", level: 80 },
      { name: "Kubernetes", level: 75 },
      { name: "Prometheus / Grafana", level: 75 },
      { name: "Redis", level: 70 },
      { name: "AWS", level: 70 },
      { name: "GCP", level: 65 },
    ],
    libraries: [
      { name: "Large Language Models (LLM)", level: 85 },
      { name: "NumPy", level: 90 },
      { name: "Pandas", level: 85 },
      { name: "OpenCV", level: 85 },
      { name: "scikit-learn", level: 80 },
      { name: "Redux", level: 75 },
      { name: "Matplotlib", level: 80 },
      { name: "Tailwind CSS", level: 85 },
    ],
    softSkills: [
      { name: "Technical Leadership", level: 85 },
      { name: "Cross-functional Collaboration", level: 85 },
      { name: "Team playing", level: 80 },
      { name: "Open communications", level: 75 },
      { name: "Management", level: 85 },
    ],
    languages: [
      { name: "English", level: 90 },
      { name: "Hindi", level: 100 },
      { name: "Dutch", level: 30 },
    ],
  },
  projects: [
    {
      name: "GADES",
      organization: "Lab Medvedeva",
      period: "November 2022 - April 2024",
      github: "https://github.com/lab-medvedeva/GADES-main",
      description:
        "GPU-Assisted Distance Estimation Software for pairwise distance matrices on dense and sparse scRNA data, with memory management that lifts GPU capacity limits and algorithmic handling of data sparsity. Supports both CPU and GPU execution.",
    },
    {
      name: "Reward Distribution Telegram Bot",
      organization: "Algent",
      period: "January 2024",
      features: [
        "Monitor relevant w3 contract",
        "Calculates and shows reward for the contract chain",
        "Configure multiple distributor accounts",
      ],
    },
  ],
  publications: [
    {
      title: "GPU-accelerated Kendall distance computation for large or sparse data",
      year: "2024",
      journal: "Oxford GigaScience",
      doi: "10.1093/gigascience/giae088",
      highlights: [
        "Implemented GADES, a GPU-enhanced software package for massively parallelized Kendall-distance matrices computation",
        "Achieved significant speedup in processing large datasets through optimized memory management and algorithmic solutions",
      ],
    },
    {
      title: "Effective Load Balancing and Load Sharing in Multi-access Edge Computing",
      year: "2023",
      publisher: "Springer Singapore",
      doi: "10.1007/978-981-19-9228-5_11",
      highlights: [
        "Developed a MEC framework for efficient load balancing and sharing in network congestion",
        "Proposed two algorithms for proactive load rationalization and data distribution",
      ],
    },
  ],
}
