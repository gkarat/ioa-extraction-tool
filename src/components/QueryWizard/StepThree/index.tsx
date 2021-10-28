import React, { ReactNode } from 'react';
import QueryGenerator from 'json-to-extraction-query/src/components/QueryGenerator';

import json from '../../../public/data.json';

const QueryCreator = (): ReactNode => {
  console.log(QueryGenerator);
  return (
    <div id="wizard-query-creator-content">
      <QueryGenerator json={json} />
    </div>
  );
};

export default QueryCreator;
