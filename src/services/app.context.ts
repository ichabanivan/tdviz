import { createContext } from 'react';

import { UserEntity } from '../apollo/graphql';

export interface IAppContext {
  user?: UserEntity
  auth: boolean
  health: boolean
  initialized: boolean
  updateCtrl: (data: Partial<IAppContext>) => void
}

export const initial: IAppContext = {
  auth: false,
  health: false,
  initialized: false,
  updateCtrl: (data) => undefined
};

export const AppContext = createContext<IAppContext>(initial);
