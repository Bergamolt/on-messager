import { Routes, Route } from 'react-router-dom'

import { ROUTE } from './constants'
import { PrivatePage } from './private-page'
import { AuthPage } from './auth-page'

import { Login } from '../pages/auth/login'
import { Registration } from '../pages/auth/registration'
import { Users } from '../pages/users'
import { Re } from '../re'

const routes = [
  {
    path: ROUTE.HOME,
    element: (
      <PrivatePage>
        <Re />
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
    path: ROUTE.USERS,
    element: (
      <AuthPage>
        <Users />
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
