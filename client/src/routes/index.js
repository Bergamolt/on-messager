import { Routes, Route } from 'react-router-dom'

import { ROUTE } from './constants'
import { PrivatePage } from './private-page'
import { AuthPage } from './auth-page'

import { Login } from '../pages/auth/login'
import { Registration } from '../pages/auth/registration'
import { Home } from '../pages/home'

const routes = [
  {
    path: ROUTE.HOME,
    element: (
      <PrivatePage>
        <Home />
      </PrivatePage>
    ),
  },
  {
    path: ROUTE.REGISTRATION,
    element: (
      <AuthPage>
        <Registration />
      </AuthPage>
    ),
  },
  {
    path: ROUTE.LOGIN,
    element: (
      <AuthPage>
        <Login />
      </AuthPage>
    ),
  },
  {
    path: ROUTE.NOT_PAGE,
    element: <h1>Not Found</h1>,
  },
]

export const useRoutes = () => (
  <Routes>
    {routes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ))}
  </Routes>
)
