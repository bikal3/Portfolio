# Bikal Shrestha — Portfolio

Personal portfolio site built with Next.js, Tailwind CSS v4, and TypeScript.

**Live:** [bikal3.com.np](https://bikal3.com.np)

## Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Deployment:** GitHub Pages + Cloudflare DNS

## Features

- Side navigation with profile photo, social links, and active section tracking
- Mobile responsive with hamburger drawer
- Projects section as a fixed-height scroll area, so the list stays compact as it grows
- Experience and education sections
- CV download button
- Custom 404 page
- Open Graph / Twitter card meta tags, generated `sitemap.xml` and `robots.txt`
- `Person` JSON-LD structured data
- Fully static output — no server required

## Development

```bash
npm install
npm run dev      # dev server at localhost:3000
npm run build    # static export to out/
npm run lint
```

`npm run build` writes the deployable site to `out/`. The custom domain comes from
`public/CNAME`, which is copied into that output — GitHub Pages reads it from the
published artifact, not from the repo root.

## Project Structure

| Path | Contents |
|------|----------|
| `app/` | App Router pages, root layout, global styles, and the OG card |
| `components/sections/` | Homepage sections (About, Projects, Education & Experience) |
| `data/portfolio.ts` | Projects, education, and experience — edit content here |
| `data/profile.webp` | Sidebar profile photo |
| `public/` | CV and `CNAME` |

The social card lives at `app/opengraph-image.png` (1200×630) with its alt text in
`app/opengraph-image.alt.txt`. Next reads the file's real dimensions, so the
`og:image:width`/`height` tags can't drift out of sync with the image.

Project cards render from `data/portfolio.ts`, so adding a project means adding one
entry to that array — no component changes needed.

## Projects Featured

| Project | Description | Demo |
|---------|-------------|------|
| BhumiScan — Earth-Embedding Search for Nepal | Country-scale visual search over Nepal's landscape across 22,676 Clay v1.5 Sentinel-2 embedding cells, with 2020→2025 change detection scored by cloud-penetrating Sentinel-1 radar. 73.7% macro precision@10 against ESA WorldCover, a 5.9× lift over random, running entirely client-side | [Live](https://bhumiscan.bikal3.com.np/) |
| [Dual-Branch U-Net for Precipitation Downscaling](https://github.com/bikal3/dual-branch-unet-precip) | Deep learning model downscaling NASA IMERG precipitation from 10 km to 250 m over Hawaii using a dual-branch CNN fusing satellite and topographic data | [Live](https://bikal3.github.io/dual-branch-unet-precip/) |
| [California Wildfire Analysis Dashboard](https://github.com/bikal3/mtbs_wildfires) | Interactive Streamlit dashboard covering 38 years (1984–2022) of California wildfire history from MTBS satellite imagery and climate records | [Live](https://california-wildfires-analysis.streamlit.app/) |
| [Peru Wildfire Dashboard](https://github.com/bikal3/peru-wildfire) | 24 years (2000–2024) of Peruvian wildfire activity from 32,000+ NASA FIRMS hotspots and MODIS burned area data, with protected-area and indigenous-territory layers and land governance breakdowns | [Live](https://bikal3.github.io/peru-wildfire/) |
| [Mapping Invasive Species — Hadwen Arboretum](https://github.com/bikal3/arboretum-invasive-species) | GIS survey of invasive plants across 26 acres in Worcester, MA, finding 42.6% of the arboretum holds at least one invasive species — with density maps, a threat index, and a management effort estimator | [Live](https://arboretum-invasive-species.onrender.com) |
| [Hisab — Personal Finance Tracker](https://github.com/bikal3/hisab-demo) | Self-hosted finance app for Nepal with NEPSE stock portfolio tracking, multi-account ledgers, savings goals, and lakh-based formatting | [Live](https://hisab-demo.vercel.app) |
| [MappingAfrica — Satellite Segmentation](https://github.com/bikal3/mappingafrica-unet) | UNet semantic segmentation of agricultural fields in Zambia using multi-spectral satellite imagery — 81.79% pixel accuracy and 43.31% mIoU on the MappingAfrica v2.0.0 dataset | [Live](https://bikal3.github.io/mappingafrica-unet/) |
| [Nepal GLOF Explorer](https://github.com/bikal3/himalaya-glof) | ML-powered platform tracking 25 glacial lakes across the Nepal Himalaya (2000–2024) with Random Forest risk classification and satellite change detection | [Live](https://himalayaglof.bikal3.com.np/) |

## Contact

- Email: bikal3.bs@gmail.com
- GitHub: [github.com/bikal3](https://github.com/bikal3)
- LinkedIn: [linkedin.com/in/shresthabikal](https://linkedin.com/in/shresthabikal/)
