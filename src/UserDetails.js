import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./userdetails.css";

function UserDetails() {
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(data => setUserDetails(data))
      .catch(error => console.error('Error fetching user details:', error));
  }, [username]);

  return (
    <div className="user-details-container">
      {userDetails ? (
        <div>
          <h1 className="details-title">User Details</h1>
          <img src={userDetails.avatar_url} alt={userDetails.login} className="user-avatar" />
          <p className="details-info">Username: {userDetails.login}</p>
          <p className="details-info">Name: {userDetails.name}</p>
          <p className="details-info">Company: {userDetails.company}</p>
          <p className="details-info">Followers: {userDetails.followers}</p>
          <p className="details-info">Following: {userDetails.following}</p>
          <p className="details-info">Public Repos: {userDetails.public_repos}</p>
          <p className="details-info">Gravatar ID: {userDetails.gravatar_id}</p>
          <p className="details-info">Profile URL: <a href={userDetails.html_url}>{userDetails.html_url}</a></p>
          <p className="details-info">Followers URL: <a href={userDetails.followers_url}>{userDetails.followers_url}</a></p>
          <p className="details-info">Following URL: <a href={userDetails.following_url}>{userDetails.following_url}</a></p>
          <p className="details-info">Gists URL: <a href={userDetails.gists_url}>{userDetails.gists_url}</a></p>
          <p className="details-info">Starred URL: <a href={userDetails.starred_url}>{userDetails.starred_url}</a></p>
          <p className="details-info">Subscriptions URL: <a href={userDetails.subscriptions_url}>{userDetails.subscriptions_url}</a></p>
          <p className="details-info">Organizations URL: <a href={userDetails.organizations_url}>{userDetails.organizations_url}</a></p>
          <p className="details-info">Repos URL: <a href={userDetails.repos_url}>{userDetails.repos_url}</a></p>
          <p className="details-info">Events URL: <a href={userDetails.events_url}>{userDetails.events_url}</a></p>
          <p className="details-info">Received Events URL: <a href={userDetails.received_events_url}>{userDetails.received_events_url}</a></p>
          <p className="details-info">Type: {userDetails.type}</p>
          <p className="details-info">Site Admin: {userDetails.site_admin ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserDetails;
