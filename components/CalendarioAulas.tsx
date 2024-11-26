'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { getWeekDates, formatDate, isSameDay } from '@/lib/date-utils'

// Mock data for classes and schedules
const classes = [
  { id: '1', name: 'Volei - Turma A', teacher: 'João Silva' },
  { id: '2', name: 'Futebol - Turma B', teacher: 'Maria Oliveira' },
  { id: '3', name: 'Basquete - Turma C', teacher: 'Pedro Santos' },
]

const initialSchedule = [
  { id: '1', classId: '1', date: new Date(2024, 2, 18, 14, 0), duration: 60 },
  { id: '2', classId: '2', date: new Date(2024, 2, 19, 15, 30), duration: 90 },
  { id: '3', classId: '3', date: new Date(2024, 2, 20, 16, 0), duration: 60 },
  { id: '4', classId: '1', date: new Date(2024, 2, 21, 14, 0), duration: 60 },
  { id: '5', classId: '2', date: new Date(2024, 2, 22, 15, 30), duration: 90 },
]

export function CalendarioAulas() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [schedule, setSchedule] = useState(initialSchedule)
  const [isAddingClass, setIsAddingClass] = useState(false)
  const [newClass, setNewClass] = useState({ classId: '', date: '', time: '', duration: '' })

  const weekDates = getWeekDates(currentDate)

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const handleNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  const handleAddClass = () => {
    const [year, month, day] = newClass.date.split('-').map(Number)
    const [hours, minutes] = newClass.time.split(':').map(Number)
    const newDate = new Date(year, month - 1, day, hours, minutes)

    const newScheduleItem = {
      id: String(schedule.length + 1),
      classId: newClass.classId,
      date: newDate,
      duration: Number(newClass.duration),
    }

    setSchedule([...schedule, newScheduleItem])
    setIsAddingClass(false)
    setNewClass({ classId: '', date: '', time: '', duration: '' })
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
        <Card className="max-w-6xl mx-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold text-[#114494]">Calendário de Aulas</CardTitle>
            <div className="flex items-center space-x-2">
              <Button onClick={handlePreviousWeek} variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium">
                {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
              </span>
              <Button onClick={handleNextWeek} variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-4">
              {weekDates.map((date, index) => (
                <div key={index} className="border rounded p-2">
                  <div className="font-semibold mb-2">{formatDate(date)}</div>
                  {schedule
                    .filter(item => isSameDay(item.date, date))
                    .map(item => {
                      const classInfo = classes.find(c => c.id === item.classId)
                      return (
                        <div key={item.id} className="bg-blue-100 p-2 rounded mb-2">
                          <div className="font-medium">{classInfo?.name}</div>
                          <div className="text-sm">{`${item.date.getHours()}:${item.date.getMinutes().toString().padStart(2, '0')}`}</div>
                          <div className="text-sm">{classInfo?.teacher}</div>
                        </div>
                      )
                    })}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
  <Dialog onOpenChange={setIsAddingClass}>
    <DialogTrigger asChild>
      <Button className="bg-[#114494] hover:bg-[#0d3470] text-white">
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Aula
      </Button>
    </DialogTrigger>
    {isAddingClass && (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Nova Aula</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Campo: Seleção de Turma */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="class" className="text-right">
              Turma
            </Label>
            <Select
              value={newClass.classId}
              onValueChange={(value) => setNewClass({ ...newClass, classId: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione a turma" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Campo: Data */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Data
            </Label>
            <Input
              id="date"
              type="date"
              value={newClass.date}
              onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
              className="col-span-3"
            />
          </div>

          {/* Campo: Horário */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Horário
            </Label>
            <Input
              id="time"
              type="time"
              value={newClass.time}
              onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
              className="col-span-3"
            />
          </div>

          {/* Campo: Duração */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duração (min)
            </Label>
            <Input
              id="duration"
              type="number"
              value={newClass.duration}
              onChange={(e) => setNewClass({ ...newClass, duration: e.target.value })}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleAddClass}
            className="bg-[#114494] text-white hover:bg-[#0d3470]"
          >
            Adicionar Aula
          </Button>
        </DialogFooter>
      </DialogContent>
    )}
  </Dialog>
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

