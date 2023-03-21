import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <BrowserRouter>
    <SnackbarProvider maxSnack={4} autoHideDuration={3000}>
      <App />
    </SnackbarProvider>
  </BrowserRouter>
)
