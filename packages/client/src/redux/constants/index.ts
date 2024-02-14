import { servicesAndProducts } from 'shared/src/service-and-product-list'

// Define the type for the state object
type State = Record<string, { data: any[]; lastUpdated: Date | null }>

// theme constant
export const gridSpacing = 3
export const drawerWidth = 260

// state constant
export const initialState: State = servicesAndProducts.reduce(
    (state: any, product: ServiceAndProducts) => {
        state[product.api] = { data: [], lastUpdated: null }
        return state
    },
    {} as State
)
