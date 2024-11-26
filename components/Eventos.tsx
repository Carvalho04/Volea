'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, MapPin, Users, Edit, Trash2 } from "lucide-react"
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
};

interface Professor {
  id: string;
  nome: string;
};

export function Eventos() {

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [professores, setProfessores] = useState<Professor[]>([]);

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
      {eventos.map((evento) => {
        const professor = professores.find(p => p.id === String(evento.professorId));
          return (
            <Card key={evento.id} className="max-w-3xl mx-auto mb-4">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl">{evento.nome}</CardTitle>
                  <CardDescription className="text-lg mt-2">
                    <CalendarDays className="inline mr-2" />
                    {evento.dataEvento}
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
                    {evento.participantes} / {evento.maxPariticipantes}
                  </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Treinador</h3>
                  <p className="font-medium">{professor ? professor.nome : 'Desconhecido'}</p>
                  <p className="text-sm text-muted-foreground">Treinador Principal</p>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button aria-label="Register for Event" className='w-full'>Inscrever-se no Evento</Button>
            </CardFooter>
          </Card>
        )}
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#114494] text-[#f9b800] py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 VOLEA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
