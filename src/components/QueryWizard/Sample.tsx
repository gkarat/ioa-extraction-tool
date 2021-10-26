import React from 'react';
import { Text, TextContent, Title } from '@patternfly/react-core';
import ClustersTable from '../ClustersTable/ClustersTable';

const SampleContent = (): React.FC => {
  return (
    <div id="wizard-sample-content">
      <TextContent>
        <Title headingLevel="h2">Choose sample archive</Title>
        <Text component="p">
          Please, select one cluster which Insights Operator archive will be
          used to compose a new extraction query.
        </Text>
      </TextContent>
      <div style={{ marginTop: '1rem' }}>
        <ClustersTable />
      </div>
    </div>
  );
};

export default SampleContent;
