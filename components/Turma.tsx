'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from 'next/link'
import api from '@/service/api';

interface Esporte {
  id: number;
  descricao: string;
}

interface Professor {
  id: number;
  nome: string;
}

interface Turma {
  id: number;
  nome: string;
  descricao: string;
  esporteId: number;
  professorId: number;
  esporte?: Esporte;
  professor?: Professor;
}

export function Turmas() {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [esportes, setEsportes] = useState<Esporte[]>([]);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await api.get('/api/classes');
        console.log('Classes:', response.data); // Inspecione os dados
        setTurmas(response.data);
      } catch (error) {
        console.error("Erro ao carregar turmas.", error);
      }
    };

    const fetchEsportes = async () => {
      try {
        const response = await api.get('/api/esportes');
        console.log('Esportes:', response.data); // Inspecione os dados
        setEsportes(response.data);
      } catch (error) {
        console.error("Erro ao carregar itens.", error);
      }
    };

    fetchTurmas();
    fetchEsportes();
  }, []);

  const matricularAluno = async (turmaId: number) => {
    if (!usuarioId) {
      alert("Você já atingiu o número de turmas liberadas.");
      return;
    }

    try {
      await api.post(`/api/classes/${turmaId}/matricular`, usuarioId);
      alert("Matrícula realizada com sucesso!");
    } catch (error: any) {
      console.error("Erro ao matricular aluno:", error);
      const errorMessage = error?.response?.data?.message || "Erro ao matricular. Tente novamente mais tarde.";
      alert(errorMessage);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/alunos" prefetch={false} className="flex items-center gap-2">
            <img src="/Logo_Volea.png" alt="Logo Volea" className="h-8" />
            <span className="font-bold text-2xl" style={{ color: "#f9b800" }}>
              Volea
            </span>
          </Link>
          <Link href="/alunos">
          <Button variant="ghost" size="sm" style={{ color: "#f9b800" }}>
            <ArrowLeft className="h-4 w-4 mr-2" style={{ color: "#f9b800" }} />
            Voltar
          </Button>
          </Link>
        </div>
      </header>


      <div className="p-8 flex-grow">
        {Array.isArray(turmas) && turmas.length > 0 ? (
          turmas.map((turma) => {
            return (
              <Card key={turma.id} className="max-w-3xl mx-auto mb-4">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-3xl">{turma.nome}</CardTitle>
                      <CardDescription className="text-lg mt-2">
                        Esporte: {turma.esporte?.descricao || "Desconhecido"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                    <p>{turma.descricao}</p>
                  </div>
                  {turma.professor && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Professor</h3>
                      <p>{turma.professor.nome}</p> {/* Exibe o nome do professor */}
                    </div>
                  )}
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

