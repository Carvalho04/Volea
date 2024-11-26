import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

type EntradaFaturamento = {
  id: string
  aluno: string
  turma: string
  valor: number
  dataVencimento: Date
  status: 'pago' | 'pendente'
}

type TabelaFaturamentoProps = {
  entradas: EntradaFaturamento[]
  onNotificar: (aluno: string) => void
}

export function TabelaFaturamento({ entradas, onNotificar }: TabelaFaturamentoProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Aluno</TableHead>
          <TableHead>Turma</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Data de Vencimento</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entradas.map((entrada) => (
          <TableRow key={entrada.id}>
            <TableCell>{entrada.aluno}</TableCell>
            <TableCell>{entrada.turma}</TableCell>
            <TableCell>{entrada.valor.toFixed(2)}</TableCell>
            <TableCell>{entrada.dataVencimento.toLocaleDateString()}</TableCell>
            <TableCell>{entrada.status === 'pago' ? 'Pago' : 'Pendente'}</TableCell>
            <TableCell>
              {entrada.status === 'pendente' && (
                <Button onClick={() => onNotificar(entrada.aluno)}>Notificar</Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

