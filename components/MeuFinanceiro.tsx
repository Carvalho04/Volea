'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Payment, columns } from './columns'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const mockData: Payment[] = [
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
    paymentDate: null,
  },
]

export default function PaymentInquiryScreen() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredData = mockData.filter(payment =>
    payment.student.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleExtractReport = () => {
    // Implement report extraction logic here
    console.log('Extracting financial report...')
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
            <CardTitle className="text-2xl font-bold">
              Consultar Meus Pagamentos
            </CardTitle>
          </CardHeader>
          <CardContent>


            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((column) => (
                      <TableHead key={column.key}>{column.header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((payment) => (
                    <TableRow key={payment.id}>
                      {columns.map((column) => (
                        <TableCell key={column.key}>
                          {column.render ? column.render(payment) : payment[column.key as keyof Payment]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
