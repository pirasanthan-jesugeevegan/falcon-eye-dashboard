import products from '../product.json';

export const productApis = products.map((item: any) => item.api);
export const jira_instance = 'https://coincover.atlassian.net/';
export const sonar_cloud_instance = 'https://sonarcloud.io';
