import React, { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomSelect, {
  TCustomSelectItem,
  TChangeData,
  TItemWithNew,
} from '../../components/CustomSelect';
import { gql } from '@apollo/client';
import { actions } from '../../forms/Main/reducer';
import { ApplicantIndividualCompanyPosition } from '../../graphql/generated';
import { data } from './__mock__';
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

  const list: TCustomSelectItem[] = useMemo(
    () =>
      data.map((item: ApplicantIndividualCompanyPosition) => ({
        id: Number(item.id),
        label: item.name,
      })),
    []
  );

  const onChange = useCallback((data: TChangeData) => {
    dispatch(actions.updateData(data));
    dispatch(actions.setErrorText({ positions: '' }));
  }, []);

  const addValueToList = useCallback((data: TItemWithNew) => {
    dispatch(actions.setErrorText({ positions: '' }));
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
    />
  );
};

export default memo(ApplicantIndividualCompanyPositions);
