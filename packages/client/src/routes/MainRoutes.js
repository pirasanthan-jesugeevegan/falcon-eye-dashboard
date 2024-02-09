import React from 'react';
import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
// pages
const Dashboard = Loadable(lazy(() => import('pages/Dashboard')));
const Products = Loadable(lazy(() => import('pages/E2E')));
const Unit = Loadable(lazy(() => import('pages/Unit')));
const Jira = Loadable(lazy(() => import('pages/Jira')));
const SonarCloud = Loadable(lazy(() => import('pages/SonarCloud')));

import jiraData from '../menu-items/jira';
import productData from '../menu-items/product';

const componentsMap = {
  Products: Products,
  Unit: Unit,
  Jira: Jira
};

function transformProductData(data) {
  return data.map((item) => ({
    path: item.id,
    children: [
      {
        path: '',
        element: React.createElement(componentsMap['Products'], { title: item.title })
      },
      ...item.children.map((child) => {
        const Component = componentsMap[child.id.includes('unit') ? 'Unit' : 'Products'];
        return {
          path: child.url.split('/').pop(),
          element: React.createElement(Component, { title: item.title })
        };
      })
    ]
  }));
}

function transformJiraData(data) {
  return data.children.map((child) => ({
    path: child.url.split('/').pop(),
    element: React.createElement(Jira, { title: child.title })
  }));
}

const transformedProductData = transformProductData(productData.children);
const transformedJiraData = transformJiraData(jiraData);

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '',
      element: <Dashboard />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <Dashboard />
        }
      ]
    },
    ...transformedProductData,
    {
      path: 'jira',
      children: transformedJiraData
    },
    {
      path: 'sonarCloud-pull-request',
      children: [
        {
          path: 'coincover-b2b2c',
          element: <SonarCloud title="List of Pull Request Results for coincover-b2b2c" />
        },
        {
          path: 'coincover-txm',
          element: <SonarCloud title="List of Pull Request Results for coincover-txm" />
        }
      ]
    }
  ]
};

export default MainRoutes;
