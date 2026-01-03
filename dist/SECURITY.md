# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.1.x   | Yes       |
| < 1.1   | No        |

## Reporting a Vulnerability

We take security seriously at BetterSolano.org. If you discover a security vulnerability, please report it responsibly.

### How to Report

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead, please email: **volunteer@bettersolano.org**

Include in your report:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

| Action | Timeframe |
|--------|-----------|
| Acknowledgment | Within 48 hours |
| Initial Assessment | Within 7 days |
| Resolution Target | Within 30 days |
| Public Disclosure | After fix is deployed |

## Security Measures

### Current Implementations

**Server Security:**
- HTTPS enforced via .htaccess
- HTTP Strict Transport Security (HSTS)
- Content Security Policy (CSP) headers
- X-Frame-Options to prevent clickjacking
- X-Content-Type-Options to prevent MIME sniffing
- Referrer-Policy for privacy

**Application Security:**
- No user authentication or data collection
- No database or server-side processing
- Static site with client-side rendering only
- External API calls limited to weather and exchange rates
- No cookies or local storage for sensitive data

**Data Security:**
- All data sourced from public government portals
- No personal identifiable information (PII) stored
- No user input forms that store data

### Third-Party Services

| Service | Purpose | Data Shared |
|---------|---------|-------------|
| Google Analytics | Usage statistics | Anonymous page views |
| Open-Meteo API | Weather data | Location (Solano) |
| ExchangeRate API | Currency rates | None |
| OpenStreetMap | Map tiles | None |

## Best Practices for Contributors

When contributing code:

1. **Never commit secrets** - API keys, passwords, or credentials
2. **Validate inputs** - Sanitize any user-facing inputs
3. **Use HTTPS** - All external resources must use HTTPS
4. **Review dependencies** - Check for known vulnerabilities
5. **Follow CSP** - Ensure new scripts comply with Content Security Policy

## Scope

This security policy covers:

- The BetterSolano.org website
- The GitHub repository
- Associated build tools and scripts

Out of scope:
- Third-party services (Google Analytics, APIs)
- User's local environment
- Social media accounts

## Contact

For security concerns: **volunteer@bettersolano.org**

For general inquiries: Open a GitHub issue or join our [Discord](https://discord.com/invite/qeSu7RJkjQ)

---

Thank you for helping keep BetterSolano.org secure for the community.
