import { motion } from "motion/react";
import { useAuth } from "./AuthContext";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { 
  Home,
  User, 
  LogOut,
  Edit2,
  Trash2,
  Shield,
  Image as ImageIcon,
  MapPin
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import imgUnderwaterCave from "figma:asset/ef02c2ea3f4acc92d18b009c0eaf594dd003a9a7.png";

interface AdminBerandaProps {
  fishDatabase: any[];
  onLogout: () => void;
  onNavigate: (page: string) => void;
  onEditFish?: (fish: any) => void;
  onDeleteFish?: (fishId: number) => void;
  onNavigateToAbout?: () => void;
}

export default function AdminBeranda({ 
  fishDatabase, 
  onLogout, 
  onNavigate, 
  onEditFish, 
  onDeleteFish,
  onNavigateToAbout 
}: AdminBerandaProps) {
  const { user } = useAuth();

  const handleEditFish = (fish: any) => {
    if (onEditFish) {
      onEditFish(fish);
    }
  };

  const handleDeleteFish = (fishId: number) => {
    if (onDeleteFish && window.confirm('Apakah Anda yakin ingin menghapus foto biota ini?')) {
      onDeleteFish(fishId);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-cyan-900">
      {/* Background Image with Overlay - Full Screen */}
      <div className="fixed inset-0 w-screen h-screen">
        <img
          alt="Underwater cave with blue light - HD background"
          className="w-full h-full object-cover object-center"
          src={imgUnderwaterCave}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-blue-800/40 to-cyan-900/60" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1440),
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
            }}
            animate={{
              y: -50,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1440),
            }}
            transition={{
              duration: Math.random() * 8 + 12,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Admin Navbar */}
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-4 mt-4 md:mx-8 md:mt-6 lg:mx-12 lg:mt-8"
        >
          <div className="relative rounded-2xl border-2 border-white/30 bg-white/20 px-4 py-3 shadow-2xl backdrop-blur-xl md:px-6 md:py-4">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-500/10 rounded-2xl" />
            
            <div className="relative flex items-center justify-between">
              {/* Left: Admin Badge */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 shadow-lg">
                  <Shield className="h-5 w-5 text-white" />
                  <span className="hidden sm:inline font-['Montserrat',sans-serif] font-bold text-white">
                    ADMIN PANEL
                  </span>
                </div>
              </div>

              {/* Center: Admin Info */}
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-600 shadow-lg md:h-12 md:w-12">
                  <User className="h-5 w-5 text-white md:h-6 md:w-6" />
                </div>
                <div className="hidden sm:block">
                  <p className="font-['Montserrat',sans-serif] text-white drop-shadow-md">
                    <span className="font-semibold">{user?.username}</span>
                  </p>
                  <p className="font-['Montserrat',sans-serif] text-xs text-orange-200">
                    Administrator
                  </p>
                </div>
              </div>

              {/* Right: Logo & Brand */}
              <button
                onClick={() => {
                  console.log("🐠 Logo clicked - Navigating to Tentang Kami");
                  if (onNavigateToAbout) {
                    onNavigateToAbout();
                  } else {
                    onNavigate("about");
                  }
                }}
                className="flex items-center gap-2 md:gap-3 transition-all hover:scale-105 cursor-pointer group"
              >
                <Logo className="h-8 w-8 drop-shadow-lg md:h-10 md:w-10 transition-transform group-hover:rotate-12" />
                <h1 className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text font-['Montserrat',sans-serif] font-extrabold text-transparent drop-shadow-lg text-xl group-hover:from-cyan-200 group-hover:to-blue-300 transition-all md:text-2xl lg:text-3xl">
                  AQUABIODIVERSA
                </h1>
              </button>
            </div>
          </div>
        </motion.nav>

        {/* Admin Content */}
        <div className="mx-4 mt-8 pb-16 md:mx-8 lg:mx-12">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 text-center"
          >
            <div className="mb-2 flex items-center justify-center gap-3">
              <Shield className="h-10 w-10 text-orange-400" />
              <h2 className="font-['Montserrat',sans-serif] font-bold text-white text-3xl md:text-4xl drop-shadow-lg">
                KELOLA SEMUA FOTO BIOTA
              </h2>
            </div>
            <p className="font-['Montserrat',sans-serif] text-cyan-200">
              Anda dapat mengedit atau menghapus foto biota yang tidak sesuai
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <ImageIcon className="h-5 w-5 text-cyan-300" />
              <p className="font-['Montserrat',sans-serif] font-semibold text-cyan-100">
                Total Foto: {fishDatabase.length}
              </p>
            </div>
          </motion.div>

          {/* Logout Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 flex justify-center"
          >
            <Button
              onClick={onLogout}
              className="bg-gradient-to-r from-red-600 to-orange-600 font-['Montserrat',sans-serif] font-bold text-white shadow-lg transition-all hover:from-red-700 hover:to-orange-700 hover:scale-105"
            >
              <LogOut className="mr-2 h-5 w-5" />
              LOGOUT
            </Button>
          </motion.div>

          {/* Photos Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {fishDatabase.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.05 }}
                className="group overflow-hidden rounded-2xl border-2 border-cyan-400/30 bg-gradient-to-br from-white/20 via-cyan-500/10 to-blue-500/10 shadow-2xl backdrop-blur-xl transition-all hover:border-cyan-400/70 hover:shadow-cyan-500/40 hover:bg-gradient-to-br hover:from-white/25 hover:via-cyan-500/15 hover:to-blue-500/15"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-cyan-100 to-blue-100">
                  <ImageWithFallback
                    src={photo.image}
                    alt={photo.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/50 via-cyan-800/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-600/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  {/* Category Badge */}
                  {photo.category && (
                    <div className="absolute top-3 right-3">
                      <div className="rounded-lg bg-gradient-to-r from-cyan-600/90 to-blue-600/90 px-3 py-1.5 backdrop-blur-sm border border-cyan-300/50 shadow-md">
                        <span className="font-['Montserrat',sans-serif] text-xs font-semibold text-white">
                          {photo.category}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 bg-gradient-to-b from-transparent to-cyan-500/5">
                  <h3 className="font-['Montserrat',sans-serif] font-bold text-white drop-shadow-lg mb-2 text-base">
                    {photo.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-3.5 w-3.5 text-cyan-300" />
                    <p className="text-sm text-cyan-200 drop-shadow-md font-medium">{photo.location}</p>
                  </div>
                  
                  {/* Uploaded By Badge */}
                  {photo.uploadedBy && (
                    <div className="mb-3">
                      <span className="inline-block text-xs text-cyan-100 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 backdrop-blur-sm border border-cyan-300/30 px-3 py-1.5 rounded-lg font-medium shadow-sm">
                        📤 {photo.uploadedBy}
                      </span>
                    </div>
                  )}

                  {/* Admin Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30 transition-all hover:from-cyan-700 hover:via-cyan-600 hover:to-blue-700 hover:shadow-lg hover:shadow-cyan-500/40"
                      onClick={() => handleEditFish(photo)}
                    >
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1 shadow-md transition-all hover:shadow-lg"
                      onClick={() => handleDeleteFish(photo.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Hapus
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {fishDatabase.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center py-16"
            >
              <ImageIcon className="h-20 w-20 text-cyan-300/50 mx-auto mb-4" />
              <p className="font-['Montserrat',sans-serif] text-xl text-white drop-shadow-lg">
                Belum ada foto biota yang diunggah
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}