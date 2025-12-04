/* Better Solano - Main JavaScript */

document.addEventListener('DOMContentLoaded', () => {
    // Prevent double-click on navigation and header links from causing unintended behavior
    const headerLinks = document.querySelectorAll('.site-header a, .main-nav a, .logo-container a');
    headerLinks.forEach(link => {
        // Prevent text selection on double-click
        link.addEventListener('mousedown', (e) => {
            if (e.detail > 1) {
                e.preventDefault();
            }
        });
        
        // Handle double-click explicitly
        link.addEventListener('dblclick', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Stay on current link's destination (don't redirect elsewhere)
            if (link.href && !link.href.startsWith('javascript:')) {
                window.location.href = link.href;
            }
        });
    });
    
    // Prevent double-click text selection on entire header
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
        siteHeader.addEventListener('mousedown', (e) => {
            if (e.detail > 1) {
                e.preventDefault();
            }
        });
    }

    // Mobile Menu Toggle
    const createMobileMenu = () => {
        const headerInner = document.querySelector('.header-inner');
        const nav = document.querySelector('.main-nav');

        if (!headerInner || !nav) return;

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-menu-toggle btn btn-secondary';
        toggleBtn.innerHTML = '<i class="bi bi-list"></i>';
        toggleBtn.setAttribute('aria-label', 'Toggle Navigation');
        toggleBtn.setAttribute('aria-expanded', 'false');

        const actions = document.querySelector('.header-actions');
        if (actions) {
            headerInner.insertBefore(toggleBtn, actions);
        } else {
            headerInner.appendChild(toggleBtn);
        }

        toggleBtn.addEventListener('click', () => {
            const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            toggleBtn.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
            toggleBtn.innerHTML = isExpanded ? '<i class="bi bi-list"></i>' : '<i class="bi bi-x-lg"></i>';
        });
    };

    createMobileMenu();

    // Language handling is now managed by TranslationEngine in translations.js
    // The TranslationEngine initializes automatically and handles:
    // - Language persistence via localStorage
    // - Button state management
    // - Content translation with fallback support

    // Dynamic copyright year
    const yearElement = document.getElementById('copyright-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // FAQ Accordion Functionality
    const initAccordion = () => {
        const accordionTriggers = document.querySelectorAll('.accordion-trigger');
        
        if (accordionTriggers.length === 0) return;

        accordionTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const accordionItem = this.closest('.accordion-item');
                const isActive = accordionItem.classList.contains('active');
                const accordionContent = accordionItem.querySelector('.accordion-content');
                
                // Close all other accordion items (optional - remove for multi-open)
                const allItems = document.querySelectorAll('.accordion-item');
                allItems.forEach(item => {
                    if (item !== accordionItem) {
                        item.classList.remove('active');
                        item.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle current item
                if (isActive) {
                    accordionItem.classList.remove('active');
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    accordionItem.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                }
            });

            // Keyboard accessibility
            trigger.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });

        // Open first accordion item by default (optional)
        // const firstItem = document.querySelector('.accordion-item');
        // if (firstItem) {
        //     firstItem.classList.add('active');
        //     firstItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'true');
        // }
    };

    initAccordion();

    // Education Category Accordion
    const initEduAccordion = () => {
        const categoryHeaders = document.querySelectorAll('.edu-category-header');
        
        categoryHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                if (isExpanded) {
                    content.hidden = true;
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    content.hidden = false;
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });
    };

    initEduAccordion();
});
