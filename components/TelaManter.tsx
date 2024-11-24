"use client";

import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function TelaManter() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-background border-b px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <SchoolIcon className="h-6 w-6" />
          <span className="sr-only">School Management</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Comunicados
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Eventos
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Eventos
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium hover:underline underline-offset-4 flex items-center gap-1">
              Mais
              <ChevronDownIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="#" prefetch={false}>
                  Grades
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" prefetch={false}>
                  Attendance
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#" prefetch={false}>
                  Schedules
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </header>
      <main className="flex-1 px-4 lg:px-6 py-8 grid gap-8">
        <section>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Professores</h1>
            <Button variant="outline">Adicionar Professor</Button>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i}>
                <CardContent className="flex flex-col items-center gap-2">
                  <img
                    src="/placeholder.svg"
                    width={80}
                    height={80}
                    alt="Professor"
                    className="rounded-full"
                    style={{ aspectRatio: "80/80", objectFit: "cover" }}
                  />
                  <h3 className="text-lg font-semibold">Maria</h3>
                  <p className="text-muted-foreground">Vôlei</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Alunos</h2>
            <Button variant="outline">Adicionar Aluno</Button>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i}>
                <CardContent className="flex flex-col items-center gap-2">
                  <img
                    src="/placeholder.svg"
                    width={80}
                    height={80}
                    alt="Student"
                    className="rounded-full"
                    style={{ aspectRatio: "80/80", objectFit: "cover" }}
                  />
                  <h3 className="text-lg font-semibold">Vitória</h3>
                  <p className="text-muted-foreground">Turma B</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Events</h2>
            <Button variant="outline">Add Event</Button>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i}>
                <CardContent className="flex flex-col items-center gap-2">
                  <img
                    src="/placeholder.svg"
                    width={200}
                    height={150}
                    alt="Event"
                    className="rounded-lg object-cover w-full aspect-[4/3]"
                  />
                  <h3 className="text-lg font-semibold">Tech Meetup</h3>
                  <p className="text-muted-foreground">August 15, 2023</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">School</h3>
            <Link href="#" prefetch={false}>
              About
            </Link>
            <Link href="#" prefetch={false}>
              History
            </Link>
            <Link href="#" prefetch={false}>
              Mission
            </Link>
            <Link href="#" prefetch={false}>
              Contact
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Academics</h3>
            <Link href="#" prefetch={false}>
              Programs
            </Link>
            <Link href="#" prefetch={false}>
              Departments
            </Link>
            <Link href="#" prefetch={false}>
              Faculty
            </Link>
            <Link href="#" prefetch={false}>
              Research
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Student Life</h3>
            <Link href="#" prefetch={false}>
              Clubs
            </Link>
            <Link href="#" prefetch={false}>
              Athletics
            </Link>
            <Link href="#" prefetch={false}>
              Housing
            </Link>
            <Link href="#" prefetch={false}>
              Activities
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Admissions</h3>
            <Link href="#" prefetch={false}>
              Apply
            </Link>
            <Link href="#" prefetch={false}>
              Scholarships
            </Link>
            <Link href="#" prefetch={false}>
              Deadlines
            </Link>
            <Link href="#" prefetch={false}>
              Visit
            </Link>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <Link href="#" prefetch={false}>
              Library
            </Link>
            <Link href="#" prefetch={false}>
              IT Services
            </Link>
            <Link href="#" prefetch={false}>
              Career Center
            </Link>
            <Link href="#" prefetch={false}>
              Wellness
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


function SchoolIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 22v-4a2 2 0 1 0-4 0v4" />
      <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
      <path d="M18 5v17" />
      <path d="m4 6 8-4 8 4" />
      <path d="M6 5v17" />
      <circle cx="12" cy="9" r="2" />
    </svg>
  )
}
