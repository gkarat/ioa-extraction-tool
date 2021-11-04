import React, { ReactNode } from 'react';
import QueryGenerator, {
  OutputQuery,
} from 'json-to-extraction-query/src/components/App';
import { Text, TextContent, Title } from '@patternfly/react-core';

import json from '../../../public/data.json';
import { useAppDispatch } from 'json-to-extraction-query/src/store/hooks';
import { updateQuery } from '../../../reducers/wizard/query';

const QueryCreator = (): ReactNode => {
  const dispatch = useAppDispatch();

  return (
    <div id="wizard-query-creator-content">
      <TextContent style={{ marginBottom: '1rem' }}>
        <Title headingLevel="h2">Create extraction query</Title>
        <Text component="p">
          Please, use the editor to create your extraction query. The displayed
          JSON file is the content of the selected sample archive from the
          previous step.
          <br />
          In the editor, once finished, click &quot;Finish&quot; to proceed to
          the next step.
        </Text>
      </TextContent>
      <QueryGenerator
        json={json}
        onFinish={(q: OutputQuery) => dispatch(updateQuery(q))}
      />
    </div>
  );
};

export default QueryCreator;
