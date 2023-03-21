import { Navigate, useRoutes } from 'react-router-dom'
import './App.css'
import Layout from './components/layouts/Layout'
import Login from './components/pages/Login'
import Projects from './components/pages/Projects'

const App = () => {
  let routes = useRoutes([
    {
      path: '/',
      children: [
        { index: true, element: <Navigate to="login" /> },
        { path: 'login', element: <Login /> },
        { path: 'projects', element: <Projects /> },
      ],
    },
  ])
  return <Layout>{routes}</Layout>
}
export default App
