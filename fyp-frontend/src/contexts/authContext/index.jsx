// src/contexts/authContext/index.jsx
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { login } from "../../service/AuthService";

// Create context
const AuthContext = createContext();

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      // Skip update if user hasn't changed
      if (user?.uid === authUser?.uid) {
        setLoading(false);
        return;
      }

      if (authUser) {
        try {
          // Always try to get fresh data from API first
          const data = await login(authUser.uid);
          localStorage.setItem("userData", JSON.stringify(data));
          setUser(authUser);
          setUserData(data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          // Fallback to localStorage if API fails
          const storedData = localStorage.getItem("userData");
          if (storedData) {
            setUserData(JSON.parse(storedData));
          }
          setUser(authUser);
        }
      } else {
        // User signed out
        setUser(null);
        setUserData(null);
        localStorage.removeItem("userData");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.uid]); // Only re-run if user.uid changes

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    user,
    userData,
    loading,
    setUser,
    setUserData,
  }), [user, userData, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}