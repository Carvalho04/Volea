'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, ArrowLeft } from "lucide-react";
import api from "@/service/api";
import Link from "next/link";

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
  id: number;
  nome: string;
};

const formatDate = (date: string) => {
  if (!date) return null;
  const formattedDate = new Date(date);
  if (isNaN(formattedDate.getTime())) return null;
  const year = formattedDate.getFullYear();
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = formattedDate.getDate().toString().padStart(2, '0');
  return `${day}/${month}/${year}`;
};

export function CadastroEvento() {
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    descricao: '',
    dataEvento: '',
    professorId: '',
    maxParticipantes: 0,
    participantes: 0,
  });

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);
  

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Converter professorId para número ao atualizar o estado
    setFormData(prev => ({
      ...prev,
      [name]: name === "professorId" ? Number(value) : value,  // Converte para número se for professorId
    }));
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Validação dos campos
    if (!formData.nome || !formData.descricao || formData.maxParticipantes <= 0 || !formData.dataEvento) {
      setIsSubmitting(false);
      return;
    }
  
    // Criando o objeto de evento a ser enviado
    const evento: Evento = {
      id: formData.id || '',
      nome: formData.nome,
      descricao: formData.descricao,
      dataEvento: formData.dataEvento, // dataEvento formatada como 'DD/MM/YYYY'
      professorId: Number(formData.professorId),
      maxPariticipantes: formData.maxParticipantes,
      participantes: formData.participantes || 0,

    };
  
    try {
      let response;
      if (formData.id) {
        response = await api.put(`/api/eventos/${formData.id}`, evento);
      } else {
        response = await api.post('/api/eventos', evento);
      }
  
      setEventos(prev => {
        if (formData.id) {
          return prev.map(e => (e.id === formData.id ? response.data : e));
        } else {
          return [...prev, response.data];
        }
      });
  
      // Resetar o formulário
      setFormData({
        id: '',
        nome: '',
        descricao: '',
        dataEvento: '',
        professorId: '',
        maxParticipantes: 0,
        participantes: 0,
      });
    } catch (error) {
      console.error("Erro ao cadastrar evento.", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

const handleEdit = (evento: Evento) => {
  setSelectedEvento(evento);
  setFormData({
    id: evento.id,
    nome: evento.nome,
    descricao: evento.descricao,
    dataEvento: evento.dataEvento,
    professorId: evento.professorId.toString(),  // Manter como string aqui para o select
    maxParticipantes: evento.maxPariticipantes,
    participantes: evento.participantes,
  });
};

  
  const handleCancel = () => {
    setFormData({
      id: '',
      nome: '',
      descricao: '',
      dataEvento: '',
      professorId: '',
      maxParticipantes: 0,
      participantes: 0,
    });
    setSelectedEvento(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Cabeçalho */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="#" prefetch={false} className="flex items-center gap-2">
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

      {/* Conteúdo principal */}
      <main className="flex-grow container mx-auto p-4 space-y-8">
        {/* Formulário de cadastro */}
        <Card style={{ backgroundColor: "#f4e7c3" }}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {selectedEvento ? 'Editar Evento' : 'Cadastrar Evento'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nome do Evento */}
                <div>
                  <Label htmlFor="nome">Nome do Evento</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Data */}
                <div>
                  <Label htmlFor="dataEvento">Data do Evento</Label>
                  <Input
                    id="dataEvento"
                    name="dataEvento"
                    type="date"
                    value={formData.dataEvento}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Professor */}
                <div className="space-y-2">
                  <Label htmlFor="professorId">Professor</Label>
                  <select
                    id="professorId"
                    name="professorId"
                    value={formData.professorId.toString()}  // Garantir que seja convertido para string
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="" disabled>Selecione um professor</option>
                    {professores.map((prof) => (
                      <option key={prof.id} value={prof.id}>
                        {prof.nome}
                      </option>
                    ))}
                  </select>

                </div>

                {/* Máximo de Participantes */}
                <div>
                  <Label htmlFor="maxParticipantes">Máximo de Participantes</Label>
                  <Input
                    id="maxParticipantes"
                    name="maxParticipantes"
                    type="number"
                    value={formData.maxParticipantes}
                    onChange={handleChange}
                    required
                    min={1}
                  />
                </div>

                {/* Descrição */}
                <div className="col-span-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    required
                    className="h-32"
                  />
                </div>

                {/* Botões */}
                <div className="flex space-x-4 col-span-2 mt-6">
                  <Button className="w-full" type="submit" disabled={isSubmitting}>
                    {selectedEvento ? 'Salvar Alterações' : 'Cadastrar'}
                  </Button>
                  <Button type="button" onClick={handleCancel} variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Exibição dos eventos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {eventos.map((evento) => {
        const professor = professores.find(p => p.id === evento.professorId);
        // const professor = professores.find(p => p.id === String(evento.professorId)); 

          return (
            <Card key={evento.id} className="shadow-lg">
              <CardHeader>
                <CardTitle>{evento.nome}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Descrição:</strong> {evento.descricao}</p>
                <p><strong>Professor:</strong> {professor ? professor.nome : 'Desconhecido'}</p>
                <p><strong>Participantes:</strong> {evento.participantes}/{evento.maxPariticipantes}</p>
                {/* Formatando a data de evento */}
                <p><strong>Data de Evento:</strong> {new Date(evento.dataEvento).toLocaleDateString("pt-BR")}</p>
                <Button variant="outline" size="sm" onClick={() => handleEdit(evento)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </CardContent>
            </Card>
          );
        })}

        </div>
      </main>
    </div>
  );
}
