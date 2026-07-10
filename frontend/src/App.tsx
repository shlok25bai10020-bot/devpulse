import { useState, useEffect } from 'react';
import { UserProfile, GitHubRepo } from './interfaces/dashboard';

export default function App() {
  const [user] = useState<UserProfile>({
    id: 'dev-user-123',
    name: 'Shlok Mahesh Thakur',
    email: 'shlokthakur2711@gmail.com',
    bio: 'Second Year VIT Bhopal student doing BTECH with specialization in CSE(AIML) ',
    skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'TypeScript', 'Vite']
  });

  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/github/repos/shlokthakur');
        if (response.ok) {
          const data = await response.json();
          setRepos(data);
        }
      } catch (err) {
        setRepos([
          { id: 1, name: 'devpulse-dashboard', description: 'Production ready dashboard tracking metrics', html_url: '#', stargazers_count: 4 },
          { id: 2, name: 'mern-secure-auth', description: 'Authentication modules and storage algorithms', html_url: '#', stargazers_count: 2 },
          { id: 3, name: 'automated-pipeline', description: 'Vercel and Render optimization configs', html_url: '#', stargazers_count: 7 }
        ]);
      }
    };
    fetchGithubData();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#ffffff', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#38bdf8', letterSpacing: '-0.025em' }}>DevPulse Dashboard</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.95rem' }}>{user.email}</span>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#38bdf8', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>S</div>
        </div>
      </nav>

      <header style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', padding: '2rem', borderRadius: '12px', border: '1px solid #334155', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.5rem', color: '#f8fafc' }}>{user.name}</h2>
        <p style={{ color: '#38bdf8', fontSize: '1.05rem', marginBottom: '1rem' }}>{user.bio}</p>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem', borderRadius: '9999px', backgroundColor: '#065f46', color: '#34d399', fontSize: '0.85rem', fontWeight: '600' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#34d399' }}></span> Internship Project Live
        </span>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        <section style={{ background: '#1e293b', padding: '1.75rem', borderRadius: '12px', border: '1px solid #334155' }}>
          <h3 style={{ color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem', fontWeight: '700' }}>Verified Core Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {user.skills.map((skill, i) => (
              <span key={i} style={{ background: '#334155', color: '#e2e8f0', padding: '0.5rem 0.9rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '500', border: '1px solid #475569' }}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section style={{ background: '#1e293b', padding: '1.75rem', borderRadius: '12px', border: '1px solid #334155' }}>
          <h3 style={{ color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem', fontWeight: '700' }}>Live GitHub Feed (Top 3 Repositories)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {repos.map((repo) => (
              <a href={repo.html_url} key={repo.id} style={{ display: 'block', textDecoration: 'none', background: '#0f172a', padding: '1rem', borderRadius: '8px', border: '1px solid #334155', transition: 'border-color 0.2s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <h4 style={{ color: '#38bdf8', fontSize: '1rem', fontWeight: '600' }}>{repo.name}</h4>
                  <span style={{ color: '#e2e8f0', fontSize: '0.85rem', background: '#334155', padding: '0.1rem 0.5rem', borderRadius: '4px' }}>★ {repo.stargazers_count}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0, lineHeight: '1.4' }}>{repo.description}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}