'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "@/service/api";

interface User {
  id: number;
  nome: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Busca os dados do usuário ao carregar a aplicação
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       // Exemplo: Supondo que o token já está salvo em cookies
  //       const response = await api.get("/api/auth/me");
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error("Erro ao carregar usuário:", error);
  //       setUser(null);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  const logout = () => {
    // Exemplo: Limpar token e redirecionar para login
    document.cookie = "authToken=; path=/; max-age=0"; // Remove o cookie
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
