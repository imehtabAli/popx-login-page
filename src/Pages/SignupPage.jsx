import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignupComponent = ({ formData, setFormData, onSignup }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const existingUsers = JSON.parse(localStorage.getItem("popx-users") || "[]");
    const userExists = existingUsers.find(user => user.email === formData.email);
    
    if(userExists){
      setMessage("User with this email already exist!");
      return;
    }
    
    onSignup(formData);
    
    setMessage("Account created Successfully! Redirecting to login...");
    
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      <div className="signup-div">
        <h1>Create your PopX account</h1>
        {message && (
          <p style={{
            color: message.includes('Successfully') ? 'green' : 'red',
            fontSize: '14px',
            marginBottom: '10px'
          }}>
            {message}
          </p>
        )}
        
        <form onSubmit={handleSubmit}>
          <label>Full Name*</label>
          <input type="text" placeholder="Enter full name" value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />

          <label>Phone number*</label>
          <input type="number" placeholder="Enter phone number" value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })} required />

          <label>Email address*</label>
          <input type="email" placeholder="Enter email address" value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />

          <label>Password*</label>
          <input type="password" placeholder="Enter password" value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />

          <label>Company name</label>
          <input type="text" placeholder="Enter company name" value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} />

          <div className="radio-group">
            <label>Are you an Agency?*</label><br />
            <input
              type="radio"
              name="agency"
              value="yes"
              checked={formData.agency === "yes"}
              onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
            /> Yes

            <input
              type="radio"
              name="agency"
              value="no"
              checked={formData.agency === "no"}
              onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
              style={{ marginLeft: "1rem" }}
            /> No
          </div>

          <button type="submit">Create Account</button>
        </form>
        <div className="link-text">
  <span>Already have an account? </span>
  <Link to="/login" className="login-link">Login here</Link>
</div>
      </div>
    </>
  )
}

export default SignupComponent;