const FOOTER_STYLE_ID = 'vs-indigo-footer-style';

const ensureFooterStyle = () => {
  if (typeof document === 'undefined') return;

  const style = document.getElementById(FOOTER_STYLE_ID) || document.createElement('style');
  style.id = FOOTER_STYLE_ID;
  style.textContent = `
    .vs-indigo-footer-container {
      max-width: 1400px;
      padding: 0 15px;
      margin-left: auto;
      margin-right: auto;
    }

    .footer-bg {
      background-color: #2D3748;
    }

    .vs-indigo-footer-columns {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .vs-indigo-footer-columns .d-flex{
      gap: .75rem;
    }
    .vs-indigo-footer-social-list{
        gap: 0.75rem;
    }
    .vs-indigo-footer-social-link{
        background: rgba(255, 255, 255, 0.1);
        width: 2.5rem;
        height: 2.5rem;
        margin: 0 !important;
        padding: 0 !important;
        transition: background-color 300ms ease;
    }
    .vs-indigo-footer-social-link:hover{
        background: var(--pgn-color-primary-base, #69AB4A);
        transform: translateY(-3px) scale(1.1);
    }
    .vs-indigo-footer-social-icon{
        width: 1.25rem;
        height: 1.25rem;
    }
    .vs-indigo-footer-nav-link{
        color: rgba(255, 255, 255, 0.7) !important;
        transition: color 300ms ease;
    }
    .vs-indigo-footer-nav-link:hover{
        color: var(--pgn-color-primary-base, #69AB4A) !important;
    }
    .vs-indigo-footer-nav-arrow{
        opacity: 0;
        margin-left: -1.5rem;
        width: 1rem;
        height: 1rem;
        transition: opacity 300ms ease, margin-left 300ms ease;
    }
    .vs-indigo-footer-nav-link:hover .vs-indigo-footer-nav-arrow{
        opacity: 1;
        margin-left: 0;
    }
    .vs-indigo-footer-columns p, .vs-indigo-footer-columns span, .vs-indigo-footer-columns .text-white-75, .vs-indigo-footer-columns a{
        color: #ffffffb3 !important;
        line-height: 1.625 !important;
        font-size: 1rem;
    }
    .vs-indigo-footer-columns .list-unstyled{
      margin-bottom: 0 !important;
    }
    .vs-indigo-footer-container .copyright-text{
      border-top: 1px solid #ffffff1a !important;
      margin-top: 3rem !important;
      padding-top: 2rem !important;
      font-size: .875rem;
      line-height: 1.25rem;
      color: #ffffff80 !important;
    }
    .vs-indigo-footer-columns .legal-links{
      margin-top: 12px !important;
      padding-top: 1rem !important;
      border-top: 1px solid #ffffff1a !important;
    }
    .vs-indigo-footer-columns .legal-links h4{
      color: #ffffff80 !important;
      letter-spacing: .05em !important;
      text-transform: uppercase !important;
      font-size: .875rem !important;
      line-height: 1.25rem !important;
      margin-bottom: .75rem !important;
      font-weight: 700 !important;
    }
    .vs-indigo-footer-columns span.pgn__icon.pgn__icon__md {
        color: var(--pgn-color-primary-base) !important;
        margin-right: 0px !important;
    }
    .vs-indigo-footer-columns > div {
      width: fit-content;
      max-width: 440px;
      text-align: left;
    }

    /* < 768px (default/base rules above): 1 column, stacked, left aligned */

    /* 768px–1020px: 2 columns side by side (logo/social + Get In Touch);
       the 3rd column (Explore, with Legal nested inside it) drops to a
       full-width row underneath, left aligned. */
    @media (min-width: 768px) and (max-width: 1020px) {
      .vs-indigo-footer-columns {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: start;
        gap: 2rem 1.5rem;
      }
      .vs-indigo-footer-columns > div:nth-child(1) {
        grid-column: 1;
        grid-row: 1;
      }
      .vs-indigo-footer-columns > div:nth-child(2) {
        grid-column: 2;
        grid-row: 1;
      }
      .vs-indigo-footer-columns > div:nth-child(3) {
        grid-column: 1 / -1;
        grid-row: 2;
      }
    }

    /* > 1020px: all 3 columns side by side */
    @media (min-width: 1021px) {
      .vs-indigo-footer-columns {
        flex-direction: row;
        justify-content: normal;
        align-items: flex-start;
        gap: 5rem;
      }
    }

    @media (max-width: 768px) {
      .vs-indigo-footer-container {
        padding: 0 8px;
      }
    }
  `;

  if (!style.parentNode) {
    document.head.appendChild(style);
  }
};

