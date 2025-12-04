# BetterSolano.org

[![License: MIT](https://img.shields.io/badge/Code-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![License: CC BY 4.0](https://img.shields.io/badge/Content-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Open for Contributions](https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg)](#contributing)

BetterSolano.org is a community-driven civic-tech platform inspired by [BetterGov.ph](https://bettergov.ph). It empowers the people of Solano by providing clear and transparent access to local services, public programs, and the responsible use of LGU Solano's funds.

**Cost to the People of Solano = P0**

---

## About

BetterSolano.org is a volunteer-driven initiative that modernizes and simplifies access to government services and data for the Municipality of Solano, Nueva Vizcaya, Philippines. The platform aggregates public information from official government portals and presents it in a user-friendly, accessible format.

**Live Site:** [https://bettersolano.org](https://bettersolano.org)

---

## Features

### Municipal Services Directory
Complete guide to all municipal services with requirements, fees, and processing times:

| Category | Services |
|----------|----------|
| **Certificates & Vital Records** | Birth, death, marriage certificates, CENOMAR, civil registry |
| **Business & Trade** | Business permits (new/renewal), Mayor's clearance, sanitary permits |
| **Social Services** | Senior citizen ID, PWD services, AICS, solo parent ID, burial assistance |
| **Health & Wellness** | Vaccinations, health certificates, prenatal care, medical assistance |
| **Taxation & Payments** | Real property tax, business tax, cedula, tax clearance |
| **Agriculture** | Farm registration, crop insurance, fertilizer assistance, agricultural loans |
| **Infrastructure** | Building permits, occupancy permits, road maintenance requests |
| **Education** | Scholarship programs, student assistance, educational grants |
| **Public Safety** | Emergency response, disaster preparedness, MDRRMO services |
| **Environment** | Environmental clearance, tree cutting permits, waste management |
| **Online Services** | Filipizen integration for online payments and applications |

### Smart Search Engine
- **Fuzzy matching** - Handles typos and partial matches
- **Weighted scoring** - Prioritizes relevant results
- **Category filtering** - Filter by service type
- **Recent searches** - Quick access to previous searches
- **Popular suggestions** - Trending search terms
- **Search analytics** - Tracks popular queries

### Multi-Language Support
Full translation support with enhanced translation engine:
- **English** (default)
- **Filipino** (Tagalog)
- **Ilocano** (Iloko)

Features:
- Browser language auto-detection
- Persistent language preference
- Dynamic content translation
- Fallback support for missing translations

### Government Information
- **Executive Branch** - Mayor Philip A. Dacayo, Vice Mayor Eduardo D. Tiongson
- **Sangguniang Bayan** - All municipal councilors with contact info
- **Department Heads** - 16+ municipal offices
- **Barangay Directory** - All 22 barangays with captains and contacts

### Legislative Documents
- **Ordinance Framework** - Browse enacted municipal ordinances
- **Resolution Framework** - Access council resolutions
- **Searchable database** with year and category filters

### Budget & Financial Transparency
- Statement of Receipts and Expenditures (SRE)
- Quarterly financial reports
- Income sources breakdown
- Expenditure allocation charts
- Infrastructure project tracking
- Interactive data visualizations

### Municipal Statistics
- **Population:** 69,296 (2024 Census)
- **Land Area:** 162.70 km²
- **Classification:** 1st Class Municipality
- **Barangays:** 22 administrative units
- CMCI Competitive Index rankings
- Economic indicators and trends

### Real-Time Information Bar
- Current weather in Solano
- Currency exchange rates (USD, EUR, JPY, etc.)
- Philippine date and time (PHT)
- Auto-updating data

### News & Updates
- Municipal announcements
- Project updates
- Public advisories
- Community events

### Emergency Hotlines
Quick access to emergency contacts:
- **Police (PNP):** 0927 400 8033
- **Fire (BFP):** 0936 062 0305
- **MSWDO:** 0916 284 0885
- **MDRRMO:** 0926 383 3744
- **DILG:** 0906 188 086
- **R2TMC:** 0906 819 5569

### Accessibility Features
- WCAG 2.1 Level AA conformant
- Skip navigation links
- Keyboard navigation support
- Screen reader optimized
- High color contrast
- Responsive design (mobile-first)
- Focus indicators
- ARIA labels and landmarks

### Security Features
- HTTPS enforced
- Security headers (HSTS, CSP, X-Frame-Options)
- Content Security Policy
- XSS protection
- Clickjacking prevention

### Performance Optimizations
- Browser caching (images: 1 year, CSS/JS: 1 month)
- GZIP compression
- Clean URLs
- Optimized assets
- Lazy loading support

---

## Technology Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Maps** | Leaflet.js, OpenStreetMap |
| **Charts** | Chart.js |
| **Icons** | Bootstrap Icons |
| **Fonts** | Google Fonts (Inter) |
| **Hosting** | Static hosting with Apache/.htaccess |

---

## Project Structure

```
bettersolano/
├── index.html              # Homepage
├── sitemap.xml             # XML sitemap for SEO
├── robots.txt              # Search engine directives
├── .htaccess               # Apache configuration
├── serve.json              # Static server config
│
├── assets/
│   ├── css/                # Stylesheets
│   │   ├── style.css       # Main styles
│   │   ├── responsive.css  # Mobile responsiveness
│   │   ├── footer.css      # Footer styles
│   │   └── ...
│   ├── js/                 # JavaScript
│   │   ├── main.js         # Core functionality
│   │   ├── search.js       # Search engine
│   │   ├── translations.js # i18n system
│   │   └── ...
│   ├── images/             # Images and logos
│   └── fonts/              # Custom fonts
│
├── data/                   # JSON data files
│   ├── services.json       # Services database
│   ├── officials.json      # Government officials
│   ├── ordinances.json     # Legislative data
│   └── ...
│
├── services/               # Service category pages
├── service-details/        # Individual service pages
├── government/             # Government pages
├── legislative/            # Legislative documents
├── budget/                 # Financial transparency
├── statistics/             # Municipal statistics
├── contact/                # Contact page
├── faq/                    # FAQ page
├── news/                   # News and updates
└── documents/              # Downloadable documents
```

---

## Data Sources

All public information is sourced from official government portals:

- **Bureau of Local Government Finance (BLGF)** - Financial data
- **Philippine Statistics Authority (PSA)** - Population and demographics
- **LGU Solano Official Website** - Services and announcements
- **Sangguniang Bayan ng Solano** - Legislative documents
- **Cities and Municipalities Competitiveness Index (CMCI)** - Rankings


---

## Contributing

**This project is open source and actively welcomes contributions!** Whether you're a developer, designer, content writer, translator, or simply a concerned citizen of Solano, your help is valuable.

### Ways to Contribute

| Type | Description |
|------|-------------|
| **Bug Reports** | Found a bug? Open an issue with details |
| **Feature Requests** | Have an idea? We'd love to hear it |
| **Code Contributions** | Submit PRs for bug fixes or new features |
| **Content Updates** | Help keep service information accurate |
| **Translations** | Improve Filipino/Ilocano translations |
| **Accessibility** | Help make the site more accessible |
| **Design** | UI/UX improvements welcome |
| **Documentation** | Improve guides and documentation |

### How to Contribute

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4. **Make** your changes
5. **Test** your changes locally
6. **Commit** with clear messages (`git commit -m 'Add amazing feature'`)
7. **Push** to your branch (`git push origin feature/amazing-feature`)
8. **Open** a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/BetterSolano/bettersolano.git
cd bettersolano

# Serve locally (using any static server)
npx serve .
# or
python -m http.server 8000
# or
php -S localhost:8000
```

### Code Guidelines

- Follow existing code style and formatting
- Write meaningful commit messages
- Test changes across different browsers
- Ensure accessibility compliance
- Update documentation as needed

### Priority Areas for Improvement

- [ ] Add more service detail pages
- [ ] Expand Filipino and Ilocano translations
- [ ] Improve search functionality
- [ ] Add more data visualizations
- [ ] Enhance mobile experience
- [ ] Performance optimizations
- [ ] Accessibility improvements
- [ ] Unit tests for JavaScript

---

## Contact

- **Website:** [bettersolano.org](https://bettersolano.org)
- **Email:** volunteer@bettersolano.org
- **GitHub:** [BetterSolano/bettersolano](https://github.com/BetterSolano/bettersolano)
- **Issues:** [GitHub Issues](https://github.com/BetterSolano/bettersolano/issues)

---

## Developer

An initiative by **[Ramon Logan Jr.](https://ramonloganjr.com/)**, a full-stack developer based in the UAE, for the people of Solano.

---

## License

This project uses a dual license:

### Code (MIT License)
All source code (HTML, CSS, JavaScript) is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Ramon Logan Jr.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

### Content (CC BY 4.0)
All content, documentation, and non-code assets are licensed under **Creative Commons Attribution 4.0 International (CC BY 4.0)**.

You are free to:
- **Share** — copy and redistribute the material
- **Adapt** — remix, transform, and build upon the material

Under the following terms:
- **Attribution** — You must give appropriate credit and indicate if changes were made

[![CC BY 4.0](https://licensebuttons.net/l/by/4.0/88x31.png)](https://creativecommons.org/licenses/by/4.0/)

---

## Acknowledgments

- [BetterGov.ph](https://bettergov.ph) for the inspiration and framework
- **LGU Solano** for public data and information
- **All volunteers and contributors** who help improve this platform
- **The people of Solano** for whom this platform exists

---

<div align="center">

**Empowering the people of Solano with transparent access to the services, programs, and public funds of LGU Solano.**

Made with love for Solano, Nueva Vizcaya

</div>
