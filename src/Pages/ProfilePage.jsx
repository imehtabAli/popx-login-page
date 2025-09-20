import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const ProfilePageComponent = ({currentUser, setCurrentUser}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);


useEffect(() => {
    if(currentUser){
      setUser(currentUser);
    }
    else{
      const savedUser = localStorage.getItem("popx-current-user");
      if(savedUser){
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setCurrentUser(userData);
      }
      else{
        navigate("/login");
      }
    }
  }, [currentUser, navigate, setCurrentUser]);

  const handleLogout = () => {
    localStorage.removeItem("popx-current-user");
    setCurrentUser(null);
    navigate("/");
  };

  if(!user){
    return <div>Loading...</div>
  }



  return (
    <div className="account-container">
      <h2 className="title">Account Settings</h2>

      <div className="profile-section">
        <div className="profile-pic">
          <img
            src="src/assets/logo.jpg?url"
            alt="profile"
            className="avatar"
          />
          <span className="camera-icon">📷</span>
        </div>

        <div className="profile-info">
          <h3 className="name">{user.name}</h3>
          <p className="email">{user.email}</p>
        </div>
      </div>

<p className="description">
        Welcome {user.name}! Here are your account details:
        <br/><br/>
        <strong>Phone:</strong> {user.number}<br/>
        <strong>Agency:</strong> {user.agency === 'yes' ? 'Yes' : 'No'}<br/>
        {user.companyName && <><strong>Company:</strong> {user.companyName}<br/></>}
        <br/>
        Manage your personal information, update your profile details, and keep your account secure.
      </p>

      <button 
        onClick={handleLogout}
        style={{marginLeft: '10px', backgroundColor: '#dc3545'}}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePageComponent
