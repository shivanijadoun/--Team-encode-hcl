

// function Register() {
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">Register</h1>
//     </div>
//   )
// }

// export default Register;


import { useState } from 'react';
import { Eye, EyeOff, LogIn, Heart, Lock, Mail } from 'lucide-react';




export default function HealthcareLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [userType, setUserType] = useState('patient');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Demo credentials based on user type
      const demoAccounts = {
        patient: { email: 'patient@healthcare.com', password: 'patient123' },
        doctor: { email: 'doctor@healthcare.com', password: 'doctor123' }
      };

      const account = demoAccounts[userType];
      if (email === account.email && password === account.password) {
        setSuccess(true);
        setEmail('');
        setPassword('');
        setError('');
      } else {
        setError('Invalid email or password for selected user type');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-6 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Heart className="w-8 h-8 fill-current" />
          <div>
            <h1 className="text-3xl font-bold">HealthCare Plus</h1>
            <p className="text-emerald-100">Your trusted healthcare management system</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Decorative top bar */}
          <div className="h-1 bg-gradient-to-r from-emerald-500 to-blue-500"></div>

          <div className="p-8">
            {/* Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full mb-4">
                <Lock className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Secure Login</h2>
              <p className="text-gray-600 mt-1">Access your healthcare account</p>
            </div>

            {/* User Type Selection */}
            <div className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-sm font-semibold text-gray-700 mb-3">Login as:</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { type: 'patient', label: 'Patient' },
                  { type: 'doctor', label: 'Doctor' }
                ].map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setUserType(option.type)}
                    className={`py-2 px-3 rounded-lg font-medium text-sm transition ${
                      userType === option.type
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-emerald-500'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
                Login successful! Redirecting...
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">!</div>
                {error}
              </div>
            )}

            {/* Form */}
            <div className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Demo: {userType === 'patient' ? 'patient@healthcare.com' : 'doctor@healthcare.com'}
                </p>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">
                    <Lock className="w-4 h-4 inline mr-1" />
                    Password
                  </label>
                  <a href="#" className="text-xs text-emerald-600 hover:underline">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700 disabled:text-gray-400"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Demo: {userType === 'patient' ? 'patient123' : 'doctor123'}
                </p>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-2 focus:ring-emerald-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Login to Account
                  </>
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/register" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                  Register here
                </a>
              </p>
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  🔒 Secure connection • HIPAA Compliant • 24/7 Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}