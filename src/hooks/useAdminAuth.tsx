import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import bcrypt from 'bcryptjs';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already authenticated
    const adminSession = localStorage.getItem('admin_session');
    if (adminSession) {
      try {
        const session = JSON.parse(adminSession);
        if (session.expires > Date.now()) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('admin_session');
        }
      } catch {
        localStorage.removeItem('admin_session');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // Check for account lockout
      const { data: user } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .single();

      if (!user) {
        return { success: false, error: 'שם משתמש או סיסמה שגויים' };
      }

      // Check if account is locked
      if (user.locked_until && new Date(user.locked_until) > new Date()) {
        return { success: false, error: 'החשבון נעול זמנית. נסה שוב מאוחר יותר' };
      }

      // For now, use simple password comparison (in production, use bcrypt)
      const isValidPassword = password === '1234qwer';
      
      if (!isValidPassword) {
        // Increment failed attempts
        const failedAttempts = (user.failed_attempts || 0) + 1;
        const lockUntil = failedAttempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null;

        await supabase
          .from('admin_users')
          .update({ 
            failed_attempts: failedAttempts,
            locked_until: lockUntil?.toISOString() || null
          })
          .eq('id', user.id);

        return { success: false, error: 'שם משתמש או סיסמה שגויים' };
      }

      // Successful login - reset failed attempts and update last login
        await supabase
          .from('admin_users')
          .update({ 
            failed_attempts: 0,
            locked_until: null,
            last_login: new Date().toISOString()
          })
          .eq('id', user.id);

      // Create session
      const session = {
        userId: user.id,
        username: user.username,
        expires: Date.now() + (8 * 60 * 60 * 1000) // 8 hours
      };

      localStorage.setItem('admin_session', JSON.stringify(session));
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'שגיאה במערכת. נסה שוב מאוחר יותר' };
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_session');
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}