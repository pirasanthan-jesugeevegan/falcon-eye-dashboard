import { createProxyMiddleware } from 'http-proxy-middleware'
import { jira_instance } from '../utils/constant'

export const jiraProxy = createProxyMiddleware({
    target: jira_instance,
    changeOrigin: true,
    logLevel: 'debug',
    onProxyReq: (proxyReq: any) => {
        proxyReq.setHeader('Accept', 'application/json')
        proxyReq.setHeader('X-Atlassian-Token', 'no-check')
        proxyReq.setHeader('cookie', '')
        proxyReq.setHeader('User-Agent', '')
        proxyReq.setHeader(
            'Authorization',
            'Basic ' +
                Buffer.from(
                    `${process.env.REACT_APP_USERNAME}:${process.env.REACT_APP_PASSWORD}`
                ).toString('base64')
        )
    },
    onProxyRes: (proxyRes: any) => {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*'
        proxyRes.headers['Access-Control-Allow-Headers'] = '*'
        proxyRes.headers['Access-Control-Max-Age'] = '600'
    },
})
