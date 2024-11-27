import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Edit, Search } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import api from "@/service/api";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { AxiosResponse } from 'axios';

interface Esporte {
  id: number;
  descricao: string;
  ativo: boolean;
}

export function CadastroEsporte() {
  const [formData, setFormData] = useState({
    descricao: '',
  });

  const [esportes, setEsportes] = useState<Esporte[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const [selectedEsporte, setSelectedEsporte] = useState<Esporte | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showActive, setShowActive] = useState(true); // Filtro para exibir apenas ativos
  const [showInactive, setShowInactive] = useState(false); // Filtro para exibir inativos

  useEffect(() => {
    const fetchEsportes = async () => {
      try {
        const response = await api.get('/api/esportes');
        setEsportes(response.data);
      } catch (error) {
        console.error("Erro ao carregar esportes", error);
      }
    };
    fetchEsportes();
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

  const handleEditar = (esporte: Esporte) => {
    setSelectedEsporte(esporte); 
    setFormData({
      descricao: esporte.descricao,
    });
  };

  const handleAtivarDesativar = async (id: number, ativo: boolean) => {
    try {
      const endpoint = ativo ? `/api/esportes/desativar/${id}` : `/api/esportes/ativar/${id}`;
      // Realizando a chamada para ativar ou desativar
      const response = await api.put(endpoint);
      // Atualizando o estado local com os dados atualizados da API
      setEsportes(prev => prev.map(e => e.id === id ? { ...e, ativo: !ativo } : e));
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage("Erro ao ativar/desativar esporte.");
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
      if (selectedEsporte) {
        // Se estamos editando, fazemos o update
        response = await api.put(`/api/esportes/${selectedEsporte.id}`, formData);
        setEsportes(prev =>
          prev.map((esporte) =>
            esporte.id === selectedEsporte.id ? response.data : esporte
          )
        );
        setSelectedEsporte(null); // Limpar após o update
      } else {
        // Caso contrário, criamos um novo esporte
        response = await api.post('/api/esportes', formData);
        setEsportes(prev => [...prev, response.data]);
      }
      setSubmitStatus('success');
      setFormData({ descricao: '' }); // Limpar formulário
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage("Erro ao cadastrar ou editar esporte.");
    }
    setIsSubmitting(false);
  };

  const filteredEsportes = esportes.filter((esporte) => {
    const descricao = esporte.descricao || ""; // Garantir que 'descricao' seja uma string válida
    const matchesSearch = descricao.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      (showActive && esporte.ativo) || (showInactive && !esporte.ativo);
    return matchesSearch && matchesStatus;
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
              {selectedEsporte ? 'Editar Esporte' : 'Cadastrar Esporte'}
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
                {selectedEsporte ? 'Salvar Alterações' : 'Cadastrar'}
              </Button>
              
              <Button
                type="button"
                onClick={() => {
                  setSelectedEsporte(null);
                  setFormData({ descricao: ''});
                }}
                className="w-full md:w-auto mt-4"
              >
                Cancelar
              </Button> 

            </form>
          </CardContent>
        </Card>
  
        {/* Campo de pesquisa e filtro */}
        <div className="flex items-center space-x-8">
          <div className="relative">
            <Input
              placeholder="Pesquise pelo nome do esporte..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="h-5 w-5" />
            </span>
          </div>
          
          <div>
            <Label className="h-5 w-5" htmlFor="showActive">Mostrar Ativos:</Label>
            <input
              id="showActive"
              type="checkbox"
              checked={showActive}
              onChange={() => setShowActive(!showActive)}
            />
          </div>
          <div>
            <Label className="h-5 w-5" htmlFor="showInactive">Mostrar Inativos:</Label>
            <input 
              id="showInactive"
              type="checkbox"
              checked={showInactive}
              onChange={() => setShowInactive(!showInactive)}
            />
          </div>
        </div>
  
        {/* Lista de esportes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEsportes.length === 0 ? (
            <Alert>
              <AlertCircle className="h-5 w-5" />
              <AlertDescription>Nenhum esporte encontrado.</AlertDescription>
            </Alert>
          ) : (
            filteredEsportes.map((esporte) => (
              <Card key={esporte.id}>
                <CardHeader>
                  <CardTitle>{esporte.descricao}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <div>
                    <Button
                      onClick={() => handleEditar(esporte)}
                      className="mr-2"
                    >
                      <Edit className="h-8 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleAtivarDesativar(esporte.id, esporte.ativo)}
                      variant={esporte.ativo ? "default" : "destructive"}
                    >
                      {esporte.ativo ? "Desativar" : "Ativar"}
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
