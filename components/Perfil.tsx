'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Eye, EyeOff, Save } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import api from "@/service/api";
import { useAuth } from "@/context/AuthContext";

interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  dataNasc: string;
}

export function Perfil() {
  const { user, isLoading } = useAuth(); // Obtém o usuário logado
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsuario, setEditedUsuario] = useState<Partial<Usuario>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading || !user) return; // Aguarda o carregamento do usuário logado

    const fetchUsuario = async () => {
      try {
        const response = await api.get(`/api/usuarios/${user.id}`); // Usa o ID do usuário autenticado
        setUsuario(response.data);
        setEditedUsuario(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados", error);
        setErrorMessage("Erro ao carregar dados. Por favor, tente novamente.");
      }
    };

    fetchUsuario();
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
      const response = await api.put(`/api/usuarios/${user?.id}`, editedUsuario); // Atualiza com base no ID do usuário logado
      setUsuario(response.data);
      setIsEditing(false);
      setSuccessMessage("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil", error);
      setErrorMessage("Erro ao atualizar perfil. Por favor, tente novamente.");
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

  if (!usuario) {
    return <div className="flex justify-center items-center h-screen">Carregando dados do perfil...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <img 
              src="/Logo_Volea.png" 
              alt="Logo Volea" 
              className="h-8 w-auto"
            />
            <span className="font-bold text-2xl text-[#f9b800]">Volea</span>
          </Link>
          <Button variant="ghost" size="sm" className="text-[#f9b800]">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 space-y-8">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Meu Perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input 
                  id="nome" 
                  name="nome" 
                  value={isEditing ? editedUsuario.nome : usuario.nome} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input 
                  id="cpf" 
                  name="cpf" 
                  value={usuario.cpf} 
                  disabled 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={isEditing ? editedUsuario.email : usuario.email} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                />
              </div>
              {isEditing && (
                <div className="space-y-2">
                  <Label htmlFor="pass">Nova Senha</Label>
                  <div className="relative">
                    {/* <Input
                      id="pass"
                      name="pass"
                      type={showPassword ? "text" : "password"}
                      value={editedUsuario.pass || ''}
                      onChange={handleChange}
                    /> */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="dataNasc">Data de Nascimento</Label>
                <Input 
                  id="dataNasc" 
                  name="dataNasc" 
                  type="date" 
                  value={isEditing ? editedUsuario.dataNasc : usuario.dataNasc} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                />
              </div>
              {isEditing ? (
                <div className="flex space-x-2">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Salvando..." : "Salvar"}
                    <Save className="ml-2 h-4 w-4" />
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                </div>
              ) : (
                <Button type="button" onClick={() => setIsEditing(true)}>
                  Editar Perfil
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        {(errorMessage || successMessage) && (
          <Alert
            variant={errorMessage ? 'destructive' : 'default'}
            className="fixed bottom-4 right-4 w-auto max-w-md z-50"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{errorMessage ? "Erro!" : "Sucesso!"}</AlertTitle>
            <AlertDescription>{errorMessage || successMessage}</AlertDescription>
          </Alert>
        )}
      </main>
    </div>
  );
}
