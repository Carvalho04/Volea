'use client'

import { useState } from 'react'
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

type EntradaFaturamento = {
  id: string
  aluno: string
  turma: string
  valor: number
  dataVencimento: Date
  status: 'pago' | 'pendente'
}

const alunosMock = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince']
const turmasMock = ['Matemática 101', 'Literatura Inglesa', 'Física', 'Ciência da Computação']

export function TelaEntradaFaturamento() {
  const [entradas, setEntradas] = useState<EntradaFaturamento[]>([])
  const [aluno, setAluno] = useState('')
  const [turmaSelecionada, setTurmaSelecionada] = useState('')
  const [valor, setValor] = useState('')
  const [dataVencimento, setDataVencimento] = useState<Date>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!aluno || !turmaSelecionada || !valor || !dataVencimento) {
      toast.error("Por favor, preencha todos os campos")
      return
    }
    const novaEntrada: EntradaFaturamento = {
      id: Date.now().toString(),
      aluno,
      turma: turmaSelecionada,
      valor: parseFloat(valor),
      dataVencimento,
      status: 'pendente'
    }
    setEntradas([...entradas, novaEntrada])
    toast.success("Entrada de faturamento criada com sucesso")
    // Resetar formulário
    setAluno('')
    setTurmaSelecionada('')
    setValor('')
    setDataVencimento(undefined)
  }

  const notificarAluno = (nomeAluno: string) => {
    toast.success(`${nomeAluno} foi notificado sobre o pagamento pendente.`)
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
        <Card style={{ backgroundColor: "#f4e7c3" }}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Entrada de Faturamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="aluno">Aluno</Label>
                  <Select value={aluno} onValueChange={setAluno}>
                    <SelectTrigger id="aluno">
                      <SelectValue placeholder="Selecione o aluno" />
                    </SelectTrigger>
                    <SelectContent>
                      {alunosMock.map((a) => (
                        <SelectItem key={a} value={a}>{a}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="turma">Turma</Label>
                  <Select value={turmaSelecionada} onValueChange={setTurmaSelecionada}>
                    <SelectTrigger id="turma">
                      <SelectValue placeholder="Selecione a turma" />
                    </SelectTrigger>
                    <SelectContent>
                      {turmasMock.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valor">Valor</Label>
                  <Input
                    id="valor"
                    type="number"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    placeholder="Digite o valor"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataVencimento">Data de Vencimento</Label>
                  <DatePicker
                    selected={dataVencimento}
                    onSelect={(date: Date | undefined) => setDataVencimento(date)}
                  />
                </div>
              </div>
              <Button type="submit">Criar Entrada de Faturamento</Button>
            </form>

            <Tabs defaultValue="todas" className="w-full">
              <TabsList>
                <TabsTrigger value="todas">Todas as Entradas</TabsTrigger>
                <TabsTrigger value="porTurma">Por Turma</TabsTrigger>
                <TabsTrigger value="porAluno">Por Aluno</TabsTrigger>
              </TabsList>
              <TabsContent value="todas">
                <TabelaFaturamento entradas={entradas} onNotificar={notificarAluno} />
              </TabsContent>
              <TabsContent value="porTurma">
                <Select onValueChange={(value) => console.log('Filtrar por turma:', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a turma" />
                  </SelectTrigger>
                  <SelectContent>
                    {turmasMock.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <TabelaFaturamento entradas={entradas} onNotificar={notificarAluno} />
              </TabsContent>
              <TabsContent value="porAluno">
                <Select onValueChange={(value) => console.log('Filtrar por aluno:', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o aluno" />
                  </SelectTrigger>
                  <SelectContent>
                    {alunosMock.map((a) => (
                      <SelectItem key={a} value={a}>{a}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <TabelaFaturamento entradas={entradas} onNotificar={notificarAluno} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Rodapé */}
      <footer className="bg-white shadow-inner">
        <div className="container mx-auto px-4 py-4 flex justify-center items-center">
          <p className="text-sm text-gray-600">© 2024 Volea - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  )
}
