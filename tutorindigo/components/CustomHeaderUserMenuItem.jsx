const hasElevatedMenuAccess = (authenticatedUser) => authenticatedUser?.administrator === true;

const messages = {
  dashboard: {
    id: 'account.user.menu.dashboard',
    defaultMessage: 'Dashboard',
    description: 'Dashboard link label in desktop user menu',
  },
  profile: {
    id: 'account.user.menu.profile',
    defaultMessage: 'Profile',
    description: 'Profile link label in desktop user menu',
  },
  account: {
    id: 'account.user.menu.account',
    defaultMessage: 'Account',
    description: 'Account link label in desktop user menu',
  },
  controlHub: {
    id: 'account.user.menu.control.hub',
    defaultMessage: 'Control Hub',
    description: 'Control Hub link label in desktop user menu',
  },
  studio: {
    id: 'account.user.menu.studio',
    defaultMessage: 'Studio',
    description: 'Studio link label in desktop user menu',
  },
  signout: {
    id: 'account.user.menu.signout',
    defaultMessage: 'Sign out',
    description: 'Sign out link label in desktop user menu',
  },
};

const CustomHeaderUserMenuItem = () => {
  const intl = useIntl();
  const { authenticatedUser, config } = useContext(AppContext);
  const username = authenticatedUser?.username;
  const canSeePrivilegedItems = hasElevatedMenuAccess(authenticatedUser);
  const studioUrl = config.STUDIO_BASE_URL;

  const items = [
    {
      key: 'dashboard',
      content: intl.formatMessage(messages.dashboard),
      href: `${config.LMS_BASE_URL}/dashboard`,
    },
    {
      key: 'profile',
      content: intl.formatMessage(messages.profile),
      href: `${config.ACCOUNT_PROFILE_URL}/u/${username}`,
    },
    {
      key: 'account',
      content: intl.formatMessage(messages.account),
      href: config.ACCOUNT_SETTINGS_URL,
    },
    ...(canSeePrivilegedItems ? [
      {
        key: 'control-hub',
        content: intl.formatMessage(messages.controlHub),
        href: `${config.LMS_BASE_URL}/control-hub`,
      },
      ...(studioUrl ? [{
        key: 'studio',
        content: intl.formatMessage(messages.studio),
        href: studioUrl,
      }] : []),
    ] : []),
    {
      key: 'signout',
      content: intl.formatMessage(messages.signout),
      href: config.LOGOUT_URL,
    },
  ];

  return (
    <>
      {items.map((item) => (
        <a key={item.key} className="dropdown-item" href={item.href}>
          {item.content}
        </a>
      ))}
    </>
  );
};

