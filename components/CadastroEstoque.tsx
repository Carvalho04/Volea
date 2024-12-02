// 'use client'

// import { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { AlertCircle, ArrowLeft, Edit, Search } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import api from "@/service/api";
// import Link from "next/link";
// import { AxiosResponse } from 'axios';

// interface Estoque {
//   id: number;
//   itemId: number;
//   quantidade: number;
//   descricao?: string;
// }

// interface Item {
//   id: number;
//   descricao: string;
// }

// export function CadastroEstoque() {
//   const [formData, setFormData] = useState({
//     itemId: '', // ID do item selecionado
//     quantidade: 0, // Quantidade no estoque
//   });

//   const [estoques, setEstoques] = useState<Estoque[]>([]);
//   const [itens, setItens] = useState<Item[]>([]); // Lista de itens para o dropdown
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [selectedEstoque, setSelectedEstoque] = useState<Estoque | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Carregar estoques e itens
//   useEffect(() => {
//     const fetchEstoques = async () => {
//       try {
//         const response = await api.get('/api/armazem'); // Endpoint dos estoques
//         setEstoques(response.data);
//       } catch (error) {
//         console.error("Erro ao carregar itens do estoque.", error);
//       }
//     };

//     const fetchItens = async () => {
//       try {
//         const response = await api.get('/api/itens'); // Endpoint dos itens cadastrados
//         setItens(response.data);
//       } catch (error) {
//         console.error("Erro ao carregar itens.", error);
//       }
//     };

//     fetchEstoques();
//     fetchItens();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitStatus(null);
//     setErrorMessage(null);

//     // Validação dos campos antes do envio
//     if (!formData.itemId || !formData.quantidade) {
//       setSubmitStatus('error');
//       setErrorMessage("Todos os campos obrigatórios devem ser preenchidos.");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       let response: AxiosResponse<any, any>;
//       if (selectedEstoque) {
//         // Validação adicional para garantir que o ID está correto
//         if (isNaN(selectedEstoque.id)) {
//           throw new Error("ID do item inválido.");
//         }
//         response = await api.put(`/api/armazem/${selectedEstoque.id}`, formData);
//       } else {
//         response = await api.post('/api/armazem', formData);
//       }

//       setEstoques((prev) => [...prev, response.data]);
//       setSubmitStatus('success');
//       setFormData({ itemId: '', quantidade: 0 }); // Limpar dados após o envio
//     } catch (error) {
//       setSubmitStatus('error');
//       setErrorMessage("Erro ao cadastrar ou editar item do estoque.");
//     }
//     setIsSubmitting(false);
//   };

//   const handleCancel = () => {
//     setFormData({ itemId: '', quantidade: 0 }); // Limpar dados
//     setSelectedEstoque(null); // Desmarcar o item selecionado para edição
//   };

//   const filteredEstoques = estoques.map((estoque) => {
//     const item = itens.find((i) => i.id === estoque.itemId); // Encontrar o item correspondente ao estoque
//     return {
//       ...estoque,
//       itemDescricao: item ? item.descricao : 'Desconhecido',
//     };
//   }).filter((estoque) => {
//     const itemDescricao = estoque.itemDescricao || ""; // Garantir que itemDescricao seja uma string válida
//     return itemDescricao.toLowerCase().includes(searchQuery.toLowerCase());
//   });

//   // Preencher os dados do formulário quando um estoque for selecionado para edição
//   useEffect(() => {
//     if (selectedEstoque) {
//       setFormData({
//         itemId: selectedEstoque.itemId.toString(), // Garantir que o valor seja uma string
//         quantidade: selectedEstoque.quantidade,
//       });
//     } else {
//       setFormData({ itemId: '', quantidade: 0 });
//     }
//   }, [selectedEstoque]);

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Cabeçalho */}
//       <header className="bg-white shadow-sm">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <Link href="#" prefetch={false} className="flex items-center gap-2">
//             <img src="/Logo_Volea.png" alt="Logo Volea" className="h-8" />
//             <span className="font-bold text-2xl" style={{ color: "#f9b800" }}>
//               Volea
//             </span>
//           </Link>
//           <Button variant="ghost" size="sm" style={{ color: "#f9b800" }}>
//             <ArrowLeft className="h-4 w-4 mr-2" style={{ color: "#f9b800" }} />
//             Voltar
//           </Button>
//         </div>
//       </header>

//       {/* Conteúdo principal */}
//       <main className="flex-grow container mx-auto p-4 space-y-8">
//         {/* Formulário de cadastro */}
//         <Card style={{ backgroundColor: "#f4e7c3" }}>
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold">
//               {selectedEstoque ? 'Editar Item no Estoque' : 'Cadastrar Item no Estoque'}
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="itemId">Item</Label>
//                 <select
//                   id="itemId"
//                   name="itemId"
//                   value={formData.itemId} // Garantir que o valor do itemId seja uma string válida
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-md p-2"
//                 >
//                   <option value="" disabled>Selecione um item</option>
//                   {itens.map((item) => (
//                     <option key={item.id} value={item.id}>
//                       {item.descricao}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="quantidade">Quantidade</Label>
//                 <Input
//                   id="quantidade"
//                   name="quantidade"
//                   type="number"
//                   value={formData.quantidade}
//                   onChange={handleChange}
//                   min={1}
//                   required
//                 />
//               </div>
//               <div className="flex space-x-4">
//                 <Button type="submit" disabled={isSubmitting} className="mt-6">
//                   {selectedEstoque ? 'Salvar Alterações' : 'Cadastrar'}
//                 </Button>
//                 <Button type="button" onClick={handleCancel} variant="outline" className="mt-6">
//                   Cancelar
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>

