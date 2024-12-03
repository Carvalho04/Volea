'use client';

import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { JSX, SVGProps } from "react"


export function HomeAluno() {
  return (
    <div className="flex flex-col min-h-screen text-center">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="#" prefetch={false} className="flex items-center gap-2">
            <img src="/Logo_Volea.png" alt="Logo Volea" className="h-8" />
            <span className="font-bold text-2xl" style={{ color: "#f9b800" }}>
              Volea
            </span>
          </Link>
          <nav className="ml-auto flex items-center gap-4 md:gap-6">
          <Link
              href="/alunos/perfil"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
              style={{ color: "#f9b800" }}
            >
              Perfil
            </Link>
            <Link
              href="/alunos/relatorioAluno"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
              style={{ color: "#f9b800" }}
            >
              Frequencia
            </Link>
            <Link
              href="/comunicacao"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
              style={{ color: "#f9b800" }}
            >
              Comunicados
            </Link>
            <Link
              href="/alunos/comprovanteMatricula"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
              style={{ color: "#f9b800" }}
            >
              Comprovante
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center py-12 md:py-24">
        <div className="container text-center space-y-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Bem-vindo, Henry!
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Aqui você pode gerenciar suas turmas, alunos e eventos com facilidade.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Cartões (Cards) */}
            <Card className="bg-[#fff6d8]">
              <CardHeader>
                <CardTitle>Pagamentos</CardTitle>
                <CardDescription>Ver Meus Pagamentos</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Gerencie seus pagamentos de maneira prática e organizada.</p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/financeiro/meuFinanceiro"
                  className="text-sm font-medium text-primary hover:underline"
                  prefetch={false}
                >
                  Ver Pagamentos
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-[#fff6d8]">
              <CardHeader>
                <CardTitle>Turmas</CardTitle>
                <CardDescription>Ver Turmas Ativas</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Visualize e edite suas turmas ativas.</p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/turmas"
                  className="text-sm font-medium text-primary hover:underline"
                  prefetch={false}
                >
                  Ver Turmas
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-[#fff6d8]">
              <CardHeader>
                <CardTitle>Eventos</CardTitle>
                <CardDescription>Ver Eventos Programados</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Fique por dentro dos próximos eventos e atividades.</p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/eventos"
                  className="text-sm font-medium text-primary hover:underline"
                  prefetch={false}
                >
                  Ver Eventos
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-[#114494] text-[#f9b800] py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 VOLEA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}


function ChevronDownIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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


function ExpandIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" />
      <path d="M3 16.2V21m0 0h4.8M3 21l6-6" />
      <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
      <path d="M3 7.8V3m0 0h4.8M3 3l6 6" />
    </svg>
  )
}


function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function SchoolIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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


