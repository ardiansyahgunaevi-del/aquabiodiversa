import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../services/api';

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  isAdmin?: boolean;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string, fullName: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load user session on mount dari localStorage (jika ada token)
  useEffect(() => {
    const loadUserSession = async () => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        try {
      const parsedUser = JSON.parse(storedUser);
          
          // Jika ada token, verifikasi dengan API
          if (parsedUser.token) {
            try {
              const userData = await authAPI.getMe();
              setUser({
                id: userData.id.toString(),
                username: userData.username,
                email: userData.email,
                fullName: userData.fullName,
                isAdmin: userData.isAdmin || false,
                token: parsedUser.token
              });
              setIsAuthenticated(true);
              setIsAdmin(userData.isAdmin || false);
              console.log('👤 Session loaded from API:', { username: userData.username, isAdmin: userData.isAdmin });
            } catch (error) {
              // Token tidak valid, clear session
              console.log('❌ Token tidak valid, clearing session');
              localStorage.removeItem('currentUser');
            }
          } else {
            // Fallback ke localStorage jika tidak ada token (untuk kompatibilitas)
      setUser(parsedUser);
      setIsAuthenticated(true);
      setIsAdmin(parsedUser.isAdmin || false);
            console.log('👤 Session loaded from localStorage:', { username: parsedUser.username, isAdmin: parsedUser.isAdmin });
    }
        } catch (error) {
          console.error('Error loading session:', error);
          localStorage.removeItem('currentUser');
        }
      }
    };

    loadUserSession();
  }, []);
  
  const login = async (username: string, password: string) => {
    console.log('🔐 Login attempt:', { username });
    
    try {
      const data = await authAPI.login(username, password);
    
      if (data.user && data.token) {
        const userData: User = {
          id: data.user.id.toString(),
          username: data.user.username,
          email: data.user.email,
          fullName: data.user.fullName,
          isAdmin: data.user.isAdmin || false,
          token: data.token
        };

        setUser(userData);
        setIsAuthenticated(true);
        setIsAdmin(userData.isAdmin || false);
        
        console.log('✅ Login successful:', { username: userData.username, isAdmin: userData.isAdmin });
        return true;
      }
    
      return false;
    } catch (error: any) {
      console.error('❌ Login failed:', error.message);
    return false;
    }
  };

  const register = async (username: string, email: string, password: string, fullName: string) => {
    try {
      const data = await authAPI.register(username, email, password, fullName);
      
      if (data.user && data.token) {
        const userData: User = {
          id: data.user.id.toString(),
          username: data.user.username,
          email: data.user.email,
          fullName: data.user.fullName,
          isAdmin: data.user.isAdmin || false,
          token: data.token
        };

        setUser(userData);
        setIsAuthenticated(true);
        setIsAdmin(userData.isAdmin || false);
        
        console.log('✅ Registration successful:', { username: userData.username });
        return true;
      }
      
      return false;
    } catch (error: any) {
      console.error('❌ Registration failed:', error.message);
      return false;
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};