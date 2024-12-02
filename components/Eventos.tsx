'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CalendarDays, Users } from "lucide-react"
import Link from 'next/link'
import api from '@/service/api';

interface Evento {
  id: string;
  nome: string;
  descricao: string;
  dataEvento: string;
  professorId: number;
  maxPariticipantes: number;
  participantes: number;
}

interface Professor {
  id: number; // Garantir que o id do professor seja um número
  nome: string;
}

export function Eventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [usuarioId, setUsuarioId] = useState<number | null>(null); // Assume que o usuário é autenticado

  // Função para inscrever o usuário no evento
  const inscreverNoEvento = async (eventoId: string) => {
    if (!usuarioId) {
      alert("Você precisa estar logado para se inscrever.");
      return;
    }

    const evento = eventos.find((e) => e.id === eventoId);
    if (!evento) {
      alert("Evento não encontrado.");
      return;
    }

    // Verifica se o número de participantes já atingiu o máximo
    if (evento.participantes >= evento.maxPariticipantes) {
      alert("Desculpe, este evento está cheio.");
      return;
    }

    try {
      // Realiza a inscrição na API (ajuste a URL conforme sua estrutura)
      await api.post(`/api/eventos/${eventoId}/inscrever`, { usuarioId });
      alert("Inscrição realizada com sucesso!");
      // Atualize o número de participantes no evento localmente
      setEventos((prevEventos) =>
        prevEventos.map((e) =>
          e.id === eventoId ? { ...e, participantes: e.participantes + 1 } : e
        )
      );
    } catch (error) {
      console.error("Erro ao inscrever no evento:", error);
      alert("Ocorreu um erro ao inscrever-se. Tente novamente mais tarde.");
    }
  };

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await api.get('/api/eventos');
        setEventos(response.data);
      } catch (error) {
        console.error("Erro ao carregar eventos.", error);
      }
    };

    const fetchProfessores = async () => {
      try {
        const response = await api.get('/api/usuarios/professores/ativos');
        setProfessores(response.data);
      } catch (error) {
        console.error("Erro ao carregar professores.", error);
      }
    };

    fetchEventos();
    fetchProfessores();
  }, []);

  // Função para formatar a data no formato DD/MM/YYYY
  const formatarData = (data: string): string => {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR'); // Formato DD/MM/YYYY
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/alunos" prefetch={false} className="flex items-center gap-2">
            <img src="/Logo_Volea.png" alt="Logo Volea" className="h-8" />
            <span className="font-bold text-2xl" style={{ color: "#f9b800" }}>
              Volea
            </span>
          </Link>
          <Button variant="ghost" size="sm" style={{ color: "#f9b800" }}>
            <ArrowLeft className="h-4 w-4 mr-2" style={{ color: "#f9b800" }} />
            Voltar
          </Button>
        </div>
      </header>

      <div className="p-8 flex-grow">
        {eventos.map((evento) => {
          const professor = professores.find(p => p.id === evento.professorId);
          return (
            <Card key={evento.id} className="max-w-3xl mx-auto mb-4">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl">{evento.nome}</CardTitle>
                    <CardDescription className="text-lg mt-2">
                      <CalendarDays className="inline mr-2" />
                      {formatarData(evento.dataEvento)} {/* Formata a data */}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                  <p>{evento.descricao}</p>
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold mb-2">Participantes</h3>
                  <p className="text-muted-foreground">
                    <Users className="inline mr-2" />
                    {evento.participantes} Até  {evento.maxPariticipantes}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Treinador</h3>
                  <p className="font-medium">{professor ? professor.nome : 'Desconhecido'}</p>
                  <p className="text-sm text-muted-foreground">Treinador Principal</p>
                </div>
              </CardContent>
              {/* <CardFooter className="justify-between">
                <Button
                  aria-label="Inscrever-se no evento"
                  className='w-full'
                  onClick={() => inscreverNoEvento(evento.id)}
                >
                  Inscrever-se no Evento
                </Button>
              </CardFooter> */}
            </Card>
          );
        })}
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
