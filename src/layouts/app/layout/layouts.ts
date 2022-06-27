import { useTranslation } from 'react-i18next';

import * as ROUTES from '../../../constants/routes';
import { ITranslation } from '../../../services/i18n';
import { ManageAccountsIcon, PeopleIcon } from '../../../components/icons';

export const useLayouts = () => {
  const { t } : ITranslation = useTranslation();

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
          title: t('layouts.system.users.general.title'),
          link: ROUTES.USERS_LIST.LINK(),
          Icon: PeopleIcon
        },
        {
          id: 'roles',
          title: t('layouts.system.roles.general.title'),
          link: ROUTES.ROLES.LINK(),
          Icon: ManageAccountsIcon
        }
      ]
    }
  ];
};
