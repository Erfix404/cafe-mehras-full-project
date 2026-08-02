// src/pages/Login.js
import React, { useState } from "react";

function Login({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!password) return setError("رمز عبور را وارد کنید");
    setBusy(true);
    try {
      await onLogin(password);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <div className="auth-screen">
      <form className="auth-card" onSubmit={submit}>
        <div className="auth-arch">☕</div>
        <h1>کافه مهراس</h1>
        <p className="sub">پنل مدیریت</p>
        {error && <div className="auth-error">{error}</div>}
        <div className="field">
          <label htmlFor="pass">رمز عبور</label>
          <input
            id="pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoFocus
          />
        </div>
        <button className="btn btn-primary btn-block" disabled={busy}>
          {busy ? "در حال ورود…" : "ورود به پنل"}
        </button>
        <a
          href={process.env.PUBLIC_URL ? process.env.PUBLIC_URL + "/../" : "/"}
          style={{ display: "block", marginTop: "1.25rem", color: "#8a6f5f", fontSize: "0.82rem", textDecoration: "none" }}
        >
          ← بازگشت به سایت کافه
        </a>
      </form>
    </div>
  );
}

export default Login;
