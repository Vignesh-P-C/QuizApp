import { useState } from 'react';

export default function Login({ onLogin, isDark, onToggleDark }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const d = isDark;

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      newErrors.name = 'Name must be at least 2 characters';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Enter a valid email address';
    if (!form.password || form.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    // Simulate brief loading for UX feel
    setTimeout(() => {
      onLogin(form.name.trim(), form.email.trim());
    }, 600);
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-all duration-500 ${
        d
          ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 animate-gradient-dark'
          : 'bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 animate-gradient'
      }`}
    >
      {/* Dark mode toggle */}
      <button
        onClick={onToggleDark}
        className={`fixed top-4 right-4 z-50 p-3 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          d
            ? 'bg-slate-800/80 text-yellow-400 hover:bg-slate-700 shadow-lg shadow-black/20'
            : 'bg-white/80 text-slate-600 hover:bg-white shadow-lg shadow-black/5 backdrop-blur-md'
        }`}
        title="Toggle theme"
        aria-label="Toggle dark mode"
      >
        <span className="text-xl">{d ? '☀️' : '🌙'}</span>
      </button>

      <div className="w-full max-w-md animate-fadeInUp">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="celebration-pop text-7xl mb-4 float-emoji">🎓</div>
          <h1
            className={`text-5xl font-extrabold tracking-tight mb-3 ${
              d ? 'text-white' : 'text-gray-900'
            }`}
          >
            Quiz Master
          </h1>
          <p className={`text-base font-medium ${d ? 'text-slate-400' : 'text-gray-500'}`}>
            Sign in to start your learning journey
          </p>
        </div>

        {/* Card */}
        <div
          className={`rounded-2xl shadow-2xl p-8 transition-all duration-500 ${
            d
              ? 'bg-slate-800/60 border border-slate-700/50 backdrop-blur-xl'
              : 'glass-card'
          }`}
        >
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name */}
            <div className="animate-fadeInUp delay-100">
              <label
                className={`block text-sm font-bold mb-2 ${
                  d ? 'text-slate-300' : 'text-gray-700'
                }`}
              >
                Full Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="Username"
                className={`w-full px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition-all outline-none focus:scale-[1.02] ${
                  errors.name
                    ? 'border-red-500 bg-red-50/50 shake'
                    : d
                    ? 'border-slate-600 bg-slate-700/50 text-white placeholder-slate-400 focus:border-indigo-500 focus:bg-slate-700 focus:shadow-lg focus:shadow-indigo-500/10'
                    : 'border-gray-200 bg-white/50 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10'
                }`}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-500 font-bold flex items-center gap-1">
                  <span>⚠</span> {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="animate-fadeInUp delay-200">
              <label
                className={`block text-sm font-bold mb-2 ${
                  d ? 'text-slate-300' : 'text-gray-700'
                }`}
              >
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="Email Address"
                className={`w-full px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition-all outline-none focus:scale-[1.02] ${
                  errors.email
                    ? 'border-red-500 bg-red-50/50 shake'
                    : d
                    ? 'border-slate-600 bg-slate-700/50 text-white placeholder-slate-400 focus:border-indigo-500 focus:bg-slate-700 focus:shadow-lg focus:shadow-indigo-500/10'
                    : 'border-gray-200 bg-white/50 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10'
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500 font-bold flex items-center gap-1">
                  <span>⚠</span> {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="animate-fadeInUp delay-300">
              <label
                className={`block text-sm font-bold mb-2 ${
                  d ? 'text-slate-300' : 'text-gray-700'
                }`}
              >
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={handleChange('password')}
                placeholder="Min. 6 characters"
                className={`w-full px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition-all outline-none focus:scale-[1.02] ${
                  errors.password
                    ? 'border-red-500 bg-red-50/50 shake'
                    : d
                    ? 'border-slate-600 bg-slate-700/50 text-white placeholder-slate-400 focus:border-indigo-500 focus:bg-slate-700 focus:shadow-lg focus:shadow-indigo-500/10'
                    : 'border-gray-200 bg-white/50 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10'
                }`}
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500 font-bold flex items-center gap-1">
                  <span>⚠</span> {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="animate-fadeInUp delay-400 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`btn-glow w-full py-4 rounded-xl font-bold text-white text-sm tracking-wide transition-all duration-300 ${
                  isLoading
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="spinner h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in…
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In & Start Learning
                    <span>→</span>
                  </span>
                )}
              </button>
            </div>
          </form>

          <p className={`text-center text-xs mt-8 ${d ? 'text-slate-500' : 'text-gray-400'}`}>
            Your session data stays local and resets on logout.
          </p>
        </div>
      </div>
    </div>
  );
}