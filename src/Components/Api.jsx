import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Api = ({ someProp }) => {
  const [username, setUsername] = useState('');
  const [info, setInfo] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleSearch = () => {
    if (username.trim() !== '') {
      fetch(`https://api.github.com/users/${username}`)
        .then((response) => response.json())
        .then((infoData) => setInfo(infoData))
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setInfo(null);
        });

      fetch(`https://api.github.com/users/${username}/repos`)
        .then((response) => response.json())
        .then((reposData) => setRepos(reposData))
        .catch((error) => {
          console.error('Error fetching repositories:', error);
          setRepos([]);
        });
    }
  };

  const handleReset = () => {
    setUsername('');
    setInfo(null);
    setRepos([]);
  };

  useEffect(() => {
    if (username.trim() !== '') {
      fetch(`https://api.github.com/users/${username}/repos`)
        .then((response) => response.json())
        .then((reposData) => setRepos(reposData))
        .catch((error) => {
          console.error('Error fetching repositories:', error);
          setRepos([]);
        });
    }
  }, [username]);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <label className="form-label">
            GitHub Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            />
          </label>
          <button onClick={handleSearch} className="btn btn-primary mt-2">
            Search
          </button>
        </div>
      </div>

      {info && repos.length > 0 && (
        <div className="mt-4">
          <h2>User Information</h2>
          <img src={info.avatar_url} alt={info.login} className="img-fluid rounded-circle" width={150} height={150} />
          <p>
            <b>{info.name}</b>
          </p>
          <p>
            <b>LOCATION:</b> {info.location}
          </p>
          <p>
            <b>BIO:</b> {info.bio}
          </p>

          <h2>Repositories</h2>
          <table className="table">
            <thead></thead>
            <tbody>
              {repos.map((repo) => (
                <tr key={repo.id}>
                  <td>{repo.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {info && repos.length > 0 && (
        <div className="card mt-2">
          <div className="card-body">
            <button onClick={handleReset} className="btn btn-danger">
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Api.propTypes = {
  someProp: PropTypes.string.isRequired,
};

export default Api;







