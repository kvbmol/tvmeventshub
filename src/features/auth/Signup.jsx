// src/features/auth/Signup.jsx - NO HOOKS AT ALL
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('✅ Signup success! Go to Sign In.');
      window.location.href = '/login';  // Manual redirect - NO HOOKS
    } catch (error) {
      alert('Signup failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{padding: '4rem', maxWidth: '400px', margin: '0 auto'}}>
      <h2 style={{fontSize: '2rem', marginBottom: '2rem', textAlign: 'center'}}>
        Sign Up
      </h2>
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="test@example.com"
          style={{
            padding: '1rem',
            border: '2px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px'
          }}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="123456"
          style={{
            padding: '1rem',
            border: '2px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px'
          }}
          required
          minLength="6"
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: '1rem',
            background: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating Account...' : '👤 Sign Up'}
        </button>
      </form>
    </div>
  );
}
