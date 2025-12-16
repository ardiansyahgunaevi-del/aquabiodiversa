import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./components/AuthContext";
import Login from "./components/Login";
import RegistrationPage from "./components/RegistrationPage";
import Beranda from "./components/Beranda";
import AdminBeranda from "./components/AdminBeranda";
import DetailBiota from "./components/DetailBiota";
import ProfilAkun from "./components/ProfilAkun";
import Gallery from "./components/Gallery";
import TentangKami from "./components/TentangKami";
import UploadFoto from "./components/UploadFoto";
import PencarianTidakDitemukan from "./components/PencarianTidakDitemukan";
import HasilPencarian from "./components/HasilPencarian";
import EditFotoBiota from "./components/EditFotoBiota";
import { biotaAPI } from "./services/api";
import imgRectangle15 from "figma:asset/48888d8f2adb1ccb13c4e60a34a5e0a8e99bb9b8.png";
import imgRectangle16 from "figma:asset/e7514e0a1edf118e9ce83188f04cf9d3e6a02b9f.png";
import imgRectangle17 from "figma:asset/a8cfa9809f1a6a9b5ff9cb7338f44487a42d4aba.png";
import imgRectangle18 from "figma:asset/f3ca749e9269954417e50a89a00127f7dc4cd4d9.png";
import imgRectangle19 from "figma:asset/115e61b35b73266e0a95d9fb566ec13828e34c44.png";
import imgRectangle20 from "figma:asset/42c7891104c5a627a54b753faff3d0b0a402cc41.png";

export interface FishData {
  id: number;
  name: string;
  image: string;
  location: string;
  category?: string;
  description?: string;
  photographer?: string;
  uploadDate?: string;
  uploadedBy?: string; // username of the user who uploaded (for display)
  userId?: number; // user_id from database (for filtering and permissions)
}

type PageType = "login" | "register" | "beranda" | "detail" | "profile" | "gallery" | "about" | "upload" | "searchNotFound" | "searchResults" | "editFish";

