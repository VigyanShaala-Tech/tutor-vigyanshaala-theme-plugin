/** Show mobile header below this width; desktop at this width and above. */
const HEADER_MOBILE_BREAKPOINT = 1110;

/**
 * Header mounts DesktopHeaderSlot at minWidth 769. Wrap that default desktop
 * header so widths under 1110 still render MobileHeader (with the same props).
 * Use Wrap (not Hide+Insert) so logo / auth button props stay on the default header.
 *
 * Responsive and MobileHeader are imported only for indigo-styled MFEs in
 * mfe-env-config-runtime-definitions-{mfe} (authn/authoring do not ship the header package).
 */
const wrapDesktopHeaderForBreakpoint = ({ component }) => {
  const headerProps = component?.props ?? {};

  return (
    <>
      <Responsive maxWidth={HEADER_MOBILE_BREAKPOINT - 1}>
        <MobileHeader {...headerProps} />
      </Responsive>
      <Responsive minWidth={HEADER_MOBILE_BREAKPOINT}>
        {component}
      </Responsive>
    </>
  );
};
