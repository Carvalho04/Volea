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

  interface Pagamento {
    id: number;
    planoId: number;
    alunoId: number;
    descontoId: number;
    alunoNome: string;
    planoNome: string;
    descontoNome: string;
    valorPlano: number;
    valorDesconto: number;
    valorImposto: number;
    valorTotal: number;
    dataVencimento: Date;
    dataPagamento: Date;
    status: 'pago' | 'pendente';
    nomeplano?: string;
    nomealuno?:string;
    nomedesconto?: string;
    ativo: boolean;
  }

  interface Plano {
    id: number;
    nomeplano: string;
    valor: number;
  }


  interface Aluno {
    id: number;
    nomealuno: string;
  }


  interface Desconto {
    id: number;
    nomedesconto: string;
    valor: number;
  }

  export function CadastroPagamento() {
    const [formData, setFormData] = useState({
      planoId: '', 
      alunoId: '', 
      descontoId: '', 
      valorPlano: 0.0,
      valorDesconto:0.0,
      valorImposto:0.0,
      valorTotal: 0.0,
      dataVencimento: '',
      dataPagamento: '',
      status: 'pendente'
    });

    const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [planos, setPlanos] = useState<Plano[]>([]);
    const [descontos, setDescontos] = useState<Desconto[]>([]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [selectedPagamento, setSelectedPagamento] = useState<Pagamento | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const mapAtivoToStatus = (ativo: boolean): string => {
      return ativo ? "pendente" : "pago";
    };

    const mapStatusToAtivo = (status: string): boolean => {
      return status === "pendente";
    };
    
    useEffect(() => {

      const fetchPlanos = async () => {
        try {
          const response = await api.get('/api/planos');
          console.log('Planos recebidos:', response.data);  // Verifique se os planos estão corretos
          const mappedPlanos = response.data.map((plano: any) => ({
            id: plano.id,
            nomeplano: plano.nome, // Renomeando 'nome' para 'nomeplano'
            valor: plano.valor,
          }));
          setPlanos(mappedPlanos);
        } catch (error) {
          console.error("Erro ao carregar planos.", error);
        }
      };
      
      
    
      // const fetchAlunos = async () => {
      //   try {
      //     const response = await api.get('/api/usuarios/alunos');
      //     console.log('Alunos recebidos:', response.data);  // Verifique se os alunos estão corretos
      //     const mappedAlunos = response.data.map((aluno: any) => ({
      //       id: aluno.id,
      //       nomealuno: aluno.nome, // Renomeando 'nome' para 'nomealuno'
      //     }));
      //     setAlunos(mappedAlunos);
      //   } catch (error) {
      //     console.error("Erro ao carregar alunos.", error);
      //   }
      // };
      const fetchAlunos = async () => {
        try {
          const response = await api.get('/api/usuarios/alunos');
          if (response.data && Array.isArray(response.data)) {
            const mappedAlunos = response.data.map((aluno: any) => ({
              id: aluno.id,
              nomealuno: aluno.nome || 'Nome não encontrado', // Garantir que tenha valor
            }));
            setAlunos(mappedAlunos);
          } else {
            throw new Error('Formato de dados inválido para alunos');
          }
        } catch (error) {
          console.error("Erro ao carregar alunos:", error);
        }
      };
      
      
      const fetchDescontos = async () => {
        try {
          const response = await api.get('/api/descontos');
          console.log('Descontos recebidos:', response.data);  // Verifique se os descontos estão corretos
          const mappedDescontos = response.data.map((desconto: any) => ({
            id: desconto.id,
            nomedesconto: desconto.nome, // Renomeando 'nome' para 'nomedesconto'
            valor: desconto.valor,
          }));
          setDescontos(mappedDescontos);
        } catch (error) {
          console.error("Erro ao carregar descontos.", error);
        }
      };
      
      // const fetchPagamentos = async () => {
      //   try {
      //     const response = await api.get('/api/pagamentos');
      //     console.log('Resposta dos pagamentos:', response.data);  // Verifique aqui
      //     const pagamentosComStatus = response.data.map((pagamento: any) => ({
      //       ...pagamento,
      //       status: mapAtivoToStatus(pagamento.ativo), // Converte ativo para status
      //     }));
      //     setPagamentos(pagamentosComStatus);
      //   } catch (error) {
      //     console.error("Erro ao buscar pagamentos:", error);
      //   }
      // };

      const fetchPagamentos = async () => {
        try {
          const response = await api.get('/api/pagamentos');
          console.log('Resposta dos pagamentos:', response.data);
          const pagamentosComStatus = response.data.map((pagamento: any) => ({
            ...pagamento,
            planoId: Number(pagamento.planoId) || 0,  // Garantindo que planoId seja número
            alunoId: Number(pagamento.alunoId) || 0,  // Garantindo que alunoId seja número
            descontoId: Number(pagamento.descontoId) || 0,  // Garantindo que descontoId seja número
            status: mapAtivoToStatus(pagamento.ativo),
          }));
          setPagamentos(pagamentosComStatus);
        } catch (error) {
          console.error("Erro ao buscar pagamentos:", error);
        }
      };
      
      
      

      fetchPagamentos()
      fetchPlanos();
      fetchAlunos();
      fetchDescontos();
    }, []);
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
    
      setFormData((prev) => {
        const updatedData = { ...prev, [name]: value };
    
        // Atualiza valores relacionados a plano e desconto, como já está feito
        if (name === "planoId" && !selectedPagamento) {
          const selectedPlano = planos.find((plano) => plano.id === Number(value));
          updatedData.valorPlano = selectedPlano ? selectedPlano.valor : 0;
        }
    
        if (name === "descontoId" && !selectedPagamento) {
          const selectedDesconto = descontos.find((desconto) => desconto.id === Number(value));
          updatedData.valorDesconto = selectedDesconto ? selectedDesconto.valor : 0;
        }
    
        updatedData.valorImposto = (updatedData.valorPlano - updatedData.valorDesconto) * 0.06;
        updatedData.valorTotal = (updatedData.valorPlano - updatedData.valorDesconto) + updatedData.valorImposto;
    
        return updatedData;
      });
    };
    
    

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus(null);
      setErrorMessage(null);
    
      if (!formData.planoId || !formData.alunoId || !formData.descontoId || !formData.dataVencimento || !formData.dataPagamento) {
        setSubmitStatus('error');
        setErrorMessage("Todos os campos obrigatórios devem ser preenchidos.");
        setIsSubmitting(false);
        return;
      }
    
      try {
        const payload = {
          ...formData,
          ativo: mapStatusToAtivo(formData.status),
        };
    
        let response: AxiosResponse<any, any>;
        if (selectedPagamento) {
          response = await api.put(`/api/pagamentos/${selectedPagamento.id}`, payload);
        } else {
          response = await api.post('/api/pagamentos', payload);
        }
    
        setPagamentos((prev) => [...prev, response.data]);
        setSubmitStatus('success');
        setFormData({
          planoId: '',
          alunoId: '',
          descontoId: '',
          valorDesconto: 0.0,
          valorPlano: 0.0,
          valorImposto: 0.0,
          valorTotal: 0.0,
          dataVencimento: '',
          dataPagamento: '', // Limpa a data de pagamento
          status: 'pendente',
        });
      } catch (error) {
        setSubmitStatus('error');
        setErrorMessage("Erro ao cadastrar ou editar plano do pagamento.");
      }
      setIsSubmitting(false);
    };
    
  

    const handleCancel = () => {
      setFormData({
        planoId: '',
        alunoId: '',
        descontoId: '',
        valorDesconto: 0.0,
        valorPlano: 0.0,
        valorImposto: 0.0,
        valorTotal: 0.0,
        dataVencimento: '',
        dataPagamento: '',
        status: 'pendente',
      });
      setSelectedPagamento(null);
      setSearchQuery(""); // Limpar campo de pesquisa também
    };
    

    const filteredPagamentos = pagamentos.filter((pagamento) => {
      const selectedPlano = planos.find(plano => plano.id === pagamento.planoId);
      const selectedAluno = alunos.find(aluno => aluno.id === pagamento.alunoId);
      const selectedDesconto = descontos.find(desconto => desconto.id === pagamento.descontoId);
      
      const planoNome = selectedPlano ? selectedPlano.nomeplano : '';
      const alunoNome = selectedAluno ? selectedAluno.nomealuno : '';
      
      return (
        planoNome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alunoNome.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    
    
    
    
    
    

    useEffect(() => {
      if (selectedPagamento) {
        setFormData({
          planoId: selectedPagamento.planoId.toString(),
          alunoId: selectedPagamento.alunoId.toString(),
          descontoId: selectedPagamento.descontoId.toString(),
          valorPlano: selectedPagamento.valorPlano,
          valorDesconto: selectedPagamento.valorDesconto,
          valorImposto: selectedPagamento.valorImposto,
          valorTotal: selectedPagamento.valorTotal,
          dataVencimento: selectedPagamento.dataVencimento
          ? new Date(selectedPagamento.dataVencimento).toISOString().split('T')[0] // Converte para Date e depois formata
          : '',   
          dataPagamento: selectedPagamento.dataPagamento
          ? new Date(selectedPagamento.dataPagamento).toISOString().split('T')[0] // Converte para Date e depois formata
          : '',        
          status: mapAtivoToStatus(selectedPagamento.ativo),
        });
      } else {
        setFormData({
          planoId: '',
          alunoId: '',
          descontoId: '',
          valorPlano: 0,
          valorDesconto: 0,
          valorImposto: 0,
          valorTotal: 0,
          dataVencimento: '',
          dataPagamento:'',
          status: 'pendente',
        });
      }
    }, [selectedPagamento]);
    

    return (
      <div className="flex flex-col min-h-screen">
        {/* Cabeçalho */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between planos-center">
            <Link href="/initituicao" prefetch={false} className="flex planos-center gap-2">
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
                {selectedPagamento ? 'Editar Plano no Pagamento' : 'Cadastrar Plano no Pagamento'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                  <Label htmlFor="alunoId">Aluno</Label>
                  <select
                    id="alunoId"
                    name="alunoId"
                    value={formData.alunoId}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="" disabled>Selecione um aluno</option>
                    {alunos.map((aluno) => (
                      <option key={aluno.id} value={aluno.id}>
                        {aluno.nomealuno}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="planoId">Plano</Label>
                  <select
                    id="planoId"
                    name="planoId"
                    value={formData.planoId}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="" disabled>Selecione um plano</option>
                    {planos.map((plano) => (
                      <option key={plano.id} value={plano.id}>
                        {plano.nomeplano}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descontoId">Desconto</Label>
                  <select
                    id="descontoId"
                    name="descontoId"
                    value={formData.descontoId}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="" disabled>Selecione um desconto</option>
                    {descontos.map((desconto) => (
                      <option key={desconto.id} value={desconto.id}>
                        {desconto.nomedesconto}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valorImposto">Valor do Impsoto</Label>
                  <Input
                    id="valorImposoto"
                    name="valorImposto"
                    type="number"
                    value={formData.valorImposto.toFixed(2)}
                    readOnly
                    className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valorPlano">Valor do Plano</Label>
                  <Input
                    id="valorPlano"
                    name="valorPlano"
                    type="number"
                    value={formData.valorPlano}
                    readOnly
                    className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                  />

                </div>

                <div className="space-y-2">
                  <Label htmlFor="valorDesconto">Valor do Desconto</Label>
                  <Input
                    id="valorDesconto"
                    name="valorDesconto"
                    type="number"
                    value={formData.valorDesconto}
                    readOnly
                    className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataVencimento">Data de Vencimento</Label>
                  <Input
                    id="dataVencimento"
                    name="dataVencimento"
                    type="date"
                    value={formData.dataVencimento}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataPagamento">Data de Pagamento Prevista</Label>
                  <Input
                    id="dataPagamento"
                    name="dataPagamento"
                    type="date"
                    value={formData.dataPagamento}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valorTotal">Valor Total</Label>
                  <Input
                    id="valorTotal"
                    name="valorTotal"
                    type="number"
                    value={formData.valorTotal.toFixed(2)} // Formato de 2 casas decimais
                    readOnly
                    className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="pendente">Pendente</option>
                    <option value="pago">Pago</option>
                  </select>
                </div>



                {/* <div className="space-y-2">
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
                </div> */}
                <div className="flex flex-col space-y-2">
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {selectedPagamento ? 'Salvar Alterações' : 'Cadastrar'}
                  </Button>
                  <Button type="button" onClick={handleCancel} variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </div>

              </form>
            </CardContent>
          </Card>

          {/* Campo de pesquisa */}
          <div className="relative flex planos-center space-x-4">
            <Input
              placeholder="Pesquise pelo nome do plano..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-4"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Exibição dos pagamentos */}
          <div className="grid grid-cols-1 gap-4 mt-6">
          {filteredPagamentos.map((pagamento) => {
             console.log('Aluno ID:', pagamento.alunoId, 'Plano ID:', pagamento.planoId);
 
          const selectedPlano = planos.find(plano => plano.id === pagamento.planoId && pagamento.planoId !== 0);
          const selectedAluno = alunos.find(aluno => aluno.id === pagamento.alunoId && pagamento.alunoId !== 0);
          const selectedDesconto = descontos.find(desconto => desconto.id === pagamento.descontoId);
          console.log('Aluno ID:', pagamento.alunoId);
          console.log('Plano ID:', pagamento.planoId);
          console.log('Aluno encontrado:', selectedAluno);
          console.log('Plano encontrado:', selectedPlano);


          return (
            
            <Card key={pagamento.id} className="w-full shadow-lg p-4">
              <CardHeader>
                <CardTitle>{pagamento.alunoNome}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <p><strong>Plano:</strong> {pagamento.planoNome}</p>
                <p><strong>Desconto:</strong> {pagamento.descontoNome}</p>
                <p><strong>Data de Pagamento:</strong> {pagamento.dataPagamento ? new Date(pagamento.dataPagamento).toLocaleDateString() : 'Não informada'}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>


        </main>
      </div>
    );
  }
