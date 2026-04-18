#!/usr/bin/env python3
"""
Fix footer across all HTML files:
1. Add Solano Quiz link before Sitemap in Quick Links
2. Update copyright to 3-span format with 2026 year
3. Add Solano Quiz entry to sitemap page
4. Add Quiz CTA section to index.html (before closing </> after contact section)
"""

import os
import re
import glob

def get_page_prefix(filepath):
    """Get the data-i18n prefix for a page based on its path."""
    # The i18n upgrade used page-specific prefixes
    path = filepath.replace('\\', '/')
    if path == 'index.html':
        return 'home'
    elif 'sitemap/' in path:
        return 'sitemap'
    elif 'contact/' in path:
        return 'contact'
    elif 'faq/' in path:
        return 'faq'
    elif 'privacy/' in path:
        return 'privacy'
    elif 'terms/' in path:
        return 'terms'
    elif 'accessibility/' in path:
        return 'accessibility'
    elif 'budget/' in path:
        return 'budget'
    elif 'news/' in path:
        return 'news'
    elif 'government/officials' in path:
        return 'officials'
    elif 'government/' in path:
        return 'gov'
    elif 'legislative/ordinance' in path:
        return 'ord'
    elif 'legislative/resolution' in path:
        return 'reso'
    elif 'legislative/' in path:
        return 'legis'
    elif 'statistics/' in path:
        return 'stats'
    elif 'services/agriculture' in path:
        return 'agri'
    elif 'services/business' in path:
        return 'biz'
    elif 'services/certificates' in path:
        return 'cert'
    elif 'services/education' in path:
        return 'edu'
    elif 'services/environment' in path:
        return 'env'
    elif 'services/health' in path:
        return 'health'
    elif 'services/infrastructure' in path:
        return 'infra'
    elif 'services/public-safety' in path:
        return 'safety'
    elif 'services/social' in path:
        return 'social'
    elif 'services/tax' in path:
        return 'tax'
    elif 'services/' in path:
        return 'svc'
    elif 'service-details/birth' in path:
        return 'birth'
    elif 'service-details/death' in path:
        return 'death'
    elif 'service-details/marriage' in path:
        return 'marriage'
    elif 'service-details/business-permits' in path:
        return 'bpls'
    elif 'service-details/civil-registrar' in path:
        return 'civil'
    elif 'service-details/general-services' in path:
        return 'gensvc'
    elif 'service-details/human-resource' in path:
        return 'hr'
    elif 'service-details/mswdo-services' in path:
        return 'mswdo-svc'
    elif 'service-details/mswdo' in path:
        return 'mswdo'
    elif 'service-details/municipal-accounting' in path:
        return 'acct'
    elif 'service-details/municipal-agriculture' in path:
        return 'magri'
    elif 'service-details/municipal-assessor' in path:
        return 'assessor'
    elif 'service-details/municipal-budget' in path:
        return 'mbudget'
    elif 'service-details/municipal-civil-registrar' in path:
        return 'mcivil'
    elif 'service-details/municipal-engineering' in path:
        return 'eng'
    elif 'service-details/municipal-general-services' in path:
        return 'mgensvc'
    elif 'service-details/municipal-planning' in path:
        return 'plan'
    elif 'service-details/municipal-treasurer' in path:
        return 'treas'
    elif 'service-details/property-declaration' in path:
        return 'propdec'
    elif 'service-details/seedo-public-market' in path:
        return 'market'
    elif 'service-details/seedo-slaughterhouse' in path:
        return 'slaughter'
    elif 'service-details/tricycle' in path:
        return 'tricycle'
    elif '403' in path:
        return 'err403'
    elif '404' in path:
        return 'err404'
    elif '500' in path:
        return 'err500'
    elif 'offline' in path:
        return 'offline'
    else:
        return 'page'