function AppContent() {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>("login");
  const [pageHistory, setPageHistory] = useState<PageType[]>(["login"]);
  const [selectedFish, setSelectedFish] = useState<FishData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FishData[]>([]);
  
  // Fish database as state - load from API
  const [fishDatabase, setFishDatabase] = useState<FishData[]>([]);
  const [isLoadingBiota, setIsLoadingBiota] = useState(true);

  // Load biota from API saat mount atau setelah login
  useEffect(() => {
    if (isAuthenticated) {
      loadBiotaFromAPI();
    }
  }, [isAuthenticated]);

  const loadBiotaFromAPI = async () => {
    try {
      setIsLoadingBiota(true);
      const biota = await biotaAPI.getAll();
      
      // Convert API response ke format FishData
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const formattedBiota: FishData[] = biota.map((b: any) => ({
        id: b.id,
        name: b.name,
        image: b.image?.startsWith('http') ? b.image : `${API_BASE_URL}${b.image}`,
        location: b.location,
        category: b.category || 'Ikan Air Tawar',
        description: b.description || '',
        photographer: b.photographer,
        uploadDate: b.created_at || b.uploadDate,
        uploadedBy: b.user_id?.toString(), // Store user_id as string for compatibility
        userId: b.user_id // Store user_id as number for filtering
      }));
      
      setFishDatabase(formattedBiota);
      console.log('✅ Biota loaded from API:', formattedBiota.length, 'items');
    } catch (error) {
      console.error('❌ Error loading biota from API:', error);
      // Fallback ke data lokal jika API error
      setFishDatabase([
      {
        id: 1,
        name: "Ikan Gurami Coklat",
        image: imgRectangle15,
        location: "Jawa Barat",
        category: "Ikan Air Tawar",
        description: "Ikan gurami adalah ikan air tawar yang populer di Indonesia dengan warna coklat keemasan"
        }
      ]);
    } finally {
      setIsLoadingBiota(false);
    }
  };

  // Check authentication on mount and when auth state changes
  useEffect(() => {
    if (isAuthenticated && currentPage === "login") {
      navigateToPage("beranda");
    } else if (!isAuthenticated && currentPage !== "login" && currentPage !== "register") {
      // Redirect to login if trying to access protected page
      setPageHistory(["login"]);
      setCurrentPage("login");
    }
  }, [isAuthenticated]);

  const navigateToPage = (page: PageType) => {
    // Prevent navigation to protected pages if not authenticated
    if (!isAuthenticated && page !== "login" && page !== "register") {
      console.log("🔒 Access denied - Please login first");
      setPageHistory(["login"]);
      setCurrentPage("login");
      return;
    }

    setPageHistory([...pageHistory, page]);
    setCurrentPage(page);
  };

  const goBack = () => {
    if (pageHistory.length > 1) {
      const newHistory = [...pageHistory];
      newHistory.pop(); // Remove current page
      const previousPage = newHistory[newHistory.length - 1];
      setPageHistory(newHistory);
      setCurrentPage(previousPage);
    } else {
      // Fallback to beranda if logged in, login if not
      navigateToPage(isAuthenticated ? "beranda" : "login");
    }
  };

  const handleSelectFish = (fish: FishData) => {
    setSelectedFish(fish);
    navigateToPage("detail");
  };

  const handleSearch = (query: string) => {
    console.log("🔍 handleSearch called with query:", query);
    
    if (!query || !query.trim()) {
      console.log("⚠️ Search query is empty, returning");
      return;
    }

    const trimmedQuery = query.trim();
    console.log("🔍 Searching for (trimmed):", trimmedQuery);
    console.log("📊 Database size:", fishDatabase.length);
    
    // Set search query first
    setSearchQuery(trimmedQuery);
    
    // If database is empty, go to searchNotFound
    if (fishDatabase.length === 0) {
      console.log("⚠️ Database is empty, navigating to searchNotFound");
      setSearchResults([]);
      setCurrentPage("searchNotFound");
      setPageHistory(prev => [...prev, "searchNotFound"]);
      return;
    }
    
    // Search in database by name, category, location, or description
    const results = fishDatabase.filter(fish => {
      const queryLower = trimmedQuery.toLowerCase();
      const nameMatch = fish.name.toLowerCase().includes(queryLower);
      const categoryMatch = fish.category && fish.category.toLowerCase().includes(queryLower);
      const locationMatch = fish.location && fish.location.toLowerCase().includes(queryLower);
      const descMatch = fish.description && fish.description.toLowerCase().includes(queryLower);
      
      return nameMatch || categoryMatch || locationMatch || descMatch;
    });

    console.log("📋 Search results count:", results.length);
    if (results.length > 0) {
      console.log("📋 Found results:", results.map(r => r.name));
    }

    // Always navigate - either to results or not found
    if (results.length > 0) {
      console.log("✅ Results found, navigating to searchResults");
      setSearchResults(results);
      setCurrentPage("searchResults");
      setPageHistory(prev => [...prev, "searchResults"]);
    } else {
      console.log("❌ No results found, navigating to searchNotFound");
      setSearchResults([]);
      setCurrentPage("searchNotFound");
      setPageHistory(prev => [...prev, "searchNotFound"]);
    }
  };

  const handleNavigate = (page: string, data?: any) => {
    console.log(`🧭 Navigating to: ${page}`, data);
    
    if (page === "detail" && data?.fish) {
      setSelectedFish(data.fish);
      navigateToPage("detail");
    } else if (page === "profile") {
      navigateToPage("profile");
    } else if (page === "gallery") {
      navigateToPage("gallery");
    } else if (page === "about") {
      navigateToPage("about");
    } else if (page === "upload") {
      navigateToPage("upload");
    } else if (page === "beranda") {
      navigateToPage("beranda");
    } else if (page === "searchNotFound") {
      navigateToPage("searchNotFound");
    } else if (page === "searchResults") {
      navigateToPage("searchResults");
    } else if (page === "editFish" && data?.fish) {
      setSelectedFish(data.fish);
      navigateToPage("editFish");
    }
  };

  const handleLogout = () => {
    console.log("🚪 Logout triggered - Redirecting to Login Page");
    logout();
    setPageHistory(["login"]);
    setCurrentPage("login");
    setSelectedFish(null);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleUploadFish = async (newFish: Omit<FishData, 'id'> & { imageFile?: File }) => {
    try {
      console.log('📤 Uploading new fish to API:', newFish);
      
      // Validasi required fields
      if (!newFish.name || !newFish.location) {
        alert('Nama dan lokasi harus diisi!');
        return;
      }

      if (!newFish.imageFile && !newFish.image) {
        alert('Foto harus diupload!');
        return;
      }
      
      // Jika ada imageFile, pakai FormData untuk upload file
      if (newFish.imageFile) {
        const formData = new FormData();
        formData.append('name', newFish.name);
        formData.append('location', newFish.location);
        formData.append('category', newFish.category || 'Ikan Air Tawar');
        formData.append('description', newFish.description || '');
        formData.append('image', newFish.imageFile);

        console.log('📤 Sending FormData to API:', {
          name: newFish.name,
          location: newFish.location,
          category: newFish.category,
          hasImage: !!newFish.imageFile
        });

        const result = await biotaAPI.create(formData);
        
        if (result.biota) {
          console.log('✅ Upload berhasil:', result.biota);
          // Reload biota dari API
          await loadBiotaFromAPI();
          navigateToPage("beranda");
        } else {
          throw new Error('Response tidak valid dari server');
        }
      } else if (newFish.image) {
        // Fallback: jika image adalah base64 string (untuk kompatibilitas)
        const formData = new FormData();
        formData.append('name', newFish.name);
        formData.append('location', newFish.location);
        formData.append('category', newFish.category || 'Ikan Air Tawar');
        formData.append('description', newFish.description || '');
        formData.append('image', newFish.image); // Backend akan handle base64

        const result = await biotaAPI.create(formData);
        
        if (result.biota) {
          await loadBiotaFromAPI();
    navigateToPage("beranda");
        } else {
          throw new Error('Response tidak valid dari server');
        }
      }
    } catch (error: any) {
      console.error('❌ Error uploading fish:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      const errorMessage = error.message || 'Terjadi kesalahan saat mengupload foto';
      
      // Tampilkan error dengan lebih detail
      alert(`Gagal mengupload foto!\n\nError: ${errorMessage}\n\nPastikan:\n1. Backend sudah running (npm run dev di folder backend)\n2. File .env sudah dibuat di root project\n3. Sudah login\n4. Cek console (F12) untuk detail error`);
    }
  };

  const handleSaveFish = async (updatedFish: FishData & { imageFile?: File }) => {
    try {
      console.log("💾 Updating fish via API:", updatedFish);
      
      const formData = new FormData();
      formData.append('name', updatedFish.name);
      formData.append('location', updatedFish.location);
      formData.append('category', updatedFish.category || 'Ikan Air Tawar');
      formData.append('description', updatedFish.description || '');
      
      if (updatedFish.imageFile) {
        formData.append('image', updatedFish.imageFile);
      } else if (updatedFish.image) {
        formData.append('image', updatedFish.image);
      }

      const result = await biotaAPI.update(updatedFish.id, formData);
      
      if (result.biota) {
        // Reload biota dari API
        await loadBiotaFromAPI();
    setSelectedFish(updatedFish);
    
    // If admin, go back to admin beranda. Otherwise go back to previous page
    if (isAdmin) {
      navigateToPage("beranda");
    } else {
      goBack();
    }
      }
    } catch (error: any) {
      console.error('❌ Error updating fish:', error);
      alert('Gagal mengupdate foto: ' + (error.message || 'Terjadi kesalahan'));
    }
  };

  const handleDeleteFish = async (fishId: number) => {
    try {
      console.log("🗑️ Deleting fish via API with ID:", fishId);
      
      await biotaAPI.delete(fishId);
      
      // Reload biota dari API
      await loadBiotaFromAPI();
      
    // If on detail page, go back. If on admin/profile, stay on same page
    if (currentPage === "detail") {
      goBack();
    }
    } catch (error: any) {
      console.error('❌ Error deleting fish:', error);
      alert('Gagal menghapus foto: ' + (error.message || 'Terjadi kesalahan'));
    }
  };

  // Protected pages rendering
  if (!isAuthenticated) {
    if (currentPage === "register") {
      return (
        <RegistrationPage 
          onLogin={() => navigateToPage("login")}
          onRegisterSuccess={() => navigateToPage("login")}
        />
      );
    }

    return (
      <Login 
        onRegister={() => navigateToPage("register")}
        onLoginSuccess={() => navigateToPage("beranda")}
      />
    );
  }

  // Render pages based on current page (authenticated users only)
  if (currentPage === "editFish" && selectedFish) {
    return (
      <EditFotoBiota 
        fish={selectedFish}
        onBack={goBack}
        onBackHome={() => navigateToPage("beranda")}
        onSave={handleSaveFish}
        onNavigateToAbout={() => navigateToPage("about")}
      />
    );
  }

  if (currentPage === "searchResults") {
    return (
      <HasilPencarian 
        searchQuery={searchQuery}
        searchResults={searchResults}
        onBack={goBack}
        onBackHome={() => navigateToPage("beranda")}
        onSelectFish={handleSelectFish}
        onNavigateToAbout={() => navigateToPage("about")}
      />
    );
  }

  if (currentPage === "searchNotFound") {
    return (
      <PencarianTidakDitemukan 
        searchQuery={searchQuery}
        fishDatabase={fishDatabase}
        onBack={goBack}
        onBackHome={() => navigateToPage("beranda")}
        onSelectFish={handleSelectFish}
        onNavigateToAbout={() => navigateToPage("about")}
      />
    );
  }

  if (currentPage === "detail" && selectedFish) {
    return (
      <DetailBiota 
        fish={selectedFish} 
        onBack={goBack}
        onBackHome={() => navigateToPage("beranda")}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        onNavigateToAbout={() => navigateToPage("about")}
      />
    );
  }

  if (currentPage === "profile") {
    return (
      <ProfilAkun 
        fishDatabase={fishDatabase}
        onBack={goBack}
        onBackHome={() => navigateToPage("beranda")}
        onNavigate={handleNavigate}
        onEditFish={(fish) => handleNavigate("editFish", { fish })}
        onDeleteFish={handleDeleteFish}
        onNavigateToAbout={() => navigateToPage("about")}
      />
    );
  }

  if (currentPage === "gallery") {
    return (
      <Gallery 
        fishDatabase={fishDatabase}
        onBack={goBack}
        onBackHome={() => navigateToPage("beranda")}
        onNavigate={handleNavigate}
        onSelectFish={handleSelectFish}
        onSearch={handleSearch}
        onNavigateToAbout={() => navigateToPage("about")}
      />
    );
  }

  if (currentPage === "about") {
    return (
      <TentangKami 
        onBack={goBack}
        onBackHome={() => navigateToPage("beranda")}
        onNavigate={handleNavigate}
        onNavigateToAbout={() => navigateToPage("about")}
      />
    );
  }

  if (currentPage === "upload") {
    return (
      <UploadFoto 
        onBack={goBack}
        onBackHome={() => navigateToPage("beranda")}
        onUpload={handleUploadFish}
        onNavigateToAbout={() => navigateToPage("about")}
      />
    );
  }

  // Default: Beranda (Admin or Regular User)
  if (isAdmin) {
    return (
      <AdminBeranda 
        fishDatabase={fishDatabase}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        onEditFish={(fish) => handleNavigate("editFish", { fish })}
        onDeleteFish={handleDeleteFish}
        onNavigateToAbout={() => navigateToPage("about")}
      />
    );
  }

  return (
    <Beranda 
      fishDatabase={fishDatabase}
      onSelectFish={handleSelectFish} 
      onNavigate={handleNavigate}
      onLogout={handleLogout}
      onSearch={handleSearch}
      onNavigateToAbout={() => navigateToPage("about")}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}