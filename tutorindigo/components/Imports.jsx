import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

import { getConfig } from '@edx/frontend-platform';
import { Icon } from '@openedx/paragon';
import { Nightlight, WbSunny } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';
import {
    LocationOn,
    Mail,
    Phone,
    BsFacebook,
    BsLinkedin,
    BsInstagram,
    BsYoutube,
    BsTwitter,
    ArrowRight, } from '@openedx/paragon/icons';