import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/rest/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Nie udało się zalogować. Sprawdź dane.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      navigate("/my-stickers");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <Header />
      <h2>Logowanie</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Hasło</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Zaloguj się</button>
      </form>
    </div>
  );
}

export default Login;
