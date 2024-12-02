// // 'use client'

// // import { useState } from 'react'
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // import { Checkbox } from "@/components/ui/checkbox"
// // import Link from 'next/link'
// // import { ArrowLeft } from 'lucide-react'

// // const classes = [
// //   { id: '1', name: 'Volei - Turma A' },
// //   { id: '2', name: 'Futebol - Turma B' },
// //   { id: '3', name: 'Basquete - Turma C' },
// // ]

// // const aulas = [
// //   { id: '1', name: 'A 11/10' },
// //   { id: '2', name: 'A 14/10' },
// //   { id: '3', name: 'A 14/11' },
// // ]

// // const students = [
// //   { id: '1', name: 'Alice Johnson' },
// //   { id: '2', name: 'Bob Smith' },
// //   { id: '3', name: 'Charlie Brown' },
// //   { id: '4', name: 'Diana Ross' },
// //   { id: '5', name: 'Edward Norton' },
// // ]

// // export function ChamadaProfessor() {
// //   const [selectedClass, setSelectedClass] = useState('')
// //   const [attendance, setAttendance] = useState<Record<string, boolean>>({})

// //   const handleClassChange = (value: string) => {
// //     setSelectedClass(value)
// //     setAttendance({})
// //   }

// //   const handleAttendanceChange = (studentId: string, isPresent: boolean) => {
// //     setAttendance(prev => ({ ...prev, [studentId]: isPresent }))
// //   }

// //   const handleSubmit = () => {
// //     console.log('Attendance submitted:', attendance)
// //     alert('Chamada enviada com sucesso!')
// //   }

// //   return (
// //     <div className="flex flex-col min-h-screen bg-gray-100">
// //       {/* Header */}
// //       <header className="bg-white shadow-sm">
// //         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
// //           <Link href="/professores" prefetch={false} className="flex items-center gap-2">
// //             <img src="/Logo_Volea.png" alt="Logo Volea" className="h-8" />
// //             <span className="font-bold text-2xl" style={{ color: "#f9b800" }}>
// //               Volea
// //             </span>
// //           </Link>
// //           <Link href="/professores">
// //           <Button variant="ghost" size="sm" style={{ color: "#f9b800" }}>
// //             <ArrowLeft className="h-4 w-4 mr-2" style={{ color: "#f9b800" }} />
// //             Voltar
// //           </Button>
// //           </Link>
// //         </div>
// //       </header>


// //       <div className="p-8 flex-grow">
// //         <Card className="max-w-3xl mx-auto">
// //           <CardHeader>
// //             <CardTitle className="text-2xl font-bold text-[#114494]">Chamada da Turma</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="space-y-4">

// //             <Select onValueChange={handleClassChange}>
// //                 <SelectTrigger className="w-full">
// //                   <SelectValue placeholder="Selecione uma turma" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   {classes.map((cls) => (
// //                     <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
// //                   ))}
// //                 </SelectContent>
// //               </Select>

// //               <Select onValueChange={handleClassChange}>
// //                 <SelectTrigger className="w-full">
// //                   <SelectValue placeholder="Selecione uma aula" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   {aulas.map((cls) => (
// //                     <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
// //                   ))}
// //                 </SelectContent>
// //               </Select>
              
// //               {selectedClass && (
// //                 <div className="space-y-2">
// //                   <h3 className="text-lg font-semibold text-[#114494]">Lista de Presença</h3>
// //                   {students.map((student) => (
// //                     <div key={student.id} className="flex items-center space-x-2">
// //                       <Checkbox
// //                         id={`student-${student.id}`}
// //                         checked={attendance[student.id] || false}
// //                         onChange={(e) => handleAttendanceChange(student.id, e.target.checked)}
// //                         label={student.name}
// //                       />
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           </CardContent>
// //           <CardFooter>
// //             <Button 
// //               onClick={handleSubmit} 
// //               disabled={!selectedClass}
// //               className="w-full bg-[#114494] hover:bg-[#0d3470] text-white"
// //             >
// //               Enviar Chamada
// //             </Button>
// //           </CardFooter>
// //         </Card>
// //       </div>

