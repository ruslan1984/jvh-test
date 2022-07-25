export type TCustomSelectItem = {
  id: number;
  label: string;
};

export type TItemWithNew = {
  isNew?: boolean;
} & TCustomSelectItem;

export type TChangeData = {
  name: string;
  value?: TItemWithNew | TItemWithNew[] | null;
};
