'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, MapPin, Users, Edit, Trash2 } from "lucide-react"
import Link from 'next/link'

export function Eventos() {
  const events = [
    {
      name: "Acampamento de Basquete",
      date: "Fevereiro 05-25, 2024",
      location: "Volea Centro de Esportes, Quadra 1",
      description: "Um acampamento intensivo de basquete com duração de uma semana para jogadores juniores de 12 a 16 anos. Concentre-se em habilidades fundamentais, trabalho em equipe e estratégias de jogo.",
      maxParticipants: 15,
      currentParticipants: 12,
      coach: "Alex",
    },
    {
      name: "Campeonato de Volei",
      date: "Novembro 15-20, 2023",
      location: "Volea Sports Center, Court 1",
      description: "Um campeonato realizado para fazer nossos atletas se desenvolverem e crescerem como esportistas.",
      maxParticipants: 50,
      currentParticipants: 42,
      coach: "Fernanda Torres",
    },
    {
      name: "Futebol de Verão",
      date: "Agosto 5-10, 2024",
      location: "Volea Campo de Futebol, Campo 2",
      description: "Um acampamento de verão de futebol para jovens de 10 a 15 anos, focando em habilidades de drible e táticas de jogo.",
      maxParticipants: 30,
      currentParticipants: 25,
      coach: "Maria Silva",
    },
  ]

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
        </div>
      </header>

      <div className="p-8 flex-grow">
        {events.map((event, index) => (
          <Card key={index} className="max-w-3xl mx-auto mb-4">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl">{event.name}</CardTitle>
                  <CardDescription className="text-lg mt-2">
                    <CalendarDays className="inline mr-2" />
                    {event.date}
                  </CardDescription>
                  <CardDescription className="text-lg mt-1">
                    <MapPin className="inline mr-2" />
                    {event.location}
                  </CardDescription>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="icon" aria-label="Edit Event">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Delete Event">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                <p>{event.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Participantes</h3>
                  <p className="text-muted-foreground">
                    <Users className="inline mr-2" />
                    {event.currentParticipants} / {event.maxParticipants}
                  </p>
                </div>
                <Button aria-label="Manage Participants">Gerenciar Participantes</Button>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Treinador</h3>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt={event.coach} />
                    <AvatarFallback>{event.coach.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{event.coach}</p>
                    <p className="text-sm text-muted-foreground">Treinador Principal</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" aria-label="Download Schedule">Baixar Agenda</Button>
              <Button aria-label="Register for Event">Inscrever-se no Evento</Button>
            </CardFooter>
          </Card>
        ))}
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
