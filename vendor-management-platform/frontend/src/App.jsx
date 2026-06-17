import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import VendorList from "./pages/VendorList";
import ProtectedRoute from "./components/ProtectedRoute";
import VendorDashboard from "./pages/VendorDashboard";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Documents from "./pages/Documents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>
       <Route
    path="/vendors"
    element={
        <ProtectedRoute>
            <VendorList />
        </ProtectedRoute>
    }
/>

<Route
    path="/vendor-dashboard"
    element={<VendorDashboard />}
/>

<Route
    path="/register"
    element={<Register />}
/>

<Route
    path="/profile"
    element={<Profile />}
/>

<Route
    path="/documents"
    element={<Documents />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;