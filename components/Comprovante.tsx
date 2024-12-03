import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export function ComprovanteMatricula() {
  // Normalmente, estes dados viriam de uma API ou banco de dados
  const aluno = {
    nome: "Henry Matheus Rodrigues",
    cpf: "974.800.085-03",
    plano: "Diamante",
    dataMatricula: "01/02/2023",
    status: "Ativa",
  }

  const disciplinas = [
    { codigo: "16", nome: "Vôlei Sábados"},
    { codigo: "17", nome: "Futebol Sexta Feira"},
    { codigo: "18", nome: "Tênis de Mesa Domingos"},
    { codigo: "19", nome: "Basquete Todo dia"},
  ]

  return (

    <div className="flex flex-col min-h-screen bg-gray-100">
    {/* Header */}
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

    <div className="container mx-auto p-4 max-w-3xl">
    <Card className="p-8 border-2 border-gray-300 rounded-lg"> {/* Aumentando padding e bordas */}
  <CardHeader className="text-center border-b pb-6"> {/* Adicionando padding no CardHeader */}
    <CardTitle className="text-4xl font-bold">Comprovante de Matrícula</CardTitle> 
    <p className="text-muted-foreground text-xl">Escola de Esportes Volea</p>
  </CardHeader>
  <CardContent className="pt-12"> 
    <div className="grid grid-cols-2 gap-8 mb-8">
      <div>
        <p className="font-semibold text-lg">Nome do Aluno:</p>
        <p className="text-xl">{aluno.nome}</p>
      </div>
      <div>
        <p className="font-semibold text-lg">Cpf:</p>
        <p className="text-xl">{aluno.cpf}</p>
      </div>
      <div>
        <p className="font-semibold text-lg">Plano:</p>
        <p className="text-xl">{aluno.plano}</p>
      </div>
      <div>
        <p className="font-semibold text-lg">Data de Matrícula:</p>
        <p className="text-xl">{aluno.dataMatricula}</p>
      </div>
      <div>
        <p className="font-semibold text-lg">Status:</p>
        <Badge variant="default" className="text-lg">{aluno.status}</Badge>
      </div>
    </div>

    <h3 className="text-2xl font-semibold mb-4">Turmas Matriculadas</h3>
    <Table className="text-lg">
      <TableHeader>
        <TableRow>
          <TableHead className="text-xl">Código</TableHead>
          <TableHead className="text-xl">Turma</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {disciplinas.map((disciplina) => (
          <TableRow key={disciplina.codigo}>
            <TableCell className="text-xl">{disciplina.codigo}</TableCell>
            <TableCell className="text-xl">{disciplina.nome}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <div className="mt-8 text-center text-lg text-muted-foreground">
      <p>Este documento é válido para fins de comprovação de vínculo.</p>
      <p>Emitido em: {new Date().toLocaleDateString()}</p>
    </div>
  </CardContent>
</Card>

      
    </div>
    {/* Footer */}
    <footer className="bg-[#114494] text-[#f9b800] py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 VOLEA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

