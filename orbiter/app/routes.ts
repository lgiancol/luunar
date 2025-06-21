import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  route('login', 'routes/auth/login.tsx'),
  route('register', 'routes/auth/register.tsx'),
  layout('./layouts/app-layout.tsx', [
    index('./routes/dashboard/dashboard-page.tsx'), //
    route('income', './routes/income/income-page.tsx'),
    route('expenses', './routes/expenses/expenses-page.tsx'),
    route('clients', './routes/clients/clients-page.tsx'),
    route('clients/add', './routes/clients/add/add-client-page.tsx'),
  ]),
] satisfies RouteConfig;
