/*   
uuid: string;
  ebs: Array<Ebs>;
  version: Array<Version>;
  desiredVersion: Array<Version>;
  managed: Managed;
  platform: Array<ClusterPlatform>;
  associate: Array<CustomerSuccessAssociate>;
  limit: number;
  offset: number; */

import { ClusterParameters } from '../../reducers/wizard/params';
import { ClustersTableFilters } from '../../reducers/wizard/sample';

const passFilters = (
  cluster: ClusterParameters,
  filters: ClustersTableFilters
): boolean => {
  return Object.entries(filters).every(([filterKey, filterValue]) => {
    if (Array.isArray(filterValue) && filterValue.length === 0) {
      return true;
    }
    switch (filterKey) {
      case 'uuid':
        return cluster.uuid.toLowerCase().includes(filterValue.toLowerCase());
      case 'ebs':
        return filterValue.includes(cluster.ebs);
      case 'version':
        return filterValue.includes(String(cluster.version));
      case 'desiredVersion':
        return filterValue.includes(String(cluster.desiredVersion));
      case 'managed':
        return (
          filterValue === 'all' ||
          (filterValue === 'managed' && cluster.managed) ||
          (filterValue === 'non-managed' && !cluster.managed)
        );
      case 'platform':
        return filterValue.includes(String(cluster.platform));
      case 'associate':
        return filterValue.includes(String(cluster.associate));
      default:
        return true;
    }
  });
};

const paramsMapping = {
  uuid: 'Cluster UUID',
  ebs: 'EBS account',
  version: 'Version',
  desired_version: 'Desired version',
  initial_version: 'Initial version',
  managed: 'Managed',
  platform: 'Cluster platform',
  customer_success_associate: 'Customer success associate',
  network_type: 'Network type',
  install_type: 'Install type',
};

export { passFilters, paramsMapping };
