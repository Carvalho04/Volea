'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useState } from "react"
import Link from 'next/link'

export function CadastrarEventos() {
  const [date, setDate] = useState<Date>()

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
            <span className="font-bold text-2xl" style={{ color: "#f9b800" }}>Volea</span>
          </Link>
          {/* Menu or additional links can go here */}
        </div>
      </header>

      <div className="p-8 flex-grow">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Cadastrar Novo Evento</CardTitle>
            <CardDescription>Adicione um novo evento ao calendário da Escola de Esportes Volea</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="event-name">Nome do Evento</Label>
              <Input id="event-name" placeholder="Digite o nome do evento" />
            </div>
            <div className="space-y-2">
              <Label>Data do Evento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Escolher uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-type">Tipo de Evento</Label>
              <Select>
                <SelectTrigger id="event-type">
                  <SelectValue placeholder="Selecione o tipo de evento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tournament">Torneio</SelectItem>
                  <SelectItem value="benef">Beneficente</SelectItem>
                  <SelectItem value="camp">Acampamento</SelectItem>
                  <SelectItem value="match">Partida</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" placeholder="Digite a descrição do evento" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-participants">Máximo de Participantes</Label>
              <Input id="max-participants" type="number" placeholder="Digite o número máximo de participantes" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Criar Evento</Button>
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
