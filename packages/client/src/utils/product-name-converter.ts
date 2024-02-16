import { servicesAndProducts } from 'shared/src/service-and-product-list'

export function getSlugByName(name: string) {
    const product = servicesAndProducts.find((p: ServiceAndProducts) => p.name === name)

    return product ? product.slug : name
}
export function getApiByName(name: string) {
    const product = servicesAndProducts.find((p: ServiceAndProducts) => p.name === name)

    return product ? product.api : name
}
