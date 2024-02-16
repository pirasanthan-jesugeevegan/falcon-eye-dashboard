import React from 'react'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material'
import { lazy } from 'react'
import Loadable from '../components/Loadable'
import MainLayout from '../layout/MainLayout'
const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')))
const Products = Loadable(lazy(() => import('../pages/Products')))
const Jira = Loadable(lazy(() => import('../pages/Jira')))
const SonarCloud = Loadable(lazy(() => import('../pages/SonarCloud')))
import jiraData from '../menu-items/jira'
import productData from '../menu-items/product'

const componentsMap = {
    Products: Products,
    Jira: Jira,
}
interface MainRoutes {
    icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string }
    id: string
    title: string
    type: string
    url: string
}

function transformProductData(data: MainRoutes[]) {
    return data.map((item: any) => ({
        path: item.id,
        children: [
            {
                path: '',
                element: React.createElement(componentsMap['Products'], {
                    title: item.title,
                }),
            },
        ],
    }))
}

function transformJiraData(data: any) {
    return data.children.map((child: any) => ({
        path: child.url.split('/').pop(),
        element: React.createElement(Jira, { title: child.title }),
    }))
}

const transformedProductData = transformProductData(productData.children)
const transformedJiraData = transformJiraData(jiraData)

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <Dashboard />,
        },
        ...transformedProductData,
        {
            path: 'jira',
            children: transformedJiraData,
        },
        {
            path: 'sonarCloud-pull-request',
            children: [
                {
                    path: 'coincover-b2b2c',
                    element: (
                        <SonarCloud title="List of Pull Request Results for coincover-b2b2c" />
                    ),
                },
                {
                    path: 'coincover-txm',
                    element: (
                        <SonarCloud title="List of Pull Request Results for coincover-txm" />
                    ),
                },
            ],
        },
    ],
}

export default MainRoutes
