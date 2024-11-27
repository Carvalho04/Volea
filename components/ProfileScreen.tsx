'use client';
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext"; // Importando o contexto de autenticação

export function ProfileScreen() {
  const { user, logout, isLoading, login } = useAuth(); // Pega o usuário, logout, e isLoading do contexto

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Usuário recuperado do localStorage:", storedUser);

    if (storedUser) {
      login(JSON.parse(storedUser)); // Atualiza o usuário usando a função login do contexto
    }
  }, [login]); // O useEffect será executado apenas quando a função login mudar

  // Exibe o estado de carregamento
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  // Exibe mensagem caso o usuário não esteja autenticado
  if (!user) {
    return <div>Usuário não autenticado.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <span className="font-bold text-2xl" style={{ color: "#f9b800" }}>
            Perfil do Usuário
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center">Informações do Perfil</h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold">Nome:</h3>
              <p>{user.name}</p> {/* Alterado para user.name */}
            </div>
            <div>
              <h3 className="font-semibold">E-mail:</h3>
              <p>{user.email}</p>
            </div>
            <div>
              <h3 className="font-semibold">ID:</h3>
              <p>{user.id}</p>
            </div>
          </div>
          <button 
            onClick={logout} 
            className="mt-4 w-full p-2 bg-red-600 text-white rounded-md"
          >
            Sair
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#114494] text-[#f9b800] py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 VOLEA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
