  // 'use client'

  // import { useState } from 'react'
  // import { Button } from "@/components/ui/button"
  // import { Input } from "@/components/ui/input"
  // import { Label } from "@/components/ui/label"
  // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
  // import { DatePicker } from "@/components/ui/date-picker"
  // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  // import { TabelaFaturamento } from "@/components/tabela-faturamento"
  // import { toast } from "@/components/ui/use-toast"
  // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  // import { ArrowLeft } from "lucide-react"
  // import Link from "next/link"

  // type EntradaFaturamento = {
  //   id: string
  //   aluno: string
  //   turma: string
  //   valor: number
  //   dataVencimento: Date
  //   status: 'pago' | 'pendente'
  // }

  // const alunosMock = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince']
  // const turmasMock = ['Matemática 101', 'Literatura Inglesa', 'Física', 'Ciência da Computação']

  // export function TelaEntradaFaturamento() {
  //   const [entradas, setEntradas] = useState<EntradaFaturamento[]>([])
  //   const [aluno, setAluno] = useState('')
  //   const [turmaSelecionada, setTurmaSelecionada] = useState('')
  //   const [valor, setValor] = useState('')
  //   const [dataVencimento, setDataVencimento] = useState<Date>()

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault()
  //     if (!aluno || !turmaSelecionada || !valor || !dataVencimento) {
  //       toast.error("Por favor, preencha todos os campos")
  //       return
  //     }
  //     const novaEntrada: EntradaFaturamento = {
  //       id: Date.now().toString(),
  //       aluno,
  //       turma: turmaSelecionada,
  //       valor: parseFloat(valor),
  //       dataVencimento,
  //       status: 'pendente'
  //     }
  //     setEntradas([...entradas, novaEntrada])
  //     toast.success("Entrada de faturamento criada com sucesso")
  //     // Resetar formulário
  //     setAluno('')
  //     setTurmaSelecionada('')
  //     setValor('')
  //     setDataVencimento(undefined)
  //   }

  //   const notificarAluno = (nomeAluno: string) => {
  //     toast.success(`${nomeAluno} foi notificado sobre o pagamento pendente.`)
  //   }

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
  //         <Card style={{ backgroundColor: "#f4e7c3" }}>
  //           <CardHeader>
  //             <CardTitle className="text-2xl font-bold">
  //               Entrada de Faturamento
  //             </CardTitle>
  //           </CardHeader>
  //           <CardContent>
  //             <form onSubmit={handleSubmit} className="space-y-4 mb-8">
  //               <div className="grid grid-cols-2 gap-4">
  //                 <div className="space-y-2">
  //                   <Label htmlFor="aluno">Aluno</Label>
  //                   <Select value={aluno} onValueChange={setAluno}>
  //                     <SelectTrigger id="aluno">
  //                       <SelectValue placeholder="Selecione o aluno" />
  //                     </SelectTrigger>
  //                     <SelectContent>
  //                       {alunosMock.map((a) => (
  //                         <SelectItem key={a} value={a}>{a}</SelectItem>
  //                       ))}
  //                     </SelectContent>
  //                   </Select>
  //                 </div>
  //                 <div className="space-y-2">
  //                   <Label htmlFor="turma">Turma</Label>
  //                   <Select value={turmaSelecionada} onValueChange={setTurmaSelecionada}>
  //                     <SelectTrigger id="turma">
  //                       <SelectValue placeholder="Selecione a turma" />
  //                     </SelectTrigger>
  //                     <SelectContent>
  //                       {turmasMock.map((t) => (
  //                         <SelectItem key={t} value={t}>{t}</SelectItem>
  //                       ))}
  //                     </SelectContent>
  //                   </Select>
  //                 </div>
  //                 <div className="space-y-2">
  //                   <Label htmlFor="valor">Valor</Label>
  //                   <Input
  //                     id="valor"
  //                     type="number"
  //                     value={valor}
  //                     onChange={(e) => setValor(e.target.value)}
  //                     placeholder="Digite o valor"
  //                   />
  //                 </div>
  //                 <div className="space-y-2">
  //                   <Label htmlFor="dataVencimento">Data de Vencimento</Label>
  //                   <DatePicker
  //                     selected={dataVencimento}
  //                     onSelect={(date: Date | undefined) => setDataVencimento(date)}
  //                   />
  //                 </div>
  //               </div>
  //               <Button type="submit">Criar Entrada de Faturamento</Button>
  //             </form>

  //             <Tabs defaultValue="todas" className="w-full">
  //               <TabsList>
  //                 <TabsTrigger value="todas">Todas as Entradas</TabsTrigger>
  //                 <TabsTrigger value="porTurma">Por Turma</TabsTrigger>
  //                 <TabsTrigger value="porAluno">Por Aluno</TabsTrigger>
  //               </TabsList>
  //               <TabsContent value="todas">
  //                 <TabelaFaturamento entradas={entradas} onNotificar={notificarAluno} />
  //               </TabsContent>
  //               <TabsContent value="porTurma">
  //                 <Select onValueChange={(value) => console.log('Filtrar por turma:', value)}>
  //                   <SelectTrigger>
  //                     <SelectValue placeholder="Selecione a turma" />
  //                   </SelectTrigger>
  //                   <SelectContent>
  //                     {turmasMock.map((t) => (
  //                       <SelectItem key={t} value={t}>{t}</SelectItem>
  //                     ))}
  //                   </SelectContent>
  //                 </Select>
  //                 <TabelaFaturamento entradas={entradas} onNotificar={notificarAluno} />
  //               </TabsContent>
  //               <TabsContent value="porAluno">
  //                 <Select onValueChange={(value) => console.log('Filtrar por aluno:', value)}>
  //                   <SelectTrigger>
  //                     <SelectValue placeholder="Selecione o aluno" />
  //                   </SelectTrigger>
  //                   <SelectContent>
  //                     {alunosMock.map((a) => (
  //                       <SelectItem key={a} value={a}>{a}</SelectItem>
  //                     ))}
  //                   </SelectContent>
  //                 </Select>
  //                 <TabelaFaturamento entradas={entradas} onNotificar={notificarAluno} />
  //               </TabsContent>
  //             </Tabs>
  //           </CardContent>
  //         </Card>
  //       </main>

  //       {/* Rodapé */}
  //       <footer className="bg-white shadow-inner">
  //         <div className="container mx-auto px-4 py-4 flex justify-center items-center">
  //           <p className="text-sm text-gray-600">© 2024 Volea - Todos os direitos reservados</p>
  //         </div>
  //       </footer>
  //     </div>
  //   )
  // }
  'use client'

  import { useState, useEffect } from 'react'
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
  import { DatePicker } from "@/components/ui/date-picker"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import { TabelaFaturamento } from "@/components/tabela-faturamento"
  import { toast } from "@/components/ui/use-toast"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { ArrowLeft } from "lucide-react"
  import Link from "next/link"
  import api  from "@/service/api" 

  // Tipos
  interface Aluno {
    id: string;
    nome: string;
  }
  
  interface Turma {
    id: string;
    nome: string;
  }
  
  interface Plano {
    id: string;
    nome: string;
    valor: number;
  }
  
  interface Desconto {
    id: string;
    nome: string;
    valor: number;
  }
  
  interface Pagamento {
    id: string;
    aluno: string;
    turma: string;
    plano: string;
    desconto: string | undefined;
    valorPlano: number;
    valorDesconto: number;
    valorImposto: number;
    valorTotal: number;
    dataVencimento: Date;
    status: 'pago' | 'pendente';
  }
  

  export function TelaEntradaFaturamento() {
    const [entradas, setEntradas] = useState<Pagamento[]>([])
    const [alunos, setAlunos] = useState<Aluno[]>([])
    const [turmas, setTurmas] = useState<Turma[]>([])
    const [planos, setPlanos] = useState<Plano[]>([])
    const [descontos, setDescontos] = useState<Desconto[]>([])

    const [aluno, setAluno] = useState<string | undefined>(undefined)
    const [turmaSelecionada, setTurmaSelecionada] = useState<string | undefined>(undefined)
    const [planoSelecionado, setPlanoSelecionado] = useState<string | undefined>(undefined)
    const [descontoSelecionado, setDescontoSelecionado] = useState<string | undefined>(undefined)
    const [status, setStatus] = useState<'pago' | 'pendente'>('pendente')
    const [valorOriginal, setValorOriginal] = useState(0)
    const [valorDesconto, setValorDesconto] = useState(0)
    const [valorImposto, setValorImposto] = useState(0)
    const [valorTotal, setValorTotal] = useState(0)
    const [dataVencimento, setDataVencimento] = useState<Date>()



    // Buscar dados do servidor
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [alunosRes, turmasRes, planosRes, descontosRes, pagamentosRes] = await Promise.all([
            api.get<Aluno[]>('/api/usuarios/alunos'),
            api.get<Turma[]>('/api/classes'),
            api.get<Plano[]>('/api/planos'),
            api.get<Desconto[]>('/api/descontos'),
            api.get<Pagamento[]>('/api/pagamentos'),
          ])
          
          setAlunos(alunosRes.data)
          setTurmas(turmasRes.data)
          setPlanos(planosRes.data)
          setDescontos(descontosRes.data)
          setEntradas(pagamentosRes.data)
    
          // Definir o primeiro aluno como valor inicial
          if (alunosRes.data.length > 0) {
            setAluno(alunosRes.data[0].id)
          }
    
          // O mesmo pode ser feito para os outros campos, se necessário
          if (planosRes.data.length > 0) {
            setPlanoSelecionado(planosRes.data[0].id)
          }
          if (descontosRes.data.length > 0) {
            setDescontoSelecionado(descontosRes.data[0].id)
          }
        } catch (error) {
          toast.error("Erro ao carregar dados. Tente novamente.")
        }
      }
      fetchData()
      console.log('Aluno inicial:', aluno);
    }, [])
    
    
    

    // Atualizar valores automaticamente
    useEffect(() => {
      // Só recalcula quando planoSelecionado ou descontoSelecionado mudarem
      if (planoSelecionado && descontoSelecionado) {
        const planoSelecionadoObj = planos.find(p => p.id === planoSelecionado);
        const descontoSelecionadoObj = descontos.find(d => d.id === descontoSelecionado);
        if (planoSelecionadoObj && descontoSelecionadoObj) {
          const valorBase = planoSelecionadoObj.valor;
          const desconto = descontoSelecionadoObj.valor;
          const imposto = valorBase * 0.05;
          const total = valorBase - desconto + imposto;
    
          setValorOriginal(valorBase);
          setValorDesconto(desconto);
          setValorImposto(imposto);
          setValorTotal(total);
          
        }
      }
    }, [planoSelecionado, descontoSelecionado]);
    
    

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      if (!aluno || !turmaSelecionada || !planoSelecionado || !dataVencimento) {
        toast.error("Por favor, preencha todos os campos")
        return
      }

      const novaEntrada: Pagamento = {
        id: Date.now().toString(),
        aluno,
        turma: turmaSelecionada,
        plano: planoSelecionado,
        desconto: descontoSelecionado,
        valorOriginal,
        valorDesconto,
        valorImposto,
        valorTotal,
        dataVencimento,
        status
      }

      try {
        await api.post('/pagamentos', novaEntrada)  // Envia o pagamento para o servidor
        setEntradas([...entradas, novaEntrada])
        toast.success("Entrada de faturamento criada com sucesso")
        setAluno('')
        setTurmaSelecionada('')
        setPlanoSelecionado('')
        setDescontoSelecionado('')
        setStatus('pendente')
        setDataVencimento(undefined)
      } catch (error) {
        toast.error("Erro ao criar entrada de faturamento")
      }
    }

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
          <Card style={{ backgroundColor: "#f4e7c3" }}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Entrada de Faturamento</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  {/* Campos */}
                  <div className="space-y-2">
                    <Label htmlFor="aluno">Aluno</Label>
                    <Select value={aluno || ''} onValueChange={setAluno}>
                      <SelectTrigger id="aluno">
                        <SelectValue placeholder="Selecione o aluno" />
                      </SelectTrigger>
                      <SelectContent>
                        {alunos.map((a) => (
                          <SelectItem key={a.id} value={a.id}>{a.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>


                  </div>


                  {/* <div className="space-y-2">
                  <Label htmlFor="plano">Plano</Label>
                  <Select value={planoSelecionado || ''} onValueChange={setPlanoSelecionado}>
                    <SelectTrigger id="plano">
                      <SelectValue placeholder="Selecione o plano" />
                    </SelectTrigger>
                    <SelectContent>
                      {planos.map((p) => (
                        <SelectItem key={p.id} value={p.id}>{p.nome} - R$ {p.valor.toFixed(2)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  </div> */}

                  {/* <div className="space-y-2">
                    <Label htmlFor="desconto">Desconto</Label>
                    <Select value={descontoSelecionado || ''} onValueChange={setDescontoSelecionado}>
                      <SelectTrigger id="desconto">
                        <SelectValue placeholder="Selecione o desconto" />
                      </SelectTrigger>
                      <SelectContent>
                        {descontos.map((d) => (
                          <SelectItem key={d.id} value={d.id}>{d.nome} - R$ {d.valor.toFixed(2)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div> */}

                  {/* <div className="space-y-2">
                    <Label>Valor Original</Label>
                    <Input type="text" readOnly value={`R$ ${valorOriginal.toFixed(2)}`} />
                  </div> */}

                  {/* <div className="space-y-2">
                    <Label>Valor Desconto</Label>
                    <Input type="text" readOnly value={`R$ ${valorDesconto.toFixed(2)}`} />
                  </div> */}

                  {/* <div className="space-y-2">
                    <Label>Imposto</Label>
                    <Input type="text" readOnly value={`R$ ${valorImposto.toFixed(2)}`} />
                  </div> */}

                  {/* <div className="space-y-2">
                    <Label>Valor Total</Label>
                    <Input type="text" readOnly value={`R$ ${valorTotal.toFixed(2)}`} />
                  </div> */}

                  {/* <div className="space-y-2">
                    <Label>Data Vencimento</Label>
                    <DatePicker selected={dataVencimento} 
                      onSelect={setDataVencimento} 
                    />
                  </div> */}

                  {/* <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={status} onValueChange={(value: string) => setStatus(value as 'pago' | 'pendente')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pago">Pago</SelectItem>
                        <SelectItem value="pendente">Pendente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div> */}

                </div>

                <Button type="submit">Criar Entrada de Faturamento</Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }
