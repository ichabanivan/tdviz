import { PermissionEntity } from '../graphql';

export const policies = {
  RoleEntity: {
    fields: {
      permissions: {
        merge (existing: Array<Partial<PermissionEntity>>, incoming: Array<Partial<PermissionEntity>>) {
          return incoming;
        }
      },
    }
  }
};
