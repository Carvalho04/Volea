'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Trash2, ArrowLeft, Eye, EyeOff, Search, Edit } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import api from "@/service/api";
import Link from "next/link";
import router, { useRouter } from 'next/navigation';


interface Aluno {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  dataNasc: string;
  ativo: boolean;
  pass: string; 
}

const formatDate = (date: string) => {
  if (!date) return null;
  const formattedDate = new Date(date);
  if (isNaN(formattedDate.getTime())) return null;
  const year = formattedDate.getFullYear();
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = formattedDate.getDate().toString().padStart(2, '0');
  return `${day}/${month}/${year}`;
};

const isCpfValid = (cpf: string) => {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  let rest;

  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

export function CadastroAlunos() {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    pass: '',
    dataNasc: '',
  });

  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const [showAtivos, setShowAtivos] = useState(true); // Inicialmente mostra ativos
  const [showInativos, setShowInativos] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await api.get('/api/usuarios/alunos');
        setAlunos(response.data);
      } catch (error) {
        console.error("Erro ao carregar alunos", error);
      }
    };
    fetchAlunos();
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

  const [searchQuery, setSearchQuery] = useState("");

  // Função para atualizar o status do aluno
  const atualizarAlunoStatus = async (id: string, novoStatus: boolean) => {
    try {
      const response = await fetch(`/api/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ativo: novoStatus }),
      });
  
      if (response.ok) {
        setAlunos((prevAlunos) =>
          prevAlunos.map((aluno) =>
            String(aluno.id) === String(id) ? { ...aluno, ativo: novoStatus } : aluno
          )
        );
        alert(`Aluno ${novoStatus ? 'ativado' : 'desativado'} com sucesso!`);
      } else {
        alert('Erro ao atualizar o status do aluno. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o status do aluno:', error);
      alert('Erro ao atualizar o status do aluno. Tente novamente.');
    }
  };
  
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 11);
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    setFormData(prev => ({ ...prev, cpf: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleReativar = async (id: number) => {
    try {
      await api.put(`/api/usuarios/reativar/${id}`);
      setSubmitStatus('success');
      setAlunos(prev => prev.map(aluno => aluno.id === id ? { ...aluno, ativo: true } : aluno));
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage("Erro ao reativar aluno.");
    }
  };

  const handleEditar = (aluno: Aluno) => {
    setSelectedAluno(aluno); 
    setFormData({
      nome: aluno.nome,
      cpf: aluno.cpf,
      email: aluno.email,
      pass: aluno.pass, 
      dataNasc: aluno.dataNasc,
    });
  };
      

  const handleDesativar = async (id: number) => {
    try {
      await api.put(`/api/usuarios/desativar/${id}`);
      setAlunos(prev => prev.filter(aluno => aluno.id !== id));
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage("Erro ao excluir aluno.");
    }
  };

  const handleExcluir = async (id: number) => {
    try {
      await api.delete(`/api/usuarios/${id}`);
      setSubmitStatus('success');
      setAlunos(prev => prev.filter(aluno => aluno.id !== id));
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage("Erro ao excluir aluno.");
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
  
    if (!isCpfValid(formData.cpf)) {
      setSubmitStatus('error');
      setErrorMessage("CPF inválido.");
      setIsSubmitting(false);
      return;
    }
  
    if (formData.pass.length < 8 || !/\d/.test(formData.pass)) {
      setSubmitStatus('error');
      setErrorMessage("A senha deve ter pelo menos 8 caracteres e incluir um número.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      if (selectedAluno) {
        // Atualizar aluno existente
        const response = await api.put(`/api/usuarios/${selectedAluno.id}`, formData);
        setAlunos(prev => prev.map(aluno => aluno.id === selectedAluno.id ? { ...aluno, ...formData } : aluno));
        setSubmitStatus('success');
      } else {
        // Criar novo aluno
        const response = await api.post('/api/usuarios/alunos', formData);
        setAlunos(prev => [...prev, response.data]);
        setSubmitStatus('success');
      }
  
      // Resetar formulário e estado de edição
      setFormData({ nome: '', cpf: '', email: '', pass: '', dataNasc: '' });
      setSelectedAluno(null);
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage("Erro ao cadastrar/editar aluno. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAtivarDesativar = async (id: string, ativo: boolean) => {
    const novoStatus = !ativo;
    try {
      // Envia a solicitação para a API para ativar/desativar o aluno
      const response = await api.put(`/api/usuarios/ativar/${id}`, { ativo: novoStatus });
      if (response.status === 204) {
        // Atualiza o estado local após a resposta da API
        setAlunos(prev => 
          prev.map(aluno => 
            String(aluno.id) === id ? { ...aluno, ativo: novoStatus } : aluno
          )
        );
        alert(`Aluno ${novoStatus ? 'ativado' : 'desativado'} com sucesso!`);
      }
    } catch (error) {
      console.error('Erro ao atualizar o status do aluno', error);
      alert('Erro ao atualizar o status do aluno. Tente novamente.');
    }
  };
  
  

  const filteredAlunos = alunos.filter((aluno) => {
    const matchesQuery = aluno.nome && aluno.nome.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      (showAtivos && aluno.ativo) || (showInativos && !aluno.ativo);
    return matchesQuery && matchesStatus;
  });
  


  return (
    <div className="flex flex-col min-h-screen">
      {/* Cabeçalho */}
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

  
      {/* Conteúdo principal */}
      <main className="flex-grow container mx-auto p-4 space-y-8">
        {/* Formulário de cadastro */}
        <Card style={{ backgroundColor: "#f4e7c3" }}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Cadastrar Aluno</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
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
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleCpfChange}
                  required
                  disabled={!!selectedAluno} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={!!selectedAluno} // Desabilita no modo edição
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pass">Senha</Label>
                <div className="relative">
                  <Input
                    id="pass"
                    name="pass"
                    type={showPassword ? "text" : "password"}
                    value={formData.pass}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataNasc">Data de Nascimento</Label>
                <Input
                  id="dataNasc"
                  name="dataNasc"
                  type="date"
                  value={formData.dataNasc}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto mt-4"
              >
                {selectedAluno ? "Atualizar" : isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </Button>
              
              <Button
                type="button"
                onClick={() => {
                  setSelectedAluno(null);
                  setFormData({ nome: '', cpf: '', email: '', pass: '', dataNasc: '' });
                }}
                className="w-full md:w-auto mt-4"
              >
                Cancelar
              </Button> 

            </form>
          </CardContent>
        </Card>
  
        {/* Campo de pesquisa e filtros */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              placeholder="Pesquise pelo nome do aluno..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="h-5 w-5" />
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="ativos">Ativos</Label>
            <input
              type="checkbox"
              id="ativos"
              checked={showAtivos}
              onChange={() => setShowAtivos(!showAtivos)}
            />
            <Label htmlFor="inativos">Inativos</Label>
            <input
              type="checkbox"
              id="inativos"
              checked={showInativos}
              onChange={() => setShowInativos(!showInativos)}
            />
          </div>
        </div>

        {/* Listagem de alunos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredAlunos.map((aluno) => (
            <Card
              key={`aluno-${aluno.id}`}
              className="cursor-pointer hover:shadow-lg transition"
            >
              <CardHeader className="flex justify-between items-center">
                {/* CardTitle com o nome do aluno */}
                <CardTitle>{aluno.nome || "Nome não disponível"}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>CPF:</strong> {aluno.cpf || "CPF não disponível"}
                </p>
                <p>
                  <strong>Email:</strong> {aluno.email || "Email não disponível"}
                </p>
                <p>
                  <strong>Senha:</strong> {aluno.pass ? "*****" : "Não definida"}
                </p>
                <p>
                  <strong>Data de Nascimento:</strong> {formatDate(aluno.dataNasc)}
                </p>
              </CardContent>
              {/* Rodapé com os botões */}
              <div className="flex justify-between p-4">
                {/* Botão Excluir
                <Button
                  onClick={(e) => {
                    e.stopPropagation(); // Impede que o clique no botão afete o Card
                    handleExcluir(aluno.id);
                  }}
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Excluir
                </Button> */}
                
                {/* Botão Ativar/Desativar */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation(); // Impede que o clique no botão afete o Card
                    handleAtivarDesativar(String(aluno.id), aluno.ativo);
                  }}
                  variant={aluno.ativo ? "secondary" : "destructive"}
                >
                  {aluno.ativo ? "Desativar" : "Ativar"}
                </Button>

                
                {/* Botão Editar */}
                <Button
                  variant="ghost" 
                  onClick={(e) => {
                    e.stopPropagation(); // Impede que o clique no botão afete o Card
                    handleEditar(aluno);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2 bg-blue-500 text-white hover:bg-blue-700" /> Editar
                </Button>
              </div>
            </Card>
          ))}
        </div>



        {/* Alerta de status */}
        {submitStatus && (
          <Alert
            variant={submitStatus === "error" ? "destructive" : "default"}
            style={{
              position: "absolute",
              top: "4rem",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#deecff",
              width: "auto",
              maxWidth: "400px",
              zIndex: 10,
            }}
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>
              {submitStatus === "error" ? "Erro!" : "Sucesso!"}
            </AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
      </main>
    </div>
  );
    


}
