import { useState, useEffect } from 'react';
import type { IUserProfile, IGitHubRepo } from './interfaces/dashboard';
import { Login } from './components/Login';
import { Register } from './components/Register';
import './index.css';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [view, setView] = useState<'login' | 'register'>('login');
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [repos, setRepos] = useState<IGitHubRepo[]>([]);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(false);
  const [loadingRepos, setLoadingRepos] = useState<boolean>(false);

  const handleAuthSuccess = (newToken: string, userData: any) => {
    setToken(newToken);
    setProfile(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setProfile(null);
    setRepos([]);
  };

  useEffect(() => {
    if (!token) return;

    const fetchBackendProfile = async () => {
      setLoadingProfile(true);
      try {
        const response = await fetch('http://127.0.0.1:5000/api/auth/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else if (response.status === 401) {
          handleLogout();
        }
      } catch (error) {
        console.error("Error communicating with backend:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchBackendProfile();
  }, [token]);

  useEffect(() => {
    if (!profile?.gitHubUsername) return;

    const fetchGitHubData = async () => {
      setLoadingRepos(true);
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/github/${profile.gitHubUsername}`
        );
        if (response.ok) {
          const data = await response.json();
          setRepos(data);
        }
      } catch (error) {
        console.error("Error connecting to GitHub:", error);
      } finally {
        setLoadingRepos(false);
      }
    };

    fetchGitHubData();
  }, [profile?.gitHubUsername]);

  if (!token) {
    return view === 'login' ? (
      <Login onLoginSuccess={handleAuthSuccess} switchToRegister={() => setView('register')} />
    ) : (
      <Register onLoginSuccess={handleAuthSuccess} switchToLogin={() => setView('login')} />
    );
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-brand">DevPulse</div>
        <div className="nav-links">
          <a href="#dashboard" className="active">Dashboard</a>
          <span onClick={handleLogout} className="logout-link" style={{ cursor: 'pointer', color: '#94a3b8', marginLeft: '1rem' }}>Logout</span>
        </div>
      </nav>

      <main className="dashboard-grid">
        <section className="grid-item profile-header-card">
          <div className="avatar-placeholder">💻</div>
          {loadingProfile ? (
            <p>Loading session profile...</p>
          ) : (
            <div>
              <h1>{profile?.name}</h1>
              <p className="user-email">{profile?.email}</p>
              <p className="user-bio">"{profile?.bio || 'No bio added yet.'}"</p>
            </div>
          )}
        </section>

        <section className="grid-item skills-card">
          <h2>Learning Progress &amp; Skills</h2>
          <div className="skills-flex">
            {profile?.skills && profile.skills.length > 0 ? (
              profile.skills.map((skill, index) => (
                <span key={index} className="skill-badge">{skill}</span>
              ))
            ) : (
              <p>No skills listed yet.</p>
            )}
          </div>
        </section>

        <section className="grid-item github-feed-card">
          <h2>Latest GitHub Repositories</h2>
          <p className="subtitle">Live sync from @{profile?.gitHubUsername}</p>
          
          <div className="repo-list">
            {loadingRepos ? (
              <p>Loading repositories...</p>
            ) : repos.length === 0 ? (
              <p>No repositories found or API limit reached.</p>
            ) : (
              repos.map((repo) => (
                <div key={repo.id} className="repo-item-placeholder" style={{ marginBottom: '1rem' }}>
                  <h4>
                    <a href={repo.html_url} target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'none' }}>
                      {repo.name}
                    </a>
                  </h4>
                  <p>{repo.description || 'No description provided.'}</p>
                  <span className="repo-lang" style={{ fontSize: '0.8rem', color: '#f35e02' }}>
                    {repo.stargazers_count} stars | {repo.language || 'Markdown'}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;