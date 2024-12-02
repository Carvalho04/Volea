// 'use client'

// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import Link from 'next/link'
// //import { Calendar, Download } from 'lucide-react'
// import { ArrowLeft, Calendar } from 'lucide-react'


// //  data for students and their attendance
// const studentAttendance = [
//   { 
//     classId: '1', 
//     className: 'Vôlei Sábados',
//     attendance: [
//       { id: '1', name: 'Alice Johnson', attendance: [true, true, false, true, true] },
//       { id: '2', name: 'Bob Smith', attendance: [true, false, true, true, true] },
//       { id: '3', name: 'Charlie Brown', attendance: [false, true, true, false, true] },
//       { id: '4', name: 'Diana Ross', attendance: [true, true, true, true, false] },
//       { id: '5', name: 'Edward Norton', attendance: [true, false, false, true, true] },
//     ]
//   },
//   { 
//     classId: '2', 
//     className: 'Futebol Sexta Feira',
//     attendance: [
//       { id: '1', name: 'Maria', attendance: [true, true, false, true, true] },
//       { id: '2', name: 'Pedro', attendance: [true, false, true, true, true] },
//       { id: '3', name: 'Joao', attendance: [false, true, true, false, true] },
//       { id: '4', name: 'Diana Ross', attendance: [true, true, true, true, false] },
//       { id: '5', name: 'Edward Norton', attendance: [true, false, false, true, true] },
//     ]
//   },
//   { 
//     classId: '3', 
//     className: 'Basquete Terças e Quintas',
//     attendance: [
//       { id: '1', name: 'Alice Johnson', attendance: [true, true, false, true, true] },
//       { id: '2', name: 'Bob Smith', attendance: [true, false, true, true, true] },
//       { id: '3', name: 'Charlie Brown', attendance: [false, true, true, false, true] },
//       { id: '4', name: 'Diana Ross', attendance: [true, true, true, true, false] },
//       { id: '5', name: 'Edward Norton', attendance: [true, false, false, true, true] },
//     ]
//   },
// ]


// export function RelatFreqAluno() {
//   const [selectedClass, setSelectedClass] = useState('')

//   const handleClassChange = (value: string) => {
//     setSelectedClass(value)
//   }

//   const calculateAttendance = (attendance: boolean[]) => {
//     const present = attendance.filter(a => a).length
//     const absent = attendance.length - present
//     return { present, absent }
//   }

//   const exportAttendance = () => {
//     // In a real application, this would generate a CSV or Excel file
//     console.log('Exporting attendance data...')
//     alert('Relatório de frequência exportado com sucesso!')
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <Link href="/professores" prefetch={false} className="flex items-center gap-2">
//             <img src="/Logo_Volea.png" alt="Logo Volea" className="h-8" />
//             <span className="font-bold text-2xl" style={{ color: "#f9b800" }}>
//               Volea
//             </span>
//           </Link>
//           <Link href="/alunos">
//           <Button variant="ghost" size="sm" style={{ color: "#f9b800" }}>
//             <ArrowLeft className="h-4 w-4 mr-2" style={{ color: "#f9b800" }} />
//             Voltar
//           </Button>
//           </Link>
//         </div>
//       </header>


