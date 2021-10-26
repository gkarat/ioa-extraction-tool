import { Flex, FormGroup, Radio } from '@patternfly/react-core';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectParamsComponent,
  updateParamsComponent,
} from '../../redux/wizardSlice';

const Managed = (): React.FC => {
  const dispatch = useAppDispatch();
  const parameter = useAppSelector(selectParamsComponent('managed'));

  return (
    <FormGroup label="Managed by Red Hat">
      <Flex>
        <Radio
          id="radio-managed-all"
          name="radio-managed-all"
          aria-label="Managed radio option: all"
          label="All"
          isChecked={parameter === 'all'}
          onChange={() =>
            dispatch(
              updateParamsComponent({ component: 'managed', params: 'all' })
            )
          }
        />
        <Radio
          id="radio-managed-managed"
          name="radio-managed-managed"
          aria-label="Managed radio option: managed"
          label="Only managed"
          isChecked={parameter === 'managed'}
          onChange={() =>
            dispatch(
              updateParamsComponent({ component: 'managed', params: 'managed' })
            )
          }
        />
        <Radio
          id="radio-managed-non-managed"
          name="radio-managed-non-managed"
          aria-label="Managed radio option: non-managed"
          label="Only non-managed"
          isChecked={parameter === 'non-managed'}
          onChange={() =>
            dispatch(
              updateParamsComponent({
                component: 'managed',
                params: 'non-managed',
              })
            )
          }
        />
      </Flex>
    </FormGroup>
  );
};

export default Managed;
