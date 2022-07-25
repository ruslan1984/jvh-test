import React, { memo, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gql } from '@apollo/client';
import { ApplicantIndividualCompanyRelation } from '../../graphql/generated';
import CustomSelect, {
  TChangeData,
  TCustomSelectItem,
  TItemWithNew,
} from '../../components/CustomSelect';
import { reducerType } from '../../store/reducers';
import { actions } from '../../forms/Main/reducer';
import { data } from './__mock__';

gql`
  query Relations {
    applicantIndividualCompanyRelations {
      data {
        id
        name
      }
    }
  }
`;

const ApplicantIndividualCompanyRelations = () => {
  const dispatch = useDispatch();

  const {
    errors: { relations: relationsErrors },
  } = useSelector((state: reducerType) => state.customSelect);
  //const {data,loading} = useRelationssQuery();

  const list: TCustomSelectItem[] = useMemo(
    () =>
      data.map((item: ApplicantIndividualCompanyRelation) => ({
        id: Number(item.id),
        label: item.name,
      })),
    []
  );

  const onChange = useCallback((data: TChangeData) => {
    dispatch(actions.updateData(data));
    dispatch(actions.setErrorText({ relations: '' }));
  }, []);
  const addValueToList = useCallback((data: TItemWithNew) => {
    dispatch(actions.setErrorText({ relations: '' }));
    //Отправка новых данных на бэк
  }, []);
  return (
    <CustomSelect
      errorText={relationsErrors}
      onChange={onChange}
      name="relations"
      list={list}
      title="ApplicantIndividualCompanyRelations"
      addValueToList={addValueToList}
    />
  );
};

export default memo(ApplicantIndividualCompanyRelations);
