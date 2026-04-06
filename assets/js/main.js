/* Better Solano - Main JavaScript */

// ─── PWA Install Prompt ─────────────────────────────────────────────────────
var deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault();
  deferredInstallPrompt = e;
  showInstallBanner();
});

function showInstallBanner() {
  // Don't show if already installed or dismissed recently
  if (window.matchMedia('(display-mode: standalone)').matches) return;
  if (navigator.standalone) return;
  if (sessionStorage.getItem('pwa-install-dismissed')) return;

  var existing = document.querySelector('.pwa-install-banner');
  if (existing) return;

  var banner = document.createElement('div');
  banner.className = 'pwa-install-banner';
  banner.setAttribute('role', 'alert');
  banner.setAttribute('aria-live', 'polite');
  banner.innerHTML =
    '<div class="pwa-install-content">' +
    '<i class="bi bi-download" aria-hidden="true"></i>' +
    '<span>Install BetterSolano for quick access to services.</span>' +
    '</div>' +
    '<div class="pwa-install-actions">' +
    '<button class="pwa-install-btn" aria-label="Install BetterSolano app">Install</button>' +
    '<button class="pwa-install-dismiss" aria-label="Dismiss install prompt">&times;</button>' +
    '</div>';

  document.body.appendChild(banner);

  banner.querySelector('.pwa-install-btn').addEventListener('click', function () {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then(function () {
      deferredInstallPrompt = null;
      banner.remove();
    });
  });

  banner.querySelector('.pwa-install-dismiss').addEventListener('click', function () {
    sessionStorage.setItem('pwa-install-dismissed', '1');
    banner.remove();
  });
}

// ─── Register Service Worker with seamless updates ──────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/sw.js')
      .then(function (reg) {
        // Check for updates every 30 minutes
        setInterval(function () {
          reg.update();
        }, 30 * 60 * 1000);

        reg.addEventListener('updatefound', function () {
          var newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', function () {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New SW installed and waiting — show update banner
              showUpdateBanner(newWorker);
            }
          });
        });
      })
      .catch(function (err) {
        console.warn('SW registration failed:', err);
      });

    // When a new SW takes over, reload seamlessly
    var refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  });
}

