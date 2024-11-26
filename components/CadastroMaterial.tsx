'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Trash2, ArrowLeft, Edit, Search } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import api from "@/service/api";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { AxiosResponse } from 'axios';

interface Material {
  id: number;
  descricao: string;
  ativo: boolean;
}

export function CadastroMaterial() {
  const [formData, setFormData] = useState({
    descricao: '',
  });

  const [materiais, setMateriais] = useState<Material[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMateriais = async () => {
      try {
        const response = await api.get('/api/itens');
        setMateriais(response.data);
      } catch (error) {
        console.error("Erro ao carregar materiais.", error);
      }
    };
    fetchMateriais();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (submitStatus) {
      timer = setTimeout(() => {
        setSubmitStatus(null);
        setErrorMessage(null);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [submitStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditar = (material: Material) => {
    setSelectedMaterial(material); 
    setFormData({
      descricao: material.descricao,
    });
  };

  const handleExcluir = async (id: number) => {
    try {
      await api.delete(`/api/itens/${id}`);
      setSubmitStatus('success');
      setMateriais(prev => prev.filter(material => material.id !== id));
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage("Erro ao excluir material.");
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
      if (selectedMaterial) {
        // Se estamos editando, fazemos o update
        response = await api.put(`/api/itens/${selectedMaterial.id}`, formData);
        setMateriais(prev =>
          prev.map((material) =>
            material.id === selectedMaterial.id ? response.data : material
          )
        );
        setSelectedMaterial(null); // Limpar após o update
      } else {
        // Caso contrário, criamos um novo material
        response = await api.post('/api/itens', formData);
        setMateriais(prev => [...prev, response.data]);
      }
      setSubmitStatus('success');
      setFormData({ descricao: '' }); // Limpar formulário
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage("Erro ao cadastrar ou editar material.");
    }
    setIsSubmitting(false);
  };

  const filteredMateriais = materiais.filter((material) => {
    const descricao = material.descricao || ""; // Garantir que 'descricao' seja uma string válida
    return descricao.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
          <nav>
            <Button variant="ghost" size="sm" style={{ color: "#f9b800" }}>
              <ArrowLeft className="h-4 w-4 mr-2" style={{ color: "#f9b800" }} />
              Voltar
            </Button>
          </nav>
        </div>
      </header>
  
      {/* Conteúdo principal */}
      <main className="flex-grow container mx-auto p-4 space-y-8">
        {/* Formulário de cadastro */}
        <Card style={{ backgroundColor: "#f4e7c3" }}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {selectedMaterial ? 'Editar Material' : 'Cadastrar Material'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
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

              <Button
                type="submit"
                disabled={isSubmitting || !formData.descricao}
                className="w-full md:w-auto mt-4"
              >
                {selectedMaterial ? 'Salvar Alterações' : 'Cadastrar'}
              </Button>
              
              <Button
                type="button"
                onClick={() => {
                  setSelectedMaterial(null);
                  setFormData({ descricao: ''});
                }}
                className="w-full md:w-auto mt-4"
              >
                Cancelar
              </Button> 

            </form>
          </CardContent>
        </Card>
  
        {/* Campo de pesquisa */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              placeholder="Pesquise pelo nome do material..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="h-5 w-5" />
            </span>
          </div>
        </div>
  
        {/* Lista de Materiais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMateriais.length === 0 ? (
            <Alert>
              <AlertCircle className="h-5 w-5" />
              <AlertDescription>Nenhum material encontrado.</AlertDescription>
            </Alert>
          ) : (
            filteredMateriais.map((material) => (
              <Card key={material.id}>
                <CardHeader>
                  <CardTitle>{material.descricao}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <div>
                    <Button
                      onClick={() => handleEditar(material)}
                      className="mr-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleExcluir(material.id)}
                      variant="destructive"
                    >
                      <Trash2 className="h-4 w-4" />
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
