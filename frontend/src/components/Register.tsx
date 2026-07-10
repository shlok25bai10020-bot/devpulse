import React, { useState } from 'react';

interface RegisterProps {
  onLoginSuccess: (token: string, user: any) => void;
  switchToLogin: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onLoginSuccess, switchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [gitHubUsername, setGitHubUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, pass, gitHubUsername })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('token', data.token);
      onLoginSuccess(data.token, data.user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Join DevPulse</h2>
        {error && <div className="auth-error">{error}</div>}

        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={pass} 
            onChange={(e) => setPass(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>GitHub Username</label>
          <input 
            type="text" 
            value={gitHubUsername} 
            onChange={(e) => setGitHubUsername(e.target.value)} 
          />
        </div>

        <button type="submit" className="auth-btn">Register</button>
        <p className="auth-switch">
          Already have an account? <span onClick={switchToLogin}>Log In</span>
        </p>
      </form>
    </div>
  );
};