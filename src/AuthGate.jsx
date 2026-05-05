import { useEffect, useState } from "react";

const PASSWORD = "ksf2026!";

export default function AuthGate({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (localStorage.getItem("ksf_auth") === "true") setAuthorized(true);
  }, []);

  const handleLogin = () => {
    if (input === PASSWORD) {
      localStorage.setItem("ksf_auth", "true");
      setAuthorized(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") handleLogin();
  };

  if (authorized) return children;

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="auth-eyebrow">Kent Schools Foundation · BoardHub</div>
        <h1>Board Access</h1>
        <p>Enter the shared board password to view the dashboard.</p>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Password"
          autoFocus
        />
        <button onClick={handleLogin}>Enter Dashboard</button>
      </section>
    </main>
  );
}
