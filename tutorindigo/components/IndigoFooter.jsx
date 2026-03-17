const IndigoFooter = () => {
  const intl = useIntl();
  const config = getConfig();

  const PUBLIC_BASE = config.CATALOG_MICROFRONTEND_URL;

  const currentYear = new Date().getFullYear();

  const messages = {
    // Main sections
    'footer.description': {
      id: 'footer.description',
      defaultMessage:
        'Empowering learners worldwide with quality education. Join thousands of students and transform your career with our expert-led courses.',
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
        'bg-secondary text-white pt-5 pb-4',
        'border-t border-white/10'
      )}
    >
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {/* Column 1 – Logo + Description + Social */}
          <div className='mb-3'>
            <div className="mb-4">
              <img
                src={`${config.LOGO_URL}`}
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
          <div className='mb-3'>
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
                    <Icon
                      src={ArrowRight}
                      size="sm"
                    />
                    {intl.formatMessage(messages[link.id])}
                  </a>
                </li>
              ))}

              <li className="pt-4 mt-2">
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
        <div className="mt-2 pt-4 border-top text-center text-white-50">
          {intl.formatMessage(messages['footer.copyright'], { year: currentYear })}
        </div>
      </div>
    </footer>
  );
};