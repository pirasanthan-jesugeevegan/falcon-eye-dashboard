import { createProxyMiddleware } from 'http-proxy-middleware';
import { sonar_cloud_instance } from '../utils/constant';

export const sonarCloudProxy = createProxyMiddleware({
  target: sonar_cloud_instance,
  changeOrigin: true,
  logLevel: 'debug',
  onProxyReq: (proxyReq: any) => {
    proxyReq.setHeader('Accept', 'application/json');
    proxyReq.setHeader('X-Atlassian-Token', 'no-check');
    proxyReq.setHeader('cookie', '');
    proxyReq.setHeader('User-Agent', '');
    proxyReq.setHeader(
      'Authorization',
      'Bearer ' + process.env.SONAR_CLOUD_TOKEN
    );
  },
  onProxyRes: (proxyRes: any) => {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Headers'] = '*';
    proxyRes.headers['Access-Control-Max-Age'] = '600';
  },
});
