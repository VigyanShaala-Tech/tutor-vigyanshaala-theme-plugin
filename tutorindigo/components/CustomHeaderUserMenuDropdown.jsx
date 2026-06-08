const avatarImageStyle = { width: '3em', height: '3em', objectFit: 'cover' };
const avatarContainerStyle = { width: '3em', height: '3em' };
const displayNameStyle = {
  fontWeight: 700,
  fontSize: '1rem',
  letterSpacing: '0.2px',
  color: '#1f2937',
  textTransform: 'capitalize',
  maxWidth: '12rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const ChevronIcon = ({ isOpen }) => {
  const iconStyle = {
    width: '0.85rem',
    height: '0.85rem',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 150ms ease',
  };

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 512 512"
      style={iconStyle}
    >
      <path
        fill="currentColor"
        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
      />
    </svg>
  );
};

const DesktopUserMenuToggleAvatar = () => {
  const { authenticatedUser } = useContext(AppContext);
  const avatar = authenticatedUser?.avatar;
  const displayName = authenticatedUser?.name || authenticatedUser?.username || '';
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

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
          className="rounded-circle mr-2"
          style={avatarImageStyle}
        />
      ) : (
        <span
          className="avatar overflow-hidden d-inline-flex rounded-circle mr-2 align-items-center justify-content-center"
          style={avatarContainerStyle}
        >
          <Icon
            src={AccountCircle}
            style={avatarContainerStyle}
          />
        </span>
      )}
      <span className="mr-2" style={displayNameStyle}>
        {displayName}
      </span>
      <ChevronIcon isOpen={isOpen} />
    </span>
  );
};