// //       {/* Footer */}
// //       <footer className="bg-[#114494] text-[#f9b800] py-4">
// //         <div className="container mx-auto text-center">
// //           <p>&copy; 2024 VOLEA. Todos os direitos reservados.</p>
// //         </div>
// //       </footer>
// //     </div>
// //   )
// // }
//   'use client'

//   import { useState } from 'react'
//   import { Button } from "@/components/ui/button"
//   import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
//   import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
//   import { Checkbox } from "@/components/ui/checkbox"
//   import Link from 'next/link'
//   import { ArrowLeft, Calendar } from 'lucide-react'
//   import { DatePicker } from './ui/date-picker'

//   const classes = [
//     { id: '1', name: 'Basquete Terças e Quintas' },
//     { id: '2', name: 'Futebol - Turma B' },
//     { id: '3', name: 'Basquete - Turma C' },
//   ]

//   const students = [
//     { id: '1', name: 'Alice Johnson' },
//     { id: '2', name: 'Bob Smith' },
//     { id: '3', name: 'Charlie Brown' },
//     { id: '4', name: 'Diana Ross' },
//     { id: '5', name: 'Edward Norton' },
//   ]

//   export function ChamadaProfessor() {
//     const [selectedClass, setSelectedClass] = useState('')
//     const [attendance, setAttendance] = useState<Record<string, boolean>>({})

//     const handleClassChange = (value: string) => {
//       setSelectedClass(value)
//       setAttendance({})
//     }

//     const [selectedDate, setSelectedDate] = useState<string | undefined>();

//     const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//       setSelectedDate(event.target.value); // Valor no formato 'YYYY-MM-DD'
//     };

//     const handleAttendanceChange = (studentId: string, isPresent: boolean) => {
//       setAttendance(prev => ({ ...prev, [studentId]: isPresent }))
//     }

//     const handleSubmit = () => {
//       console.log('Attendance submitted:', { class: selectedClass, date: selectedDate, attendance });
//       alert('Chamada enviada com sucesso!');
    
//       // Resetar os estados
//       setSelectedClass('');
//       setSelectedDate(undefined);
//       setAttendance({});
//     };
    

//     return (
//       <div className="flex flex-col min-h-screen bg-gray-100">
//         {/* Header */}
//         <header className="bg-white shadow-sm">
//           <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//             <Link href="/professores" prefetch={false} className="flex items-center gap-2">
//               <img src="/Logo_Volea.png" alt="Logo Volea" className="h-8" />
//               <span className="font-bold text-2xl" style={{ color: "#f9b800" }}>
//                 Volea
//               </span>
//             </Link>
//             <Link href="/professores">
//               <Button variant="ghost" size="sm" style={{ color: "#f9b800" }}>
//                 <ArrowLeft className="h-4 w-4 mr-2" style={{ color: "#f9b800" }} />
//                 Voltar
//               </Button>
//             </Link>
//           </div>
//         </header>

//         <div className="p-8 flex-grow">
//           <Card className="max-w-3xl mx-auto">
//             <CardHeader>
//               <CardTitle className="text-2xl font-bold text-[#114494]">Chamada da Turma</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <Select onValueChange={handleClassChange}>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Selecione uma turma" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {classes.map((cls) => (
//                       <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>

//                 <div className="flex items-center space-x-2">
//                 <label htmlFor="date-picker" className="block text-sm font-medium text-gray-700">
//                   Selecione uma data:
//                 </label>
//                   <input
//                     type="date"
//                     id="date-picker"
//                     value={selectedDate || ""}
//                     onChange={handleDateChange}
//                     className="w-full p-2 mt-1 border rounded-md"
//                     placeholder="Selecione uma data"
//                   />
//                   {selectedDate && (
//                     <p className="mt-2 text-sm text-gray-500">
//                       Data selecionada: {new Date(selectedDate).toLocaleDateString("pt-BR")}
//                     </p>
//                   )}

//                 </div>

