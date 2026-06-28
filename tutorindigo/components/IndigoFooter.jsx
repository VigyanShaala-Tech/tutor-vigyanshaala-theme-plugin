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
    .vs-indigo-footer-columns .bg-primary{
        background: none !important;
        width: 2.5rem;
        height: 2.5rem;
        margin: 0 !important;
        padding: 0 !important;
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
    .vs-indigo-footer-columns > div {
      width: fit-content;
      max-width: 440px;
      text-align: left;
    }

    @media (min-width: 768px) {
      .vs-indigo-footer-columns {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1.5rem;
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
    { icon: BsFacebook,  id: 'footer.social.facebook',  href: 'https://www.facebook.com/VigyanShaala/' },
    { icon: BsTwitter,   id: 'footer.social.twitter',   href: 'https://x.com/VIGYANshaala' },
    { icon: BsLinkedin,  id: 'footer.social.linkedin',  href: 'https://www.linkedin.com/company/vigyanshaala/' },
    { icon: BsInstagram, id: 'footer.social.instagram', href: 'https://instagram.com/vigyanshaala' },
    { icon: BsYoutube,   id: 'footer.social.youtube',   href: 'https://www.youtube.com/channel/UC-vXDr6nyeD4FfA5RPSj22w' },
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

            <div className="d-flex flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-flex align-items-center justify-content-center rounded-circle bg-primary p-3 text-white hover-bg-primary transition-fast mr-4 mb-2"
                  aria-label={intl.formatMessage(messages[social.id])}
                  title={intl.formatMessage(messages[social.id])}
                >
                  <Icon src={social.icon} size="lg" />
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
                    className="d-flex align-items-center text-white transition-fast gap-2 text-decoration-none"
                  >
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
                      className="d-flex align-items-center text-white transition-fast gap-2 text-decoration-none"
                    >
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