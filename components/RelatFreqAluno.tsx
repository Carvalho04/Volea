'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from 'next/link'
//import { Calendar, Download } from 'lucide-react'
import { Calendar } from 'lucide-react'


// Mock data for students and their attendance
const students = [
  { id: '1', name: 'Alice Johnson', attendance: [true, true, false, true, true] },
  { id: '2', name: 'Bob Smith', attendance: [true, false, true, true, true] },
  { id: '3', name: 'Charlie Brown', attendance: [false, true, true, false, true] },
  { id: '4', name: 'Diana Ross', attendance: [true, true, true, true, false] },
  { id: '5', name: 'Edward Norton', attendance: [true, false, false, true, true] },
]

const classes = [
  { id: '1', name: 'Volei - Turma A' },
  { id: '2', name: 'Futebol - Turma B' },
  { id: '3', name: 'Basquete - Turma C' },
]

export function RelatFreqAluno() {
  const [selectedClass, setSelectedClass] = useState('')

  const handleClassChange = (value: string) => {
    setSelectedClass(value)
  }

  const calculateAttendance = (attendance: boolean[]) => {
    const present = attendance.filter(a => a).length
    const absent = attendance.length - present
    return { present, absent }
  }

  const exportAttendance = () => {
    // In a real application, this would generate a CSV or Excel file
    console.log('Exporting attendance data...')
    alert('Relatório de frequência exportado com sucesso!')
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#114494] border-b shadow-sm sticky top-0 z-40">
        <div className="container px-4 md:px-6 flex items-center text-center h-16">
          <Link href="#" className="mr-6 flex items-center gap-2" prefetch={false}>
            <img 
              src="/Logo_Volea.png" 
              alt="Logo Volea" 
              className="h-8 w-auto"
            />
            <span className="font-bold text-2xl text-[#f9b800]">Volea</span>
          </Link>
        </div>
      </header>

      <div className="p-8 flex-grow">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#114494]">Relatório de Frequência dos Alunos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select onValueChange={handleClassChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma turma" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedClass && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome do Aluno</TableHead>
                      <TableHead>Presenças</TableHead>
                      <TableHead>Faltas</TableHead>
                      <TableHead>Taxa de Presença</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => {
                      const { present, absent } = calculateAttendance(student.attendance)
                      const attendanceRate = ((present / (present + absent)) * 100).toFixed(2)
                      return (
                        <TableRow key={student.id}>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{present}</TableCell>
                          <TableCell>{absent}</TableCell>
                          <TableCell>{attendanceRate}%</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              onClick={() => {}} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Selecionar Período
            </Button>
            <Button 
              onClick={exportAttendance} 
              className="bg-[#114494] hover:bg-[#0d3470] text-white flex items-center gap-2"
            >
            </Button>
          </CardFooter>
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

