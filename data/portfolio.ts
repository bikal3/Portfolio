// data/portfolio.ts

export interface Project {
  title: string
  description: string
  technologies: string[]
  link?: string
  image?: string
}

export interface Education {
  degree: string
  institution: string
  dates: string
}

export interface Experience {
  role: string
  organization: string
  dates: string
  description: string
}

export const projects: Project[] = [
  {
    title: 'Spatial Analysis of Building Density Across Rwanda',
    description:
      'Visualizes building coverage percentage across administrative zones in Rwanda using a color gradient from low to high density. Useful for urban planning, resource allocation, and understanding regional population distribution.',
    technologies: ['Python', 'Dask-GeoPandas', 'AWS S3', 'Source Cooperative'],
    image: '/img/rwanda.png',
  },
  {
    title: 'Burn Severity Map of Oakbar, California',
    description:
      'Maps wildfire impact on a forested area using five burn severity classes derived from LANDSAT-8 imagery. A critical tool for post-fire recovery planning and reforestation efforts.',
    technologies: ['Google Earth Engine', 'LANDSAT-8', 'NDVI', 'EVI'],
    image: '/img/burn_severity.png',
  },
  {
    title: 'ATL Flight Delay Analysis',
    description:
      'Reveals that 25% of airlines cause 80% of delays at Atlanta Airport, with Carrier Delays as the dominant factor. Estimates an average delay of ~9 minutes and highlights key patterns in air traffic punctuality.',
    technologies: ['Tableau', 'Tableau Prep', 'Excel'],
    image: '/img/tableau.png',
  },
  {
    title: 'GPS Technology on Public Transportation',
    description:
      'Research and implementation of GPS technology for public transportation in Nepal, addressing infrastructure challenges including inconsistent network coverage and limited technological literacy among stakeholders.',
    technologies: ['Node.js', 'Arduino', 'Oracle', 'Java', 'IoT'],
  },
]

export const education: Education[] = [
  {
    degree: 'MS in Geography Information Science',
    institution: 'Clark University',
    dates: 'Aug 2024 – May 2026',
  },
  {
    degree: 'MS in Data Analytics',
    institution: 'Clark University',
    dates: 'Jan 2020 – Dec 2023',
  },
  {
    degree: 'BSc in Geography Information Science',
    institution: 'Softwarica College of IT and E-commerce',
    dates: 'July 2016 – Aug 2020',
  },
]

export const experience: Experience[] = [
  {
    role: 'Data Analyst / Backend Developer',
    organization: 'Softwarica College of IT and E-commerce',
    dates: 'July 2020 – July 2021',
    description:
      'Cleaned millions of records from 250 Moodle database tables using SQL and Tableau Prep. Built executive, marketing, and performance dashboards in Tableau. Designed and developed an Android app and backend APIs using Flutter and Node.js.',
  },
  {
    role: 'Teaching Assistant',
    organization: 'Softwarica College of IT and E-commerce',
    dates: 'June 2019 – July 2020',
    description:
      'Supervised ~40 undergraduate students per semester on research projects. Executed innovative projects including a three-wheel electric car and an online transaction vending machine.',
  },
  {
    role: 'Staff Manager',
    organization: 'Hotel Pokhara Peace',
    dates: 'Jan 2017 – Sept 2019',
    description:
      'Managed daily operations and staff coordination. Developed an internal web presence using HTML, CSS, and JavaScript.',
  },
]
