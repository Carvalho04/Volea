'use client';
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import api from "@/service/api"; // Caso precise interagir com a API

interface User {
  id: number;
  nome: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
  login: (userData: User) => void; // Função para login
  setUser: (userData: User) => void; // Função para atualizar o usuário
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função de login que atualiza o usuário e armazena no localStorage
  const login = useCallback((userData: User) => {
    setUserState(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Armazena o usuário no localStorage
    setIsLoading(false); // Após definir o usuário, a página não está mais "carregando"
  }, []);

  // Função de logout que remove o usuário do estado e do localStorage
  const logout = () => {
    localStorage.removeItem("user");
    setUserState(null);
    window.location.href = "/login"; // Redireciona para a página de login
  };

  // Função para atualizar diretamente o estado do usuário
  const setUser = (userData: User) => {
    setUserState(userData);
  };

  // Carrega o usuário do localStorage ao iniciar o componente
  useEffect(() => {
    const storedUser = localStorage.getItem("user"); 
    if (storedUser) {
      setUserState(JSON.parse(storedUser)); // Define o estado do usuário com os dados recuperados
    }
    setIsLoading(false); // Marca o carregamento como finalizado após verificar o localStorage
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, login, setUser }}>
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
