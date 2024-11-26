'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash, ArrowLeft } from "lucide-react";
import api from "@/service/api";
import Link from "next/link";

interface Comunicacao {
  id: string;
  nome: string;
  descricao: string;
  dataPublic: string;
}

const formatDate = (date: string) => {
  if (!date) return "";
  const formattedDate = new Date(date);
  if (isNaN(formattedDate.getTime())) return "";
  const year = formattedDate.getFullYear();
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = formattedDate.getDate().toString().padStart(2, '0');
  return `${day}/${month}/${year}`;
};

export function CadastroComunicacao() {
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    descricao: '',
    dataPublic: '', // Valor inicial vazio para evitar o erro de componente controlado/descontrolado
  });

  const [comunicacoes, setComunicacoes] = useState<Comunicacao[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedComunicacao, setSelectedComunicacao] = useState<Comunicacao | null>(null);

  // Busca inicial dos dados
  useEffect(() => {
    const fetchComunicacoes = async () => {
      try {
        const response = await api.get('/api/comunicacao');
        setComunicacoes(response.data);
      } catch (error) {
        console.error("Erro ao carregar comunicações.", error);
      }
    };
    fetchComunicacoes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validação dos campos
    if (!formData.nome || !formData.descricao || !formData.dataPublic) {
      setIsSubmitting(false);
      return;
    }

    const comunicacao: Comunicacao = {
      id: formData.id || '',
      nome: formData.nome,
      descricao: formData.descricao,
      dataPublic: formData.dataPublic,
    };

    try {
      let response;
      if (formData.id) {
        response = await api.put(`/api/comunicacao/${formData.id}`, comunicacao);
      } else {
        response = await api.post('/api/comunicacao', comunicacao);
      }

      setComunicacoes((prev) => {
        if (formData.id) {
          return prev.map((c) => (c.id === formData.id ? response.data : c));
        }
        return [...prev, response.data];
      });

      setFormData({ id: '', nome: '', descricao: '', dataPublic: '' });
      setSelectedComunicacao(null);
    } catch (error) {
      console.error("Erro ao cadastrar comunicação.", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (comunicacao: Comunicacao) => {
    setSelectedComunicacao(comunicacao);
    setFormData({
      id: comunicacao.id,
      nome: comunicacao.nome,
      descricao: comunicacao.descricao,
      dataPublic: comunicacao.dataPublic,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/api/comunicacao/${id}`);
      setComunicacoes((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Erro ao excluir comunicação.", error);
    }
  };

  const handleCancel = () => {
    setFormData({ id: '', nome: '', descricao: '', dataPublic: '' });
    setSelectedComunicacao(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
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

      <main className="flex-grow container mx-auto p-4 space-y-8">
        {/* Formulário */}
        <Card style={{ backgroundColor: "#f4e7c3" }}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {selectedComunicacao ? 'Editar Comunicação' : 'Cadastrar Comunicação'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dataPublic">Data do Comunicado</Label>
                  <Input
                    id="dataPublic"
                    name="dataPublic"
                    type="date"
                    value={formData.dataPublic}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-span-2 mt-4">
                  <Button type="submit" disabled={isSubmitting}>
                    {selectedComunicacao ? 'Salvar Alterações' : 'Cadastrar'}
                  </Button>
                  <Button type="button" onClick={handleCancel} variant="outline" className="ml-4">
                    Cancelar
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Lista de comunicações */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {comunicacoes.map((comunicacao) => {
            return (
            <Card key={comunicacao.id} className="shadow-lg">
              <CardHeader>
                <CardTitle>{comunicacao.nome}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Descrição:</strong> {comunicacao.descricao}</p>
                <p><strong>Data:</strong> {formatDate(comunicacao.dataPublic)}</p>
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(comunicacao)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(comunicacao.id)}>
                    <Trash className="h-4 w-4 mr-2" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
            )}
          )}

        </div>
      </main>
    </div>
  );
}