// Outline social icons (Lucide paths) matching the mockup design exactly —
// Paragon's Bootstrap-icon set (BsFacebook etc.) ships filled glyphs, which
// visually mismatch the mockup's thin 2px-stroke outline icons.
const SOCIAL_ICON_PATHS = {
  facebook: (
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  ),
  twitter: (
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  instagram: (
    <>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </>
  ),
  youtube: (
    <>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </>
  ),
};

const SocialIcon = ({ name }) => (
  <svg
    className="vs-indigo-footer-social-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {SOCIAL_ICON_PATHS[name]}
  </svg>
);

const IndigoFooter = () => {
  const intl = useIntl();
  const config = getConfig();

  ensureFooterStyle();

  const PUBLIC_BASE = config.CATALOG_MICROFRONTEND_URL;

  const currentYear = new Date().getFullYear();

  const messages = {
    // Main sections
    'footer.description': {
      id: 'footer.description',
      defaultMessage:
        'Empowering learners worldwide to chart sustainable career. Join a tribe of thousands and find your path to something bigger.',
      description: 'Short description text in the footer',
    },
    'footer.getInTouch': {
      id: 'footer.getInTouch',
      defaultMessage: 'Get In Touch',
      description: 'Heading for contact information section',
    },
    'footer.explore': {
      id: 'footer.explore',
      defaultMessage: 'Explore',
      description: 'Heading for navigation links section',
    },
    'footer.legal': {
      id: 'footer.legal',
      defaultMessage: 'Legal',
      description: 'Subheading for legal/policy links',
    },
    'footer.copyright': {
      id: 'footer.copyright',
      defaultMessage: '© {year} VigyanShaala. All rights reserved.',
      description: 'Footer copyright notice',
    },

    // Navigation links
    'footer.link.home': {
      id: 'footer.link.home',
      defaultMessage: 'Home',
      description: 'Link to homepage',
    },
    'footer.link.courses': {
      id: 'footer.link.courses',
      defaultMessage: 'Courses',
      description: 'Link to courses page',
    },
    'footer.link.aboutUs': {
      id: 'footer.link.aboutUs',
      defaultMessage: 'About Us',
      description: 'Link to about us page',
    },
    'footer.link.contactUs': {
      id: 'footer.link.contactUs',
      defaultMessage: 'Contact Us',
      description: 'Link to contact page',
    },
    'footer.link.faq': {
      id: 'footer.link.faq',
      defaultMessage: 'FAQs',
      description: 'Link to faq page',
    },
    'footer.link.privacyPolicy': {
      id: 'footer.link.privacyPolicy',
      defaultMessage: 'Privacy Policy',
      description: 'Link to privacy policy',
    },
    'footer.link.termsOfService': {
      id: 'footer.link.termsOfService',
      defaultMessage: 'Terms of Service',
      description: 'Link to terms of service',
    },

    // Contact info
    'footer.address': {
      id: 'footer.address',
      defaultMessage: 'C 432, Avantika, Rohini Sector-1, Delhi - 110085',
      description: 'Physical address',
    },
    'footer.email.primary': {
      id: 'footer.email.primary',
      defaultMessage: 'communications@vigyanshaala.com',
      description: 'primary contact email',
    },
    'footer.phone.primary': {
      id: 'footer.phone.primary',
      defaultMessage: '+91 7028422265',
      description: 'Primary phone number',
    },
    'footer.phone.secondary': {
      id: 'footer.phone.secondary',
      defaultMessage: '+91 7058962024',
      description: 'Secondary phone number',
    },

    // Social media aria-labels / titles
    'footer.social.facebook': {
      id: 'footer.social.facebook',
      defaultMessage: 'Facebook',
      description: 'Label for Facebook link',
    },
    'footer.social.twitter': {
      id: 'footer.social.twitter',
      defaultMessage: 'Twitter',
      description: 'Label for Twitter link',
    },
    'footer.social.linkedin': {
      id: 'footer.social.linkedin',
      defaultMessage: 'LinkedIn',
      description: 'Label for LinkedIn link',
    },
    'footer.social.instagram': {
      id: 'footer.social.instagram',
      defaultMessage: 'Instagram',
      description: 'Label for Instagram link',
    },
    'footer.social.youtube': {
      id: 'footer.social.youtube',
      defaultMessage: 'YouTube',
      description: 'Label for YouTube link',
    },
  };

  const exploreLinks = [
    { id: 'footer.link.home', path: '' },
    { id: 'footer.link.courses', path: 'courses' },
    { id: 'footer.link.aboutUs', path: 'story' },
    { id: 'footer.link.contactUs', path: 'contact' },
    { id: 'footer.link.faq', path: 'faq' },
  ];

  const legalLinks = [
    { id: 'footer.link.privacyPolicy', path: 'privacy' },
    { id: 'footer.link.termsOfService', path: 'terms' },
  ];

  const socialLinks = [
    { icon: 'facebook',  id: 'footer.social.facebook',  href: 'https://www.facebook.com/VigyanShaala/' },
    { icon: 'twitter',   id: 'footer.social.twitter',   href: 'https://x.com/VIGYANshaala' },
    { icon: 'linkedin',  id: 'footer.social.linkedin',  href: 'https://www.linkedin.com/company/vigyanshaala/' },
    { icon: 'instagram', id: 'footer.social.instagram', href: 'https://instagram.com/vigyanshaala' },
    { icon: 'youtube',   id: 'footer.social.youtube',   href: 'https://www.youtube.com/channel/UC-vXDr6nyeD4FfA5RPSj22w' },
  ];

  return (
    <footer
      className={classNames(
        'footer-bg text-white pt-5 pb-4',
        'border-t border-white/10'
      )}
    >
      <div className="container vs-indigo-footer-container">
        <div className="vs-indigo-footer-columns">
          {/* Column 1 – Logo + Description + Social */}
          <div className="mb-3">
            <div className="mb-4">
              <img
                src={`${config.LOGO_WHITE_URL}`}
                alt="VigyanShaala"
                width="120"
              />
            </div>

            <p className="text-white-75 mb-4 fs-6 lh-base">
              {intl.formatMessage(messages['footer.description'])}
            </p>

            <div className="d-flex flex-wrap vs-indigo-footer-social-list">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center justify-content-center rounded-circle vs-indigo-footer-social-link text-white"
                  aria-label={intl.formatMessage(messages[social.id])}
                  title={intl.formatMessage(messages[social.id])}
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 – Get In Touch */}
          <div className="mb-3">
            <h4 className="fw-bold mb-4 text-white">
              {intl.formatMessage(messages['footer.getInTouch'])}
            </h4>

            <div className="d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <Icon src={LocationOn} size="md" className="text-primary mr-3" />
                <span className="text-white-75">
                  {intl.formatMessage(messages['footer.address'])}
                </span>
              </div>

              <div className="d-flex align-items-center mb-3">
                <Icon src={Mail} size="md" className="text-primary mr-3" />
                <div className="text-white-75">
                  <div>{intl.formatMessage(messages['footer.email.primary'])}</div>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <Icon src={Phone} size="md" className="text-primary mr-3" />
                <div className="text-white-75">
                  <div>{intl.formatMessage(messages['footer.phone.primary'])}</div>
                  <div>{intl.formatMessage(messages['footer.phone.secondary'])}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3 – Explore + Legal */}
          <div>
            <h4 className="fw-bold mb-4 text-white">
              {intl.formatMessage(messages['footer.explore'])}
            </h4>

            <ul className="list-unstyled">
              {exploreLinks.map((link) => (
                <li key={link.id} className="mb-2">
                  <a
                    href={`${PUBLIC_BASE}${link.path}`}
                    className="d-flex align-items-center vs-indigo-footer-nav-link gap-2 text-decoration-none"
                  >
                    <svg
                      className="vs-indigo-footer-nav-arrow"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                    {intl.formatMessage(messages[link.id])}
                  </a>
                </li>
              ))}

              <li className="pt-4 mt-2 legal-links">
                <h4 className="fw-bold mb-4 text-white">
                  {intl.formatMessage(messages['footer.legal'])}
                </h4>

                {legalLinks.map((link) => (
                  <div key={link.id} className="mb-1">
                    <a
                      href={`${PUBLIC_BASE}${link.path}`}
                      className="d-flex align-items-center vs-indigo-footer-nav-link gap-2 text-decoration-none"
                    >
                      <svg
                        className="vs-indigo-footer-nav-arrow"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                      {intl.formatMessage(messages[link.id])}
                    </a>
                  </div>
                ))}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-2 pt-4 border-top copyright-text">
          {intl.formatMessage(messages['footer.copyright'], { year: currentYear })}
        </div>
      </div>
    </footer>
  );
};