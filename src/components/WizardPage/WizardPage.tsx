import {
  Page,
  PageSection,
  PageSectionTypes,
  PageSectionVariants,
  Text,
  TextContent,
  Title,
} from '@patternfly/react-core';
import React from 'react';
import QueryWizard from '../QueryWizard/QueryWizard';

const WizardPage = (): React.FC => (
  <Page mainContainerId="wizard-page-content">
    <PageSection variant={PageSectionVariants.light}>
      <TextContent>
        <Title headingLevel="h1">New extraction query</Title>
        <Text component="p">
          Follow the steps to create a new extraction query. The query will be
          applied on the archives from clusters that meet your pre-filled
          parameters.
        </Text>
      </TextContent>
    </PageSection>
    <PageSection
      type={PageSectionTypes.wizard}
      variant={PageSectionVariants.light}
    >
      <QueryWizard />
    </PageSection>
  </Page>
);

export default WizardPage;
