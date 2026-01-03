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
        toggleBtn.innerHTML = '<i class="bi bi-list" aria-hidden="true"></i>';
        toggleBtn.setAttribute('aria-label', 'Toggle Navigation');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-controls', 'main-nav');
        nav.setAttribute('id', 'main-nav');

        const actions = document.querySelector('.header-actions');
        if (actions) {
            headerInner.insertBefore(toggleBtn, actions);
        } else {
            headerInner.appendChild(toggleBtn);
        }

        // Get focusable elements within menu for focus trap
        const getFocusableElements = () => {
            return nav.querySelectorAll('a[href], button:not([disabled])');
        };

        const closeMobileMenu = () => {
            toggleBtn.setAttribute('aria-expanded', 'false');
            nav.classList.remove('active');
            toggleBtn.innerHTML = '<i class="bi bi-list" aria-hidden="true"></i>';
            toggleBtn.focus();
        };

        const openMobileMenu = () => {
            toggleBtn.setAttribute('aria-expanded', 'true');
            nav.classList.add('active');
            toggleBtn.innerHTML = '<i class="bi bi-x-lg" aria-hidden="true"></i>';
            // Focus first menu item
            const firstLink = nav.querySelector('a');
            if (firstLink) firstLink.focus();
        };

        toggleBtn.addEventListener('click', () => {
            const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Escape key to close mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Focus trap for mobile menu
        nav.addEventListener('keydown', (e) => {
            if (!nav.classList.contains('active')) return;
            if (e.key !== 'Tab') return;

            const focusable = getFocusableElements();
            const firstEl = focusable[0];
            const lastEl = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === firstEl) {
                e.preventDefault();
                lastEl.focus();
            } else if (!e.shiftKey && document.activeElement === lastEl) {
                e.preventDefault();
                firstEl.focus();
            }
        });
    };

    createMobileMenu();

    // Dropdown keyboard navigation (WCAG 2.1 compliance)
    const initDropdownKeyboard = () => {
        const dropdownItems = document.querySelectorAll('.has-dropdown');

        dropdownItems.forEach(item => {
            const trigger = item.querySelector('a[aria-haspopup]');
            const menu = item.querySelector('.dropdown-menu');

            if (!trigger || !menu) return;

            const menuLinks = menu.querySelectorAll('a');

            // Arrow down opens dropdown and moves to first item
            trigger.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown' || e.key === 'Down') {
                    e.preventDefault();
                    trigger.setAttribute('aria-expanded', 'true');
                    item.classList.add('dropdown-open');
                    if (menuLinks[0]) menuLinks[0].focus();
                }
            });

            // Navigate within dropdown
            menuLinks.forEach((link, index) => {
                link.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowDown' || e.key === 'Down') {
                        e.preventDefault();
                        const next = menuLinks[index + 1] || menuLinks[0];
                        next.focus();
                    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
                        e.preventDefault();
                        const prev = menuLinks[index - 1] || menuLinks[menuLinks.length - 1];
                        prev.focus();
                    } else if (e.key === 'Escape') {
                        e.preventDefault();
                        trigger.setAttribute('aria-expanded', 'false');
                        item.classList.remove('dropdown-open');
                        trigger.focus();
                    } else if (e.key === 'Tab' && !e.shiftKey && index === menuLinks.length - 1) {
                        // Tab from last item closes dropdown
                        trigger.setAttribute('aria-expanded', 'false');
                        item.classList.remove('dropdown-open');
                    }
                });
            });

            // Close dropdown when focus leaves
            item.addEventListener('focusout', (e) => {
                setTimeout(() => {
                    if (!item.contains(document.activeElement)) {
                        trigger.setAttribute('aria-expanded', 'false');
                        item.classList.remove('dropdown-open');
                    }
                }, 100);
            });
        });
    };

    initDropdownKeyboard();

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
            trigger.addEventListener('click', function () {
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
            trigger.addEventListener('keydown', function (e) {
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
            header.addEventListener('click', function () {
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
