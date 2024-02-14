import { servicesAndProducts } from 'shared/src/service-and-product-list'

export const productApis = servicesAndProducts.map((item: any) => item.api)
export const jira_instance = 'https://coincover.atlassian.net/'
export const sonar_cloud_instance = 'https://sonarcloud.io'