//                 {selectedClass && selectedDate && (
//                   <div className="space-y-2">
//                     <h3 className="text-lg font-semibold text-[#114494]">Lista de Presença</h3>
//                     {students.map((student) => (
//                       <div key={student.id} className="flex items-center space-x-2">
//                         <Checkbox
//                           id={`student-${student.id}`}
//                           checked={attendance[student.id] || false}
//                           onChange={(e) => handleAttendanceChange(student.id, e.target.checked)}
//                         />
//                         <label htmlFor={`student-${student.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                           {student.name}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button 
//                 onClick={handleSubmit} 
//                 disabled={!selectedClass || !selectedDate}
//                 className="w-full bg-[#114494] hover:bg-[#0d3470] text-white"
//               >
//                 Enviar Chamada
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>

//         {/* Footer */}
//         <footer className="bg-[#114494] text-[#f9b800] py-4">
//           <div className="container mx-auto text-center">
//             <p>&copy; 2024 VOLEA. Todos os direitos reservados.</p>
//           </div>
//         </footer>
//       </div>
//     )
//   }


'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'

const studentAttendance = [
  { 
    classId: '1', 
    className: 'Vôlei Sábados',
    students: [
      { id: '1', name: 'Silvana Carolina Nunes' },
      { id: '2', name: 'Leandro Iago Ian Ferreira' },
      { id: '3', name: 'Natália Adriana Aurora Peixoto' },
      { id: '4', name: 'Diogo Lorenzo Assis' },
      { id: '5', name: 'Marcos Vinicius Isaac Raimundo Drumond' },
    ]
  },
  { 
    classId: '2', 
    className: 'Futebol Sexta Feira',
    students: [
      { id: '1', name: 'Raquel Nina Fogaça' },
      { id: '2', name: 'Andreia Giovana Helena Fernandes' },
      { id: '3', name: 'Renato Vinicius Martins' },
    ]
  },
  { 
    classId: '3', 
    className: 'Basquete Terças e Quintas',
    students: [
      { id: '1', name: 'Ana Maitê Figueiredo' },
      { id: '2', name: 'Renato Vinicius Martins' },
      { id: '3', name: 'Carolina Pietra Peixoto' },
      { id: '4', name: 'Clara Evelyn Rezende' },
    ]
  },
]

export function ChamadaProfessor() {
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedDate, setSelectedDate] = useState<string | undefined>()
  const [attendance, setAttendance] = useState<Record<string, boolean>>({})

  const handleClassChange = (value: string) => {
    setSelectedClass(value)
    setAttendance({})
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value)
    setAttendance({})
  }

  const handleAttendanceChange = (studentId: string, isPresent: boolean) => {
    setAttendance(prev => ({ ...prev, [studentId]: isPresent }))
  }

  const handleSubmit = () => {
    console.log('Attendance submitted:', { class: selectedClass, date: selectedDate, attendance })
    alert('Chamada enviada com sucesso!')
    
    // Reset states
    setSelectedClass('')
    setSelectedDate(undefined)
    setAttendance({})
  }

  const selectedClassData = studentAttendance.find(cls => cls.classId === selectedClass)

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
          <Link href="/professores">
            <Button variant="ghost" size="sm" style={{ color: "#f9b800" }}>
              <ArrowLeft className="h-4 w-4 mr-2" style={{ color: "#f9b800" }} />
              Voltar
            </Button>
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
              <Select onValueChange={handleClassChange} value={selectedClass}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma turma" />
                </SelectTrigger>
                <SelectContent>
                  {studentAttendance.map((cls) => (
                    <SelectItem key={cls.classId} value={cls.classId}>{cls.className}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-[#114494]" />
                <input
                  type="date"
                  id="date-picker"
                  value={selectedDate || ""}
                  onChange={handleDateChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Selecione uma data"
                />
              </div>

              {selectedDate && (
                <p className="text-sm text-gray-500">
                  Data selecionada: {new Date(selectedDate).toLocaleDateString("pt-BR")}
                </p>
              )}

              {selectedClassData && selectedDate && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-[#114494]">Lista de Presença - {selectedClassData.className}</h3>
                  {selectedClassData.students.map((student) => (
                    <div key={student.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`student-${student.id}`}
                        checked={attendance[student.id] || false}
                        onChange={(e) => handleAttendanceChange(student.id, e.target.checked)}
                      />
                      <label htmlFor={`student-${student.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {student.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSubmit} 
              disabled={!selectedClass || !selectedDate}
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

