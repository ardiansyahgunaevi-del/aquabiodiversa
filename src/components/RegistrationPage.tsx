import { useState } from "react";
import { motion } from "motion/react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Eye, EyeOff, User, Lock, Mail, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "./AuthContext";
import imgPexelsFrancescoUngaro33610521 from "figma:asset/5468057469ab2db33e9f9d2c12419f6659505266.png";

interface RegistrationPageProps {
  onLogin: () => void;
  onRegisterSuccess: () => void;
}

export default function RegistrationPage({ onLogin, onRegisterSuccess }: RegistrationPageProps) {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!email.trim() || !username.trim() || !fullName.trim() || !password.trim()) {
      setError("Semua field harus diisi");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Format email tidak valid");
      return;
    }

    setIsLoading(true);

    try {
      const isSuccess = await register(username, email, password, fullName);
      
      if (isSuccess) {
        console.log("✅ Registrasi berhasil:", username);
        setSuccess(true);
        // Jangan auto-redirect. Pengguna diminta klik Login secara manual.
      } else {
        setError("Username atau email sudah terdaftar");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mendaftar");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    console.log("Navigate to login");
    onLogin();
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
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-4 flex items-center justify-center gap-3 sm:gap-4 md:gap-6"
          >
            <motion.div
              initial={{ scale: 0, x: 50 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            >
              <Logo className="h-12 w-12 drop-shadow-lg sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24" />
            </motion.div>
            <h1 className="font-['Montserrat',sans-serif] text-3xl font-extrabold text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              AQUABIODIVERSA
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto max-w-2xl px-4 font-['Montserrat',sans-serif] text-base text-white/90 drop-shadow-md sm:text-lg md:text-xl lg:text-2xl"
          >
            "Jelajahi dan Berkontribusi Terhadap Keanekaragaman Biota Air
            Nusantara"
          </motion.p>
        </motion.div>

        {/* Registration Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Glassmorphism Container */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-white/30 bg-white/10 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_20px_rgba(255,255,255,0.2)]" />
            
            {/* Animated gradient border glow */}
            <motion.div
              className="absolute -inset-[2px] rounded-3xl opacity-50"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(59,130,246,0.5), rgba(34,211,238,0.5))",
                  "linear-gradient(90deg, rgba(34,211,238,0.5), rgba(59,130,246,0.5))",
                  "linear-gradient(135deg, rgba(59,130,246,0.5), rgba(34,211,238,0.5))",
                  "linear-gradient(45deg, rgba(59,130,246,0.5), rgba(34,211,238,0.5))",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ zIndex: -1 }}
            />

            <div className="relative z-10">
              {/* Card Title */}
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mb-6 text-center font-['Montserrat',sans-serif] text-2xl font-bold text-white drop-shadow-lg sm:mb-8 sm:text-3xl"
              >
                BERGABUNG DENGAN KAMI!
              </motion.h2>

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

              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 flex items-center gap-2 rounded-lg bg-green-500/20 border border-green-500/30 px-4 py-3 text-green-100"
                >
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <div className="text-sm">
                    <p>Registrasi berhasil! Silakan masuk ke akun Anda.</p>
                  </div>
                </motion.div>
              )}

              {/* Registration Form */}
              <form onSubmit={handleRegister} className="space-y-5 sm:space-y-6">
                {/* Full Name Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                  className="relative"
                >
                  <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2">
                    <User className="h-6 w-6 text-gray-700 drop-shadow-sm" strokeWidth={2.5} />
                  </div>
                  <Input
                    type="text"
                    placeholder="Nama Lengkap"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-12 border-2 border-cyan-300/50 bg-white/80 pl-12 backdrop-blur-sm transition-all duration-300 placeholder:text-gray-600 focus:border-cyan-400 focus:bg-white/90 focus:ring-2 focus:ring-cyan-300/50 sm:h-14 sm:pl-14"
                    disabled={isLoading || success}
                  />
                </motion.div>

                {/* Email Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="relative"
                >
                  <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2">
                    <Mail className="h-6 w-6 text-gray-700 drop-shadow-sm" strokeWidth={2.5} />
                  </div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 border-2 border-cyan-300/50 bg-white/80 pl-12 backdrop-blur-sm transition-all duration-300 placeholder:text-gray-600 focus:border-cyan-400 focus:bg-white/90 focus:ring-2 focus:ring-cyan-300/50 sm:h-14 sm:pl-14"
                    disabled={isLoading || success}
                  />
                </motion.div>

                {/* Username Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 }}
                  className="relative"
                >
                  <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2">
                    <User className="h-6 w-6 text-gray-700 drop-shadow-sm" strokeWidth={2.5} />
                  </div>
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12 border-2 border-cyan-300/50 bg-white/80 pl-12 backdrop-blur-sm transition-all duration-300 placeholder:text-gray-600 focus:border-cyan-400 focus:bg-white/90 focus:ring-2 focus:ring-cyan-300/50 sm:h-14 sm:pl-14"
                    disabled={isLoading || success}
                  />
                </motion.div>

                {/* Password Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                  className="relative"
                >
                  <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2">
                    <Lock className="h-6 w-6 text-gray-700 drop-shadow-sm" strokeWidth={2.5} />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password (min. 6 karakter)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 border-2 border-cyan-300/50 bg-white/80 pl-12 pr-12 backdrop-blur-sm transition-all duration-300 placeholder:text-gray-600 focus:border-cyan-400 focus:bg-white/90 focus:ring-2 focus:ring-cyan-300/50 sm:h-14 sm:pl-14"
                    disabled={isLoading || success}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-700 transition-colors hover:text-gray-900 disabled:opacity-50"
                    disabled={isLoading || success}
                  >
                    {showPassword ? (
                      <EyeOff className="h-6 w-6" strokeWidth={2.5} />
                    ) : (
                      <Eye className="h-6 w-6" strokeWidth={2.5} />
                    )}
                  </button>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="pt-2"
                >
                  <Button
                    type="submit"
                    className="h-12 w-full bg-blue-600 font-['Montserrat',sans-serif] font-bold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:scale-105 sm:h-14 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? "MEMPROSES..." : "DAFTAR"}
                  </Button>
                </motion.div>
              </form>

              {/* Login Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="mt-4 text-center"
              >
                <p className="text-cyan-100">
                  Sudah punya akun?{" "}
                  <button
                    type="button"
                    onClick={handleLoginRedirect}
                    className="text-cyan-300 hover:text-white transition-colors underline font-semibold"
                    disabled={isLoading}
                  >
                    Masuk
                  </button>
                </p>
              </motion.div>

            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-8 text-center text-sm text-white/70"
        >
          © 2025 AquaBiodiversa. All rights reserved.
        </motion.p>
      </div>
    </div>
  );
}