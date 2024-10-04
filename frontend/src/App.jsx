import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import AuthLayer from './components/AuthLayer'
import Home from './components/Home'
import Header from './components/Header'
import EmpDetail from './components/EmpDetail'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <AuthLayer>
                <Home />
              </AuthLayer>
            }
          />

          <Route
            path="/dashboard"
            element={
              <AuthLayer isAuthReq={true}>
                <Dashboard />
              </AuthLayer>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <AuthLayer isAuthReq={true}>
                <EmpDetail  />
              </AuthLayer>
            }
          />
          <Route
            path="/create-employee"
            element={
              <AuthLayer isAuthReq={true}>
                <EmpDetail type="create" />
              </AuthLayer>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthLayer>
                <Signin />
              </AuthLayer>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayer>
                <Signup />
              </AuthLayer>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
