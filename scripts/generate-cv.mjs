import puppeteer from 'puppeteer'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 10.5pt;
    color: #1a1a1a;
    line-height: 1.5;
    padding: 36pt 44pt;
  }

  /* Header */
  header { margin-bottom: 18pt; border-bottom: 1.5pt solid #1a1a1a; padding-bottom: 12pt; }
  h1 { font-size: 22pt; font-weight: 700; letter-spacing: -0.3pt; }
  .subtitle { font-size: 10pt; color: #444; margin-top: 3pt; }
  .contact {
    display: flex; flex-wrap: wrap; gap: 4pt 16pt;
    font-size: 9pt; color: #444; margin-top: 8pt;
  }
  .contact a { color: #1a6b8a; text-decoration: none; }

  /* Sections */
  section { margin-bottom: 14pt; }
  h2 {
    font-size: 10pt; font-weight: 700; letter-spacing: 1pt;
    text-transform: uppercase; color: #1a6b8a;
    border-bottom: 0.5pt solid #ccc; padding-bottom: 3pt; margin-bottom: 8pt;
  }

  /* Experience / Education rows */
  .entry { margin-bottom: 10pt; }
  .entry-header { display: flex; justify-content: space-between; align-items: baseline; }
  .entry-title { font-weight: 700; font-size: 10.5pt; }
  .entry-org { color: #444; font-size: 9.5pt; }
  .entry-date { font-size: 9pt; color: #666; white-space: nowrap; margin-left: 8pt; }
  ul { padding-left: 13pt; margin-top: 4pt; }
  ul li { font-size: 9.5pt; color: #333; margin-bottom: 2pt; }

  /* Skills */
  .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6pt 20pt; }
  .skill-row { display: flex; gap: 6pt; font-size: 9.5pt; }
  .skill-label { font-weight: 600; color: #1a1a1a; min-width: 110pt; }
  .skill-items { color: #444; }

  /* Projects */
  .project { margin-bottom: 8pt; }
  .project-title { font-weight: 700; font-size: 10pt; }
  .project-tech { font-size: 8.5pt; color: #666; margin-top: 1pt; }
  .project-desc { font-size: 9.5pt; color: #333; margin-top: 2pt; }
</style>
</head>
<body>

<header>
  <h1>Bikal Shrestha</h1>
  <div class="subtitle">Spatial Data Analyst &amp; GIS Researcher</div>
  <div class="contact">
    <span>📍 Connecticut, USA</span>
    <span><a href="mailto:bikal3.bs@gmail.com">bikal3.bs@gmail.com</a></span>
    <span><a href="https://bikal3.com.np">bikal3.com.np</a></span>
    <span><a href="https://github.com/bikal3">github.com/bikal3</a></span>
    <span><a href="https://linkedin.com/in/shresthabikal">linkedin.com/in/shresthabikal</a></span>
  </div>
</header>

<section>
  <h2>Summary</h2>
  <p style="font-size:9.5pt;color:#333;">
    Spatial data analyst and GIS researcher with dual master's degrees in Geographic Information Science
    and Data Analytics from Clark University. Research sits at the intersection of deep learning, machine
    learning, remote sensing, and environmental science — building end-to-end pipelines from satellite
    imagery to production-ready interactive dashboards.
  </p>
</section>

<section>
  <h2>Education</h2>
  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">MS in Geographic Information Science</span>
      <span class="entry-date">Aug 2024 – May 2026</span>
    </div>
    <div class="entry-org">Clark University, Worcester, MA</div>
  </div>
  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">MS in Data Analytics</span>
      <span class="entry-date">2021 – 2023</span>
    </div>
    <div class="entry-org">Clark University, Worcester, MA</div>
  </div>
  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">BSc in Computing</span>
      <span class="entry-date">2016 – 2019</span>
    </div>
    <div class="entry-org">Coventry University</div>
  </div>
</section>

<section>
  <h2>Experience</h2>
  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">Data Analyst / Backend Developer</span>
      <span class="entry-date">July 2020 – July 2021</span>
    </div>
    <div class="entry-org">Softwarica College of IT and E-commerce</div>
    <ul>
      <li>Cleaned millions of records across 250 Moodle database tables using SQL and Tableau Prep</li>
      <li>Built executive, marketing, and performance dashboards in Tableau for institutional reporting</li>
      <li>Designed and shipped an Android app and REST APIs using Flutter and Node.js</li>
    </ul>
  </div>
  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">Teaching Assistant</span>
      <span class="entry-date">June 2019 – July 2020</span>
    </div>
    <div class="entry-org">Softwarica College of IT and E-commerce</div>
    <ul>
      <li>Supervised ~40 undergraduate students per semester on independent research projects</li>
      <li>Mentored teams building hardware/software projects including an electric vehicle prototype</li>
    </ul>
  </div>
  <div class="entry">
    <div class="entry-header">
      <span class="entry-title">Staff Manager</span>
      <span class="entry-date">Jan 2017 – Sept 2019</span>
    </div>
    <div class="entry-org">Hotel Pokhara Peace</div>
    <ul>
      <li>Managed daily operations and staff coordination across departments</li>
      <li>Developed an internal web presence using HTML, CSS, and JavaScript</li>
    </ul>
  </div>
</section>

<section>
  <h2>Projects</h2>
  <div class="project">
    <div class="project-title">Dual-Branch U-Net for Precipitation Downscaling</div>
    <div class="project-tech">PyTorch · Python · NASA IMERG · Google Earth Engine · DEM</div>
    <div class="project-desc">Downscales NASA IMERG from 10 km to 250 m over Hawaii using dual-branch CNN fusing satellite and topographic data. Test loss 0.0332 with 2.3M parameters.</div>
  </div>
  <div class="project">
    <div class="project-title">Nepal GLOF Explorer</div>
    <div class="project-tech">Streamlit · scikit-learn · Google Earth Engine · Sentinel-2 · Landsat</div>
    <div class="project-desc">Tracks 25 glacial lakes across Nepal Himalaya (2000–2024) with ML-based GLOF risk classification and satellite change detection.</div>
  </div>
  <div class="project">
    <div class="project-title">California Wildfire Analysis Dashboard</div>
    <div class="project-tech">Streamlit · Plotly · Pandas · MTBS/USGS · Docker</div>
    <div class="project-desc">38-year (1984–2022) interactive dashboard of California wildfire history from MTBS satellite imagery and climate records.</div>
  </div>
  <div class="project">
    <div class="project-title">MappingAfrica — Satellite Agricultural Field Segmentation</div>
    <div class="project-tech">PyTorch · UNet · FastAPI · React · rasterio</div>
    <div class="project-desc">Semantic segmentation of farmland in Zambia using multi-spectral imagery. Achieves 81.79% pixel accuracy and 43.31% mIoU.</div>
  </div>
  <div class="project">
    <div class="project-title">Peru Wildfire Dashboard</div>
    <div class="project-tech">Next.js · MapLibre GL · Python · GeoPandas · NASA FIRMS · MODIS</div>
    <div class="project-desc">Visualizes 24 years of fire hotspot and burned area data across Peru with 32,000+ NASA FIRMS hotspots and land governance analysis.</div>
  </div>
</section>

<section>
  <h2>Skills</h2>
  <div class="skills-grid">
    <div class="skill-row"><span class="skill-label">Languages</span><span class="skill-items">Python, R, SQL, JavaScript, Node.js</span></div>
    <div class="skill-row"><span class="skill-label">Deep Learning</span><span class="skill-items">PyTorch, UNet, CNN, Transfer Learning, Semantic Segmentation</span></div>
    <div class="skill-row"><span class="skill-label">Machine Learning</span><span class="skill-items">scikit-learn, Random Forest, DBSCAN, Clustering, Regression</span></div>
    <div class="skill-row"><span class="skill-label">Data & Visualization</span><span class="skill-items">Pandas, NumPy, Streamlit, Plotly, Tableau, Chart.js</span></div>
    <div class="skill-row"><span class="skill-label">GIS & Remote Sensing</span><span class="skill-items">Google Earth Engine, QGIS, ArcGIS, TerrSet, Sentinel-2, Landsat, NASA IMERG, GDAL</span></div>
    <div class="skill-row"><span class="skill-label">Research Areas</span><span class="skill-items">Climate Modeling, Hazard Mapping, Wildfire Analysis, Precipitation Downscaling</span></div>
  </div>
</section>

</body>
</html>`

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setContent(html, { waitUntil: 'networkidle0' })
const pdf = await page.pdf({
  format: 'A4',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
})
await browser.close()

const outPath = join(__dirname, '../public/BikalShrestha-CV.pdf')
writeFileSync(outPath, pdf)
console.log(`PDF saved to ${outPath}`)
