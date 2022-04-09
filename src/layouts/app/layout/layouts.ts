import { useTranslation } from 'react-i18next';

import { ITranslation } from '~services/i18n';

import * as ROUTES from '~constants/routes';

export const useLayouts = () => {
  const { t }: ITranslation = useTranslation();

  return [
    {
      id: 'auth',
      title: t('layouts.auth.title'),
      link: ROUTES.LAYOUT_AUTH,
    },
    {
      id: 'system',
      title: t('layouts.system.title'),
      link: ROUTES.SYSTEM.LINK(),
      list: [
        {
          id: 'users',
          title: t('layouts.system.users.title'),
          link: ROUTES.USERS_LIST.LINK(),
        }
      ]
    }
  ];
};
