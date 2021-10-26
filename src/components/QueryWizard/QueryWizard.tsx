import React, { Suspense } from 'react';
import { Bullseye, Spinner, Wizard } from '@patternfly/react-core';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectCurrent,
  selectParamsComponent,
  updateCurrent,
} from '../../reducers/wizard/params';
import { selectSelected } from '../../reducers/wizard/sample';

const SampleContent = React.lazy(
  () => import(/* webpackChunkName: "SampleContent" */ './Sample')
);

const ParamsContent = React.lazy(
  () => import(/* webpackChunkName: "ParamsContent" */ './Params')
);

const QueryWizard: React.FC = () => {
  const dispatch = useAppDispatch();
  const version = useAppSelector(selectParamsComponent('version'));
  const current = useAppSelector(selectCurrent);
  const sampleCluster = useAppSelector(selectSelected);

  const OPEN_STEP_2 = version.length > 0;
  const OPEN_STEP_3 = sampleCluster?.uuid?.length > 0;

  const steps = [
    {
      id: 'params-step',
      canJumpTo: true,
      name: 'Cluster parameters',
      component: (
        <Suspense
          fallback={
            <Bullseye>
              <Spinner />
            </Bullseye>
          }
        >
          <ParamsContent />
        </Suspense>
      ),
      enableNext: OPEN_STEP_2,
      hideBackButton: true,
    },
    {
      id: 'sample-step',
      canJumpTo: OPEN_STEP_2,
      name: 'Sample archive',
      component: (
        <Suspense
          fallback={
            <Bullseye>
              <Spinner />
            </Bullseye>
          }
        >
          <SampleContent />
        </Suspense>
      ),
      enableNext: OPEN_STEP_3,
    },
    {
      id: 'query-step',
      canJumpTo: OPEN_STEP_3,
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

  const onNextBack = (newStep) => {
    const stepIndex = steps.findIndex((s) => s.id === newStep.id);
    dispatch(updateCurrent(stepIndex + 1));
  };

  return (
    <Wizard
      steps={steps}
      className="query-wizard"
      startAtStep={2}
      navAriaLabel="Create query wizard - navigation"
      mainAriaLabel="Create query wizard"
      onNext={onNextBack}
      onBack={onNextBack}
    />
  );
};

export default QueryWizard;
