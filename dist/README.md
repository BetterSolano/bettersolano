# BetterSolano.org

A civic-tech initiative providing transparent access to municipal services, programs, and public funds of LGU Solano, Nueva Vizcaya, Philippines.

![Version](https://img.shields.io/badge/version-1.1.7-green)
![License](https://img.shields.io/badge/license-MIT%20%7C%20CC%20BY%204.0-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)

## About

BetterSolano.org is a volunteer-driven, open-source project that empowers the people of Solano with easy access to local government information. The platform aggregates public data from official government portals and presents it in a user-friendly, accessible format.

**Cost to the People of Solano = ₱0**

## Live Demo

Visit the live website: [https://bettersolano.org](https://bettersolano.org)

## Technology Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Styling** | Custom CSS, CSS Variables, Flexbox, CSS Grid, Responsive Design |
| **Icons** | Bootstrap Icons (CDN) |
| **Fonts** | Google Fonts (Inter) |
| **Maps** | Leaflet.js, OpenStreetMap |
| **Charts** | Chart.js (Canvas-based) |
| **Data Format** | JSON |
| **APIs** | Open-Meteo (Weather), ExchangeRate API (Currency) |
| **Build Tools** | Node.js, npm, Bash |
| **Minification** | html-minifier-terser, clean-css-cli, terser |
| **Version Control** | Git, GitHub |
| **Server** | Apache (.htaccess), mod_rewrite, mod_deflate |
| **Hosting** | cPanel (Production), Python HTTP Server (Development) |
| **SEO** | Open Graph, Twitter Cards, XML Sitemap, robots.txt |
| **Security** | HTTPS, CSP Headers, HSTS, X-Frame-Options |
| **Analytics** | Google Analytics (gtag.js) |
| **Accessibility** | WCAG 2.1, ARIA, Semantic HTML |
| **Performance** | GZIP Compression, Browser Caching, Asset Minification |

## Key Features

| Feature | Description |
|---------|-------------|
| **Municipal Services Directory** | Comprehensive guide to all LGU services with requirements, fees, and processing times |
| **Government Officials** | Directory of elected officials and department heads with contact information |
| **Budget Transparency** | Financial reports, income/expenditure breakdowns, and infrastructure projects |
| **Legislative Documents** | Searchable database of ordinances and resolutions from Sangguniang Bayan |
| **Municipal Statistics** | Demographics, economic data, and competitive index rankings |
| **Real-time Information** | Live weather updates, currency exchange rates, and Philippine time |
| **Multi-language Support** | Available in English, Filipino, and Ilocano |
| **Accessibility** | WCAG 2.1 compliant with skip links, ARIA labels, and semantic HTML |
| **SEO Optimized** | Meta tags, Open Graph, Twitter Cards, structured data, and XML sitemap |
| **Performance** | 90% size reduction through minification, GZIP compression, and browser caching |

## Quick Start

```bash
# Clone the repository
git clone https://github.com/BetterSolano/bettersolano.git

# Navigate to project directory
cd bettersolano

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:8000
```

## Installation

### Prerequisites

| Requirement | Version | Purpose |
|-------------|---------|---------|
| Node.js | v16+ | Build tools and package management |
| npm | v8+ | Dependency management |
| Python 3 | v3.x | Local development server |
| Git | Latest | Version control |

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/BetterSolano/bettersolano.git
cd bettersolano
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open in browser**
   - Development: http://localhost:8000
   - Production preview: http://localhost:8080 (after build)

## Usage

### Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server (port 8000) |
| `npm run build` | Build minified production files to `dist/` (auto-bumps patch version) |
| `npm run build:minor` | Bump minor version and build |
| `npm run build:major` | Bump major version and build |
| `npm run serve:dist` | Serve production build (port 8080) |
| `npm run version:check` | Display current version |
| `npm run version:patch` | Bump patch version only |
| `npm run version:minor` | Bump minor version only |
| `npm run version:major` | Bump major version only |

### Production Deployment

1. **Build production files**
```bash
npm run build
```

2. **Output location**
   - Minified files are generated in the `dist/` folder
   - Original size: ~17MB → Minified: ~1.8MB (90% reduction)

3. **Deploy to server**
   - Upload contents of `dist/` to your web server's `public_html` directory
   - Ensure `.htaccess` is included for clean URLs and security headers

### File Permissions (cPanel)

| Type | Permission | Numeric |
|------|------------|---------|
| Files | rw-r--r-- | 644 |
| Directories | rwxr-xr-x | 755 |

## Project Structure

```
bettersolano/
├── assets/
│   ├── css/              # Stylesheets (9 files)
│   ├── js/               # JavaScript modules (15 files)
│   ├── images/           # Images, icons, banners
│   └── fonts/            # Web fonts
├── data/                 # JSON data files
│   ├── officials.json    # Government officials data
│   ├── services.json     # Municipal services data
│   ├── ordinances.json   # Legislative ordinances
│   └── resolutions.json  # Legislative resolutions
├── services/             # Service category pages (11 pages)
├── service-details/      # Individual service pages (22 pages)
├── government/           # Government directory pages
├── legislative/          # Legislative framework pages
├── budget/               # Budget transparency page
├── statistics/           # Municipal statistics page
├── contact/              # Contact information page
├── faq/                  # Frequently asked questions
├── scripts/              # Build and version scripts
├── dist/                 # Production build output
├── index.html            # Homepage
├── .htaccess             # Apache configuration
├── sitemap.xml           # XML sitemap (SEO)
├── robots.txt            # Search engine directives
├── version.json          # Version tracking
├── build.sh              # Build automation script
├── package.json          # Node.js configuration
└── README.md             # Project documentation
```

## Contributing

We welcome contributions from everyone! Whether you're a developer, designer, data researcher, content writer, translator, or a concerned citizen of Solano, your participation helps shape this project for all.

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make** your changes
4. **Test** thoroughly on multiple browsers
5. **Commit** with a descriptive message
   ```bash
   git commit -m "Add: description of your changes"
   ```
6. **Push** to your fork
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open** a Pull Request with detailed description

### Contribution Areas

| Area | Description |
|------|-------------|
| **Bug Fixes** | Report issues or submit fixes for existing bugs |
| **Features** | Propose or implement new functionality |
| **Content** | Update service information, add missing municipal data |
| **Translations** | Help translate content to Filipino or Ilocano |
| **Design** | Improve UI/UX, accessibility, and visual consistency |
| **Data** | Verify and update municipal statistics and records |
| **Documentation** | Enhance README, code comments, and guides |
| **API Integration** | Propose or implement API connections for real-time data feeds |
| **Data Visualization** | Enhance charts, graphs, and interactive presentations |

### Code Style Guidelines

| Guideline | Description |
|-----------|-------------|
| **HTML** | Use semantic HTML5 elements; validate before committing |
| **CSS** | Follow BEM naming conventions; use CSS custom properties |
| **JavaScript** | Keep vanilla JS unless proposing framework for data visualization |
| **Naming** | Use meaningful, descriptive variable and function names |
| **Comments** | Add comments for complex logic and non-obvious implementations |
| **Accessibility** | Ensure WCAG 2.1 compliance (alt text, ARIA, keyboard navigation) |
| **Performance** | Optimize images; minimize DOM manipulation |
| **Testing** | Test on Chrome, Firefox, Safari, Edge; test mobile responsiveness |
| **Validation** | Validate HTML/CSS before pull requests |

## Data Sources

All public information is sourced from official government portals:

| Source | URL | Data Type |
|--------|-----|-----------|
| LGU Solano Official Website | [solano.gov.ph](https://solano.gov.ph/) | Services, Officials |
| Sangguniang Bayan ng Solano | [sangguniangbayan.solano.gov.ph](https://sangguniangbayan.solano.gov.ph/) | Ordinances, Resolutions |
| Bureau of Local Government Finance | [blgf.gov.ph](https://blgf.gov.ph/) | Budget, Financial Reports |
| Philippine Statistics Authority | [psa.gov.ph](https://psa.gov.ph/) | Demographics, Census |
| DTI CMCI Portal | [cmci.dti.gov.ph](https://cmci.dti.gov.ph/) | Competitive Index |

## License

This project is dual-licensed:

| License | Applies To | Details |
|---------|------------|---------|
| MIT License | Source Code | Free to use, modify, and distribute |
| CC BY 4.0 | Content | Attribution required for content reuse |

See [LICENSE](LICENSE) for full details.

## Contact

| Channel | Link |
|---------|------|
| Website | [bettersolano.org](https://bettersolano.org) |
| Email | volunteer@bettersolano.org |
| Facebook | [@bettersolano.org](https://www.facebook.com/bettersolano.org) |
| LinkedIn | [BetterSolano](https://www.linkedin.com/company/bettersolano/) |
| Discord | [Join Community](https://discord.com/invite/qeSu7RJkjQ) |
| GitHub | [BetterSolano/bettersolano](https://github.com/BetterSolano/bettersolano) |

## Acknowledgments

- [BetterGov.ph](https://bettergov.ph) for the civic-tech initiative in the Philippines
- LGU Solano for public data availability and transparency
- All volunteers and contributors who dedicate their time
- Open-source community for the tools and libraries used
- Citizens of Solano for their feedback and support

---

Made for the people of Solano, Nueva Vizcaya

## Developer

[Ramon Logan Jr.](https://ramonloganjr.com/) is a UAE-based full-stack developer and IT professional specializing in web development, design, cloud services, and cybersecurity. He is the developer behind BetterSolano.org and the founder of the small cloud-based solutions initiative, [HelloPinas.com](https://hellopinas.com). Ramon actively contributes to civic-tech efforts like [BetterGov.ph](https://bettergov.ph) and is an individual participant in the [OpenJS Foundation](https://openjsf.org/).
