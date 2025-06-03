import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  route('login', 'routes/auth/login.tsx'),
  route('register', 'routes/auth/register.tsx'),
  layout('./layouts/app-layout.tsx', [
    index('./routes/dashboard/dashboard-page.tsx'), //
    route('payments', './routes/payments/payments-page.tsx'),
    route('payments/add', './routes/payments/add/add-payment-page.tsx'),
    route('expenses', './routes/expenses/expenses-page.tsx'),
    route('expenses/add', './routes/expenses/add/add-expenses-page.tsx'),
    route('clients', './routes/clients/clients-page.tsx'),
    route('clients/add', './routes/clients/add/add-client-page.tsx'),
  ]),
] satisfies RouteConfig;
