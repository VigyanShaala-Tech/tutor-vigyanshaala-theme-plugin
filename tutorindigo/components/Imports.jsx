import React, { useContext, useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';

import { getConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';
import { Icon } from '@openedx/paragon';
import { Nightlight, WbSunny } from '@openedx/paragon/icons';
import { useIntl } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';
import {
    AccountCircle,
    LocationOn,
    Mail,
    Phone,
    BsFacebook,
    BsLinkedin,
    BsInstagram,
    BsYoutube,
    BsTwitter,
    ArrowRight, } from '@openedx/paragon/icons';
