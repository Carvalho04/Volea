// import { Judson } from 'next/font/google'
// Judson({
//   subsets: ['latin'],
//   display: 'swap',
// })

import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { JSX, SVGProps } from "react"

export function HomeStudent() {
  return (
    <div className=" flex flex-col min-h-screen text-center">
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
          <nav className="ml-auto flex items-center text-center gap-4 md:gap-6">
            <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false} style={{ color: "#f9b800" }}>
              Fazer Login
            </Link>
      
          
          </nav>
        </div>
      </header>
      <main className="flex-1 flex flex-col justify-center items-center">
        <section className=" py-12 md:py-24 items-center text-center ">
          <div className="container grid gap-8 md:grid-cols-2 items-center text-center ">
            <div className="space-y-4 ">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Bem Vindo A Nossa Escola</h1>
              <p className="text-muted-foreground md:text-xl">
                Descubra a melhor experiencia em gerenciamento escolar conosco.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row items-center">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Se cadastrar
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Saber mais...
                </Link>
              </div>
            </div>
            <img
              src="/placeholder.svg"
              width={550}
              height={550}
              alt="School"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
            />
          </div>
        </section>
        <section className="py-12 md:py-24">
          <div className="container grid gap-8">
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Próximos Eventos</h2>
              <p className="text-muted-foreground md:text-xl">Confira nossos próximos eventos e atividades.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Acampamento de Basquete</CardTitle>
                  <CardDescription>Nos acompanhe no nosso anual acampamento intensivo de basquete</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                    <p className="text-muted-foreground">Maio 15, 2023</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-muted-foreground" />
                    <p className="text-muted-foreground">9:00 AM - 3:00 PM</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Mais Informações
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Campeonato de Volei</CardTitle>
                  <CardDescription>Um campeonato realizado para fazer nossos atletas se desenvolverem e crescerem como esportistas.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                    <p className="text-muted-foreground">Junho 10, 2023</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-muted-foreground" />
                    <p className="text-muted-foreground">2:00 PM - 5:00 PM</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Mais Informações
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Futebol de Verão</CardTitle>
                  <CardDescription>Um acampamento de verão de futebol para jovens de 10 a 15 anos, focando em habilidades de drible e táticas de jogo.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                    <p className="text-muted-foreground">Agosto 5, 2023</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-muted-foreground" />
                    <p className="text-muted-foreground">6:00 PM - 9:00 PM</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Mais Informações
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container grid gap-8">
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Conheça os Professores</h2>
              <p className="text-muted-foreground md:text-xl">
                Ceja os professores que já utilizam de nossos serviços e venha fazer parte!
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <img
                    src="/placeholder.svg"
                    width={100}
                    height={100}
                    alt="Professor"
                    className="rounded-full"
                    style={{ aspectRatio: "100/100", objectFit: "cover" }}
                  />
                  <CardTitle>Sarah Pereira</CardTitle>
                  <CardDescription>Professora de Handeboll</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A professora Sarah é amada pelos nossos pequeninos à 5 anos.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <img
                    src="/placeholder.svg"
                    width={100}
                    height={100}
                    alt="Professor"
                    className="rounded-full"
                    style={{ aspectRatio: "100/100", objectFit: "cover" }}
                  />
                  <CardTitle>João Pedro</CardTitle>
                  <CardDescription>Professor de Basquete</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                   O Professor João é amado pelos nossos pequenos a 1 ano.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <img
                    src="/placeholder.svg"
                    width={100}
                    height={100}
                    alt="Professor"
                    className="rounded-full"
                    style={{ aspectRatio: "100/100", objectFit: "cover" }}
                  />
                  <CardTitle>Maria Gonzalez</CardTitle>
                  <CardDescription>Professora de Vôlei</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                  O Professora Maria é amada pelos nossos pequenos a 7 ano.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[#114494] text-[#f9b800] py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 VOLEA. Todos os direitos reservados.</p>
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


function ClockIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
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
