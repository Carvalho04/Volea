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

interface Comunicacao {
  id: string;
  nome: string;
  descricao: string;
  dataPublic: string;
  ativo: boolean; 
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

  const [searchQuery, setSearchQuery] = useState("");
  const [showActive, setShowActive] = useState(true); // Filtro para exibir apenas ativas
  const [showInactive, setShowInactive] = useState(false); // Filtro para exibir inativas

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
      ativo: true, // Comunicacao sempre criada como ativa
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

  const handleToggleStatus = async (id: string, ativo: boolean) => {
    try {
      const response = await api.put(ativo ? `/api/comunicacao/desativar/${id}` : `/api/comunicacao/ativar/${id}`);
      
      setComunicacoes((prev) =>
        prev.map((comunicacao) =>
          comunicacao.id === id ? { ...comunicacao, ativo: !ativo } : comunicacao
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar status da comunicação.", error);
    }
  };
    

  const handleCancel = () => {
    setFormData({ id: '', nome: '', descricao: '', dataPublic: '' });
    setSelectedComunicacao(null);
  };

  const filteredComunicacoes = comunicacoes.filter((comunicacao) => {
    const matchesSearch = comunicacao.nome.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      (showActive && comunicacao.ativo) || (showInactive && !comunicacao.ativo);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col min-h-screen">
    <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/instituicao" prefetch={false} className="flex items-center gap-2">
            <img src="/Logo_Volea.png" alt="Logo Volea" className="h-8" />
            <span className="font-bold text-2xl" style={{ color: "#f9b800" }}>
              Volea
            </span>
          </Link>
          <Link href="/instituicao">
            <Button variant="ghost" size="sm" style={{ color: "#f9b800" }}>
              <ArrowLeft className="h-4 w-4 mr-2" style={{ color: "#f9b800" }} />
              Voltar
            </Button>
          </Link>

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

        {/* Filtros */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              placeholder="Pesquise pelo nome da comunicação..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10"
            />
          </div>

          <div>
            <Label htmlFor="showActive">Mostrar Ativas:</Label>
            <input
              id="showActive"
              type="checkbox"
              checked={showActive}
              onChange={() => setShowActive(!showActive)}
            />
          </div>
          <div>
            <Label htmlFor="showInactive">Mostrar Inativas:</Label>
            <input
              id="showInactive"
              type="checkbox"
              checked={showInactive}
              onChange={() => setShowInactive(!showInactive)}
            />
          </div>
        </div>

        {/* Lista de comunicações */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredComunicacoes.length === 0 ? (
            <p>Nenhuma comunicação encontrada.</p>
          ) : (
            filteredComunicacoes.map((comunicacao) => (
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
                    <Button
                      variant={comunicacao.ativo ? 'outline' : 'destructive'}
                      size="sm"
                      onClick={() => handleToggleStatus(comunicacao.id, comunicacao.ativo)}
                    >
                      {comunicacao.ativo ? 'Desativar' : 'Ativar'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
