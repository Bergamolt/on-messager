import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from './context/auth'
import {useRoutes} from './routes'

export const App = () => {
  const routes = useRoutes()

  return (
    <AuthProvider>
      <BrowserRouter>{routes}</BrowserRouter>
    </AuthProvider>
  )
}
