// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Helper untuk mendapatkan token dari localStorage
const getToken = (): string | null => {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    const user = JSON.parse(currentUser);
    return user.token || null;
  }
  return null;
};

// Helper untuk membuat request dengan auth header
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Log untuk debugging
  const fullUrl = `${API_BASE_URL}${endpoint}`;
  console.log('🌐 API Request:', fullUrl);
  console.log('🔑 API Base URL:', API_BASE_URL);
  console.log('📍 Endpoint:', endpoint);

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Terjadi kesalahan' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// ==================== AUTH API ====================

export const authAPI = {
  // Register user baru
  register: async (username: string, email: string, password: string, fullName: string) => {
    const data = await apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, fullName }),
    });
    
    // Simpan token dan user data
    if (data.token && data.user) {
      localStorage.setItem('currentUser', JSON.stringify({
        ...data.user,
        token: data.token
      }));
    }
    
    return data;
  },

  // Login user
  login: async (username: string, password: string) => {
    const data = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    
    // Simpan token dan user data
    if (data.token && data.user) {
      localStorage.setItem('currentUser', JSON.stringify({
        ...data.user,
        token: data.token
      }));
    }
    
    return data;
  },

  // Get current user
  getMe: async () => {
    return apiRequest('/api/auth/me');
  },

  // Logout (clear localStorage)
  logout: () => {
    localStorage.removeItem('currentUser');
  },
};

// ==================== BIOTA API ====================

export const biotaAPI = {
  // Get semua biota (dengan filter opsional)
  getAll: async (search?: string, category?: string, location?: string) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    if (location) params.append('location', location);
    
    const queryString = params.toString();
    const endpoint = `/api/biota${queryString ? `?${queryString}` : ''}`;
    
    return apiRequest(endpoint);
  },

  // Get biota by ID
  getById: async (id: number) => {
    return apiRequest(`/api/biota/${id}`);
  },

  // Create biota baru (dengan upload file)
  create: async (formData: FormData) => {
    const token = getToken();
    if (!token) {
      throw new Error('Anda harus login terlebih dahulu');
    }

    console.log('📤 Uploading to:', `${API_BASE_URL}/api/biota`);
    console.log('🔑 Token:', token ? 'Ada' : 'Tidak ada');
    
    // Log FormData contents (untuk debugging)
    const formDataEntries: any = {};
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        formDataEntries[key] = `File: ${value.name} (${value.size} bytes)`;
      } else {
        formDataEntries[key] = value;
      }
    }
    console.log('📋 FormData:', formDataEntries);

    try {
      const response = await fetch(`${API_BASE_URL}/api/biota`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Jangan set Content-Type, biarkan browser set dengan boundary untuk FormData
        },
        body: formData,
      });

      console.log('📡 Response status:', response.status, response.statusText);

      if (!response.ok) {
        let errorMessage = 'Terjadi kesalahan saat mengupload foto';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
          console.error('❌ API Error:', errorData);
        } catch {
          // Jika response bukan JSON
          const text = await response.text();
          errorMessage = `HTTP error! status: ${response.status} - ${text}`;
          console.error('❌ Response text:', text);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('✅ Upload success:', result);
      return result;
    } catch (error: any) {
      console.error('❌ Upload error:', error);
      // Handle network errors
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.name === 'TypeError') {
        throw new Error('Tidak dapat terhubung ke server. Pastikan backend sudah running di http://localhost:3001');
      }
      throw error;
    }
  },

  // Update biota (dengan upload file opsional)
  update: async (id: number, formData: FormData) => {
    const token = getToken();
    if (!token) {
      throw new Error('Anda harus login terlebih dahulu');
    }

    const response = await fetch(`${API_BASE_URL}/api/biota/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Terjadi kesalahan' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  // Delete biota
  delete: async (id: number) => {
    return apiRequest(`/api/biota/${id}`, {
      method: 'DELETE',
    });
  },
};

export default {
  auth: authAPI,
  biota: biotaAPI,
};

