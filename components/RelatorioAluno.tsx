'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from 'next/link'
import { ArrowLeft, Calendar, Download } from 'lucide-react'

// Mock data for a student's attendance across different classes
const studentAttendance = [
  { 
    classId: '1', 
    className: 'Volei - Turma A',
    attendance: [
      { date: '2024-03-01', present: true },
      { date: '2024-03-08', present: true },
      { date: '2024-03-15', present: false },
      { date: '2024-03-22', present: true },
      { date: '2024-03-29', present: true },
    ]
  },
  { 
    classId: '2', 
    className: 'Futebol - Turma B',
    attendance: [
      { date: '2024-03-02', present: true },
      { date: '2024-03-09', present: false },
      { date: '2024-03-16', present: true },
      { date: '2024-03-23', present: true },
      { date: '2024-03-30', present: true },
    ]
  },
  { 
    classId: '3', 
    className: 'Basquete - Turma C',
    attendance: [
      { date: '2024-03-03', present: false },
      { date: '2024-03-10', present: true },
      { date: '2024-03-17', present: true },
      { date: '2024-03-24', present: false },
      { date: '2024-03-31', present: true },
    ]
  },
]

export function RelatorioAluno() {
  const [selectedClass, setSelectedClass] = useState('')

  const handleClassChange = (value: string) => {
    setSelectedClass(value)
  }

  const calculateAttendance = (attendance: { present: boolean }[]) => {
    const present = attendance.filter(a => a.present).length
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


      <div className="p-8 flex-grow">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#114494]">Meu Relatório de Frequência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select onValueChange={handleClassChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma turma" />
                </SelectTrigger>
                <SelectContent>
                  {studentAttendance.map((cls) => (
                    <SelectItem key={cls.classId} value={cls.classId}>{cls.className}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedClass && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Presença</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentAttendance
                      .find(cls => cls.classId === selectedClass)?.attendance
                      .map((record, index) => (
                        <TableRow key={index}>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>{record.present ? 'Presente' : 'Ausente'}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}

              {selectedClass && (
                <div className="mt-4">
                  {(() => {
                    const classData = studentAttendance.find(cls => cls.classId === selectedClass)
                    if (classData) {
                      const { present, absent } = calculateAttendance(classData.attendance)
                      const attendanceRate = ((present / (present + absent)) * 100).toFixed(2)
                      return (
                        <div className="text-sm text-muted-foreground">
                          <p>Total de Presenças: {present}</p>
                          <p>Total de Faltas: {absent}</p>
                          <p>Taxa de Presença: {attendanceRate}%</p>
                        </div>
                      )
                    }
                  })()}
                </div>
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
              <Download className="h-4 w-4" />
              Exportar Relatório
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

