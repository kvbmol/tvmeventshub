// src/features/auth/Login.jsx - IDENTICAL FIX
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

export default function Login() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = '/events';  // Manual redirect - NO HOOKS
    } catch (error) {
      alert('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };




  return (
    <div style={{padding: '2rem', maxWidth: '400px', margin: '0 auto'}}>
      <h2 style={{color: '#ef4444', marginBottom: '1rem'}}>
        Login - TvmEvents Hub
      </h2>
      
      {/* RED TEST BUTTON */}
      <button 
        onClick={() => console.log('🔥 TEST WORKS!')}
        style={{
          background: '#ef4444', 
          color: 'white', 
          padding: '12px 24px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
          marginBottom: '1rem',
          width: '100%'
        }}
      >
        TEST BUTTON (Console Check)
      </button>

      <form onSubmit={handleSubmit} style={{marginTop: '1rem'}}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="test@example.com"
          style={{
            width: '100%', 
            padding: '12px', 
            marginBottom: '1rem',
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
            width: '100%', 
            padding: '12px', 
            marginBottom: '1rem',
            border: '2px solid #ddd', 
            borderRadius: '8px', 
            fontSize: '16px'
          }}
          required
        />
        
        {/* YOUR RED SIGN IN BUTTON */}
        <button 
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            background: '#3b82f6', 
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {/* {loading ? 'Creating Account...' : '🔑 CREATE ACCOUNT FIRST'} */}
          {loading ? 'Signing In...' : '🔑 SIGN IN (Will Work Now!)'}
        </button>
      </form>
    </div>
  );
}
