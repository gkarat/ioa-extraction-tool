import * as React from 'react';
import { PageSection, Title, Wizard } from '@patternfly/react-core';

const QueryWizard: React.FC = () => {
  const steps = [
    { name: 'First step', component: <p>Step 1 content</p> },
    { name: 'Second step', component: <p>Step 2 content</p> },
    { name: 'Third step', component: <p>Step 3 content</p> },
    { name: 'Fourth step', component: <p>Step 4 content</p> },
    {
      name: 'Review',
      component: <p>Review step content</p>,
      nextButtonText: 'Finish',
    },
  ];
  const title = 'Basic wizard';
  return (
    <PageSection>
      <Title headingLevel="h1" size="lg">
        Create Query Wizard
      </Title>
      <Wizard steps={steps} />
    </PageSection>
  );
};

export { QueryWizard };
