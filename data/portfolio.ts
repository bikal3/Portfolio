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
    title: 'Mapping Invasive Species — Hadwen Arboretum',
    description:
      'Interactive web app presenting a GIS-based survey of invasive plants across 26 acres of the Hadwen Arboretum in Worcester, MA. Reveals that 42.6% of the arboretum contains at least one invasive species, with five-chapter narrative storytelling, species density maps, a threat index, and a management effort estimator.',
    technologies: ['Python', 'Flask', 'Chart.js', 'Jupyter', 'pandas', 'GIS', 'JavaScript'],
    github: 'https://github.com/bikal3/arboretum-invasive-species',
    demo: 'https://arboretum-invasive-species.onrender.com',
  },
  {
    title: 'Hisab — Personal Finance Tracker for Nepal',
    description:
      'Self-hosted personal finance app tailored for Nepal. Tracks income and expenses, manages bank and wallet ledgers, monitors NEPSE stock portfolios with live pricing, and supports savings goals and monthly budgets. Includes Nepal-specific features: lakh-based formatting, UTC+5:45 timezone, and NEPSE market calendar integration.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth.js', 'Material-UI', 'Recharts', 'Docker'],
    github: 'https://github.com/bikal3/hisab-demo',
    demo: 'https://hisab-demo.vercel.app',
  },
  {
    title: 'MappingAfrica — Satellite Agricultural Field Segmentation',
    description:
      'Implements semantic segmentation of farmland across Zambia using a UNet architecture trained on multi-spectral satellite imagery. Achieves 81.79% pixel accuracy and 43.31% mIoU on the MappingAfrica v2.0.0 dataset. Includes an interactive demo for running inference in the browser.',
    technologies: ['PyTorch', 'UNet', 'FastAPI', 'React', 'Vite', 'rasterio', 'NumPy'],
    github: 'https://github.com/bikal3/mappingafrica-unet',
    demo: 'https://bikal3.github.io/mappingafrica-unet/',
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
