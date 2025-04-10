import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/loginPage/loginPage';
import RegisterPage from './pages/registerPage/registerPage';
import MapPage from './pages/mapPage/MapPage';
import SuccessPage from './components/volunteer/signup/SuccessPage';
import VolunteerPage from './pages/volunteerPage/VolunteerPage';
import MyAdoptedGIPage from './pages/myAdoptedGIPage/MyAdoptedGIPage';
import { VideoLibrary } from '@mui/icons-material';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthProvider>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<MapPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Public Routes */}
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/volunteer" element={<VolunteerPage />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/volunteer/my-adopted-gi" element={<MyAdoptedGIPage />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  </AuthProvider>
);
