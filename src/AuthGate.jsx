import { useState, useEffect } from "react";

const PASSWORD = "ksf2026!"; // change this

export default function AuthGate({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("ksf_auth");
    if (saved === "true") setAuthorized(true);
  }, []);

  const handleLogin = () => {
    if (input === PASSWORD) {
      localStorage.setItem("ksf_auth", "true");
      setAuthorized(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (authorized) return children;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Board Access</h2>
        <p>Enter password to view dashboard</p>

        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          Enter
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "white",
  },
  card: {
    padding: "30px",
    borderRadius: "12px",
    background: "#1e293b",
    textAlign: "center",
  },
  input: {
    marginTop: "12px",
    padding: "10px",
    width: "200px",
  },
  button: {
    marginTop: "12px",
    padding: "10px 20px",
    background: "#22c55e",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};
