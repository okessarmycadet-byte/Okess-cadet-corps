import { useState } from 'react';
import { ShieldCheck, Eye, EyeOff, ArrowRight } from 'lucide-react';
import './AdminLogin.css';

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="admin-login-page">
      <div className="login-background-glow" />

      <section className="login-card">
        <div className="login-emblem">
          <ShieldCheck size={34} strokeWidth={1.7} />
        </div>

        <div className="login-heading">
          <span className="login-eyebrow">OKESS ARMY CADET CORPS</span>
          <h1>Admin Portal</h1>
          <p>Authorized personnel only. Sign in to access Corps administration.</p>
        </div>

        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Authentication will be connected to Supabase in the full build.');
          }}
        >
          <label htmlFor="admin-email">Email address</label>
          <input
            id="admin-email"
            type="email"
            placeholder="admin@example.com"
            autoComplete="email"
            required
          />

          <label htmlFor="admin-password">Password</label>
          <div className="password-input-wrapper">
            <input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>

          <button type="submit" className="login-submit">
            <span>Access Dashboard</span>
            <ArrowRight size={19} />
          </button>
        </form>

        <div className="login-security">
          <ShieldCheck size={15} />
          <span>Restricted access · Corps administration</span>
        </div>
      </section>

      <footer className="login-footer">
        <span>OKESS ARMY CADET CORPS</span>
        <span>DISCIPLINE · SERVICE · HONOUR</span>
      </footer>
    </main>
  );
}
