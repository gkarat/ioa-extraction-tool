import React, { Suspense } from 'react';
import { Bullseye, Spinner, Wizard } from '@patternfly/react-core';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectCurrent,
  selectParamsComponent,
  updateCurrent,
} from '../../reducers/wizard/params';
import { selectSelected } from '../../reducers/wizard/sample';
import { selectName } from '../../reducers/wizard/desc';
import { selectQuery } from '../../reducers/wizard/query';

const SampleContent = React.lazy(
  () => import(/* webpackChunkName: "SampleContent" */ './StepTwo')
);
const ParamsContent = React.lazy(
  () => import(/* webpackChunkName: "ParamsContent" */ './StepOne')
);
const QueryCreatorContent = React.lazy(
  () => import(/* webpackChunkName: "QueryCreatorContent" */ './StepThree')
);
const DescriptionContent = React.lazy(
  () => import(/* webpackChunkName: "DescriptionContent" */ './StepFour')
);
const ReviewContent = React.lazy(
  () => import(/* webpackChunkName: "ReviewContent" */ './StepFive')
);

const QueryWizard: React.FC = () => {
  const dispatch = useAppDispatch();
  const version = useAppSelector(selectParamsComponent('version'));
  const current = useAppSelector(selectCurrent);
  const sampleCluster = useAppSelector(selectSelected);
  const name = useAppSelector(selectName);
  const query = useAppSelector(selectQuery);

  const OPEN_STEP_2 = version.length > 0;
  const OPEN_STEP_3 = sampleCluster?.uuid?.length > 0;
  const OPEN_STEP_4 =
    query.columnNames.length > 0 &&
    query.columnPaths.length > 0 &&
    query.path !== '';
  const OPEN_STEP_5 = name !== '';

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
      component: (
        <Suspense
          fallback={
            <Bullseye>
              <Spinner />
            </Bullseye>
          }
        >
          <QueryCreatorContent />
        </Suspense>
      ),
      enableNext: OPEN_STEP_4,
    },
    {
      id: 'description-step',
      canJumpTo: OPEN_STEP_4,
      name: 'Description',
      component: (
        <Suspense
          fallback={
            <Bullseye>
              <Spinner />
            </Bullseye>
          }
        >
          <DescriptionContent />
        </Suspense>
      ),
      enableNext: OPEN_STEP_5,
    },
    {
      id: 'review-step',
      canJumpTo: OPEN_STEP_5,
      name: 'Review',
      component: (
        <Suspense
          fallback={
            <Bullseye>
              <Spinner />
            </Bullseye>
          }
        >
          <ReviewContent />
        </Suspense>
      ),
      nextButtonText: 'Save',
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
      startAtStep={current}
      navAriaLabel="Create query wizard - navigation"
      mainAriaLabel="Create query wizard"
      onNext={onNextBack}
      onBack={onNextBack}
    />
  );
};

export default QueryWizard;
