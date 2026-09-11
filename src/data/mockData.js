export const PRESET_RESUMES = [
  {
    id: 'res-1',
    name: 'Alex_Morgan_Senior_Software_Engineer.pdf',
    size: '2.4 MB',
    type: 'pdf',
    uploadedAt: '2026-09-08',
    summary: 'Full-stack software engineer with 5 years experience building scalable web applications using Python, JavaScript, React, SQL, and REST APIs.',
    experienceYears: 5,
    skills: ['Python', 'JavaScript', 'React', 'SQL', 'Git', 'REST APIs', 'Data Structures', 'Node.js', 'PostgreSQL', 'HTML5/CSS3', 'Agile/Scrum']
  },
  {
    id: 'res-2',
    name: 'Alex_Morgan_Data_Analyst.docx',
    size: '1.8 MB',
    type: 'docx',
    uploadedAt: '2026-09-05',
    summary: 'Data Analyst with strong statistics background, proficient in SQL, Python data analysis (Pandas, NumPy), Tableau dashboard creation, and ETL pipelines.',
    experienceYears: 3,
    skills: ['Python', 'SQL', 'Tableau', 'Pandas', 'NumPy', 'Excel (VBA)', 'Statistics', 'A/B Testing', 'PowerBI', 'Git']
  },
  {
    id: 'res-3',
    name: 'Alex_Morgan_Frontend_Architect.pdf',
    size: '3.1 MB',
    type: 'pdf',
    uploadedAt: '2026-08-28',
    summary: 'Frontend Engineer specializing in React, Next.js, TypeScript, Tailwind CSS, Web Performance, and Design Systems with 6 years experience.',
    experienceYears: 6,
    skills: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'Jest/RTL', 'GraphQL', 'REST APIs', 'Webpack/Vite', 'Git']
  }
];

export const PRESET_JOBS = [
  {
    id: 'job-1',
    title: 'Senior Full Stack Engineer',
    company: 'Stripe',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-time',
    experienceRequired: '4-6 years',
    educationRequired: "Bachelor's in Computer Science or equivalent",
    description: `We are looking for a Senior Full Stack Engineer to join our Core Infrastructure & Platform team.

Responsibilities:
- Architect, build, and maintain high-throughput backend microservices in Python and Java.
- Develop sleek, accessible, responsive frontend components in React and TypeScript.
- Own containerized deployments using Docker and Kubernetes on AWS.
- Collaborate with product managers and product designers to deliver world-class fintech APIs.
- Design resilient SQL and NoSQL data architectures with PostgreSQL.

Requirements:
- 4+ years of production experience with Python, React, and SQL.
- Hands-on experience with Docker, AWS cloud infrastructure, and Kubernetes.
- Deep understanding of CI/CD pipelines, System Design, and RESTful API architecture.
- Strong knowledge of Data Structures, Algorithms, and Software Design Patterns.`,
    presetAnalysisId: 'analysis-1'
  },
  {
    id: 'job-2',
    title: 'AI Platform & Backend Engineer',
    company: 'Anthropic',
    location: 'Remote',
    type: 'Full-time',
    experienceRequired: '3-5 years',
    educationRequired: "Master's or Bachelor's in CS/AI",
    description: `Join Anthropic to build secure, scalable backend services and API infrastructure powering next-generation Claude AI models.

Requirements:
- Strong proficiency in Python, PyTorch, and Data Structures.
- Experience scaling distributed systems on AWS / GCP.
- Containerization with Docker & Kubernetes.
- Vector database experience (Pinecone, Qdrant) is a major plus.
- CI/CD automation & automated testing frameworks.`,
    presetAnalysisId: 'analysis-2'
  },
  {
    id: 'job-3',
    title: 'Data & Analytics Engineer',
    company: 'Datadog',
    location: 'New York, NY',
    type: 'Full-time',
    experienceRequired: '3+ years',
    educationRequired: "Bachelor's in STEM",
    description: `Seeking a Data Engineer to manage big data pipelines, SQL transformations, and BI analytics dashboards.

Requirements:
- Proficiency in Python, SQL, and Snowflake / BigQuery.
- Experience with dbt, Airflow, and Apache Spark.
- Cloud platforms (AWS / Azure).
- Data modeling and data warehouse architecture.`,
    presetAnalysisId: 'analysis-3'
  }
];

