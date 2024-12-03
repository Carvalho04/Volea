'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Edit, Search } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import api from "@/service/api";
import Link from "next/link";
import { AxiosResponse } from 'axios';

interface Desconto {
  id: number;
  descricao: string;
  nome: string;
  valor: number,
  ativo: boolean;
}

export function CadastroDesconto() {
  const [formData, setFormData] = useState({
    descricao: '',
    nome:'',
    valor:'',
  });

  const [descontos, setDescontos] = useState<Desconto[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedDesconto, setSelectedDesconto] = useState<Desconto | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showActive, setShowActive] = useState(true); // Filtro para exibir apenas ativos
  const [showInactive, setShowInactive] = useState(false); // Filtro para exibir inativos

  useEffect(() => {
    const fetchDescontos = async () => {
      try {
        const response = await api.get('/api/descontos');
        setDescontos(response.data);
      } catch (error) {
        console.error("Erro ao carregar descontos", error);
      }
    };
    fetchDescontos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditar = (desconto: Desconto) => {
    setSelectedDesconto(desconto); 
    setFormData({
      descricao: desconto.descricao,
      nome: desconto.nome,
      valor: String(desconto.valor),
    });
  };

  const handleAtivarDesativar = async (id: number, ativo: boolean) => {
    try {
      const endpoint = ativo ? `/api/descontos/desativar/${id}` : `/api/descontos/ativar/${id}`;
      const response = await api.put(endpoint);
      setDescontos(prev => prev.map(m => m.id === id ? { ...m, ativo: !ativo } : m));
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage("Erro ao ativar/desativar desconto.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage(null);
  
    if (Object.values(formData).some(value => value === '')) {
      setSubmitStatus('error');
      setErrorMessage("Todos os campos devem ser preenchidos.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      let response: AxiosResponse<any, any>;
      if (selectedDesconto) {
        response = await api.put(`/api/descontos/${selectedDesconto.id}`, formData);
        setDescontos(prev =>
          prev.map((desconto) =>
            desconto.id === selectedDesconto.id ? response.data : desconto
          )
        );
        setSelectedDesconto(null);
      } else {
        response = await api.post('/api/descontos', formData);
        setDescontos(prev => [...prev, response.data]);
      }
      setSubmitStatus('success');
      setFormData({ descricao: '', nome:'', valor:''});
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage("Erro ao cadastrar ou editar desconto.");
    }
    setIsSubmitting(false);
  };

  const filteredDescontos = descontos.filter((desconto) => {
    const descricao = desconto.descricao || "";
    const matchesSearch = descricao.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = 
      (showActive && desconto.ativo) || 
      (showInactive && !desconto.ativo) || 
      (!showActive && !showInactive); // Retorna tudo caso nenhum filtro esteja ativo
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
        <Card style={{ backgroundColor: "#f4e7c3" }}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {selectedDesconto ? 'Editar Desconto' : 'Cadastrar Desconto'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Input
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  required
                />
              </div>              
              <div className="space-y-2">
                <Label htmlFor="valor">Valor</Label>
                <Input
                  id="valor"
                  name="valor"
                  type='number'
                  value={formData.valor}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" disabled={isSubmitting || !formData.descricao} className="w-full md:w-auto mt-4">
                {selectedDesconto ? 'Salvar Alterações' : 'Cadastrar'}
              </Button>
              
              <Button
                type="button"
                onClick={() => {
                  setSelectedDesconto(null);
                  setFormData({ descricao: '', nome:'', valor:'' });
                }}
                className="w-full md:w-auto mt-4"
              >
                Cancelar
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="flex items-center space-x-8">
          <div className="relative">
            <Input
              placeholder="Pesquise pelo nome do desconto..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="h-5 w-5" />
            </span>
          </div>
          <div>
            <Label className="mr-2" htmlFor="showActive">Mostrar Ativos:</Label>
            <input
              id="showActive"
              type="checkbox"
              checked={showActive}
              onChange={() => {
                setShowActive(!showActive);
                if (!showActive) setShowInactive(false); // Desmarca o outro automaticamente
              }}
            />
          </div>
          <div>
            <Label className="mr-2" htmlFor="showInactive">Mostrar Inativos:</Label>
            <input
              id="showInactive"
              type="checkbox"
              checked={showInactive}
              onChange={() => {
                setShowInactive(!showInactive);
                if (!showInactive) setShowActive(false); // Desmarca o outro automaticamente
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDescontos.length === 0 ? (
            <Alert>
              <AlertCircle className="h-5 w-5" />
              <AlertDescription>Nenhum desconto encontrado.</AlertDescription>
            </Alert>
          ) : (
            filteredDescontos.map((desconto) => (
              <Card key={desconto.id}>
                <CardHeader>
                  <CardTitle>{desconto.nome || "Sem Nome"}</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Garantir quebra de texto no conteúdo */}
                  <div className="break-words">
                    Descrição: {desconto.descricao || "Sem Descrição"}
                  </div>
                  <div>Valor: {desconto.valor || "0"}</div>
                </CardContent>
                {/* Botões separados do conteúdo principal */}
                <div className="flex justify-end items-center gap-2 p-4">
                  <Button onClick={() => handleEditar(desconto)} className="mr-2">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => handleAtivarDesativar(desconto.id, desconto.ativo)}
                    variant={desconto.ativo ? "default" : "destructive"}
                  >
                    {desconto.ativo ? "Desativar" : "Ativar"}
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}