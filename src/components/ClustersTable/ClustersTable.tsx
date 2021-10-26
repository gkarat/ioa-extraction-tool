import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableVariant,
  cellWidth,
} from '@patternfly/react-table';
import {
  TextContent,
  TextList,
  TextListItem,
  TextListItemVariants,
  TextListVariants,
} from '@patternfly/react-core';

import { selectCluters } from '../../reducers/api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  chooseCluster,
  selectFilters,
  selectSelected,
} from '../../reducers/wizard/sample';
import { ClusterParameters } from '../../reducers/wizard/params';

import { paramsMapping, passFilters } from './helpers';
import TableToolbar from './Toolbar';

const CLUSTERS_TABLE_COLUMNS = [
  { title: 'Cluster UUID', transforms: [cellWidth(40)] },
  { title: 'EBS', transforms: [cellWidth(10)] },
  { title: 'Version', transforms: [cellWidth(10)] },
  { title: 'Desired version', transforms: [cellWidth(10)] },
  { title: 'Managed', transforms: [cellWidth(10)] },
  { title: 'Platform', transforms: [cellWidth(10)] },
  { title: 'Associate', transforms: [cellWidth(10)] },
];

const ClustersTable = (): React.FC => {
  const dispatch = useAppDispatch();
  const clusters = useAppSelector(selectCluters); // input, constant
  const filters = useAppSelector(selectFilters);
  const selected = useAppSelector(selectSelected);

  const page = filters.offset / filters.limit + 1;
  const [filteredRows, setFilteredRows] = useState([]);
  const [displayedRows, setDisplayedRows] = useState([]);

  useEffect(() => {
    const buildDisplayedRows = (rows) => {
      return rows
        .slice(
          filters.limit * (page - 1),
          filters.limit * (page - 1) + filters.limit
        )
        .flatMap((row, index) => {
          const updatedRow = [...row];
          row[1].parent = index * 2;
          return updatedRow;
        });
    };

    setDisplayedRows(buildDisplayedRows(filteredRows));
  }, [filteredRows, page, filters.limit]);

  useEffect(() => {
    // constructs array of rows (from the initial data) checking currently applied filters
    const buildFilteredRows = (allRows, filters) => {
      return allRows
        .filter((cluster: ClusterParameters) => passFilters(cluster, filters))
        .map((value: ClusterParameters, key) => [
          {
            isOpen: false,
            selected: key * 2 === selected?.rowIndex,
            cluster: value,
            cells: [
              { title: value.uuid },
              { title: value.ebs },
              { title: value.version },
              { title: value.desired_version },
              { title: value.managed ? 'True' : 'False' },
              { title: value.platform },
              { title: value.associate },
            ],
          },
          {
            fullWidth: true,
            cells: [
              {
                title: (
                  <TextContent style={{ padding: '2rem' }}>
                    <TextList component={TextListVariants.dl}>
                      {Object.entries(value).map(
                        (entry) =>
                          Object.keys(paramsMapping).includes(entry[0]) && (
                            <span key={entry[0]}>
                              <TextListItem component={TextListItemVariants.dt}>
                                {paramsMapping[entry[0]]}
                              </TextListItem>
                              <TextListItem component={TextListItemVariants.dd}>
                                {entry[0] === 'managed'
                                  ? entry[1]
                                    ? 'True'
                                    : false
                                  : entry[1]}
                              </TextListItem>
                            </span>
                          )
                      )}
                    </TextList>
                  </TextContent>
                ),
              },
            ],
          },
        ]);
    };
    setFilteredRows(buildFilteredRows(clusters, filters));
  }, [clusters, filters]);

  const handleOnCollapse = (event, rowId, isOpen) => {
    const collapsedRows = [...displayedRows];
    collapsedRows[rowId] = { ...collapsedRows[rowId], isOpen };
    setDisplayedRows(collapsedRows);
  };

  const handleOnSelect = (event, isSelected, rowId, rowData) => {
    const rows = filteredRows.map((row, i) => [
      {
        ...row[0],
        selected: i * 2 === rowId,
      },
      row[1],
    ]);
    setFilteredRows(rows);
    dispatch(
      chooseCluster({
        uuid: (rowData.cluster as ClusterParameters).uuid,
        rowIndex: rowId,
      })
    );
  };

  return (
    <div id="wizard-clusters-table">
      <TableToolbar />
      <Table
        aria-label="Selectable table of matched clusters"
        variant={TableVariant.compact}
        cells={CLUSTERS_TABLE_COLUMNS}
        rows={displayedRows}
        onCollapse={handleOnCollapse}
        selectVariant="radio"
        onSelect={handleOnSelect}
      >
        <TableHeader />
        <TableBody />
      </Table>
    </div>
  );
};

export default ClustersTable;
