import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:8080/api/customers/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, name, password })
      });
      if (response.ok) {
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.message || "Rejestracja nie powiodła się");
      }
    } catch (error) {
      setError("Błąd serwera. Spróbuj ponownie później.");
    }
  };

  return (
    <div className="login-container">
      <Header />
      <h2>Rejestracja</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Imię</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit">Zarejestruj się</button>
      </form>
      <br />
      <button onClick={() => navigate("/")} className="register-button">
        Wróć do logowania
      </button>
    </div>
  );
}

export default Register;
