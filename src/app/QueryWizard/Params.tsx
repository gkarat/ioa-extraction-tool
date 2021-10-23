import React from 'react';
import {
  Flex,
  FlexItem,
  Form,
  FormGroup,
  Radio,
  Text,
  TextContent,
  Title,
} from '@patternfly/react-core';

import MultiSelect from './MultiSelect';
import { useAppSelector } from '../../redux/hooks';
import { selectForms } from '../../redux/wizardSlice';
import Managed from './Managed';
import LastCheckIn from './LastCheckIn';

const Params = (): React.FC => {
  const forms = useAppSelector(selectForms);

  return (
    <div id="wizard-params-content">
      <TextContent>
        <Title headingLevel="h2">Choose cluster parameters</Title>
        <Text component="p">
          Please, set the cluster parameters. In the next step, the result table
          will show all the clusters that meet your parameters.
        </Text>
      </TextContent>
      <Form style={{ marginTop: '2rem' }}>
        <Flex>
          <FlexItem>
            <Flex direction={{ default: 'column' }}>
              {forms.slice(0, 4).map((f) => (
                <MultiSelect
                  key={f.title}
                  component={f.component}
                  title={f.title}
                />
              ))}
              <Managed />
              <LastCheckIn />
            </Flex>
          </FlexItem>
          <FlexItem>
            <Flex direction={{ default: 'column' }}>
              {forms.slice(4).map((f) => (
                <MultiSelect
                  key={f.title}
                  component={f.component}
                  title={f.title}
                />
              ))}
            </Flex>
          </FlexItem>
        </Flex>
      </Form>
    </div>
  );
};

export default Params;
