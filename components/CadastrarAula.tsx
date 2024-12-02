'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, ArrowLeft, Search } from "lucide-react";
import api from "@/service/api";
import Link from "next/link";
import { preloadFont } from 'next/dist/server/app-render/entry-base';
import { AxiosResponse } from 'axios';



interface Classe {
  id: number;
  nome: string;
}

interface Professor {
  id: number;
  nome: string;
}

interface Aula {
  id: number;
  nome: string;
  data: Date;
  classeId: number;
  classe?: Classe;
  ativo: boolean;
  professor?: Professor;
  professorId: number;
  classeNome: string;
  professorNome: string;
}



export function CadastrarAula() {
  const [formData, setFormData] = useState({
    classeId: '', 
    nome: '',
    data:'',
    ativo:true,
    professorId: '', 
  });

  const [aulas, setAulas] = useState<Aula[]>([]);
  const [classes, setClasses] = useState<Classe[]>([]);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedAula, setSelectedAula] = useState<Aula | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAulas = async () => {
      try {
        const response = await api.get('/api/aulas');
        console.log('Classes:', response.data); // Inspecione os dados
        setAulas(response.data);
      } catch (error) {
        console.error("Erro ao carregar aulas.", error);
      }
    };

    const fetchClasses = async () => {
      try {
        const response = await api.get('/api/classes');
        console.log('Classes:', response.data); // Inspecione os dados
        setClasses(response.data);
      } catch (error) {
        console.error("Erro ao carregar classes.", error);
      }
    };
  
    const fetchProfessores = async () => {
      try {
        const response = await api.get('/api/usuarios/professores/ativos');
        console.log('Professores:', response.data); // Inspecione os dados
        setProfessores(response.data); // Corrigido para armazenar os dados de professores.
      } catch (error) {
        console.error("Erro ao carregar professores.", error);
      }
    };    

    fetchProfessores();
    fetchAulas();
    fetchClasses();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage(null);
  
    if (!formData.classeId || !formData.nome || !formData.data) {
      setSubmitStatus('error');
      setErrorMessage("Todos os campos devem ser preenchidos.");
      setIsSubmitting(false);
      return;
    }
  
    const aula = {
      ...formData,
      classeId: Number(formData.classeId),
      professorId: Number(formData.professorId),
    };
    
    console.log('Enviando dados da aula:', aula);
    try {
      let response: AxiosResponse<any, any>;
      if (selectedAula) {
        response = await api.put(`/api/aulas/${selectedAula.id}`, aula);
      } else {
        response = await api.post('/api/aulas', aula);
      }
  
      setAulas((prev) => [...prev, response.data]);
      setSubmitStatus('success');
      setFormData({ classeId: '', professorId: '', nome: '', data: '', ativo: true });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage("Erro ao cadastrar ou editar aula.");
    }
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    setFormData({  classeId: '', professorId: '', nome: '', data: '', ativo: true });
    setSelectedAula(null);
  };

  const filteredAulas = aulas
  .map((aula) => ({
    ...aula,
    classeNome: aula.classe?.nome || "Desconhecido",
    professorNome: aula.professor?.nome || "Desconhecido",
  }))
  .filter((aula) =>
    aula.classeNome.toLowerCase().includes(searchQuery.toLowerCase())
  );


  useEffect(() => {
    if (selectedAula) {
      setFormData({
        classeId: selectedAula.classe? selectedAula.classe.id.toString() : '',
        professorId: selectedAula.professor? selectedAula.professor.id.toString() : '', 
        nome: selectedAula.nome,
        data: String(selectedAula.data),
        ativo: true
      });
    } else {
      // Caso selectedAula não tenha sido selecionada corretamente, pode-se definir o estado com valores vazios ou tratamento adequado
      setFormData({
        classeId: '', nome: '', data: '', 
        professorId: '', ativo: true 
      });
    }
    
  }, [selectedAula]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Cabeçalho */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/professores" prefetch={false} className="flex items-center gap-2">
            <img src="/Logo_Volea.png" alt="Logo Volea" className="h-8" />
            <span className="font-bold text-2xl" style={{ color: "#f9b800" }}>
              Volea
            </span>
          </Link>
          <Link href="/professores">
          
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
            <CardTitle className="text-2xl font-bold">
              {selectedAula ? 'Editar Aula' : 'Cadastrar Aula'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nome da Aula */}
                <div>
                  <Label htmlFor="nome">Nome Aula</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Classe */}
                <div className="space-y-2">
                  <Label htmlFor="idClasse">Classe</Label>
                  <select
                    id="idClasse"
                    name="classeId"
                    value={formData.classeId}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="">Selecione um classe</option>
                    {classes.map((classe) => (
                      <option key={classe.id} value={classe.id}>
                        {classe.nome}
                      </option>
                    ))}
                  </select>
                </div>
                
               
                {/* Data */}
                <div>
                  <Label htmlFor="data">Data da Aula</Label>
                  <Input
                    id="data"
                    name="data"
                    type="date"
                    value={formData.data}
                    onChange={handleChange}
                    required
                  />
                </div>
                 
                {/* Professor */}
                <div className="space-y-2">
                  <Label htmlFor="idProfessor">Professor</Label>
                  <select
                    id="idProfessor"
                    name="professorId"
                    value={formData.professorId}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="">Selecione um Professor</option>
                    {professores.map((professor) => (
                      <option key={professor.id} value={professor.id}>
                        {professor.nome}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Botões */}
                <div className="flex space-x-4 col-span-2 mt-6">
                  <Button className="w-full" type="submit" disabled={isSubmitting}>
                    {selectedAula ? 'Salvar Alterações' : 'Cadastrar'}
                  </Button>
                  <Button type="button" onClick={handleCancel} variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Exibição das aulas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {/* {aulas.map((aula) => {
          const esporteDescricao = aula.esporte?.descricao || "Desconhecido";
          console.log("Aula:", aula);
          return (
            <Card key={aula.id} className="shadow-lg">
              <CardHeader>
                <CardTitle>{aula.nome}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Descrição:</strong> {aula.descricao}</p>
                <p><strong>Esporte:</strong> {aula.esporte?.descricao || "Desconhecido"}</p>
                '<Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedAula(aula)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </CardContent>'
            </Card>
          );
        })} */}

{aulas.length > 0 && classes.length > 0 && professores.length > 0 ? (
  aulas.map((aula) => {

    return (
      <Card key={aula.id} className="shadow-lg">
        <CardHeader>
          <CardTitle>{aula.nome}</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Classe:</strong> {aula.classeNome}</p>
          <p><strong>Data:</strong> {aula.data ? new Date(aula.data).toLocaleDateString() : "Desconhecido"}</p>
          <p><strong>Professor:</strong> {aula.professorNome}</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setSelectedAula(aula)}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </CardContent>
      </Card>
    );
  })
) : (
  <p>Carregando aulas, classes e professores...</p>
)}


        </div>

        
      </main>
    </div>
  );
}
