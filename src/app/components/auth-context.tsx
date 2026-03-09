import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const SUPABASE_URL = `https://${projectId}.supabase.co`;
const API_BASE = `${SUPABASE_URL}/functions/v1/make-server-6cea9865`;

let supabaseInstance: SupabaseClient | null = null;
function getSupabase() {
  if (!supabaseInstance) {
    supabaseInstance = createClient(SUPABASE_URL, publicAnonKey);
  }
  return supabaseInstance;
}

export interface UserProfile {
  email: string;
  name: string;
  businessName: string;
  reviewLink: string;
  plan: string;
  createdAt: string;
  trialStartDate: string;
  setupComplete: boolean;
}

interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  userId: string | null;
  accessToken: string | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error?: string }>;
  apiCall: (path: string, options?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const apiCall = useCallback(
    async (path: string, options: RequestInit = {}) => {
      const token = accessToken || publicAnonKey;
      return fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(options.headers || {}),
        },
      });
    },
    [accessToken]
  );

  const fetchProfile = useCallback(async (token: string) => {
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data.profile);
        setUserId(data.userId);
      }
    } catch (err) {
      console.log("Error fetching profile:", err);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (accessToken) {
      await fetchProfile(accessToken);
    }
  }, [accessToken, fetchProfile]);

  useEffect(() => {
    const supabase = getSupabase();

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        setAccessToken(session.access_token);
        fetchProfile(session.access_token);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        setAccessToken(session.access_token);
        fetchProfile(session.access_token);
      } else {
        setUser(null);
        setProfile(null);
        setUserId(null);
        setAccessToken(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) return { error: data.error || "Signup failed" };

      // Sign in immediately after signup
      const supabase = getSupabase();
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({ email, password });
      if (signInError) return { error: signInError.message };

      return {};
    } catch (err: any) {
      return { error: err.message || "Signup failed" };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return { error: error.message };
      return {};
    } catch (err: any) {
      return { error: err.message || "Sign in failed" };
    }
  };

  const signOut = async () => {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setUserId(null);
    setAccessToken(null);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const res = await apiCall("/profile", {
        method: "PUT",
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (!res.ok) return { error: data.error || "Update failed" };
      setProfile(data.profile);
      return {};
    } catch (err: any) {
      return { error: err.message || "Update failed" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        userId,
        accessToken,
        loading,
        signUp,
        signIn,
        signOut,
        refreshProfile,
        updateProfile,
        apiCall,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
