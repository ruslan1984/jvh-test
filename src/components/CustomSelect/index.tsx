import React, {
  FC,
  useCallback,
  useState,
  FormEvent,
  memo,
  useEffect,
} from 'react';
import Presenter from './Presenter';
import { validate } from './validate';

import { TCustomSelectItem, TItemWithNew, TChangeData } from './types';

interface ICustomSelect {
  name: string;
  list: TCustomSelectItem[];
  title: string;
  errorText?: string;
  multiple?: boolean;
  onChange: ({ name, value }: TChangeData) => void;
  addValueToList?: (data: TCustomSelectItem) => void;
}

export const CustomSelect: FC<ICustomSelect> = ({
  list,
  multiple,
  title,
  name,
  onChange,
  addValueToList,
  errorText,
}: ICustomSelect) => {
  const [newData, setNewData] = useState<TItemWithNew | null>();
  const [helperText, setHelperText] = useState<string>();
  const [undoBtnDisabled, setUndoBtnDisabled] = useState(true);
  const [currentValue, setCurrentValue] = useState<
    TItemWithNew | TItemWithNew[] | null
  >();
  const [currentList, setCurrentList] = useState<TItemWithNew[]>([]);
  const [addInputText, setAddInputText] = useState('');
  const [addInputError, setAddInputError] = useState(false);

  useEffect(() => {
    setCurrentList(list);
  }, [list]);

  const add = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      try {
        validate(newData?.label);
        if (!newData) return;
        setCurrentList([...currentList, newData]);
        if (multiple) {
          if (Array.isArray(currentValue)) {
            setCurrentValue([...currentValue, newData]);
            onChange && onChange({ name, value: [...currentValue, newData] });
          } else {
            setCurrentValue([newData]);
            onChange && onChange({ name, value: [newData] });
          }
        } else {
          setCurrentValue(newData);
          onChange && onChange({ name, value: newData });
        }
        setAddInputText('');
        setNewData(null);
        setUndoBtnDisabled(false);
        addValueToList && addValueToList(newData);
      } catch (e) {
        setAddInputError(true);
        setHelperText((e as Error).message);
      }
    },
    [currentList, newData]
  );

  const remove = useCallback(() => {
    const last = currentList[currentList.length - 1];
    if (last?.isNew !== true) return;
    currentList.pop();
    setCurrentList(currentList);
    const undo = !currentList.some((item) => item.isNew);
    setUndoBtnDisabled(undo);
    if (multiple && Array.isArray(currentValue)) {
      const newValue = currentValue.filter((item) => item.id !== last.id);
      setCurrentValue(newValue);
      onChange && onChange({ name, value: newValue });
    }
    if (
      !multiple &&
      !Array.isArray(currentValue) &&
      currentValue &&
      last.id === currentValue?.id
    ) {
      setCurrentValue({ id: 0, label: '' });
      onChange && onChange({ name, value: null });
    }
  }, [currentList, currentValue]);

  const onChangeAddInput = useCallback(
    (e: FormEvent) => {
      const value: string = (e.target as HTMLInputElement).value;
      const maxId = currentList.reduce(
        (cur, next) => (cur < next.id ? next.id : cur),
        0
      );
      setNewData({ id: maxId + 1, label: value, isNew: true });
      setAddInputError(false);
      setHelperText('');
      setAddInputText(value);
    },
    [currentList]
  );

  const onChangeSelect = useCallback(
    (event: FormEvent, value: TItemWithNew | TItemWithNew[] | null) => {
      setCurrentValue(value);
      onChange && onChange({ name, value });
    },
    []
  );

  return (
    <Presenter
      list={currentList}
      addInputText={addInputText}
      currentValue={currentValue}
      addInputError={addInputError}
      helperText={helperText}
      undoBtnDisabled={undoBtnDisabled}
      title={title}
      errorText={errorText}
      name={name}
      add={add}
      remove={remove}
      onChangeAddInput={onChangeAddInput}
      onChangeSelect={onChangeSelect}
      multiple={multiple}
    />
  );
};
export type { TCustomSelectItem, TChangeData, TItemWithNew };
export default memo(CustomSelect);
