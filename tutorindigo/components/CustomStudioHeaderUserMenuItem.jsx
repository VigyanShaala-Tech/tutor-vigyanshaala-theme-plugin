
// User dropdown items for the Studio (authoring MFE) header, rendered in the
// org.openedx.frontend.authoring.studio_header_user_menu.v1 slot.
// Dropdown and Link are imported only for authoring in
// mfe-env-config-runtime-definitions-authoring (see plugin.py).
const studioUserMenuMessages = {
  studio: {
    id: 'studio.user.menu.studio',
    defaultMessage: 'Studio Home',
    description: 'Studio home link label in Studio header user menu',
  },
  lms: {
    id: 'studio.user.menu.lms',
    defaultMessage: 'LMS',
    description: 'LMS link label in Studio header user menu',
  },
  controlHub: {
    id: 'studio.user.menu.control.hub',
    defaultMessage: 'Control Hub',
    description: 'Control Hub link label in Studio header user menu',
  },
  logout: {
    id: 'studio.user.menu.logout',
    defaultMessage: 'Logout',
    description: 'Logout link label in Studio header user menu',
  },
};

const CustomStudioHeaderUserMenuItem = ({ studioBaseUrl, logoutUrl }) => {
  const intl = useIntl();
  const { authenticatedUser, config } = useContext(AppContext);
  const canSeePrivilegedItems = hasElevatedMenuAccess(authenticatedUser);

  return (
    <>
      <Dropdown.Item as={Link} to={studioBaseUrl} className="small">
        {intl.formatMessage(studioUserMenuMessages.studio)}
      </Dropdown.Item>
      <Dropdown.Item href={config.LMS_BASE_URL} className="small">
        {intl.formatMessage(studioUserMenuMessages.lms)}
      </Dropdown.Item>
      {canSeePrivilegedItems && (
        <Dropdown.Item href={`${config.LMS_BASE_URL}/control-hub`} className="small">
          {intl.formatMessage(studioUserMenuMessages.controlHub)}
        </Dropdown.Item>
      )}
      <Dropdown.Item href={logoutUrl} className="small">
        {intl.formatMessage(studioUserMenuMessages.logout)}
      </Dropdown.Item>
    </>
  );
};
