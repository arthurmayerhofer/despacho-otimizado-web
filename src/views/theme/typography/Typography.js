import React, { useState } from 'react';
import { fetchToken } from '../../../services/authService'; // Import the function

const Typography = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(''); // Adicionado estado para o token

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fetchedToken = await fetchToken(email, password); // Call the new function
      setToken(fetchedToken); // Update token state with fetched token

      if (fetchedToken) {
        // Handle successful login (e.g., store token, redirect)
        setMessage('Login successful!');
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      {token && <p>Token: {token}</p>} {/* Mostra o token se estiver disponível */}
    </div>
  );
};

export default Typography;
