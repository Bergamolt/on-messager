import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes'
import { store } from './store'
import { Provider } from 'react-redux'
import { InitApp } from './containers/init-app/init-app'

export const App = () => {
  const routes = useRoutes()

  return (
    <Provider store={store}>
      <InitApp>
        <BrowserRouter>{routes}</BrowserRouter>
      </InitApp>
    </Provider>
  )
}
