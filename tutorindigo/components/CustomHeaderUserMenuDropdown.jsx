const USER_MENU_DROPDOWN_STYLE_ID = 'vs-user-menu-dropdown-style';

const ensureUserMenuDropdownStyle = () => {
  if (typeof document === 'undefined') return;

  const style = document.getElementById(USER_MENU_DROPDOWN_STYLE_ID) || document.createElement('style');
  style.id = USER_MENU_DROPDOWN_STYLE_ID;
  style.textContent = `
    .vs-user-menu-toggle-avatar {
      width: 3em;
      height: 3em;
      object-fit: cover;
    }

    .vs-user-menu-toggle-avatar-container {
      width: 3em;
      height: 3em;
    }

    .vs-user-menu-toggle-avatar-container .pgn__icon {
      width: 3em;
      height: 3em;
    }

    .vs-user-menu-toggle-name {
      font-weight: 700;
      font-size: 1rem;
      letter-spacing: 0.2px;
      color: #1f2937;
      text-transform: capitalize;
      max-width: 12rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .vs-user-menu-toggle-chevron {
      width: 0.85rem;
      height: 0.85rem;
      transform: rotate(0deg);
      transition: transform 150ms ease;
    }

    .vs-user-menu-toggle-chevron.is-open {
      transform: rotate(180deg);
    }
  `;

  if (!style.parentNode) {
    document.head.appendChild(style);
  }
};

const ChevronIcon = ({ isOpen }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 512 512"
    className={classNames('vs-user-menu-toggle-chevron', { 'is-open': isOpen })}
  >
    <path
      fill="currentColor"
      d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
    />
  </svg>
);

// ─── Profile MFE (header v6) avatar visibility fix ────────────────────────────
// Paragon light theme ships .avatar { display: none !important }.
// A stylesheet !important cannot be overridden by another stylesheet rule;
// inline style.setProperty('display', ..., 'important') is the only reliable override.

const PROFILE_TRIGGER_STYLE_ID = 'vs-profile-trigger-v6-style';

const ensureProfileTriggerStyle = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById(PROFILE_TRIGGER_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = PROFILE_TRIGGER_STYLE_ID;
  style.textContent = `
    .site-header-desktop button.menu-trigger .avatar,
    .site-header-mobile  button.menu-trigger .avatar {
      width: 3em !important; height: 3em !important;
    }
    .site-header-desktop button.menu-trigger .avatar img,
    .site-header-mobile  button.menu-trigger .avatar img {
      object-fit: cover; width: 100% !important; height: 100% !important;
    }
    .site-header-desktop button.menu-trigger,
    .site-header-mobile  button.menu-trigger {
      font-weight: 700; font-size: 1rem; letter-spacing: 0.2px; color: #1f2937 !important;
    }
    .site-header-desktop button.menu-trigger svg,
    .site-header-mobile  button.menu-trigger svg { transition: transform 150ms ease; }
    .site-header-desktop button.menu-trigger[aria-expanded="true"] svg,
    .site-header-mobile  button.menu-trigger[aria-expanded="true"] svg { transform: rotate(180deg); }
  `;
  document.head.appendChild(style);
};

const forceAvatarDisplay = () => {
  if (typeof document === 'undefined') return;
  document.querySelectorAll(
    '.site-header-desktop button.menu-trigger .avatar, '
    + '.site-header-mobile button.menu-trigger .avatar',
  ).forEach((el) => {
    el.style.setProperty('display', 'inline-flex', 'important');
  });
};

const ProfileHeaderAvatarSync = () => {
  const { authenticatedUser } = useContext(AppContext);
  const avatarUrl = authenticatedUser?.profileImage?.imageUrlFull || authenticatedUser?.avatar;

  useEffect(() => {
    ensureProfileTriggerStyle();
    forceAvatarDisplay();
  }, []);

  useEffect(() => {
    if (!avatarUrl) return;
    forceAvatarDisplay();
    document.querySelectorAll(
      '.site-header-desktop button.menu-trigger .avatar img, '
      + '.site-header-mobile button.menu-trigger .avatar img',
    ).forEach((img) => {
      img.src = avatarUrl; // eslint-disable-line no-param-reassign
    });
  }, [avatarUrl]);

  return null;
};

// For MFEs using @edx/frontend-component-header v6 (no DesktopUserMenuToggleSlot),
// override the username prop on DesktopHeader/MobileHeader via the header_desktop.v1
// and header_mobile.v1 slots so the full display name appears instead of the login name.
const modifyHeaderUsername = (widget) => {
  const { authenticatedUser } = useContext(AppContext);
  // eslint-disable-next-line no-param-reassign
  widget.content = {
    ...widget.content,
    username: authenticatedUser?.name || authenticatedUser?.username || null,
    avatar: authenticatedUser?.profileImage?.imageUrlFull || authenticatedUser?.avatar || null,
  };
  return widget;
};

const DesktopUserMenuToggleAvatar = () => {
  const { authenticatedUser } = useContext(AppContext);
  const avatar = authenticatedUser?.avatar;
  const displayName = authenticatedUser?.name || authenticatedUser?.username || '';
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  ensureUserMenuDropdownStyle();

  useEffect(() => {
    const trigger = containerRef.current?.closest('button');
    if (!trigger) {
      return undefined;
    }

    const syncOpenState = () => {
      setIsOpen(trigger.getAttribute('aria-expanded') === 'true');
    };

    syncOpenState();

    const observerOptions = { attributes: true, attributeFilter: ['aria-expanded'] };
    const observer = new MutationObserver(syncOpenState);
    observer.observe(trigger, observerOptions);

    return () => observer.disconnect();
  }, []);

  return (
    <span ref={containerRef} className="d-inline-flex align-items-center">
      {avatar ? (
        <img
          src={avatar}
          alt="User avatar"
          className="rounded-circle mr-2 vs-user-menu-toggle-avatar"
        />
      ) : (
        <span
          className="avatar overflow-hidden d-inline-flex rounded-circle mr-2 align-items-center justify-content-center vs-user-menu-toggle-avatar-container"
        >
          <Icon src={AccountCircle} />
        </span>
      )}
      <span className="mr-2 vs-user-menu-toggle-name">
        {displayName}
      </span>
      <ChevronIcon isOpen={isOpen} />
    </span>
  );
};
