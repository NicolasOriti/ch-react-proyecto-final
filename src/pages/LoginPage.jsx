import { useState } from 'react';
import { useNavigate } from 'react-router';
import { login, loginWithGoogle } from '../services/auth.service';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      console.log('User:', user);
      navigate('/admin');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const user = await loginWithGoogle();
      console.log('User:', user);
      navigate('/admin');
    } catch (error) {
      console.error('Login with Google failed:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Login</button>
      <button
        type='button'
        onClick={handleLoginWithGoogle}
      >
        Login with Google
      </button>
    </form>
  );
};
