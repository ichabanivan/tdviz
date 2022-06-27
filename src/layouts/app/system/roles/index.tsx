import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { ApolloError } from '@apollo/client/errors';
import { FetchResult } from '@apollo/client/link/core';
import { MutationFunctionOptions } from '@apollo/client';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Box, Button, CircularProgress, IconButton, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Tooltip, Typography } from '@mui/material';

import _ from '../../../../services/lodash';
import { ITranslation } from '../../../../services/i18n';
import useFreeHeight from '../../../../hooks/use-free-height';
import { AddIcon, CheckIcon, CloseIcon, DeleteIcon, EditIcon, KeyboardArrowDownIcon, KeyboardArrowUpIcon } from '../../../../components/icons';
import { useAddPermissionToRoleMutation, useRemovePermissionFromRoleMutation, useDeleteRolesMutation, useFilterRolesPermissionsQuery, PermissionEntity, RoleEntity, FullRoleEntityFragment, DeleteRolesMutation, Exact, AddPermissionToRoleMutation, RemovePermissionFromRoleMutation, RolePermissionInputDto } from '../../../../apollo/graphql';

import { EditModal, showModal } from './edit.modal';

interface IRole extends RoleEntity{
  isExist: boolean
}

interface IPermission extends PermissionEntity{
  roles: Array<IRole>
}

interface IData {
  name: string
  permissions: Array<IPermission>
}

const prepareData = (roles: Array<RoleEntity> | undefined, permissions: Array<PermissionEntity> | undefined) => _.map(
  _.groupBy(permissions, 'category'),
  (value, key) => ({
    name: key,
    permissions: value?.map(
      permission => ({
        ...permission,
        roles: roles?.map(
          role => ({
            ...role,
            isExist: Boolean(_.find(role.permissions, { id: permission?.id }))
          })
        )
      })
    )
  })
);

export const Roles = memo(() => {
  const { t } : ITranslation = useTranslation();
  let freeHeight = useFreeHeight();
  freeHeight -= (84 + 20 * 2);

  const { data, loading } = useFilterRolesPermissionsQuery({
    variables: {
      filterRoles: {},
      filterPermissions: {},
      pagination: {
        page: 0,
        size: 1000,
      }
    }
  });

  const [deleteRole, { loading: loadingDeleting }] = useDeleteRolesMutation({
    awaitRefetchQueries: true,
    refetchQueries: ['FilterRolesPermissions'],
  });

  const [addPermissionToRole, { loading: loadingPermissionAdding }] = useAddPermissionToRoleMutation({
    awaitRefetchQueries: true,
    refetchQueries: ['FilterRolesPermissions'],
  });

  const [removePermissionFromRole, { loading: loadingPermissionRemoving }] = useRemovePermissionFromRoleMutation({
    awaitRefetchQueries: true,
    refetchQueries: ['FilterRolesPermissions'],
  });

  const result = useMemo(
    () => prepareData(data?.roles?.content, data?.permissions?.content),
    [data?.permissions?.content, data?.roles?.content]
  );

  const disabled = loadingDeleting || loadingPermissionAdding || loadingPermissionRemoving;

  return (
    <Paper sx={{ m: 4 }}>
      <EditModal />
      <Toolbar sx={{ py: 2 }}>
        <Typography variant="h1" sx={{ mr: 'auto' }}>
          { t('layouts.system.roles.general.title') }
          { disabled && <CircularProgress size={20} sx={{ ml: 2 }} /> }
        </Typography>
        <Button
          color="primary"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => showModal()}
          disabled={loading || disabled}
        >
          { t('layouts.system.roles.general.create-role') }
        </Button>
      </Toolbar>
      { loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={freeHeight}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer sx={{ height: freeHeight }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={2}
                  sx={{ position: 'sticky', left: 0, zIndex: 3, height: 34 }}
                >
                  { t('layouts.system.roles.general.table-title') }
                </TableCell>
                { data?.roles?.content?.map((item) => (
                  <RoleHead
                    key={item.id}
                    role={item}
                    disabled={disabled}
                    deleteRole={deleteRole}
                  />
                )) }
              </TableRow>
            </TableHead>
            <TableBody>
              { result?.map((item) => (
                <PermissionGroup
                  key={item?.name}
                  disabled={disabled}
                  item={item as IData}
                  size={_.size(data?.roles?.content) + 1}
                  addPermissionToRole={addPermissionToRole}
                  removePermissionFromRole={removePermissionFromRole}
                />
              )) }
            </TableBody>
          </Table>
        </TableContainer>
      ) }
    </Paper>
  );
});

interface RoleHeadProps {
  disabled: boolean
  role: FullRoleEntityFragment
  // eslint-disable-next-line max-len
  deleteRole: (options?: (MutationFunctionOptions<DeleteRolesMutation, Exact<{input: number | number[]}>>)) => Promise<FetchResult<DeleteRolesMutation>>
}

