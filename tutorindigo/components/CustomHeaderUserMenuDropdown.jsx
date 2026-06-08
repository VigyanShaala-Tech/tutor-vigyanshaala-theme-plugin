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
