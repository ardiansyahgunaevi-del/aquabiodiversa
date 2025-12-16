import { useState } from "react";
import { motion } from "motion/react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Eye, EyeOff, User, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "./AuthContext";
import imgPexelsFrancescoUngaro33610521 from "figma:asset/5468057469ab2db33e9f9d2c12419f6659505266.png";

interface LoginProps {
  onRegister: () => void;
  onLoginSuccess: () => void;
}

export default function Login({ onRegister, onLoginSuccess }: LoginProps) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!username.trim() || !password.trim()) {
      setError("Username dan password harus diisi");
      return;
    }

    setIsLoading(true);

    try {
      // Pass the values WITHOUT trim to support exact matching
      const success = await login(username, password);
      
      if (success) {
        console.log("✅ Login berhasil:", username);
        onLoginSuccess();
      } else {
        setError("Username atau password salah");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-cyan-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          alt="Underwater coral reef background"
          className="h-full w-full object-cover"
          src={imgPexelsFrancescoUngaro33610521}
        />
        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-blue-800/40 to-cyan-900/60" />
      </div>

      {/* Floating particles animation - 20 particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1440),
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
            }}
            animate={{
              y: -50,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1440),
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 text-center sm:mb-12"
        >
          {/* Title with Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 flex items-center justify-center gap-3 sm:gap-4"
          >
            <Logo className="h-12 w-12 drop-shadow-lg sm:h-16 sm:w-16 md:h-20 md:w-20" />
            <h1 className="font-['Montserrat',sans-serif] text-3xl font-extrabold text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
              AQUABIODIVERSA
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-cyan-50 sm:text-xl"
          >
            Jelajahi Keanekaragaman Biota Air Nusantara
          </motion.p>
        </motion.div>

        {/* Login Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="relative rounded-3xl bg-white/10 p-8 shadow-2xl backdrop-blur-xl border border-white/20">
            <h2 className="mb-6 text-center text-white">
              Masuk ke Akun Anda
            </h2>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 flex items-center gap-2 rounded-lg bg-red-500/20 border border-red-500/30 px-4 py-3 text-red-100"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username Input */}
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm text-cyan-50">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-200" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Masukkan username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-xl border-white/20 bg-white/10 py-6 pl-10 pr-4 text-white placeholder:text-cyan-200/50 focus:border-cyan-400 focus:ring-cyan-400"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm text-cyan-50">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-200" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border-white/20 bg-white/10 py-6 pl-10 pr-12 text-white placeholder:text-cyan-200/50 focus:border-cyan-400 focus:ring-cyan-400"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-200 hover:text-white transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-6 text-white shadow-lg transition-all hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-transparent px-2 text-cyan-100">atau</span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-cyan-100">
                  Belum punya akun?{" "}
                  <button
                    type="button"
                    onClick={onRegister}
                    className="text-cyan-300 hover:text-white transition-colors underline"
                    disabled={isLoading}
                  >
                    Daftar sekarang
                  </button>
                </p>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 text-center text-sm text-cyan-100"
        >
          © 2025 AquaBiodiversa - Melestarikan Keanekaragaman Biota Air Indonesia
        </motion.p>
      </div>
    </div>
  );
}