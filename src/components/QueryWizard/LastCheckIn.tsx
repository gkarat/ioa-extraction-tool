import React, { useState } from 'react';
import { DatePicker, Flex, FormGroup, Radio } from '@patternfly/react-core';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectParamsComponent,
  updateParamsComponent,
} from '../../reducers/wizard/params';

const LastCheckIn = (): React.FC => {
  const dispatch = useAppDispatch();
  const parameter = useAppSelector(selectParamsComponent('lastCheckIn'));
  const [date, setDate] = useState<Date>(new Date());

  return (
    <FormGroup label="Last check in">
      <Flex>
        <Radio
          id="last-check-in-all"
          name="last-check-in-all"
          aria-label="Last check in radio option: all"
          label="All"
          isChecked={parameter === 'all'}
          onChange={() =>
            dispatch(
              updateParamsComponent({ component: 'lastCheckIn', params: 'all' })
            )
          }
        />
        <Radio
          id="last-check-in-before"
          name="last-check-in-before"
          aria-label="Last check in radio option: before"
          label="Before"
          isChecked={parameter.startsWith('before')}
          onChange={() =>
            dispatch(
              updateParamsComponent({
                component: 'lastCheckIn',
                params: `before ${date?.toUTCString()}`,
              })
            )
          }
        />
        <Radio
          id="last-check-in-after"
          name="last-check-in-after"
          aria-label="Last check in radio option: after"
          label="After"
          isChecked={parameter.startsWith('after')}
          onChange={() =>
            dispatch(
              updateParamsComponent({
                component: 'lastCheckIn',
                params: `after ${date?.toUTCString()}`,
              })
            )
          }
        />
      </Flex>
      <div style={{ marginTop: '1rem' }}>
        <DatePicker
          aria-label="Last check in: date picker"
          isDisabled={parameter === 'all'}
          onChange={(value, date) => {
            setDate(date);
            dispatch(
              updateParamsComponent({
                component: 'lastCheckIn',
                params: `${parameter.split(' ')[0]} ${date?.toUTCString()}`,
              })
            );
          }}
          popoverProps={{ position: 'top' }}
        />
      </div>
    </FormGroup>
  );
};

export default LastCheckIn;
