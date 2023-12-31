import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./views/auth/Login"
import Register from "./views/auth/Register"
import AuthLayout from "./layouts/AuthLayout"
import NotFound from "./views/NotFound"
import DashboardLayout from "./layouts/DashboardLayout"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./views/dashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