export const RoleHead = memo<RoleHeadProps>(({ role, disabled, deleteRole }) => {
  const { t } : ITranslation = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  // NOTE Popover
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);
  // NOTE Actions
  const handleEditRole = useCallback(async () => {
    handleClose();
    showModal(role);
  }, [handleClose, role]);
  const handleDeleteRole = useCallback(async () => {
    handleClose();
    try {
      await deleteRole({
        variables: {
          input: [role?.id]
        }
      });
      await enqueueSnackbar(t('layouts.system.roles.notifications.success.deleting'), { variant: 'success' });
    } catch (error) {
      if (error instanceof ApolloError) {
        await enqueueSnackbar(error?.message, { variant: 'error' });
      } else {
        await enqueueSnackbar(String(error), { variant: 'error' });
      }
    }
  }, [deleteRole, enqueueSnackbar, handleClose, role?.id, t]);

  return (
    <TableCell align="center" width="140">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '140px' }}
      >
        <Button title={role?.name} onClick={handleClick}>
          { role?.name }
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box sx={{ width: 100, height: 50 }} display="flex" justifyContent="space-around" alignItems="center">
            <Tooltip title="Edit">
              <IconButton
                size="small"
                disabled={disabled}
                onClick={handleEditRole}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                disabled={disabled}
                onClick={handleDeleteRole}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Popover>

      </Box>
    </TableCell>
  );
});

interface PermissionGroupProps {
  item: IData
  size: number
  disabled: boolean
  // eslint-disable-next-line max-len
  addPermissionToRole: (options?: (MutationFunctionOptions<AddPermissionToRoleMutation, Exact<{input: RolePermissionInputDto}>>)) => Promise<FetchResult<AddPermissionToRoleMutation>>
  // eslint-disable-next-line max-len
  removePermissionFromRole: (options?: (MutationFunctionOptions<RemovePermissionFromRoleMutation, Exact<{input: RolePermissionInputDto}>>)) => Promise<FetchResult<RemovePermissionFromRoleMutation>>
}

export const PermissionGroup = memo<PermissionGroupProps>(
  ({ disabled, size, item, removePermissionFromRole, addPermissionToRole }) => {
    const { t } : ITranslation = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);

    const handleAddPermission = useCallback(async (roleId: number, permissionId: number) => {
      try {
        await addPermissionToRole({
          variables: {
            input: {
              roleId,
              permissionId,
            }
          }
        });
        await enqueueSnackbar(t('layouts.system.roles.notifications.success.permission-added'), { variant: 'success' });
      } catch (error) {
        if (error instanceof ApolloError) {
          await enqueueSnackbar(error?.message, { variant: 'error' });
        } else {
          await enqueueSnackbar(String(error), { variant: 'error' });
        }
      }
    }, [addPermissionToRole, enqueueSnackbar, t]);


    const handleRemovePermission = useCallback(async (roleId: number, permissionId: number) => {
      try {
        await removePermissionFromRole({
          variables: {
            input: {
              roleId,
              permissionId,
            }
          }
        });
        await enqueueSnackbar(t('layouts.system.roles.notifications.success.permission-removed'), { variant: 'success' });
      } catch (error) {
        if (error instanceof ApolloError) {
          await enqueueSnackbar(error?.message, { variant: 'error' });
        } else {
          await enqueueSnackbar(String(error), { variant: 'error' });
        }
      }
    }, [enqueueSnackbar, removePermissionFromRole, t]);

    return (
      <>
        <TableRow>
          <TableCell
            colSpan={2}
            sx={{
              position: 'sticky',
              left: 0,
              background: 'white',
              whiteSpace: 'nowrap'
            }}
          >
            <IconButton
              size="small"
              onClick={() => setOpen(open => !open)}
            >
              { open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> }
            </IconButton>
            { item?.name }
          </TableCell>
          <TableCell colSpan={size - 1} />
        </TableRow>
        { open && item?.permissions.map(permission => (
          <TableRow key={permission.id}>
            <TableCell colSpan={2} sx={{
              position: 'sticky',
              left: 0,
              zIndex: 1,
              background: 'white'
            }}>
              { permission?.name }
            </TableCell>
            { permission?.roles?.map(role => (
              <TableCell align="center" key={role.id}>
                { role?.isExist
                  ? (
                    <IconButton
                      size="small"
                      disabled={disabled}
                      onClick={() => handleRemovePermission(role.id, permission.id)}
                    >
                      <CheckIcon color="success" />
                    </IconButton>
                  ) : (
                    <IconButton
                      size="small"
                      disabled={disabled}
                      onClick={() => handleAddPermission(role.id, permission.id)}
                    >
                      <CloseIcon color="error" />
                    </IconButton>
                  ) }
              </TableCell>
            )) }
          </TableRow>
        )) }
      </>
    );
  }
);
