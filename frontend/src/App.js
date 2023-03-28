import React, { useContext } from 'react';
import {BrowserRouter as Router,Navigate,Outlet,Route, Routes} from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import Home from './pages/Home/Home';
import Profile from './pages/UserProfile/Profile';
import './App.scss';
import './App.css';
import Register from './pages/Register/Register.jsx';
import Navbar from './components/Navbar/Navbar';
import LeftBar from './components/LeftBar/LeftBar';
import RightBar from './components/RightBar/RightBar';
import { DarkModeContext } from './context/DarkModeContext.js';
import { AuthContext } from './context/authContext.js';
import { QueryClient, QueryClientProvider } from 'react-query'

const App = () => {
  const queryClient = new QueryClient();
  const {currentuser} = useContext(AuthContext);
  const {DarkMode} = useContext(DarkModeContext);

  const Layout = ()=>{
    return(
      <QueryClientProvider client={queryClient}>
    <div className={`theme-${DarkMode ? "dark" : "light"} `}>
      <Navbar />
      <div style={{display:'flex'}}>
       <LeftBar />
       <div style={{flex:5}}> 
       <Outlet />
       </div>
       <RightBar />
      </div>
    </div>
    </QueryClientProvider>
  )}

  const ProtectedRoute = ({children})=>{
    if(!currentuser){
      return <Navigate to="/Login" />
    }
    return children
  }

  const ProtectedLayout = ({children}) => {
    return (
      <ProtectedRoute>
        <Layout>
          {children}
        </Layout>
      </ProtectedRoute>
    );
  };

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Routes>
        <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/' element={<ProtectedLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/Profile/:id' element={<Profile />} />
          </Route>
          </Routes>
      </QueryClientProvider>
    </Router>
  );
}

export default App;