// src/contexts/authContext/index.jsx
import { createContext, useContext, useState, useEffect } from "react";
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
      // ✅ Only update if user changed
      setUser((prevUser) => {
        if (prevUser?.uid === authUser?.uid) return prevUser;
        return authUser;
      });

      if (authUser) {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
          setUserData(JSON.parse(storedData));
        } else {
          try {
            const data = await login(authUser.uid);
            localStorage.setItem("userData", JSON.stringify(data));
            setUserData(data);
          } catch (error) {
            console.error("Failed to fetch user data:", error);
          }
        }
      } else {
        setUserData(null);
        localStorage.removeItem("userData");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    userData,
    loading,
    setUser,
    setUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
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
