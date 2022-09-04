import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes'
import { store } from './store'
import { Provider } from 'react-redux'

export const App = () => {
  const routes = useRoutes()

  return (
    <Provider store={store}>
      <BrowserRouter>{routes}</BrowserRouter>
    </Provider>
  )
}
