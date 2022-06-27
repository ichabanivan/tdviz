import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import {
  alpha,
  Checkbox, IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel, Toolbar, Tooltip,
  Typography
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';

import _ from '../../../../../services/lodash';
import * as ROUTES from '../../../../../constants/routes';
import { SORT_DIRECTION } from '../../../../../constants';
import { ITranslation } from '../../../../../services/i18n';
import { DeleteIcon, EditIcon } from '../../../../../components/icons';
import { FullUserEntityFragment, useDeleteUsersMutation } from '../../../../../apollo/graphql';

import { ControllerData } from './index';

// TODO calculate height

interface TableHeadColumn {
  field: keyof FullUserEntityFragment
  label: string
}

const useColumns = (): Array<TableHeadColumn> => {
  const { t } : ITranslation = useTranslation();

  return [
    {
      field: 'id',
      label: t('layouts.system.users.general.id'),
    },
    {
      field: 'email',
      label: t('layouts.system.users.general.email'),
    },
    {
      field: 'status',
      label: t('layouts.system.users.general.status'),
    },
    {
      field: 'firstName',
      label: t('layouts.system.users.general.firstName'),
    },
    {
      field: 'lastName',
      label: t('layouts.system.users.general.lastName'),
    },
  ];
};

interface ListTableProps {
  total: number
  loading: boolean
  freeHeight: number
  controller: ControllerData
  content: Array<FullUserEntityFragment>
  selected: Array<FullUserEntityFragment>
  updateController: (data: Partial<ControllerData>) => void
  setSelected: React.Dispatch<React.SetStateAction<FullUserEntityFragment[]>>
}

export const ListTable = memo<ListTableProps>(
  ({ freeHeight, loading, total, selected, setSelected, controller, content, updateController }) => {
    const columns = useColumns();
    const { enqueueSnackbar } = useSnackbar();

    const handleSelectAll = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          setSelected(content);
        } else {
          setSelected([]);
        }
      },
      [content, setSelected]
    );

    const onPageChange = useCallback((event: unknown, page: number) => {
      updateController({ page });
    }, [updateController]);

    const onRowsPerPageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      updateController({ size: Number(event?.target?.value) });
    }, [updateController]);

    const [deleteUsers] = useDeleteUsersMutation({
      refetchQueries: ['FilterUsers'],
      awaitRefetchQueries: true,
      variables: {
        input: selected.map(({ id }) => id),
      },
      onCompleted: () => {
        setSelected([]);
        enqueueSnackbar('Users have been successfully deleted', { variant: 'success' });
      },
      onError: (error) => {
        enqueueSnackbar(error?.message, { variant: 'error' });
      },
    });

    return (
      <>
        <TableContainer style={{ height: freeHeight }}>
          <Table stickyHeader sx={{ minWidth: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    disabled={loading}
                    onChange={handleSelectAll}
                    checked={selected?.length > 0 && selected?.length === content?.length}
                    indeterminate={selected?.length > 0 && selected?.length < content?.length}
                  />
                </TableCell>
                { columns.map(item => (
                  <TableHeadCell
                    data={item}
                    key={item?.field}
                    disabled={loading}
                    controller={controller}
                    updateController={updateController}
                  />
                )) }
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
              { selected.length > 0 && <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  sx={{
                    p: 0,
                    top: 58,
                  }}

                >
                  <Toolbar
                    sx={{
                      p:0,
                      bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }}
                  >
                    <Typography sx={{ flex: 1 }}>
                      { selected.length } selected
                    </Typography>

                    <Tooltip title="Delete">
                      <IconButton onClick={() => deleteUsers()}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Toolbar>
                </TableCell>
              </TableRow> }
            </TableHead>
            <TableBody>
              { content?.map(item => (
                <ListTableRow
                  data={item}
                  key={item?.id}
                  disabled={loading}
                  selected={selected}
                  setSelected={setSelected}
                />
              )) }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={total}
          page={controller?.page}
          onPageChange={onPageChange}
          rowsPerPage={controller?.size}
          rowsPerPageOptions={[10, 20, 50, 100]}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </>
    );
  }
);

interface ListTableRowProps {
  disabled: boolean
  data: FullUserEntityFragment
  selected: Array<FullUserEntityFragment>
  setSelected: React.Dispatch<React.SetStateAction<FullUserEntityFragment[]>>
}

export const ListTableRow = memo<ListTableRowProps>(
  ({ disabled, data, selected, setSelected }) => {
    const isSelected = Boolean(_.find(selected, { id: data?.id }));
    const handleSelect = useCallback(() => {
      if (!disabled) {
        setSelected(isSelected ? selected.filter(({ id }) => id !== data.id) : [...selected, data]);
      }
    }, [data, disabled, isSelected, selected, setSelected]);

    return (
      <TableRow
        hover
        tabIndex={-1}
        key={data?.id}
        role="checkbox"
        selected={isSelected}
        onClick={handleSelect}
      >
        <TableCell padding="checkbox">
          <Checkbox disabled={disabled} checked={isSelected} />
        </TableCell>
        <TableCell component="th" scope="row">{ data?.id }</TableCell>
        <TableCell>{ data?.email }</TableCell>
        <TableCell>{ String(data?.status) }</TableCell>
        <TableCell>{ data?.firstName }</TableCell>
        <TableCell>{ data?.lastName }</TableCell>
        <TableCell>
          <IconButton
            size="small"
            component={Link}
            to={ROUTES.USERS_EDIT.LINK({ id: data?.id })}
          >
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
);


interface TableHeadCellProps {
  disabled: boolean
  data: TableHeadColumn
  controller: ControllerData
  updateController: (data: Partial<ControllerData>) => void
}

export const TableHeadCell = memo<TableHeadCellProps>(
  ({ disabled, data, controller, updateController }) => {
    const isActive = controller?.sortField === data?.field;
    const direction = isActive ? (controller?.sortDirection ? SORT_DIRECTION.ASC : SORT_DIRECTION.DESC) : undefined;

    const handleChangeSort = useCallback(() => {
      updateController({
        sortField: data?.field,
        sortDirection: isActive ? !controller.sortDirection : true
      });
    }, [controller.sortDirection, data?.field, isActive, updateController]);

    return (
      <TableCell
        padding="normal"
        sortDirection={direction}
      >
        <TableSortLabel
          active={isActive}
          disabled={disabled}
          direction={direction}
          onClick={handleChangeSort}
        >
          { data?.label }
        </TableSortLabel>
      </TableCell>
    );
  }
);
