const HEADER_STYLE_ID = 'simple-sticky-header-style';
const HEADER_STICKY_BINDING_KEY = '__simpleStickyHeaderBinding';

const ensureStickyHeaderStyle = () => {
  if (typeof document === 'undefined') return;

  const style = document.getElementById(HEADER_STYLE_ID) || document.createElement('style');
  style.id = HEADER_STYLE_ID;
  style.textContent = `
    #root.public-page .site-header-desktop,
    #root.public-page .site-header-mobile {
      background-color: transparent !important;
      transition: background-color 220ms ease;
      box-shadow: none !important;
      z-index: 1030;
    }

    #root.public-page.header-sticky-active {
      padding-top: var(--public-header-height, 0px);
    }

    #root.public-page.header-sticky-active .site-header-desktop,
    #root.public-page.header-sticky-active .site-header-mobile {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.8) !important;
      -webkit-backdrop-filter: blur(12px) !important;
      backdrop-filter: blur(12px) !important;
    }

    #root.public-page.header-sticky-active .site-header-desktop .container-fluid,
    #root.public-page.header-sticky-active .site-header-desktop .nav-container,
    #root.public-page.header-sticky-active .site-header-mobile .container-fluid,
    #root.public-page.header-sticky-active .site-header-mobile .nav-container {
      background: transparent !important;
      -webkit-backdrop-filter: none !important;
      backdrop-filter: none !important;
    }

    /* ── active nav link: green border-bottom (overrides Paragon default bg fill) ── */
    .site-header-desktop .main-nav .nav-link.active {
      background: transparent !important;
      color: #111827 !important;
      border-bottom: 2px solid #69AB4A;
    }

    /* About Us dropdown trigger – active when on any about sub-page.
       Uses CSS :has() to detect the hidden .vs-nav-active-marker inside the content. */
    .site-header-desktop .main-nav .nav-item .nav-link:has(.vs-nav-active-marker) {
      background: transparent !important;
      color: #111827 !important;
      border-bottom: 2px solid #69AB4A;
    }

    /* Active sub-menu item highlight (Our Story, Team, …) */
    .dropdown-item.vs-nav-submenu-active {
      color: #69AB4A !important;
      font-weight: 600;
    }

    /* Hide the active-state marker span (used by :has() selectors above) */
    .vs-nav-active-marker {
      display: none;
    }
    #root .site-header-desktop .container-fluid .nav-container .main-nav .nav-link.active {
        border-bottom: 2px solid var(--pgn-color-primary-base) !important;
        color: var(--pgn-color-primary-base) !important;
    }
    /* Mobile: active nav link */
    .site-header-mobile .nav-link.active {
      background: rgba(105, 171, 74, 0.12) !important;
      color: #111827 !important;
    }
    .site-header-mobile .nav-link:has(.vs-nav-active-marker) {
      background: rgba(105, 171, 74, 0.12) !important;
      color: #111827 !important;
    }
  `;

  if (!style.parentNode) {
    document.head.appendChild(style);
  }
};

