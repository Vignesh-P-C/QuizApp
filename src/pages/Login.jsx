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
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        d
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100'
      }`}
    >
      {/* Dark mode toggle */}
      <button
        onClick={onToggleDark}
        className={`fixed top-4 right-4 p-2 rounded-full transition-all ${
          d ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' : 'bg-white text-slate-600 hover:bg-gray-100 shadow'
        }`}
        title="Toggle theme"
      >
        {d ? '☀️' : '🌙'}
      </button>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🎓</div>
          <h1
            className={`text-4xl font-extrabold tracking-tight mb-2 ${
              d ? 'text-white' : 'text-gray-900'
            }`}
          >
            Quiz Master
          </h1>
          <p className={`text-base ${d ? 'text-slate-400' : 'text-gray-500'}`}>
            Sign in to start your learning journey
          </p>
        </div>

        {/* Card */}
        <div
          className={`rounded-2xl shadow-2xl p-8 transition-colors duration-300 ${
            d ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-100'
          }`}
        >
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name */}
            <div>
              <label
                className={`block text-sm font-semibold mb-1.5 ${
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
                className={`w-full px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all outline-none ${
                  errors.name
                    ? 'border-red-500 bg-red-50'
                    : d
                    ? 'border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:border-blue-500'
                    : 'border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                className={`block text-sm font-semibold mb-1.5 ${
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
                className={`w-full px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all outline-none ${
                  errors.email
                    ? 'border-red-500 bg-red-50'
                    : d
                    ? 'border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:border-blue-500'
                    : 'border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                className={`block text-sm font-semibold mb-1.5 ${
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
                className={`w-full px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all outline-none ${
                  errors.password
                    ? 'border-red-500 bg-red-50'
                    : d
                    ? 'border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:border-blue-500'
                    : 'border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white'
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 rounded-xl font-bold text-white text-sm tracking-wide transition-all mt-2 ${
                isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-200'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in…
                </span>
              ) : (
                'Sign In & Start Learning'
              )}
            </button>
          </form>

          <p className={`text-center text-xs mt-6 ${d ? 'text-slate-500' : 'text-gray-400'}`}>
            Your session data stays local and resets on logout.
          </p>
        </div>
      </div>
    </div>
  );
}