import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useRef, useState } from 'react';
import { Box, CircularProgress, Paper, Toolbar, Typography } from '@mui/material';

import { ITranslation } from '../../../../../services/i18n';
import useFreeHeight from '../../../../../hooks/use-free-height';
import { FullUserEntityFragment, SortDirection, useFilterUsersQuery } from '../../../../../apollo/graphql';


import { Search } from './search';
import { ListTable } from './table';

export interface ControllerData {
  page: number
  size: number
  total: number
  email: string
  search: string
  lastName: string
  firstName: string
  sortField: string,
  sortDirection: boolean,
}

export interface SearchFormData {
  email: string
  search: string
  lastName: string
  firstName: string
}

export const List = memo(() => {
  let freeHeight = useFreeHeight();
  freeHeight -= (20 * 2 + 84 + 52);

  const searchFormInitialData = useRef<SearchFormData>({
    email: '',
    search: '',
    lastName: '',
    firstName: '',
  });
  const controllerInitialData = useRef<ControllerData>({
    ...searchFormInitialData.current,
    page: 0,
    size: 20,
    total: 0,
    sortField: 'id',
    sortDirection: true,
  });

  const { t } : ITranslation = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [selected, setSelected] = useState<Array<FullUserEntityFragment>>([]);
  const [controller, setController] = useState<ControllerData>(controllerInitialData.current);
  const updateController = useCallback(
    (data: Partial<ControllerData>) => {
      setController(state => ({ ...state, ...data }));
      setSelected([]);
    },
    []
  );

  const prepareFilter = ({ search, firstName, lastName, email }: ControllerData) => ({ search });

  const { data, loading } = useFilterUsersQuery({
    variables: {
      filter: prepareFilter(controller),
      pagination: {
        page: controller?.page,
        size: controller?.size,
        sort: [{
          field: controller?.sortField,
          direction: controller?.sortDirection ? SortDirection.Asc : SortDirection.Desc
        }]
      }
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    onCompleted: (data) => {
      updateController({
        total: data?.users?.totalElements
      });
    }
  });

  const content = data?.users?.content || [];

  return (
    <Paper sx={{ m: 4 }}>
      <Toolbar sx={{ py: 2 }}>
        <Typography variant="h1" sx={{ mr: 'auto' }}>
          { t('layouts.system.users.general.title') }
        </Typography>
        <Search
          loading={loading}
          controller={controller}
          placeholder="Search Users"
          updateController={updateController}
          initialValues={searchFormInitialData.current}
        />
      </Toolbar>
      { loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={freeHeight + 52}>
          <CircularProgress />
        </Box>
      ) : (
        <ListTable
          loading={loading}
          content={content}
          selected={selected}
          freeHeight={freeHeight}
          controller={controller}
          setSelected={setSelected}
          total={controller.total ?? 0}
          updateController={updateController}
        />
      ) }
    </Paper>
  );
});