const ensureStickyBinding = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  if (window[HEADER_STICKY_BINDING_KEY]) {
    window[HEADER_STICKY_BINDING_KEY].sync();
    return;
  }

  const state = { ticking: false };

  const sync = () => {
    const root = document.getElementById('root');
    if (!root) return;

    root.classList.add('public-page');

    const headerElement = document.querySelector('.site-header-desktop, .site-header-mobile');
    const headerHeight = headerElement ? Math.ceil(headerElement.getBoundingClientRect().height || 0) : 0;
    root.style.setProperty('--public-header-height', `${headerHeight}px`);

    const stickyThreshold = Math.max(headerHeight, 1);
    const isSticky = window.scrollY >= stickyThreshold;
    root.classList.toggle('header-sticky-active', isSticky);
  };

  const onScroll = () => {
    if (state.ticking) return;
    state.ticking = true;
    window.requestAnimationFrame(() => {
      sync();
      state.ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', sync);
  window.addEventListener('load', sync);
  window.addEventListener('popstate', sync);

  state.sync = sync;
  state.interval = window.setInterval(sync, 300);
  window[HEADER_STICKY_BINDING_KEY] = state;
  sync();
};

const modifyMainMenu = (widget) => {
  const intl = useIntl();
  const { authenticatedUser } = useContext(AppContext);
  const isLoggedIn = authenticatedUser !== null;
  const config = getConfig();
  // Normalise to trailing-slash so path concatenation is consistent.
  const PUBLIC_BASE = config.CATALOG_MICROFRONTEND_URL
    ? config.CATALOG_MICROFRONTEND_URL.replace(/\/?$/, '/')
    : '/public/';
  const LMS_BASE_URL = config.LMS_BASE_URL;

  ensureStickyHeaderStyle();
  ensureStickyBinding();

  // ── active-link detection ──────────────────────────────────────────────────
  // Extract the public MFE base path. Works for both absolute URLs (production)
  // and relative paths (local dev fallback).
  let publicBasePath = '/public/';
  try {
    publicBasePath = new URL(PUBLIC_BASE).pathname.replace(/\/?$/, '/');
  } catch (_) {
    publicBasePath = PUBLIC_BASE.endsWith('/') ? PUBLIC_BASE : `${PUBLIC_BASE}/`;
  }

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const aboutSegments = ['story', 'team', 'supporter', 'faq'];

  const isHomeActive = currentPath === publicBasePath || currentPath === publicBasePath.slice(0, -1);
  const isDashboardActive = currentPath.startsWith('/learner-dashboard');
  const isCoursesActive = currentPath.startsWith(`${publicBasePath}courses`);
  const isAboutActive = aboutSegments.some((seg) => currentPath.startsWith(`${publicBasePath}${seg}`));
  const isContactActive = currentPath.startsWith(`${publicBasePath}contact`);

  const messages = {
    'public.header.nav.home': {
      id: 'public.header.nav.home',
      defaultMessage: 'Home',
      description: 'Main navigation link to home page',
    },
    'public.header.nav.dashboard': {
      id: 'public.header.nav.dashboard',
      defaultMessage: 'My Dashboard',
      description: 'Dashboard navigation link',
    },
    'public.header.nav.courses': {
      id: 'public.header.nav.courses',
      defaultMessage: 'Courses',
      description: 'Main navigation link to course catalog',
    },
    'public.header.nav.aboutUs': {
      id: 'public.header.nav.aboutUs',
      defaultMessage: 'About Us',
      description: 'Parent menu item for about section',
    },
    'public.header.nav.ourStory': {
      id: 'public.header.nav.ourStory',
      defaultMessage: 'Our Story',
      description: 'Submenu item under About Us',
    },
    'public.header.nav.team': {
      id: 'public.header.nav.team',
      defaultMessage: 'Team',
      description: 'Submenu item under About Us',
    },
    'public.header.nav.supporters': {
      id: 'public.header.nav.supporters',
      defaultMessage: 'Our Investors',
      description: 'Submenu item under About Us',
    },
    'public.header.nav.faq': {
      id: 'public.header.nav.faq',
      defaultMessage: 'FAQs',
      description: 'Main navigation link to faq page',
    },
    'public.header.nav.contactUs': {
      id: 'public.header.nav.contactUs',
      defaultMessage: 'Contact Us',
      description: 'Main navigation link to contact page',
    },
  };

  widget.content.menu = [
    {
      type: 'item',
      href: PUBLIC_BASE,
      content: intl.formatMessage(messages['public.header.nav.home']),
      isActive: isHomeActive,
    },
    ...(isLoggedIn ? [{
      type: 'item',
      href: `${LMS_BASE_URL}/dashboard`,
      content: intl.formatMessage(messages['public.header.nav.dashboard']),
      isActive: isDashboardActive,
    }] : []),
    {
      type: 'item',
      href: `${PUBLIC_BASE}courses`,
      content: intl.formatMessage(messages['public.header.nav.courses']),
      isActive: isCoursesActive,
    },
    {
      type: 'menu',
      // Wrap content in a span so CSS :has(.vs-nav-active-marker) can target the
      // parent nav-link trigger when on any About Us sub-page.
      content: (
        <span>
          {intl.formatMessage(messages['public.header.nav.aboutUs'])}
          {isAboutActive && <span className="vs-nav-active-marker" aria-hidden="true" />}
        </span>
      ),
      submenuContent: (
        <div>
          <a
            className={`dropdown-item${currentPath.startsWith(`${publicBasePath}story`) ? ' vs-nav-submenu-active' : ''}`}
            href={`${PUBLIC_BASE}story`}
          >
            {intl.formatMessage(messages['public.header.nav.ourStory'])}
          </a>
          <a
            className={`dropdown-item${currentPath.startsWith(`${publicBasePath}team`) ? ' vs-nav-submenu-active' : ''}`}
            href={`${PUBLIC_BASE}team`}
          >
            {intl.formatMessage(messages['public.header.nav.team'])}
          </a>
          <a
            className={`dropdown-item${currentPath.startsWith(`${publicBasePath}supporter`) ? ' vs-nav-submenu-active' : ''}`}
            href={`${PUBLIC_BASE}supporter`}
          >
            {intl.formatMessage(messages['public.header.nav.supporters'])}
          </a>
          <a
            className={`dropdown-item${currentPath.startsWith(`${publicBasePath}faq`) ? ' vs-nav-submenu-active' : ''}`}
            href={`${PUBLIC_BASE}faq`}
          >
            {intl.formatMessage(messages['public.header.nav.faq'])}
          </a>
        </div>
      ),
    },
    {
      type: 'item',
      href: `${PUBLIC_BASE}contact`,
      content: intl.formatMessage(messages['public.header.nav.contactUs']),
      isActive: isContactActive,
    },
  ];
  return widget;
};
