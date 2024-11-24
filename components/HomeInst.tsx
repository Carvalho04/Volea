import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { JSX, SVGProps } from "react"
import Head from "next/head"




export function HomeInst() {
    return (
    
      <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#deecff" }}>
     
        <header className="bg-[#114494] border-b shadow-sm sticky top-0 z-40">
          <div className="container px-4 md:px-6 flex items-center h-16">
            <Link href="#" className="mr-6 flex items-center gap-2" prefetch={false}>
              <img 
                src="/Logo_Volea.png" 
                alt="Logo Volea" 
                className="h-8 w-auto"
              />
           <span className="font-bold text-2xl" style={{ color: "#f9b800" }}>Volea</span>
            </Link>
            <nav className="ml-auto flex items-center gap-4 md:gap-6">
              <Link href="/alunos/cadastroAlunos" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false} style={{ color: "#f9b800" }}>
                Alunos
              </Link>
              <Link href="/professores/cadastroProfessores" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false} style={{ color: "#f9b800" }}>
                Professores
              </Link>
              <Link href="/instituicao/manter" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false} style={{ color: "#f9b800" }}>
                Manter
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1" style={{ color: "#f9b800" }}>
                    Mais
                    <ChevronDownIcon className="h-4 w-4" style={{ color: "#f9b800" }} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#114494] text-[#f9b800]">
                  <DropdownMenuItem>
                    <Link href="#" prefetch={false} style={{ color: "#f9b800" }}>
                      Comunicados
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="#" prefetch={false} style={{ color: "#f9b800" }}>
                      Financeiro
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="#" prefetch={false} style={{ color: "#f9b800" }}>
                      Armazém
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </header>
        
        <main className="flex-1 bg-muted/40 py-12 md:py-24">
          <div className="container px-4 md:px-6 grid gap-12">
            <div className="grid gap-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Bem vindo!
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Organize seus recursos da melhor maneira possivel.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-[#fff6d8]">
                <CardHeader>
                  <CardTitle>Professores</CardTitle>
                  <CardDescription>Organize e mantenha seus professores.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold">120</span>
                    <UsersIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="w-full" prefetch={false}>
                    Ver Professores
                  </Link>
                </CardFooter>
              </Card>
  
              <Card className="bg-[#fff6d8]">
                <CardHeader>
                  <CardTitle>Alunos</CardTitle>
                  <CardDescription>Organize e mantenha seus alunos.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold">1,250</span>
                    <UsersIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="w-full" prefetch={false}>
                    Ver Alunos
                  </Link>
                </CardFooter>
              </Card>
  
              <Card className="bg-[#fff6d8]">
                <CardHeader>
                  <CardTitle>Eventos</CardTitle>
                  <CardDescription>Organize e acompanhe os futuros eventos.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold">24</span>
                    <CalendarIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="w-full" prefetch={false}>
                    Ver Eventos
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
  
        <footer className="bg-[#114494] p-6 md:py-12 w-full text-[#f9b800]">
          <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-16 text-sm">
            <div className="grid gap-4">
              <h3 className="font-semibold">Escola</h3>
              <Link href="#" prefetch={false}>
                Sobre
              </Link>
              <Link href="#" prefetch={false}>
                História
              </Link>
              <Link href="#" prefetch={false}>
                Missão
              </Link>
            </div>
  
            <div className="grid gap-4">
              <h3 className="font-semibold">Departamentos</h3>
              <Link href="#" prefetch={false}>
                Financeiro
              </Link>
              <Link href="#" prefetch={false}>
                Almoxarifado
              </Link>
              <Link href="#" prefetch={false}>
                Esportes
              </Link>
            </div>
  
            <div className="grid gap-4">
              <h3 className="font-semibold">Contatos</h3>
              <Link href="#" prefetch={false}>
                Whatsapp
              </Link>
              <Link href="#" prefetch={false}>
                Instagram
              </Link>
              <Link href="#" prefetch={false}>
                E-mail
              </Link>
            </div>
          </div>
        </footer>
      </div>
    )
  }
  
    

function CalendarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
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


function UsersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
