import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoginComponent from './Pages/LoginPage'
import WelcomeComponent from './Pages/WelcomePage'
import SignupComponent from './Pages/SignupPage'
import ProfilePageComponent from './Pages/ProfilePage'



function App() {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    password: '',
    companyName: '',
    agency: ''
  });

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const savedUser = localStorage.getItem('popx-current-user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);


  const handleSignup = (userData) => {
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers, userData];
      console.log(updatedUsers);
      
      localStorage.setItem('popx-users', JSON.stringify(updatedUsers));
      
      return updatedUsers;
    });
    
    setFormData({
      name: '', number: '', email: '', password: '', companyName: '', agency: ''
    });
  }
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeComponent/>}></Route>
        <Route path="/login" element={<LoginComponent setCurrentUser={setCurrentUser} />} />
        <Route path="/signup" element={<SignupComponent formData={formData} setFormData={setFormData} onSignup={handleSignup} />} />
        <Route path="/profile" element={<ProfilePageComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
      </Routes>
    </Router>
    </>
  )
}
export default App
