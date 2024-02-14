import FingerprintIcon from '@mui/icons-material/Fingerprint'
import PaidIcon from '@mui/icons-material/Paid'
import ShieldIcon from '@mui/icons-material/Shield'
import SosIcon from '@mui/icons-material/Sos'
import SupportIcon from '@mui/icons-material/Support'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import BuildIcon from '@mui/icons-material/Build'

import { servicesAndProducts } from 'shared/src/service-and-product-list'

const iconMapping: IconMapping = {
    FingerprintIcon,
    PaidIcon,
    ShieldIcon,
    SosIcon,
    SupportIcon,
    SupportAgentIcon,
    BuildIcon,
}

const product = {
    id: 'product',
    title: 'Product / Services',
    caption: 'List of Products/Services',
    type: 'group',
    children: servicesAndProducts.map((item: ServiceAndProducts) => ({
        id: item.slug,
        title: item.name,
        type: 'item',
        url: `/${item.slug}`,
        icon: iconMapping[item.icon],
    })),
}

export default product
