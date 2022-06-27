import { PermissionEntity, RoleEntity } from '../../apollo/graphql';

export const RolesPermissions = {
  fields: {
    permissions: {
      merge (existing: Array<Partial<PermissionEntity>>, incoming: Array<Partial<PermissionEntity>>) {
        return incoming;
      }
    },
    roles: {
      merge (existing: Array<Partial<RoleEntity>>, incoming: Array<Partial<RoleEntity>>) {
        return incoming;
      }
    }
  }
};
