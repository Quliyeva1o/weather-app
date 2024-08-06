import React from 'react';
import Layout from '../layout/index';
import { rootRoutes } from './routes';


export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: rootRoutes.filter(route => route).map(route => 
      route.index 
      ? { index: true, element: route.element } 
      : { path: route.path, element: route.element }
    
    ),
  },
];
