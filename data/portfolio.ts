// data/portfolio.ts

export interface Project {
  title: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
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
    title: 'Dual-Branch U-Net for Precipitation Downscaling',
    description:
      'Enhances NASA IMERG precipitation estimates from 10 km to 250 m resolution over Hawaii using a dual-branch CNN that fuses satellite imagery with topographic data. Enables finer-grained rainfall mapping for hydrological and climate applications.',
    technologies: ['PyTorch', 'Python', 'NASA IMERG', 'Google Earth Engine', 'Jupyter', 'DEM'],
    github: 'https://github.com/bikal3/dual-branch-unet-precip',
    demo: 'https://bikal3.github.io/dual-branch-unet-precip/',
  },
  {
    title: 'California Wildfire Analysis Dashboard',
    description:
      'Interactive dashboard covering 38 years (1984–2022) of California wildfire history derived from MTBS satellite imagery and climate records. Enables exploration of burn extent, severity trends, and climate correlations across the state.',
    technologies: ['Streamlit', 'Plotly', 'Folium', 'Pandas', 'Python', 'MTBS/USGS', 'Docker'],
    github: 'https://github.com/bikal3/mtbs_wildfires',
    demo: 'https://california-wildfires-analysis.streamlit.app/',
  },
  {
    title: 'Nepal GLOF Explorer',
    description:
      'Maps glacial lake outburst flood (GLOF) hazard across the Nepal Himalaya, tracking 25 glacial lakes from 2000 to 2024. Combines ML-based risk classification with satellite change detection to support early warning and disaster preparedness.',
    technologies: ['Streamlit', 'scikit-learn', 'Google Earth Engine', 'Folium', 'Sentinel-2', 'Landsat', 'Python'],
    github: 'https://github.com/bikal3/himalaya-glof',
    demo: 'https://himalaya-glof.streamlit.app/',
  },
]

export const education: Education[] = [
  {
    degree: 'MS in Geographic Information Science',
    institution: 'Clark University',
    dates: 'Aug 2024 – May 2026',
  },
  {
    degree: 'MS in Data Analytics',
    institution: 'Clark University',
    dates: '2021 – 2023',
  },
  {
    degree: 'BSc in Computing',
    institution: 'Coventry University',
    dates: '2016 – 2019',
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
