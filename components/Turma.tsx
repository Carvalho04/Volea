'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, MapPin, Users, Edit, Trash2 } from "lucide-react"
import Link from 'next/link'
import api from '@/service/api';

interface Turma {
  id: string;
  nome: string;
  descricao: string;
  idEsporte: number;
};


interface Esporte {
  id: string;
  descricao: string;
};

export function Turmas() {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [esportes, setEsporte] = useState<Esporte[]>([]);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    // Mock de usuário logado (substitua com a lógica de autenticação real)
    setUsuarioId(62);  // Exemplo: Suponha que o ID do usuário seja 28

    const fetchTurmas = async () => {
      try {
        const response = await api.get('/api/classes');
        console.log(response.data);  // Verifique o formato da resposta
        setTurmas(response.data);  
      } catch (error) {
        console.error("Erro ao carregar turmas.", error);
      }
    };



    const fetchEsportes = async () => {
      try {
        const response = await api.get('/api/esportes');
        console.log("Esportes:", response.data); 
        setEsporte(response.data);  
      } catch (error) {
        console.error("Erro ao carregar esportes.", error);
      }
    };

    fetchTurmas();
    fetchEsportes();
  }, []);

  const matricularAluno = async (turmaId: string) => {
    if (!usuarioId) {
        alert("Você precisa estar logado para se matricular.");
        return;
    }

    try {
        await api.post(`/api/classes/${turmaId}/matricular`, usuarioId);  // Envia apenas o valor do usuarioId
        alert("Matrícula realizada com sucesso!");
    } catch (error: any) {
        console.error("Erro ao matricular aluno:", error);
        // Verifica se o erro possui resposta e dados para exibir uma mensagem amigável
        const errorMessage = error?.response?.data?.message || "Erro ao matricular. Tente novamente mais tarde.";
        alert(errorMessage);  // Exibe a mensagem de erro amigável
    }
};



  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#114494] border-b shadow-sm sticky top-0 z-40">
        <div className="container px-4 md:px-6 flex items-center text-center h-16">
          <Link href="#" className="mr-6 flex items-center gap-2" prefetch={false}>
            <img 
              src="/Logo_Volea.png" 
              alt="Logo Volea" 
              className="h-8 w-auto"
            />
            <span className="font-bold text-2xl" style={{ color: "#f9b800" }}>Volea</span>
          </Link>
        </div>
      </header>

      <div className="p-8 flex-grow">
        {Array.isArray(turmas) && turmas.length > 0 ? (
          turmas.map((turma) => {
            const esporte = esportes.find(p => p.id ===String(turma.idEsporte));            
            console.log("Turma:", turma);
            console.log('ID Esporte da Turma:', turma.idEsporte);
            console.log('ID do Esporte:', esporte?.id);
            console.log("Tipo de turma.idEsporte:", typeof turma.idEsporte);
          console.log("Tipo de esporte.id:", typeof esporte?.id);


                        return (
              <Card key={turma.id} className="max-w-3xl mx-auto mb-4">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-3xl">{turma.nome}</CardTitle>
                      <CardDescription className="text-lg mt-2">
                      Esporte: {esporte?.descricao || "Desconhecido"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                    <p>{turma.descricao}</p>
                  </div>  
                </CardContent>
                <CardFooter className="justify-between">
                  <Button 
                    aria-label="Se matricule" 
                    className='w-full' 
                    onClick={() => matricularAluno(turma.id)} 
                  >
                    Matricular-se
                  </Button>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <p>Não há turmas disponíveis.</p>
        )}
      </div>


      {/* Footer */}
      <footer className="bg-[#114494] text-[#f9b800] py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 VOLEA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
