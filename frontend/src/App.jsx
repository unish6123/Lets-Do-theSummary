import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AuthForm from './components/Auth/AuthForm';
import DashboardPage from './pages/DashboardPage';
import BookSummary from './components/BookStore/BookSummary';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './Routes/Protected';
import PublicRoute from './Routes/Public';
import Navbar from './components/UI/Navbar';
import { useAuth } from './context/AuthContext';
import UserProfile from './pages/UserProfile';
import FileUploader from './pages/FileUploader.jsx';

function App() {
  const { loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return (
    <div className="app">
      <Routes>

       
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<AuthForm type="register" />} />
          <Route path="/forgot-password" element={<AuthForm type="forgotPassword" />} />
          <Route path="/resend-otp" element={<AuthForm type="resendOTP" />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/upload" element={<FileUploader />} />
       

       
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/summary" element={<BookSummary />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
