import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PaidIcon from '@mui/icons-material/Paid';
import ShieldIcon from '@mui/icons-material/Shield';
import SosIcon from '@mui/icons-material/Sos';
import SupportIcon from '@mui/icons-material/Support';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

import products from './product.json';

const iconMapping = {
  FingerprintIcon: FingerprintIcon,
  PaidIcon: PaidIcon,
  ShieldIcon: ShieldIcon,
  SosIcon: SosIcon,
  SupportIcon: SupportIcon,
  SupportAgentIcon: SupportAgentIcon
};
const product = {
  id: 'product',
  title: 'Product / Services',
  caption: 'List of Products/Services',
  type: 'group',
  children: products.map((item) => ({
    id: item.slug,
    title: item.name,
    type: 'collapse',
    url: `/${item.slug}`,
    icon: iconMapping[item.icon],
    children: [
      {
        id: `${item.slug}-e2e`,
        title: 'E2E test',
        type: 'item',
        url: `/${item.slug}/e2e-test`,
        breadcrumbs: false
      },
      {
        id: `${item.slug}-unit`,
        title: 'Unit test',
        type: 'item',
        url: `/${item.slug}/unit-test`,
        breadcrumbs: false
      }
    ]
  }))
};

export default product;
