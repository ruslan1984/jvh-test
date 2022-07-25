import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';

const defaultState = {
  data: {
    relations: '',
    positions: '' || [],
    textInput: '',
    textArea: '',
  },
  errors: {
    relations: '',
    positions: '',
    textInput: '',
    textArea: '',
  },
};
type TItem = {
  id: number;
  label: string;
  isNew?: boolean;
};

export const setList = createAction('setList');
export const customSelectSlice = createSlice({
  name: 'customSelect',
  initialState: defaultState,
  reducers: {
    updateData: (
      state,
      {
        payload,
      }: PayloadAction<{
        name: string;
        value?: TItem | TItem[] | string | null;
      }>
    ) => {
      const newData = { [payload.name]: payload.value };
      const data = { ...state.data, ...newData };
      return { ...state, data };
    },

    setErrorText: (
      state,
      {
        payload,
      }: PayloadAction<
        Partial<
          Record<'relations' | 'positions' | 'textInput' | 'textArea', string>
        >
      >
    ) => {
      const errors = { ...state.errors, ...payload };
      return { ...state, errors };
    },
  },
});

export const { actions, reducer } = customSelectSlice;