//       <div className="p-8 flex-grow">
//         <Card className="max-w-4xl mx-auto">
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold text-[#114494]">Relatório de Frequência dos Alunos</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <Select onValueChange={handleClassChange}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Selecione uma turma" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {classes.map((cls) => (
//                     <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
              
//               {selectedClass && (
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Nome do Aluno</TableHead>
//                       <TableHead>Presenças</TableHead>
//                       <TableHead>Faltas</TableHead>
//                       <TableHead>Taxa de Presença</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {students.map((student) => {
//                       const { present, absent } = calculateAttendance(student.attendance)
//                       const attendanceRate = ((present / (present + absent)) * 100).toFixed(2)
//                       return (
//                         <TableRow key={student.id}>
//                           <TableCell>{student.name}</TableCell>
//                           <TableCell>{present}</TableCell>
//                           <TableCell>{absent}</TableCell>
//                           <TableCell>{attendanceRate}%</TableCell>
//                         </TableRow>
//                       )
//                     })}
//                   </TableBody>
//                 </Table>
//               )}
//             </div>
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             <Button 
//               onClick={() => {}} 
//               variant="outline"
//               className="flex items-center gap-2"
//             >
//               <Calendar className="h-4 w-4" />
//               Selecionar Período
//             </Button>
//             <Button 
//               onClick={exportAttendance} 
//               className="bg-[#114494] hover:bg-[#0d3470] text-white flex items-center gap-2"
//             >
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>

//       {/* Footer */}
//       <footer className="bg-[#114494] text-[#f9b800] py-4">
//         <div className="container mx-auto text-center">
//           <p>&copy; 2024 VOLEA. Todos os direitos reservados.</p>
//         </div>
//       </footer>
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from 'next/link'
import { ArrowLeft, Calendar, Download } from 'lucide-react'

//  data for students and their attendance
const studentAttendance = [
  { 
    classId: '1', 
    className: 'Vôlei Sábados',
    attendance: [
      { id: '1', name: 'Silvana Carolina Nunes', attendance: [true, true, false, true, true] },
      { id: '2', name: 'Leandro Iago Ian Ferreira', attendance: [true, false, true, true, true] },
      { id: '3', name: 'Natália Adriana Aurora Peixoto', attendance: [false, true, true, false, true] },
      { id: '4', name: 'Diogo Lorenzo Assis', attendance: [true, true, true, true, false] },
      { id: '5', name: 'Marcos Vinicius Isaac Raimundo Drumond', attendance: [true, false, false, true, true] },
    ]
  },
  { 
    classId: '2', 
    className: 'Futebol Sexta Feira',
    attendance: [
      { id: '1', name: 'Raquel Nina Fogaça', attendance: [true, true, false, true, true] },
      { id: '2', name: 'Andreia Giovana Helena Fernandes', attendance: [true, false, true, true, true] },
      { id: '3', name: 'Renato Vinicius Martins', attendance: [false, true, true, false, true] },

    ]
  },
  { 
    classId: '3', 
    className: 'Basquete Terças e Quintas',
    attendance: [
      { id: '1', name: 'Ana Maitê Figueiredo', attendance: [true, true, false, true, true] },
      { id: '2', name: 'Renato Vinicius Martins', attendance: [true, false, true, true, true] },
      { id: '3', name: 'Carolina Pietra Peixoto', attendance: [false, true, true, false, true] },
      { id: '4', name: 'Clara Evelyn Rezende', attendance: [true, true, true, true, false] },
    ]
  },
]

export function RelatFreqAluno() {
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedStudent, setSelectedStudent] = useState('')
  const [viewMode, setViewMode] = useState<'class' | 'student'>('class')

  const handleClassChange = (value: string) => {
    setSelectedClass(value)
    setSelectedStudent('')
  }

  const handleStudentChange = (value: string) => {
    setSelectedStudent(value)
  }

  const calculateAttendance = (attendance: boolean[]) => {
    const present = attendance.filter(a => a).length
    const absent = attendance.length - present
    return { present, absent }
  }

  const exportAttendance = () => {
    console.log('Exporting attendance data...')
    alert('Relatório de frequência exportado com sucesso!')
  }

  const getStudentAttendance = (studentId: string) => {
    return studentAttendance.map(cls => {
      const student = cls.attendance.find(s => s.id === studentId)
      if (student) {
        const { present, absent } = calculateAttendance(student.attendance)
        return {
          className: cls.className,
          present,
          absent,
          attendanceRate: ((present / (present + absent)) * 100).toFixed(2)
        }
      }
      return null
    }).filter(Boolean)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/professores" prefetch={false} className="flex items-center gap-2">
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

      <div className="p-8 flex-grow">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#114494]">Relatório de Frequência dos Alunos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button 
                  onClick={() => setViewMode('class')} 
                  variant={viewMode === 'class' ? 'default' : 'outline'}
                >
                  Por Turma
                </Button>
                <Button 
                  onClick={() => setViewMode('student')} 
                  variant={viewMode === 'student' ? 'default' : 'outline'}
                >
                  Por Aluno
                </Button>
              </div>

              {viewMode === 'class' && (
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
              )}

              {viewMode === 'student' && (
                <Select onValueChange={handleStudentChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um aluno" />
                  </SelectTrigger>
                  <SelectContent>
                    {studentAttendance.flatMap(cls => cls.attendance).map((student) => (
                      <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              {selectedClass && viewMode === 'class' && (
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
                    {studentAttendance.find(cls => cls.classId === selectedClass)?.attendance.map((student) => {
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

              {selectedStudent && viewMode === 'student' && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Turma</TableHead>
                      <TableHead>Presenças</TableHead>
                      <TableHead>Faltas</TableHead>
                      <TableHead>Taxa de Presença</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getStudentAttendance(selectedStudent).map((attendance, index) => (
                      <TableRow key={index}>
                        <TableCell>{attendance?.className}</TableCell>
                        <TableCell>{attendance?.present}</TableCell>
                        <TableCell>{attendance?.absent}</TableCell>
                        <TableCell>{attendance?.attendanceRate}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </CardContent>
          {/* <CardFooter className="flex justify-between">
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
              <Download className="h-4 w-4 mr-2" />
              Exportar Relatório
            </Button>
          </CardFooter> */}
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

