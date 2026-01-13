// src/features/auth/Login.jsx - SMART REDIRECT VERSION
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // ← ADD THESE
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

export default function Login() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  
  // ✅ SMART REDIRECT HOOKS
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/events';  // Where they came from

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      // ✅ SMART REDIRECT - Back to exact spot!
      if (from.includes('events/')) {
        alert(`✅ Welcome back! Continuing to event...`);
      }
      navigate(from, { replace: true });  // Replace history (no back button to login)
      
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
      
     
      {from !== '/events' && (
        // <div style={{
        //   background: '#dbeafe', 
        //   padding: '12px', 
        //   borderRadius: '8px', 
        //   marginBottom: '1rem',
        //   borderLeft: '4px solid #3b82f6'
        // }}>
          <p style={{margin: 0, fontSize: '14px'}}>
            You'll return to: <strong>{from.includes('events/') ? 'Event Details' : 'Events'}</strong>
          </p>
        // </div>
      )}
      
      {/* RED TEST BUTTON */}
      {/* <button 
        onClick={() => console.log('🔥 TEST WORKS!')}
        style={{
          background: '#ef4444', color: 'white', padding: '12px 24px',
          border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer',
          marginBottom: '1rem', width: '100%'
        }}
      >
        TEST BUTTON (Console Check)
      </button> */}

      <form onSubmit={handleSubmit} style={{marginTop: '1rem'}}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="test@example.com"
          style={{
            width: '100%', padding: '12px', marginBottom: '1rem',
            border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px'
          }}
          required
        />
        
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="123456"
          style={{
            width: '100%', padding: '12px', marginBottom: '1rem',
            border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px'
          }}
          required
        />
        
        <button 
          type="submit"
          disabled={loading}
          style={{
            width: '100%', padding: '14px', background: '#3b82f6', 
            color: 'white', border: 'none', borderRadius: '8px',
            fontSize: '18px', fontWeight: 'bold', cursor: 'pointer'
          }}
        >
          {loading ? 'Signing In...' : '🔑 SIGN IN & CONTINUE'}
        </button>
      </form>
    </div>
  );
}
