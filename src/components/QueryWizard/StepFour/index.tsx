import {
  Form,
  FormGroup,
  Text,
  TextArea,
  TextContent,
  TextInput,
  Title,
} from '@patternfly/react-core';
import {
  useAppDispatch,
  useAppSelector,
} from 'json-to-extraction-query/src/store/hooks';
import React, { FC } from 'react';
import {
  selectDesc,
  selectName,
  updateDescription,
  updateName,
} from '../../../reducers/wizard/desc';

const DescriptionContent: FC = () => {
  const dispatch = useAppDispatch();
  const name = useAppSelector(selectName);
  const desc = useAppSelector(selectDesc);

  return (
    <div className="wizard-desc-content">
      <TextContent>
        <Title headingLevel="h2">Add name and decription</Title>
        <Text component="p">
          Fill out the fields that will describe your new extraction query.
        </Text>
      </TextContent>
      <Form isWidthLimited style={{ marginTop: '12px' }}>
        <FormGroup label="Name" isRequired>
          <TextInput
            isRequired
            type="text"
            name="query-name-form"
            value={name}
            onChange={(n) => dispatch(updateName(n))}
          ></TextInput>
        </FormGroup>
        <FormGroup label="Description">
          <TextArea
            name="query-description-form"
            value={desc}
            onChange={(d) => dispatch(updateDescription(d))}
          ></TextArea>
        </FormGroup>
      </Form>
    </div>
  );
};

export default DescriptionContent;
