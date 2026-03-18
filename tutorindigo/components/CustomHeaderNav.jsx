const modifyMainMenu = ( widget ) => {
  const intl = useIntl();
  const config = getConfig();
  const PUBLIC_BASE = config.CATALOG_MICROFRONTEND_URL; 

  const messages = {
    'public.header.nav.home': {
      id: 'public.header.nav.home',
      defaultMessage: 'Home',
      description: 'Main navigation link to home page',
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
      defaultMessage: 'Supporters',
      description: 'Submenu item under About Us',
    },
    'public.header.nav.financials': {
      id: 'public.header.nav.financials',
      defaultMessage: 'Financials',
      description: 'Submenu item under About Us',
    },
    'public.header.nav.contactUs': {
      id: 'public.header.nav.contactUs',
      defaultMessage: 'Contact Us',
      description: 'Main navigation link to contact page',
    },
  }


  widget.content.menu = [
    {
      type: 'item',
      href: PUBLIC_BASE,
      content: intl.formatMessage(messages['public.header.nav.home']),
    },
    {
      type: 'item',
      href: `${PUBLIC_BASE}courses`,
      content: intl.formatMessage(messages['public.header.nav.courses']),
    },
    {
      type: 'menu',
      content: intl.formatMessage(messages['public.header.nav.aboutUs']),
      submenuContent: (
        <div className=''>
          <a className="dropdown-item" href={`${PUBLIC_BASE}story`}>
            {intl.formatMessage(messages['public.header.nav.ourStory'])}
          </a>
          <a className="dropdown-item" href={`${PUBLIC_BASE}team`}>
            {intl.formatMessage(messages['public.header.nav.team'])}
          </a>
          <a className="dropdown-item" href={`${PUBLIC_BASE}supporter`}>
            {intl.formatMessage(messages['public.header.nav.supporters'])}
          </a>
          <a className="dropdown-item" href={`${PUBLIC_BASE}financial`}>
            {intl.formatMessage(messages['public.header.nav.financials'])}
          </a>
        </div>
      ),
    },
    {
      type: 'item',
      href: `${PUBLIC_BASE}contact`,
      content: intl.formatMessage(messages['public.header.nav.contactUs']),
    },
  ];
  return widget;
};