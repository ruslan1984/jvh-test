import React, { memo, FormEvent } from 'react';
import { validate } from './validate';
import { useSelector, useDispatch } from 'react-redux';
import { reducerType } from '../../store/reducers';
import { actions } from '../../forms/Main/reducer';
import Presenter from './Presenter';
import { TSubmitData } from './types';

const Main = () => {
  const dispatch = useDispatch();
  const {
    data,
    errors: { textInput: textInputError, textArea: textAreaError },
  } = useSelector((state: reducerType) => state.customSelect);

  const submit = (e: TSubmitData) => {
    let valid = true;
    if (!data?.relations) {
      dispatch(actions.setErrorText({ relations: 'required' }));
      valid = false;
    }
    if (!data?.positions || data?.positions?.length === 0) {
      dispatch(actions.setErrorText({ positions: 'required' }));
      valid = false;
    }

    const errorTextInput: string = validate(String(data?.textInput));
    if (errorTextInput) {
      dispatch(
        actions.setErrorText({
          textInput: errorTextInput,
        })
      );
      valid = false;
    }

    const errorTextArea: string = validate(String(data?.textArea));
    if (errorTextArea) {
      dispatch(
        actions.setErrorText({
          textArea: errorTextArea,
        })
      );
      valid = false;
    }
    if (valid) {
      console.log({ ...e, ...data });
    } else {
      console.log('notValid');
    }
  };

  const inputChange = (name: string) => (e: FormEvent) => {
    dispatch(
      actions.updateData({ name, value: (e.target as HTMLInputElement)?.value })
    );
    dispatch(actions.setErrorText({ [name]: '' }));
  };

  return (
    <Presenter
      submit={submit}
      textInputError={textInputError}
      textAreaError={textAreaError}
      inputChange={inputChange}
    />
  );
};

export default memo(Main);
