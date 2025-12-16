import { motion } from "motion/react";
import { Search, ArrowLeft, Home, MapPin, Tag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import img4F43Fbdf03F44Bd3Ff8B4317Fae8E64D1 from "figma:asset/ef02c2ea3f4acc92d18b009c0eaf594dd003a9a7.png";

interface FishData {
  id: number;
  name: string;
  image: string;
  location: string;
  category?: string;
  description?: string;
}

interface HasilPencarianProps {
  searchQuery: string;
  searchResults: FishData[];
  onBack: () => void;
  onBackHome: () => void;
  onSelectFish: (fish: FishData) => void;
  onNavigateToAbout: () => void;
}

export default function HasilPencarian({ 
  searchQuery, 
  searchResults,
  onBack, 
  onBackHome,
  onSelectFish,
  onNavigateToAbout
}: HasilPencarianProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-cyan-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          alt="Underwater cave with blue light - HD background"
          className="h-full w-full object-cover object-center"
          src={img4F43Fbdf03F44Bd3Ff8B4317Fae8E64D1}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-blue-800/40 to-cyan-900/60" />
      </div>

      {/* Floating particles - SAMA DENGAN BERANDA */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-white/30"
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

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Glassmorphism Navbar */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/10 shadow-2xl backdrop-blur-xl"
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              {/* Left: Back Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onBack}
                  className="flex items-center justify-center rounded-lg bg-white/20 p-2 text-white transition-all hover:scale-110 hover:bg-white/30"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={onBackHome}
                  className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-white transition-all hover:scale-110 hover:bg-white/30"
                >
                  <Home className="h-5 w-5" />
                  <span className="hidden font-['Montserrat',sans-serif] font-semibold sm:inline">
                    Beranda
                  </span>
                </button>
              </div>

              {/* Right: Brand */}
              <h1 
                onClick={onNavigateToAbout}
                className="cursor-pointer bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text font-['Montserrat',sans-serif] font-extrabold text-transparent text-xl md:text-2xl lg:text-3xl transition-all hover:scale-105">
                AQUABIODIVERSA
              </h1>
            </div>
          </div>
        </motion.div>

        {/* Search Bar Display */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 overflow-hidden rounded-2xl border-2 border-white/30 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-lg">
                <Search className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-['Montserrat',sans-serif] text-cyan-200 text-sm">
                  Hasil pencarian untuk:
                </p>
                <p className="font-['Montserrat',sans-serif] font-bold text-white text-xl drop-shadow-lg">
                  "{searchQuery}"
                </p>
              </div>
              <div className="rounded-full bg-gradient-to-r from-cyan-500/40 to-blue-500/40 backdrop-blur-sm border border-cyan-300/30 px-4 py-2 shadow-md">
                <p className="font-['Montserrat',sans-serif] font-semibold text-white">
                  ✓ {searchResults.length} Hasil Ditemukan
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border-2 border-white/30 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
        >
          <h3 className="mb-6 font-['Montserrat',sans-serif] font-bold text-cyan-300 text-2xl md:text-3xl">
            🐠 Biota Yang Ditemukan
          </h3>

          {/* Results Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((fish, index) => (
              <motion.button
                key={fish.id}
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.3 + index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => onSelectFish(fish)}
                className="group overflow-hidden rounded-2xl border-2 border-cyan-400/30 bg-gradient-to-br from-white/20 via-cyan-500/10 to-blue-500/10 shadow-xl backdrop-blur-md transition-all hover:border-cyan-400/70 hover:shadow-2xl hover:shadow-cyan-500/30 hover:bg-gradient-to-br hover:from-white/25 hover:via-cyan-500/15 hover:to-blue-500/15"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-cyan-100 to-blue-100">
                  <ImageWithFallback
                    src={fish.image}
                    alt={fish.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/50 via-cyan-800/20 to-transparent" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-cyan-500/0 transition-all duration-300 group-hover:bg-cyan-500/30">
                    <div className="scale-0 rounded-full bg-white/95 p-3 shadow-lg shadow-cyan-500/50 transition-transform duration-300 group-hover:scale-100 border-2 border-cyan-400/50">
                      <Search className="h-6 w-6 text-cyan-600" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 text-left bg-gradient-to-b from-transparent to-cyan-500/5">
                  <h4 className="mb-2 font-['Montserrat',sans-serif] font-bold text-white line-clamp-1 text-base drop-shadow-lg">
                    {fish.name}
                  </h4>
                  
                  <div className="mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-cyan-300 flex-shrink-0" />
                    <p className="font-['Montserrat',sans-serif] text-cyan-200 text-sm line-clamp-1 font-medium">
                      {fish.location}
                    </p>
                  </div>

                  {fish.category && (
                    <div className="mb-2 flex items-center gap-2">
                      <Tag className="h-4 w-4 text-cyan-300 flex-shrink-0" />
                      <div className="inline-block rounded-full bg-gradient-to-r from-cyan-500/40 to-blue-500/40 backdrop-blur-sm border border-cyan-300/30 px-3 py-1">
                        <p className="font-['Montserrat',sans-serif] text-white text-xs font-medium">
                          {fish.category}
                        </p>
                      </div>
                    </div>
                  )}

                  {fish.description && (
                    <p className="mt-2 font-['Montserrat',sans-serif] text-cyan-100 text-xs line-clamp-2 leading-relaxed">
                      {fish.description}
                    </p>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}