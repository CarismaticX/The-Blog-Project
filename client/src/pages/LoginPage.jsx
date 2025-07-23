import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function login(ev) {
    ev.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:4000/login',
        { username, password },
        { withCredentials: true }
      );
      console.log('Login success:', response.data);
      setRedirect(true);  // ✅ set redirect on success
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert('Wrong credentials'); // ✅ show alert on failure
    }
  }

  if (redirect) {
    return <Navigate to="/" />;  // ✅ actually redirect
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={ev => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={ev => setPassword(ev.target.value)}
      />
      <button>Login</button>
    </form>
  );
}
