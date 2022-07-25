import React, { FC, FormEvent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { UndoOutlined } from '@ant-design/icons';
import { TItemWithNew } from './types';

interface IPresenter {
  list: TItemWithNew[];
  addInputError: boolean;
  addInputText?: string;
  currentValue?: TItemWithNew | TItemWithNew[] | null;
  helperText?: string;
  errorText?: string;
  title: string;
  name: string;
  undoBtnDisabled?: boolean;
  multiple?: boolean;
  add: (e: FormEvent) => void;
  remove: () => void;
  onChangeAddInput: (e: FormEvent) => void;
  onChangeSelect: (
    event: FormEvent,
    newValue: TItemWithNew | TItemWithNew[] | null
  ) => void;
}

const Presenter: FC<IPresenter> = ({
  list,
  onChangeAddInput,
  onChangeSelect,
  add,
  remove,
  currentValue,
  addInputError = false,
  helperText = '',
  addInputText = '',
  title,
  undoBtnDisabled = false,
  multiple = false,
  errorText = '',
  name,
}: IPresenter) => (
  <Box
    sx={{
      padding: 1,
      border: '1px solid #eee',
      borderRadius: 1,
      marginBottom: 3,
    }}
  >
    <Autocomplete
      id={name}
      multiple={multiple}
      value={currentValue ?? (multiple ? [] : null)}
      autoSelect
      options={list}
      onChange={onChangeSelect}
      renderInput={(params) => <TextField {...params} label={title} />}
    />
    <Box
      sx={{
        color: 'red',
        height: 15,
      }}
    >
      {errorText}
    </Box>
    <Box
      sx={{
        display: 'flex',
        marginTop: 1,
        marginBottom: 1,
      }}
    >
      <TextField
        sx={{
          display: 'flex',
          flex: 1,
        }}
        error={addInputError}
        value={addInputText}
        onChange={onChangeAddInput}
        helperText={helperText}
        label="Add element"
      />
      <Button
        sx={{ marginLeft: 1, marginRight: 1 }}
        variant="contained"
        onClick={add}
      >
        add
      </Button>
      <Button variant="contained" disabled={undoBtnDisabled} onClick={remove}>
        <UndoOutlined />
      </Button>
    </Box>
  </Box>
);

export default Presenter;
