import * as React from 'react';
import { Text, Wizard } from '@patternfly/react-core';
import Params from './Params';

const QueryWizard: React.FC = () => {
  const steps = [
    {
      id: 'params-step',
      canJumpTo: true,
      name: 'Cluster parameters',
      component: <Params />,
      enableNext: false,
      hideBackButton: true,
    },
    {
      id: 'sample-step',
      canJumpTo: false,
      name: 'Sample archive',
      component: <p>Step 2 content</p>,
      enableNext: false,
    },
    {
      id: 'query-step',
      canJumpTo: false,
      name: 'Extraction query',
      component: <p>Step 3 content</p>,
      enableNext: false,
    },
    {
      id: 'review-step',
      canJumpTo: false,
      name: 'Review',
      component: <p>Review step content</p>,
      enableNext: false,
      nextButtonText: 'Finish',
    },
  ];

  return (
    <Wizard
      steps={steps}
      className="query-wizard"
      startAtStep={1}
      navAriaLabel="Create query wizard - navigation"
      mainAriaLabel="Create query wizard"
    />
  );
};

export { QueryWizard };