export const MOCK_ANALYSIS_RESULTS = {
  'analysis-1': {
    id: 'analysis-1',
    jobTitle: 'Senior Full Stack Engineer',
    company: 'Stripe',
    analyzedAt: 'Just now',
    overallScore: 82,
    matchCategory: 'Strong Match',
    summary: 'Your resume strongly matches this role. You have most of the required technical skills (Python, React, SQL, REST APIs), but could improve your experience with Docker, AWS, and Kubernetes.',
    
    scores: {
      overall: 82,
      skills: 88,
      experience: 76,
      education: 92
    },

    skillsCategory: {
      matching: [
        { name: 'Python', importance: 'High', requirement: 'Required', evidence: '5 years experience building backend API services' },
        { name: 'Java', importance: 'Medium', requirement: 'Preferred', evidence: 'Coursework & core language experience' },
        { name: 'SQL', importance: 'High', requirement: 'Required', evidence: 'PostgreSQL database modeling & query optimization' },
        { name: 'React', importance: 'High', requirement: 'Required', evidence: '3+ years crafting reactive UIs & state management' },
        { name: 'Git', importance: 'High', requirement: 'Required', evidence: 'Version control in collaborative team workflows' },
        { name: 'REST APIs', importance: 'High', requirement: 'Required', evidence: 'Designed and consumed microservice endpoints' },
        { name: 'Data Structures', importance: 'High', requirement: 'Required', evidence: 'Solid computer science foundation' }
      ],
      missing: [
        { name: 'Docker', importance: 'High', requirement: 'Required', evidence: 'No explicit containerization tools listed on resume' },
        { name: 'AWS', importance: 'High', requirement: 'Required', evidence: 'Cloud provider experience is absent or minimal' },
        { name: 'Kubernetes', importance: 'Medium', requirement: 'Preferred', evidence: 'Orchestration tools missing from work history' }
      ],
      recommended: [
        { name: 'CI/CD', importance: 'Medium', requirement: 'Recommended', evidence: 'GitHub Actions / Jenkins pipelines' },
        { name: 'System Design', importance: 'High', requirement: 'Recommended', evidence: 'Scalable distributed architecture' },
        { name: 'Cloud Computing', importance: 'High', requirement: 'Recommended', evidence: 'Serverless & Cloud Native patterns' }
      ]
    },

    skillGapMatrix: [
      { id: 'sg-1', skill: 'Docker', jobRequirement: 'Required', resumeStatus: 'Missing', priority: 'High', category: 'DevOps & Infra' },
      { id: 'sg-2', skill: 'AWS', jobRequirement: 'Required', resumeStatus: 'Missing', priority: 'High', category: 'Cloud Infrastructure' },
      { id: 'sg-3', skill: 'Kubernetes', jobRequirement: 'Preferred', resumeStatus: 'Missing', priority: 'Medium', category: 'DevOps & Infra' },
      { id: 'sg-4', skill: 'CI/CD Pipelines', jobRequirement: 'Recommended', resumeStatus: 'Partial', priority: 'Medium', category: 'DevOps' },
      { id: 'sg-5', skill: 'Python', jobRequirement: 'Required', resumeStatus: 'Strong', priority: 'Low', category: 'Languages' },
      { id: 'sg-6', skill: 'React', jobRequirement: 'Required', resumeStatus: 'Strong', priority: 'Low', category: 'Frontend' },
      { id: 'sg-7', skill: 'SQL / PostgreSQL', jobRequirement: 'Required', resumeStatus: 'Strong', priority: 'Low', category: 'Database' }
    ],

    learningRecommendations: [
      {
        id: 'rec-1',
        skill: 'Docker',
        whyItMatters: 'Learn Docker fundamentals, containerization and Docker Compose for isolating environment dependencies.',
        estimatedTime: '8–12 hours',
        resourceTitle: 'Docker Mastery: Containerization from Zero to Hero',
        provider: 'Udemy / Official Docs',
        level: 'Beginner to Intermediate',
        rating: 4.8,
        url: 'https://docs.docker.com/get-started/'
      },
      {
        id: 'rec-2',
        skill: 'AWS (Amazon Web Services)',
        whyItMatters: 'Deploying cloud applications on AWS EC2, S3 storage buckets, and IAM security policies is mandatory for backend infrastructure.',
        estimatedTime: '15–20 hours',
        resourceTitle: 'AWS Certified Cloud Practitioner & Hands-On Labs',
        provider: 'AWS Skill Builder / Coursera',
        level: 'Intermediate',
        rating: 4.9,
        url: 'https://aws.amazon.com/training/'
      },
      {
        id: 'rec-3',
        skill: 'Kubernetes',
        whyItMatters: 'Understand pod scheduling, deployments, services, and ingress controllers for microservices.',
        estimatedTime: '10–14 hours',
        resourceTitle: 'Kubernetes for Developers & Microservice Engineers',
        provider: 'edX / Linux Foundation',
        level: 'Intermediate',
        rating: 4.7,
        url: 'https://kubernetes.io/docs/tutorials/'
      }
    ],

    resumeInsights: {
      strengths: [
        'Strong Python experience & API engineering background',
        'Good software development background with modern React frontend mastery',
        'Relevant academic projects and computer science fundamentals'
      ],
      improvements: [
        'Add measurable achievements (e.g. "Increased API throughput by 40%")',
        'Highlight cloud experience or side project deployment details',
        'Include Docker/AWS containerized project case studies'
      ],
      optimizationTips: [
        'Use specific ATS phrasing matching the job post: replace "web APIs" with "REST APIs & Microservices".',
        'Start bullet points with high-impact action verbs like "Architected", "Engineered", and "Optimized".',
        'Place a tech skills matrix high up on your resume layout.'
      ]
    },

    jobAnalysis: {
      title: 'Senior Full Stack Engineer',
      company: 'Stripe',
      experience: '4-6 years',
      education: "Bachelor's in CS or equivalent",
      technicalSkills: ['Python', 'React', 'SQL', 'Docker', 'AWS', 'Kubernetes', 'REST APIs', 'Java', 'Data Structures'],
      softSkills: ['Problem Solving', 'Cross-functional Collaboration', 'System Design Thinking', 'Agile Mindset'],
      keywords: {
        found: ['Python', 'React', 'SQL', 'REST APIs', 'Git', 'Data Structures', 'Java', 'PostgreSQL'],
        missing: ['Docker', 'AWS', 'Kubernetes', 'CI/CD', 'Microservices'],
        recommended: ['System Design', 'Serverless', 'Terraform', 'Unit Testing']
      }
    },

    matchPipeline: [
      { step: 'Resume', status: 'Parsed', score: 100, detail: 'Parsed 1,420 words' },
      { step: 'Skills', status: 'Matched', score: 88, detail: '7/10 target skills' },
      { step: 'Experience', status: 'Evaluated', score: 76, detail: '5 yrs vs 4-6 yrs' },
      { step: 'Education', status: 'Verified', score: 92, detail: 'BS Computer Science' },
      { step: 'Job Req', status: 'Aligned', score: 82, detail: 'High alignment' },
      { step: 'Overall Match', status: 'Complete', score: 82, detail: 'Strong candidate' }
    ]
  },

  'analysis-2': {
    id: 'analysis-2',
    jobTitle: 'AI Platform Engineer',
    company: 'Anthropic',
    analyzedAt: '2 days ago',
    overallScore: 78,
    matchCategory: 'Good Match',
    summary: 'Good baseline alignment with Python and algorithms. Could improve exposure to PyTorch, Vector Databases, and cloud infrastructure.',
    scores: { overall: 78, skills: 74, experience: 80, education: 88 },
    skillsCategory: {
      matching: [
        { name: 'Python', importance: 'High', requirement: 'Required', evidence: '5 years Python experience' },
        { name: 'Data Structures', importance: 'High', requirement: 'Required', evidence: 'CS algorithms coursework' },
        { name: 'Git', importance: 'High', requirement: 'Required', evidence: 'Version control workflows' }
      ],
      missing: [
        { name: 'PyTorch', importance: 'High', requirement: 'Required', evidence: 'Deep learning frameworks missing' },
        { name: 'Vector DBs', importance: 'High', requirement: 'Required', evidence: 'No Pinecone/Qdrant evidence' },
        { name: 'Docker', importance: 'High', requirement: 'Required', evidence: 'Containerization absent' }
      ],
      recommended: [
        { name: 'LangChain', importance: 'Medium', requirement: 'Recommended', evidence: 'LLM orchestrations' }
      ]
    },
    skillGapMatrix: [
      { id: 'sg-201', skill: 'PyTorch', jobRequirement: 'Required', resumeStatus: 'Missing', priority: 'High', category: 'AI/ML' },
      { id: 'sg-202', skill: 'Vector Databases', jobRequirement: 'Required', resumeStatus: 'Missing', priority: 'High', category: 'Database' },
      { id: 'sg-203', skill: 'Docker & K8s', jobRequirement: 'Required', resumeStatus: 'Missing', priority: 'High', category: 'DevOps' }
    ],
    learningRecommendations: [
      {
        id: 'rec-201',
        skill: 'PyTorch',
        whyItMatters: 'Learn deep learning tensor operations, neural network layers, and LLM fine-tuning techniques.',
        estimatedTime: '16–20 hours',
        resourceTitle: 'PyTorch Fundamentals for Deep Learning Engineers',
        provider: 'DeepLearning.AI',
        level: 'Intermediate',
        rating: 4.9,
        url: 'https://pytorch.org/tutorials/'
      }
    ],
    resumeInsights: {
      strengths: ['Solid core Python background', 'Good software engineering foundation'],
      improvements: ['Highlight AI or machine learning project work', 'Add vector database projects'],
      optimizationTips: ['Include keywords like RAG, Embeddings, and Prompt Engineering.']
    },
    jobAnalysis: {
      title: 'AI Platform Engineer',
      company: 'Anthropic',
      experience: '3-5 years',
      education: "Master's or Bachelor's in CS/AI",
      technicalSkills: ['Python', 'PyTorch', 'Vector DBs', 'Docker', 'AWS'],
      softSkills: ['Research Mindset', 'System Design'],
      keywords: {
        found: ['Python', 'Data Structures', 'Git'],
        missing: ['PyTorch', 'Vector DBs', 'Docker'],
        recommended: ['CUDA', 'LangChain', 'vLLM']
      }
    },
    matchPipeline: [
      { step: 'Resume', status: 'Parsed', score: 100, detail: 'Parsed' },
      { step: 'Skills', status: 'Matched', score: 74, detail: '3/6 skills' },
      { step: 'Experience', status: 'Evaluated', score: 80, detail: '5 yrs' },
      { step: 'Education', status: 'Verified', score: 88, detail: 'BS CS' },
      { step: 'Job Req', status: 'Aligned', score: 78, detail: 'Good' },
      { step: 'Overall Match', status: 'Complete', score: 78, detail: 'Good match' }
    ]
  }
};

export const RECENT_ANALYSES = [
  { id: 'analysis-1', title: 'Senior Full Stack Engineer', company: 'Stripe', score: 82, date: '10 mins ago', category: 'Strong Match' },
  { id: 'analysis-2', title: 'AI Platform Engineer', company: 'Anthropic', score: 78, date: '2 days ago', category: 'Good Match' },
  { id: 'analysis-3', title: 'Data Analyst', company: 'Datadog', score: 84, date: '5 days ago', category: 'Strong Match' },
  { id: 'analysis-4', title: 'Frontend Developer', company: 'Vercel', score: 78, date: '1 week ago', category: 'Good Match' }
];

export const USER_STATS = {
  resumesAnalyzed: 12,
  jobsMatched: 28,
  averageMatch: 76,
  skillsImproved: 14
};
