import React, { memo, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gql } from '@apollo/client';
import {
  useRelationsQuery,
  ApplicantIndividualCompanyRelation,
} from '../../graphql/generated';
import CustomSelect, {
  TChangeData,
  TCustomSelectItem,
  TItemWithNew,
} from '../../components/CustomSelect';
import { reducerType } from '../../store/reducers';
import { actions } from '../../forms/Main/reducer';

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

  const { data: getData, loading } = useRelationsQuery();

  const data: ApplicantIndividualCompanyRelation[] | undefined = useMemo(
    () => getData?.applicantIndividualCompanyRelations?.data,
    [getData]
  );

  const list: TCustomSelectItem[] | undefined = useMemo(
    () =>
      data?.map((item: ApplicantIndividualCompanyRelation) => ({
        id: Number(item.id),
        label: item.name,
      })),
    [data]
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
      loading={loading}
    />
  );
};

export default memo(ApplicantIndividualCompanyRelations);
