// UserListPage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./userList.css";

function UserListPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="user-list-container"> 
      <h1 className="list-title">Users List</h1> 
      <ul className="user-list">
        {users.map(user => (
          <li key={user.id} className="user-item"> 
            <Link to={`/user/${user.login}`} className="user-link"> 
              <img src={user.avatar_url} alt={user.login} className="user-avatar" />
              <div className="user-details"> 
                <p className="username">Username: {user.login}</p>
                <p className="last-name">Last Name: {user.name ? user.name.split(' ')[1] : 'N/A'}</p>
                <p className="first-name">First Name: {user.name ? user.name.split(' ')[0] : 'N/A'}</p> 
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserListPage;
