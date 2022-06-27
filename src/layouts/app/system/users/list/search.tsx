import * as yup from 'yup';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useMemo } from 'react';
import { Paper, InputBase, IconButton, Popover } from '@mui/material';

import { ITranslation } from '../../../../../services/i18n';
import { VALIDATION_ERROR } from '../../../../../constants/errors';
import { ClearIcon, SearchIcon, TuneIcon } from '../../../../../components/icons';

import { ListForm } from './form';

import { SearchFormData, ControllerData } from './index';


interface IListFilters {
  search: string
}

interface ListFiltersProps {
  loading: boolean
  controller: ControllerData
  updateController: (data: Partial<ControllerData>) => void
}

interface SearchProps {
  placeholder: string
  loading: boolean
  controller: ControllerData
  initialValues: SearchFormData
  updateController: (data: Partial<ControllerData>) => void
}

export const Search = memo<SearchProps>(
  ({ placeholder, loading, controller, initialValues, updateController }) => {
    const { t } : ITranslation = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      updateController({ search: '' });
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const onSubmit = useCallback(async (values: IListFilters) => {
      updateController(values);
    }, [updateController]);

    const clearSearch = useCallback(async () => {
      updateController(initialValues);
    }, [initialValues, updateController]);
    // NOTE Data for current screen
    const validationSchema = useMemo(() => yup.object().shape({
      search: yup.string()
        .nullable()
        .required(t(`forms.validate.${VALIDATION_ERROR.REQUIRED_FIELD}`))
    }), [t]);

    return (
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        { ({ values, setFieldValue }) => (
          <Form>
            <Paper
              sx={{ p: 1, display: 'flex', alignItems: 'center', width: 400, boxShadow: 2 }}
            >
              <IconButton disabled={loading} sx={{ p: 1 }} type="submit">
                <SearchIcon />
              </IconButton>
              <InputBase
                disabled={loading}
                value={values?.search}
                sx={{ ml: 1, flex: 1 }}
                placeholder={placeholder}
                onChange={e => setFieldValue('search', e?.target?.value)}
              />
              { controller?.search && <IconButton
                sx={{ p: 1, mr: 1 }}
                type="button"
                disabled={loading}
                onClick={clearSearch}
              >
                <ClearIcon />
              </IconButton> }
              <IconButton disabled={loading} onClick={handleClick}>
                <TuneIcon />
              </IconButton>
            </Paper>
            <Popover
              sx={{ mt: 2, transform: 'translateX(5px)' }}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Paper sx={{ width: 410 }}>
                <ListForm loading={loading} />
              </Paper>
            </Popover>
          </Form>
        ) }
      </Formik>
    );
  }
);
