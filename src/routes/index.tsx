
import React from 'react';
import Layout from '../layout/index';
import { rootRoutes } from './routes';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: rootRoutes.map((route) => {
      if (route.index) {
        return { index: true, element: route.element };
      }
      // return { path: route.path, element: route.element };
    }),
  },
];