function showUpdateBanner(worker) {
  var existing = document.querySelector('.sw-update-banner');
  if (existing) existing.remove();

  var banner = document.createElement('div');
  banner.setAttribute('role', 'alert');
  banner.setAttribute('aria-live', 'polite');
  banner.className = 'sw-update-banner';
  banner.innerHTML =
    '<span>A new version is available.</span>' +
    '<button class="sw-update-btn" aria-label="Update now">Update</button>' +
    '<button class="sw-update-dismiss" aria-label="Dismiss update notice">&times;</button>';

  document.body.appendChild(banner);

  banner.querySelector('.sw-update-btn').addEventListener('click', function () {
    worker.postMessage({ type: 'SKIP_WAITING' });
    banner.remove();
  });

  banner.querySelector('.sw-update-dismiss').addEventListener('click', function () {
    banner.remove();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Prevent double-click on navigation and header links from causing unintended behavior
  const headerLinks = document.querySelectorAll('.site-header a, .main-nav a, .logo-container a');
  headerLinks.forEach((link) => {
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

  // Utility: detect mobile breakpoint
  var isMobileNav = function () {
    return window.matchMedia('(max-width: 1024px)').matches;
  };

  // Hotline Marquee (tablet + mobile)
  var initHotlineMarquee = function () {
    var isTabletOrBelow = function () {
      return window.matchMedia('(max-width: 1024px)').matches;
    };
    var hotlineItems = document.querySelector('.hotline-items');
    if (!hotlineItems) return;

    var track = null;
    var originalItems = Array.from(hotlineItems.children);

    var buildMarquee = function () {
      if (!isTabletOrBelow() || track) return;
      track = document.createElement('div');
      track.className = 'hotline-items-track';
      track.setAttribute('aria-label', 'Emergency contacts scrolling');
      while (hotlineItems.firstChild) {
        track.appendChild(hotlineItems.firstChild);
      }
      originalItems.forEach(function (item) {
        var clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.setAttribute('tabindex', '-1');
        track.appendChild(clone);
      });
      hotlineItems.appendChild(track);
    };

    var destroyMarquee = function () {
      if (!track) return;
      while (hotlineItems.firstChild) {
        hotlineItems.removeChild(hotlineItems.firstChild);
      }
      originalItems.forEach(function (item) {
        hotlineItems.appendChild(item);
      });
      track = null;
    };

    var handleResize = function () {
      if (isTabletOrBelow()) {
        buildMarquee();
      } else {
        destroyMarquee();
      }
    };

    handleResize();
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 150);
    });
  };

  initHotlineMarquee();

  // Mobile Menu Toggle
  var createMobileMenu = function () {
    var headerInner = document.querySelector('.header-inner');
    var nav = document.querySelector('.main-nav');

    if (!headerInner || !nav) return;

    var toggleBtn = document.createElement('button');
    toggleBtn.className = 'mobile-menu-toggle btn btn-secondary';
    toggleBtn.innerHTML = '<i class="bi bi-list" aria-hidden="true"></i>';
    toggleBtn.setAttribute('aria-label', 'Toggle Navigation');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-controls', 'main-nav');
    nav.setAttribute('id', 'main-nav');

    var actions = document.querySelector('.header-actions');
    if (actions) {
      headerInner.insertBefore(toggleBtn, actions);
    } else {
      headerInner.appendChild(toggleBtn);
    }

    // Get focusable elements within menu for focus trap
    var getFocusableElements = function () {
      return nav.querySelectorAll('a[href], button:not([disabled])');
    };

    var closeAllDropdowns = function () {
      var openItems = nav.querySelectorAll('.has-dropdown.dropdown-open');
      for (var i = 0; i < openItems.length; i++) {
        openItems[i].classList.remove('dropdown-open');
        var t = openItems[i].querySelector('a[aria-haspopup]');
        if (t) t.setAttribute('aria-expanded', 'false');
      }
    };

    var scrollY = 0;

    var lockBodyScroll = function () {
      scrollY = window.scrollY;
      document.body.classList.add('mobile-menu-open');
      document.body.style.top = '-' + scrollY + 'px';
    };

    var unlockBodyScroll = function () {
      document.body.classList.remove('mobile-menu-open');
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    };

    var isAnimating = false;

    var closeMobileMenu = function () {
      if (isAnimating) return;
      isAnimating = true;
      toggleBtn.setAttribute('aria-expanded', 'false');
      nav.classList.remove('active');
      toggleBtn.innerHTML = '<i class="bi bi-list" aria-hidden="true"></i>';
      closeAllDropdowns();
      unlockBodyScroll();
      setTimeout(function () {
        isAnimating = false;
      }, 320);
    };

    var openMobileMenu = function () {
      if (isAnimating) return;
      isAnimating = true;
      toggleBtn.setAttribute('aria-expanded', 'true');
      nav.classList.add('active');
      toggleBtn.innerHTML = '<i class="bi bi-x-lg" aria-hidden="true"></i>';
      lockBodyScroll();
      // Focus first menu item after transition
      var firstLink = nav.querySelector('a');
      if (firstLink) {
        setTimeout(function () {
          firstLink.focus();
        }, 100);
      }
      setTimeout(function () {
        isAnimating = false;
      }, 320);
    };

    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
        toggleBtn.focus();
      } else {
        openMobileMenu();
      }
    });

    // Click outside to close mobile menu
    document.addEventListener('click', function (e) {
      if (!isMobileNav()) return;
      if (!nav.classList.contains('active')) return;
      if (nav.contains(e.target) || toggleBtn.contains(e.target)) return;
      closeMobileMenu();
    });

    // Close mobile menu when a non-dropdown nav link is clicked
    nav.addEventListener('click', function (e) {
      if (!isMobileNav()) return;
      var link = e.target.closest('a');
      if (!link) return;
      // If it's a dropdown trigger, don't close menu (handled by dropdown init)
      if (link.getAttribute('aria-haspopup') === 'true') return;
      closeMobileMenu();
    });

    // Escape key to close mobile menu
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        closeMobileMenu();
        toggleBtn.focus();
      }
    });

    // Focus trap for mobile menu
    nav.addEventListener('keydown', function (e) {
      if (!nav.classList.contains('active')) return;
      if (e.key !== 'Tab') return;

      var focusable = getFocusableElements();
      if (focusable.length === 0) return;
      var firstEl = focusable[0];
      var lastEl = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    });

    // Clean up on resize: if resized to desktop, reset mobile state (debounced)
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (!isMobileNav() && nav.classList.contains('active')) {
          isAnimating = false; // force allow close on resize
          closeMobileMenu();
        }
      }, 150);
    });
  };

  createMobileMenu();

  // Dropdown handling: mobile touch/click toggle + desktop keyboard navigation (WCAG 2.1)
  var initDropdowns = function () {
    var dropdownItems = document.querySelectorAll('.has-dropdown');

    dropdownItems.forEach(function (item) {
      var trigger = item.querySelector('a[aria-haspopup]');
      var menu = item.querySelector('.dropdown-menu');

      if (!trigger || !menu) return;

      var menuLinks = menu.querySelectorAll('a');

      var openDropdown = function () {
        // Close sibling dropdowns first
        var siblings = item.parentElement.querySelectorAll('.has-dropdown.dropdown-open');
        for (var i = 0; i < siblings.length; i++) {
          if (siblings[i] !== item) {
            siblings[i].classList.remove('dropdown-open');
            var st = siblings[i].querySelector('a[aria-haspopup]');
            if (st) st.setAttribute('aria-expanded', 'false');
          }
        }
        item.classList.add('dropdown-open');
        trigger.setAttribute('aria-expanded', 'true');
      };

      var closeDropdown = function () {
        item.classList.remove('dropdown-open');
        trigger.setAttribute('aria-expanded', 'false');
      };

      // Mobile: tap/click on dropdown trigger toggles submenu instead of navigating
      trigger.addEventListener('click', function (e) {
        if (!isMobileNav()) return;
        e.preventDefault();
        e.stopPropagation();
        if (item.classList.contains('dropdown-open')) {
          closeDropdown();
        } else {
          openDropdown();
        }
      });

      // Keyboard: arrow-down opens dropdown and moves to first item
      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'Down') {
          e.preventDefault();
          openDropdown();
          if (menuLinks[0]) menuLinks[0].focus();
        } else if (e.key === 'Enter' || e.key === ' ') {
          if (isMobileNav()) {
            e.preventDefault();
            if (item.classList.contains('dropdown-open')) {
              closeDropdown();
            } else {
              openDropdown();
              if (menuLinks[0]) menuLinks[0].focus();
            }
          }
        }
      });

      // Navigate within dropdown with arrow keys
      menuLinks.forEach(function (link, index) {
        link.addEventListener('keydown', function (e) {
          if (e.key === 'ArrowDown' || e.key === 'Down') {
            e.preventDefault();
            var next = menuLinks[index + 1] || menuLinks[0];
            next.focus();
          } else if (e.key === 'ArrowUp' || e.key === 'Up') {
            e.preventDefault();
            var prev = menuLinks[index - 1] || menuLinks[menuLinks.length - 1];
            prev.focus();
          } else if (e.key === 'Escape') {
            e.preventDefault();
            closeDropdown();
            trigger.focus();
          } else if (e.key === 'Tab' && !e.shiftKey && index === menuLinks.length - 1) {
            closeDropdown();
          }
        });
      });

      // Close dropdown when focus leaves the item entirely
      item.addEventListener('focusout', function () {
        setTimeout(function () {
          if (!item.contains(document.activeElement)) {
            closeDropdown();
          }
        }, 100);
      });
    });

    // Desktop: click outside any open dropdown closes them
    document.addEventListener('click', function (e) {
      if (isMobileNav()) return;
      dropdownItems.forEach(function (item) {
        if (!item.contains(e.target)) {
          item.classList.remove('dropdown-open');
          var t = item.querySelector('a[aria-haspopup]');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });
    });
  };

  initDropdowns();

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

    accordionTriggers.forEach((trigger) => {
      trigger.addEventListener('click', function () {
        const accordionItem = this.closest('.accordion-item');
        const isActive = accordionItem.classList.contains('active');
        const accordionContent = accordionItem.querySelector('.accordion-content');

        // Close all other accordion items (optional - remove for multi-open)
        const allItems = document.querySelectorAll('.accordion-item');
        allItems.forEach((item) => {
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

    categoryHeaders.forEach((header) => {
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
