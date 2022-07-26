import React, { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomSelect, {
  TCustomSelectItem,
  TChangeData,
  TItemWithNew,
} from '../../components/CustomSelect';
import {
  usePositionsQuery,
  ApplicantIndividualCompanyPosition,
} from '../../graphql/generated';
import { gql } from '@apollo/client';
import { actions } from '../../forms/Main/reducer';
import { reducerType } from '../../store/reducers';

gql`
  query Positions {
    applicantIndividualCompanyPositions {
      data {
        id
        name
      }
    }
  }
`;

const ApplicantIndividualCompanyPositions = () => {
  const dispatch = useDispatch();

  const {
    errors: { positions: positionsErrors },
  } = useSelector((state: reducerType) => state.customSelect);

  const { data: getData, loading } = usePositionsQuery();

  const data: ApplicantIndividualCompanyPosition[] | undefined = useMemo(
    () => getData?.applicantIndividualCompanyPositions?.data,
    [getData]
  );

  const list: TCustomSelectItem[] | undefined = useMemo(
    () =>
      data?.map((item: ApplicantIndividualCompanyPosition) => ({
        id: Number(item.id),
        label: item.name,
      })),
    [data]
  );

  const onChange = useCallback((data: TChangeData) => {
    dispatch(actions.updateData(data));
    dispatch(actions.setErrorText({ positions: '' }));
  }, []);

  const addValueToList = useCallback((data: TItemWithNew) => {
    dispatch(actions.setErrorText({ positions: '' }));
    //Отправка новых данных на бэк
  }, []);

  return (
    <CustomSelect
      errorText={positionsErrors}
      multiple={true}
      onChange={onChange}
      addValueToList={addValueToList}
      name="positions"
      list={list}
      title="ApplicantIndividualCompanyPositions"
      loading={loading}
    />
  );
};

export default memo(ApplicantIndividualCompanyPositions);
