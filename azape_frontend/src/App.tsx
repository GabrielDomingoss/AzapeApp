import { BrowserRouter } from "react-router-dom"
import { Router } from "./router"
import { AuthProvider } from "./hooks/authProvider"
import { LocalizationProvider } from "@mui/x-date-pickers"
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
function App() {

  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </LocalizationProvider>
    </AuthProvider>
  )
}

export default App
