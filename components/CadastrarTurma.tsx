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

// interface Turma {
//   id: string;
//   nome: string;
//   descricao: string;
//   idProfessor: number,
//   idEsporte: number,

// };

// interface Professor {
//   id: string;
//   nome: string;
// };

// interface Esporte {
//   id: string;
//   descricao: string;
// };

// const formatDate = (date: string) => {
//   if (!date) return null;
//   const formattedDate = new Date(date);
//   if (isNaN(formattedDate.getTime())) return null;
//   const year = formattedDate.getFullYear();
//   const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
//   const day = formattedDate.getDate().toString().padStart(2, '0');
//   return `${day}/${month}/${year}`;
// };

// export function CadastroTurma() {
//   const [formData, setFormData] = useState({
//     id: '',
//     nome: '',
//     descricao: '',
//     idEsporte: '',
//   });

//   const [turmas, setTurmas] = useState<Turma[]>([]);
//   const [esportes, setEsportes] = useState<Esporte[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [selectedTurma, setSelectedTurma] = useState<Turma | null>(null);
  

//   useEffect(() => {
//     const fetchTurmas = async () => {
//       try {
//         const response = await api.get('/api/classes');
//         console.log('Turmas:', response.data);
//         setTurmas(response.data);
//       } catch (error) {
//         console.error("Erro ao carregar turmas.", error);
//       }
//     };
  
  
//     const fetchEsportes = async () => {
//       try {
//         const response = await api.get('/api/esportes');
//         console.log('Esportes:', response.data);
//         setEsportes(response.data);
//       } catch (error) {
//         console.error("Erro ao carregar esportes.", error);
//       }
//     };
  
//     fetchTurmas();
//     fetchEsportes();
//   }, []);
  

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     const turma = {
//       nome: formData.nome,
//       descricao: formData.descricao,
//       idEsporte: Number(formData.idEsporte),
//     };
    
//     try {
//       if (formData.id) {
//         await api.put(`/api/classes/${formData.id}`, turma, {
//           headers: {
//             'Content-Type': 'application/json',
//           }, 
//         });
        
//       } else {
//         await api.post('/api/classes', turma, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//       }
    
//       // Recarregar as turmas após salvar
//       const response = await api.get('/api/classes');
//       setTurmas(response.data);
    
//       setFormData({
//         id: '',
//         nome: '',
//         descricao: '',
//         idEsporte: '',
//       });
//     } catch (error) {
//       console.error("Erro ao cadastrar ou atualizar turma.", error);
//     } finally {
//       setIsSubmitting(false);
//     }
    
//   };
  
  

//   const handleEdit = (turma: Turma) => {
//     setSelectedTurma(turma);
//     setFormData({
//       id: turma.id, // Use os dados da turma recebida
//       nome: turma.nome,
//       descricao: turma.descricao,
//       idEsporte: turma.idEsporte.toString(), // Certifique-se de que é uma string
//     });
//   };
  

//   const handleCancel = () => {
//     setFormData({
//       id: '',
//       nome: '',
//       descricao: '',
//       idEsporte: '',
//     });
//     setSelectedTurma(null);
//   };
interface Esporte {
  id: number;
  descricao: string;
}


interface Turma {
  id: number;
  nome: string;
  descricao: string;
  esporteId: number,
  esporte?: Esporte,
}



export function CadastroTurma() {
  const [formData, setFormData] = useState({
    esporteId: '', 
    nome: '',
    descricao:'',
  });

  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [esportes, setEsportes] = useState<Esporte[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedTurma, setSelectedTurma] = useState<Turma | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await api.get('/api/classes');
        console.log('Classes:', response.data); // Inspecione os dados
        setTurmas(response.data);
      } catch (error) {
        console.error("Erro ao carregar turmas.", error);
      }
    };

    const fetchEsportes = async () => {
      try {
        const response = await api.get('/api/esportes');
        console.log('Esportes:', response.data); // Inspecione os dados
        setEsportes(response.data);
      } catch (error) {
        console.error("Erro ao carregar esportes.", error);
      }
    };



    fetchTurmas();
    fetchEsportes();
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
  
    if (!formData.esporteId || !formData.nome || !formData.descricao) {
      setSubmitStatus('error');
      setErrorMessage("Todos os campos devem ser preenchidos.");
      setIsSubmitting(false);
      return;
    }
  
    const turma = {
      ...formData,
      esporteId: Number(formData.esporteId),
    };
    
    console.log('Enviando dados da turma:', turma);
    try {
      let response: AxiosResponse<any, any>;
      if (selectedTurma) {
        response = await api.put(`/api/classes/${selectedTurma.id}`, turma);
      } else {
        response = await api.post('/api/classes', turma);
      }
  
      setTurmas((prev) => [...prev, response.data]);
      setSubmitStatus('success');
      setFormData({ esporteId: '', nome: '', descricao: '' });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage("Erro ao cadastrar ou editar turma.");
    }
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    setFormData({  esporteId: '', nome: '',descricao:'' });
    setSelectedTurma(null);
  };

  const filteredTurmas = turmas
  .map((turma) => ({
    ...turma,
    esporteDescricao: turma.esporte?.descricao || "Desconhecido",
  }))
  .filter((turma) =>
    turma.esporteDescricao.toLowerCase().includes(searchQuery.toLowerCase())
  );


  useEffect(() => {
    if (selectedTurma) {
      setFormData({
        esporteId: selectedTurma.esporte ? selectedTurma.esporte.id.toString() : '',
        nome: selectedTurma.nome,
        descricao: selectedTurma.descricao,
      });
    } else {
      // Caso selectedTurma não tenha sido selecionada corretamente, pode-se definir o estado com valores vazios ou tratamento adequado
      setFormData({
        esporteId: '',
        nome: '',
        descricao: '',
      });
    }
    
  }, [selectedTurma]);

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
            <CardTitle className="text-2xl font-bold">
              {selectedTurma ? 'Editar Turma' : 'Cadastrar Turma'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nome da Turma */}
                <div>
                  <Label htmlFor="nome">Nome Turma</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Esporte */}
                <div className="space-y-2">
                  <Label htmlFor="idEsporte">Esporte</Label>
                  <select
                    id="idEsporte"
                    name="esporteId"
                    value={formData.esporteId}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="">Selecione um esporte</option>
                    {esportes.map((esporte) => (
                      <option key={esporte.id} value={esporte.id}>
                        {esporte.descricao}
                      </option>
                    ))}
                  </select>
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
                    {selectedTurma ? 'Salvar Alterações' : 'Cadastrar'}
                  </Button>
                  <Button type="button" onClick={handleCancel} variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        

        {/* Exibição das turmas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {/* {turmas.map((turma) => {
          const esporteDescricao = turma.esporte?.descricao || "Desconhecido";
          console.log("Turma:", turma);
          return (
            <Card key={turma.id} className="shadow-lg">
              <CardHeader>
                <CardTitle>{turma.nome}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Descrição:</strong> {turma.descricao}</p>
                <p><strong>Esporte:</strong> {turma.esporte?.descricao || "Desconhecido"}</p>
                '<Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedTurma(turma)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </CardContent>'
            </Card>
          );
        })} */}

          {turmas.map((turma) => (
            <Card key={turma.id} className="shadow-lg">
              <CardHeader>
                <CardTitle>{turma.nome}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Descrição:</strong> {turma.descricao}</p>
                <p><strong>Esporte:</strong> {turma.esporte?.descricao || "Desconhecido"}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedTurma(turma)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </CardContent>
            </Card>
          ))}


        </div>

        
      </main>
    </div>
  );
}
