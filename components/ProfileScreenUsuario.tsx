'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
import { AlertCircle, ArrowLeft, Eye, EyeOff, Save } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import api from "@/service/api";
import { useAuth } from "@/context/AuthContext";
import { TableBody, TableCell, TableRow } from './ui/table';

interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  dataNasc: string;
  password?: string;
}

interface Turma {
  id: number;
  nome: string;
  status: string; // "Em andamento" ou "Concluído"
}

interface Pagamento {
  id: number;
  descricao: string;
  valor: number;
  status: string; // "Pendente" ou "Pago"
}

interface Notificacao {
  id: number;
  titulo: string;
  descricao: string;
  link?: string; // Link opcional para mais informações
}

export function PerfilUsuario() {
  const { user, isLoading } = useAuth();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsuario, setEditedUsuario] = useState<Partial<Usuario>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const disciplinas = [
    { codigo: "16", nome: "Vôlei Sábados"},
    { codigo: "17", nome: "Futebol Sexta Feira"},
    { codigo: "18", nome: "Tênis de Mesa Domingos"},
    { codigo: "19", nome: "Basquete Todo dia"},
  ]
  const payment = [
    {
      id: '1',
      student: 'Henry Matheus Rodrigues',
      value: 143.10,
      dueDate: '2023-06-10',
      paymentDate: '2023-06-04',

    },
    {
      id: '2',
      student: 'Henry Matheus Rodrigues',
      value: 143.10,
      dueDate: '2023-07-10',
      paymentDate: '2023-07-05',
    },
    {
      id: '3',
      student: 'Henry Matheus Rodrigues',
      value: 150.00,
      dueDate: '2023-08-10',
      paymentDate: 'Pendente',
    },
  ]
  
  
  useEffect(() => {
    if (isLoading || !user) return;

    const fetchUsuario = async () => {
      try {
        const response = await api.get(`/api/usuarios/${user.id}`);
        setUsuario(response.data);
        setEditedUsuario(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário", error);
        setErrorMessage("Erro ao carregar dados do perfil.");
      }
    };

    // const fetchTurmas = async () => {
    //   try {
    //     const response = await api.get(`/api/turmas-aluno/${user.id}`);
    //     setTurmas(response.data);
    //   } catch (error) {
    //     console.error("Erro ao carregar turmas", error);
    //     setErrorMessage("Erro ao carregar turmas.");
    //   }
    // };

    // const fetchPagamentos = async () => {
    //   try {
    //     const response = await api.get(`/api/pagamentos-aluno/${user.id}`);
    //     setPagamentos(response.data);
    //   } catch (error) {
    //     console.error("Erro ao carregar pagamentos", error);
    //     setErrorMessage("Erro ao carregar pagamentos.");
    //   }
    // };

    // const fetchNotificacoes = async () => {
    //   try {
    //     const response = await api.get(`/api/notificacoes-aluno/${user.id}`);
    //     setNotificacoes(response.data);
    //   } catch (error) {
    //     console.error("Erro ao carregar notificações", error);
    //     setErrorMessage("Erro ao carregar notificações.");
    //   }
    // };

    fetchUsuario();
    // fetchTurmas();
    // fetchPagamentos();
    // fetchNotificacoes();
  }, [user, isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUsuario(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await api.put(`/api/usuarios/${user?.id}`, editedUsuario);
      setUsuario(response.data);
      setIsEditing(false);
      setSuccessMessage("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil", error);
      setErrorMessage("Erro ao atualizar perfil.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Usuário não autenticado</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
            {/* Cabeçalho */}
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
    <div className="container mx-auto p-4 space-y-8">

      {/* Perfil */}
      <Card>
        <CardHeader>
          <CardTitle>Meu Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                name="nome"
                value={isEditing ? editedUsuario.nome : usuario?.nome || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" name="cpf" value={usuario?.cpf || ''} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={isEditing ? editedUsuario.email : usuario?.email || ''}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <Button type="button" onClick={() => setIsEditing(true)}>Editar Perfil</Button>
          </form>
        </CardContent>
      </Card>

      {/* Minhas Turmas */}
      <Card>
        <CardHeader>
          <CardTitle>Minhas Turmas</CardTitle>
        </CardHeader>
        <CardContent>
        <TableBody>
        {disciplinas.map((disciplina) => (
          <TableRow key={disciplina.codigo}>
            <TableCell className="text-6">{disciplina.codigo}</TableCell>
            <TableCell className="text-6">{disciplina.nome}</TableCell>
          </TableRow>
        ))}
      </TableBody>
        </CardContent>
      </Card>

      {/* Meus Pagamentos */}
      <Card>
        <CardHeader>
          <CardTitle>Meus Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
        <TableBody>
        {payment.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell className="text-6">Valor: {payment.value}</TableCell>
            <TableCell className="text-6">Vencimento: {payment.dueDate}</TableCell>
            <TableCell className="text-6">Pagamento: {payment.paymentDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
        </CardContent>
      </Card>

  


     
    </div>

         {/* Rodapé */}
         <footer className="bg-white shadow-inner">
        <div className="container mx-auto px-4 py-4 flex justify-center items-center">
          <p className="text-sm text-gray-600">© 2024 Volea - Todos os direitos reservados</p>
        </div>
      </footer>


    </div>
  );
}
