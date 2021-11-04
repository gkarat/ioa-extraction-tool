import {
  Button,
  capitalize,
  Divider,
  Flex,
  Popover,
  Text,
  TextContent,
  TextList,
  TextListItem,
  TextListItemVariants,
  TextListVariants,
  Title,
} from '@patternfly/react-core';
import React, { FC } from 'react';
import { selectDescription } from '../../../reducers/wizard/desc';
import {
  managedMapping,
  selectMultiselectForms,
  selectParams,
  selectRadioForms,
} from '../../../reducers/wizard/params';
import { selectQuery } from '../../../reducers/wizard/query';
import { useAppSelector } from '../../../store/hooks';
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons';

const ReviewContent: FC = () => {
  const mforms = useAppSelector(selectMultiselectForms);
  const rforms = useAppSelector(selectRadioForms);
  const params = useAppSelector(selectParams);
  const query = useAppSelector(selectQuery);
  const desc = useAppSelector(selectDescription);

  const clusterParameters = [
    // first group
    mforms.filter((f) =>
      ['version', 'desiredVersion', 'initialVersion'].includes(f.component)
    ),
    // second group
    rforms
      .filter((f) => f.component === 'platform')
      .concat(rforms.find((f) => f.component === 'managed')),
    // third group
    mforms.filter((f) => ['associate', 'ebs', 'account'].includes(f.component)),
    // fourth group
    mforms
      .filter((f) => ['network', 'install'].includes(f.component))
      .concat(rforms.find((f) => f.component === 'lastCheckIn')),
  ];

  return (
    <div className="wizard-review-content">
      <TextContent>
        <Title headingLevel="h2">Create your extraction query</Title>
        <Text component="p">
          Review the information below and click &#34;Save&#34; to create your
          extraction query. Click &#34;Save and Run&#34; to save the result and
          execute your new query immediately.
        </Text>
      </TextContent>
      <Flex style={{ marginTop: '1rem' }}>
        <TextContent>
          <Title headingLevel="h3">Cluster parameters</Title>
          <TextList component={TextListVariants.dl}>
            {clusterParameters.map((group, i) => (
              <React.Fragment key={i}>
                {group.map((form, i) => (
                  <React.Fragment key={i}>
                    <TextListItem component={TextListItemVariants.dt}>
                      {form.title}
                    </TextListItem>
                    <TextListItem component={TextListItemVariants.dd}>
                      {params[form.component].length > 0
                        ? form.component === 'managed'
                          ? managedMapping[params[form.component]]
                          : Array.isArray(params[form.component])
                          ? params[form.component].join(', ')
                          : capitalize(params[form.component])
                        : '-'}
                    </TextListItem>
                  </React.Fragment>
                ))}
                {i !== clusterParameters.length - 1 && (
                  <Divider
                    component="div"
                    style={{ gridColumnStart: 1, gridColumnEnd: 3 }}
                  />
                )}
              </React.Fragment>
            ))}
          </TextList>
        </TextContent>
        <Flex direction={{ default: 'column' }}>
          <TextContent>
            <Title headingLevel="h3">Data extracted</Title>
            <TextList component={TextListVariants.dl}>
              <TextListItem component={TextListItemVariants.dt}>
                Objects match path
              </TextListItem>
              <TextListItem component={TextListItemVariants.dd}>
                {query.path}
              </TextListItem>
              <Divider
                component="div"
                style={{ gridColumnStart: 1, gridColumnEnd: 3 }}
              />
              <TextListItem component={TextListItemVariants.dt}>
                Column names
              </TextListItem>
              <TextListItem component={TextListItemVariants.dd}>
                {query.columnNames}
              </TextListItem>
              <TextListItem component={TextListItemVariants.dt}>
                Column paths
              </TextListItem>
              <TextListItem component={TextListItemVariants.dd}>
                {query.columnPaths}
              </TextListItem>
            </TextList>
          </TextContent>
          <TextContent>
            <Title headingLevel="h3">Query information</Title>{' '}
            <TextList component={TextListVariants.dl}>
              <TextListItem component={TextListItemVariants.dt}>
                Name
              </TextListItem>
              <TextListItem component={TextListItemVariants.dd}>
                {desc.name}
              </TextListItem>
              <TextListItem component={TextListItemVariants.dt}>
                Description
              </TextListItem>
              <TextListItem component={TextListItemVariants.dd}>
                {desc.description || '-'}
              </TextListItem>
              <TextListItem component={TextListItemVariants.dt}>
                Matching clusters{' '}
                <Popover
                  aria-label="Matching clusters hint"
                  showClose={false}
                  bodyContent={
                    <p>
                      To date. Shows the number of cluster archives that meet
                      the specified parameters. Once the query is executed, the
                      data will be extracted from these clusters.
                    </p>
                  }
                >
                  <Button variant="plain" aria-label="Open hint">
                    <OutlinedQuestionCircleIcon />
                  </Button>
                </Popover>
              </TextListItem>
              <TextListItem component={TextListItemVariants.dd}>
                {query.columnPaths}
              </TextListItem>
            </TextList>
          </TextContent>
        </Flex>
      </Flex>
    </div>
  );
};

export default ReviewContent;