//         {/* Campo de pesquisa */}
//         <div className="relative flex items-center space-x-4">
//           <Input
//             placeholder="Pesquise pelo nome do item..."
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-16 pr-4" // Ajustando o padding para o ícone
//           />
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//         </div>

//         {/* Exibição dos estoques */}
//         <div className="flex flex-wrap gap-2 mt-6 justify-start">
//         {filteredEstoques.length === 0 ? (
//           <Alert variant="destructive">
//             <AlertCircle className="h-5 w-5 mr-2" />
//             Nenhum item encontrado!
//           </Alert>
//         ) : (
//           filteredEstoques.map((estoque) => (
//             <Card key={estoque.id} className="w-full sm:w-1/3 xl:w-1/3 shadow-lg p-4">
//               <CardHeader>
//                 <CardTitle>{estoque.itemDescricao}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p>{estoque.quantidade} unidade(s)</p>
//                 <Button onClick={() => setSelectedEstoque(estoque)} className="mt-2">
//                   Editar
//                 </Button>
//               </CardContent>
//             </Card>
//           ))
//         )}
//       </div>




//       </main>
//     </div>
//   );
// }
'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Edit, Search } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import api from "@/service/api";
import Link from "next/link";
import { AxiosResponse } from 'axios';

interface Estoque {
  id: number;
  itemId: number;
  quantidade: number;
  descricao?: string;
}

interface Item {
  id: number;
  descricao: string;
}

export function CadastroEstoque() {
  const [formData, setFormData] = useState({
    itemId: '', 
    quantidade: 0,
  });

  const [estoques, setEstoques] = useState<Estoque[]>([]);
  const [itens, setItens] = useState<Item[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedEstoque, setSelectedEstoque] = useState<Estoque | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEstoques = async () => {
      try {
        const response = await api.get('/api/armazem');
        setEstoques(response.data);
      } catch (error) {
        console.error("Erro ao carregar itens do estoque.", error);
      }
    };

    const fetchItens = async () => {
      try {
        const response = await api.get('/api/itens');
        setItens(response.data);
      } catch (error) {
        console.error("Erro ao carregar itens.", error);
      }
    };

    fetchEstoques();
    fetchItens();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage(null);

    if (!formData.itemId || !formData.quantidade) {
      setSubmitStatus('error');
      setErrorMessage("Todos os campos obrigatórios devem ser preenchidos.");
      setIsSubmitting(false);
      return;
    }

    try {
      let response: AxiosResponse<any, any>;
      if (selectedEstoque) {
        response = await api.put(`/api/armazem/${selectedEstoque.id}`, formData);
      } else {
        response = await api.post('/api/armazem', formData);
      }

      setEstoques((prev) => [...prev, response.data]);
      setSubmitStatus('success');
      setFormData({ itemId: '', quantidade: 0 });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage("Erro ao cadastrar ou editar item do estoque.");
    }
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    setFormData({ itemId: '', quantidade: 0 });
    setSelectedEstoque(null);
  };

  const filteredEstoques = estoques.map((estoque) => {
    const item = itens.find((i) => i.id === estoque.itemId);
    return {
      ...estoque,
      itemDescricao: item ? item.descricao : 'Desconhecido',
    };
  }).filter((estoque) => {
    const itemDescricao = estoque.itemDescricao || "";
    return itemDescricao.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    if (selectedEstoque) {
      setFormData({
        itemId: selectedEstoque.itemId.toString(),
        quantidade: selectedEstoque.quantidade,
      });
    } else {
      setFormData({ itemId: '', quantidade: 0 });
    }
  }, [selectedEstoque]);

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
              {selectedEstoque ? 'Editar Item no Estoque' : 'Cadastrar Item no Estoque'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="itemId">Item</Label>
                <select
                  id="itemId"
                  name="itemId"
                  value={formData.itemId}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="" disabled>Selecione um item</option>
                  {itens.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.descricao}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantidade">Quantidade</Label>
                <Input
                  id="quantidade"
                  name="quantidade"
                  type="number"
                  value={formData.quantidade}
                  onChange={handleChange}
                  min={1}
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {selectedEstoque ? 'Salvar Alterações' : 'Cadastrar'}
                </Button>
                <Button type="button" onClick={handleCancel} variant="outline" className="w-full">
                  Cancelar
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>

        {/* Campo de pesquisa */}
        <div className="relative flex items-center space-x-4">
          <Input
            placeholder="Pesquise pelo nome do item..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-4"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Exibição dos estoques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredEstoques.length === 0 ? (
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5 mr-2" />
              Nenhum item encontrado!
            </Alert>
          ) : (
            filteredEstoques.map((estoque) => (
              <Card key={estoque.id} className="w-full shadow-lg p-4">
                <CardHeader>
                  <CardTitle>{estoque.itemDescricao}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <div>{estoque.quantidade} unidades</div>
                  <Button
                    onClick={() => setSelectedEstoque(estoque)}
                    variant="outline"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
