import { Switch } from '@mui/material';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';

import { LANGUAGES } from '~services/i18n';

import config from '~constants/config';

export const Translation = memo(() => {
  const { i18n } = useTranslation();
  const changeLanguage = useCallback(
    () => i18n.language === LANGUAGES.EN
      ? i18n.changeLanguage(LANGUAGES.UA)
      : i18n.changeLanguage(LANGUAGES.EN),
    [i18n]
  );
  return config.DEBUG
    ? (
      <div>
        <strong>EN</strong>
        <Switch onChange={changeLanguage} />
        <strong>UA</strong>
      </div>
    )
    : null;
});