def fix_footer_quiz_link(content, filepath):
    """Add Solano Quiz link before Sitemap in footer Quick Links."""
    # Check if quiz link already exists
    if 'quiz.bettersolano.org' in content:
        return content, False
    
    prefix = get_page_prefix(filepath)
    
    # Determine the relative path prefix for internal links
    if filepath == 'index.html' or filepath in ['403.html', '404.html', '500.html', 'offline.html']:
        rel = ''
    else:
        rel = '../'
    
    # Find the Sitemap link in footer Quick Links and add Quiz before it
    # Pattern: <li><a href="...sitemap..." ...>Sitemap</a></li>
    sitemap_pattern = r'(<li><a href="' + re.escape(rel) + r'sitemap/[^"]*"[^>]*>)'
    
    quiz_link = f'<li><a href="https://quiz.bettersolano.org/" target="_blank" rel="noopener noreferrer" data-i18n="{prefix}-solano-quiz">Solano Quiz</a></li>\n                        '
    
    match = re.search(sitemap_pattern, content)
    if match:
        content = content[:match.start()] + quiz_link + content[match.start():]
        return content, True
    
    # Fallback: look for any Sitemap link in footer
    sitemap_pattern2 = r'(<li><a href="[^"]*sitemap[^"]*"[^>]*>)'
    match2 = re.search(sitemap_pattern2, content)
    if match2:
        content = content[:match2.start()] + quiz_link + content[match2.start():]
        return content, True
    
    return content, False


def fix_copyright(content, filepath):
    """Update copyright to standardized 3-span format with 2026."""
    changed = False
    
    # Pattern 1: Old format with single span containing everything
    old_pattern1 = r'<div class="footer-copyright">\s*<span[^>]*>&copy;.*?</span>\s*<span class="footer-version">'
    
    new_copyright = '''<div class="footer-copyright">
                    <span class="footer-copyright-text">&copy; 2026 BetterSolano.org.</span>
                    <span class="footer-copyright-license">MIT | CC BY 4.0</span>
                    <span class="footer-copyright-disclaimer">All public information sourced from official government portals.</span>
                    <span class="footer-version">'''
    
    match = re.search(old_pattern1, content, re.DOTALL)
    if match:
        content = content[:match.start()] + new_copyright + content[match.end():]
        changed = True
    
    # Also update any remaining "2025" in copyright year
    if 'id="copyright-year">2025<' in content:
        content = content.replace('id="copyright-year">2025<', 'id="copyright-year">2026<')
        changed = True
    
    # Update "Better Solano" to "BetterSolano.org" in copyright if still old
    if 'Better Solano. MIT' in content:
        content = content.replace('Better Solano. MIT', 'BetterSolano.org. MIT')
        changed = True
    
    return content, changed


def add_quiz_to_sitemap(content):
    """Add Solano Quiz entry to sitemap page content."""
    if 'quiz.bettersolano.org' in content:
        return content, False
    
    # Find the External Resources section and add quiz there
    # Or add it to Main Navigation section
    main_nav_end = content.find('</div>\n                </div>\n\n                <!-- Service Categories -->')
    if main_nav_end == -1:
        # Try alternate: find after the last link in main navigation
        main_nav_end = content.find('</div>\n                </div>\n\n                <!--')
    
    # Add quiz link in the main navigation grid
    # Find the News link and add Quiz after it
    news_pattern = r'(<a href="\.\./news/"[^>]*>.*?News.*?</a>)'
    match = re.search(news_pattern, content)
    if match:
        quiz_entry = '\n                        <a href="https://quiz.bettersolano.org/" target="_blank" rel="noopener noreferrer" class="sitemap-link-item sitemap-link-item--external"><i class="bi bi-box-arrow-up-right"></i> <span data-i18n="sitemap-solano-quiz">Solano Quiz</span></a>'
        insert_pos = match.end()
        content = content[:insert_pos] + quiz_entry + content[insert_pos:]
        return content, True
    
    return content, False


# Find all HTML files (excluding dist, node_modules, backup)
html_files = []
for pattern in ['*.html', '*/*.html', '*/*/*.html']:
    for f in glob.glob(pattern):
        if not f.startswith('dist/') and not f.startswith('node_modules/') and not f.startswith('react-app/') and not f.endswith('.backup'):
            html_files.append(f)

html_files.sort()
print(f"Found {len(html_files)} HTML files")

quiz_count = 0
copyright_count = 0
sitemap_count = 0

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Fix 1: Add Solano Quiz footer link
    content, quiz_changed = fix_footer_quiz_link(content, filepath)
    if quiz_changed:
        quiz_count += 1
    
    # Fix 2: Update copyright
    content, copyright_changed = fix_copyright(content, filepath)
    if copyright_changed:
        copyright_count += 1
    
    # Fix 3: Add quiz to sitemap page
    if 'sitemap/' in filepath:
        content, sitemap_changed = add_quiz_to_sitemap(content)
        if sitemap_changed:
            sitemap_count += 1
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  Updated: {filepath}")

print(f"\nResults:")
print(f"  Quiz footer link added: {quiz_count} files")
print(f"  Copyright updated: {copyright_count} files")
print(f"  Sitemap quiz entry added: {sitemap_count} files")
