import { ServiceAndProducts, servicesAndProducts } from 'shared/src/service-and-product-list'

const getTableName = (type: string, product: string): string | null => {
    if (type === 'e2e' || type === 'unit') {
        return `${type}_${product}`
    }
    return null
}

const getNameByApi = (value: string): string | null => {
    const item: ServiceAndProducts | undefined = servicesAndProducts.find((item: ServiceAndProducts) => item.api === value)
    return item ? item.name : null
}

export { getTableName, getNameByApi }
