'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from 'next/link'

// Mock data for classes and students
const classes = [
  { id: '1', name: 'Volei - Turma A' },
  { id: '2', name: 'Futebol - Turma B' },
  { id: '3', name: 'Basquete - Turma C' },
]

const aulas = [
  { id: '1', name: 'A 11/10' },
  { id: '2', name: 'A 14/10' },
  { id: '3', name: 'A 14/11' },
]

const students = [
  { id: '1', name: 'Alice Johnson' },
  { id: '2', name: 'Bob Smith' },
  { id: '3', name: 'Charlie Brown' },
  { id: '4', name: 'Diana Ross' },
  { id: '5', name: 'Edward Norton' },
]

export function ChamadaProfessor() {
  const [selectedClass, setSelectedClass] = useState('')
  const [attendance, setAttendance] = useState<Record<string, boolean>>({})

  const handleClassChange = (value: string) => {
    setSelectedClass(value)
    setAttendance({})
  }

  const handleAttendanceChange = (studentId: string, isPresent: boolean) => {
    setAttendance(prev => ({ ...prev, [studentId]: isPresent }))
  }

  const handleSubmit = () => {
    console.log('Attendance submitted:', attendance)
    alert('Chamada enviada com sucesso!')
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
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#114494]">Chamada da Turma</CardTitle>
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

              <Select onValueChange={handleClassChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma aula" />
                </SelectTrigger>
                <SelectContent>
                  {aulas.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedClass && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-[#114494]">Lista de Presença</h3>
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`student-${student.id}`}
                        checked={attendance[student.id] || false}
                        onChange={(e) => handleAttendanceChange(student.id, e.target.checked)}
                        label={student.name}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSubmit} 
              disabled={!selectedClass}
              className="w-full bg-[#114494] hover:bg-[#0d3470] text-white"
            >
              Enviar Chamada
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

