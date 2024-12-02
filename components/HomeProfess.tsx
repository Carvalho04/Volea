'use client';

import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { JSX, SVGProps } from "react"

// export function HomeProfess() {
//   return (
//     <div className="flex flex-col min-h-screen text-center">
//     <header className="bg-white shadow-sm">
//      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//        <Link href="#" prefetch={false} className="flex items-center gap-2">
//          <img src="/Logo_Volea.png" alt="Logo Volea" className="h-8" />
//          <span className="font-bold text-2xl" style={{ color: "#f9b800" }}>
//            Volea 
//          </span>
//        </Link>
//        <nav className="ml-auto flex items-center gap-4 md:gap-6">
//             <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false} style={{ color: "#f9b800" }}>
//               Turmas
//             </Link>
//             <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false} style={{ color: "#f9b800" }}>
//               Alunos
//             </Link>
//             <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false} style={{ color: "#f9b800" }}>
//               Eventos
//             </Link>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="flex items-center gap-1" style={{ color: "#f9b800" }}>
//                   Mais
//                   <ChevronDownIcon className="h-4 w-4" style={{ color: "#f9b800" }} />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="bg-[#114494] text-[#f9b800]">
//                 <DropdownMenuItem>
//                   <Link href="#" prefetch={false} style={{ color: "#f9b800" }}>
//                     Comunicados
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Link href="#" prefetch={false} style={{ color: "#f9b800" }}>
//                     Aulas
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Link href="#" prefetch={false} style={{ color: "#f9b800" }}>
//                     Armazém
//                   </Link>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </nav>
//      </div>
//    </header>

    
//       <main className="flex-1 p-6 md:p-10">
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           <Card  className="bg-[#fff6d8]">
//             <CardHeader>
//               <CardTitle>Alunos</CardTitle>
//               <CardDescription>Ver Meus Alunos</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-col gap-2">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <Avatar>
//                       <AvatarImage src="/placeholder-user.jpg" alt="Professor João" />
//                       <AvatarFallback>PS</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <h4 className="font-medium">João Pedro</h4>
//                       <p className="text-sm text-muted-foreground">Turma Vôlei A</p>
//                     </div>
//                   </div>
//                   <Button variant="ghost" size="icon">
//                     <ExpandIcon className="h-5 w-5" />
//                   </Button>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <Avatar>
//                       <AvatarImage src="/placeholder-user.jpg" alt="Professora Maria" />
//                       <AvatarFallback>PJ</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <h4 className="font-medium">Maria Tereza</h4>
//                       <p className="text-sm text-muted-foreground">Turma de Ping Pong B</p>
//                     </div>
//                   </div>
//                   <Button variant="ghost" size="icon">
//                     <ExpandIcon className="h-5 w-5" />
//                   </Button>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <Avatar>
//                       <AvatarImage src="/placeholder-user.jpg" alt="Professor Garcia" />
//                       <AvatarFallback>PG</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <h4 className="font-medium">Laura Garcia</h4>
//                       <p className="text-sm text-muted-foreground">Turma de Basquete F</p>
//                     </div>
//                   </div>
//                   <Button variant="ghost" size="icon">
//                     <ExpandIcon className="h-5 w-5" />
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Link href="#" className="text-sm font-medium text-primary hover:underline" prefetch={false}>
//                 Ver Alunos
//               </Link>
//             </CardFooter>
//           </Card>
//           <Card className="bg-[#fff6d8]">
//             <CardHeader>
//               <CardTitle>Turmas</CardTitle>
//               <CardDescription>Ver Turmas Ativos</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-col gap-2">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <Avatar>
//                       <AvatarImage src="/placeholder-user.jpg" alt="Turma A" />
//                       <AvatarFallback>JD</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <h4 className="font-medium">Turma A</h4>
//                       <p className="text-sm text-muted-foreground">Vôlei</p>
//                     </div>
//                   </div>
//                   <Button variant="ghost" size="icon">
//                     <ExpandIcon className="h-5 w-5" />
//                   </Button>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <Avatar>
//                       <AvatarImage src="/placeholder-user.jpg" alt="Turma B" />
//                       <AvatarFallback>JS</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <h4 className="font-medium">Turma B</h4>
//                       <p className="text-sm text-muted-foreground">Futebol</p>
//                     </div>
//                   </div>
//                   <Button variant="ghost" size="icon">
//                     <ExpandIcon className="h-5 w-5" />
//                   </Button>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <Avatar>
//                       <AvatarImage src="/placeholder-user.jpg" alt="Turma C" />
//                       <AvatarFallback>ML</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <h4 className="font-medium">Turma C</h4>
//                       <p className="text-sm text-muted-foreground">Tênis de Mesa</p>
//                     </div>
//                   </div>
//                   <Button variant="ghost" size="icon">
//                     <ExpandIcon className="h-5 w-5" />
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Link href="#" className="text-sm font-medium text-primary hover:underline" prefetch={false}>
//                 Ver Turmas
//               </Link>
//             </CardFooter>
//           </Card>
//           <Card className="bg-[#fff6d8]">
//             <CardHeader>
//               <CardTitle>Eventos</CardTitle>
//               <CardDescription>Ver Eventos Programados</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-col gap-2">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <div className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-medium">
//                       Hoje
//                     </div>
//                     <div>
//                       <h4 className="font-medium">Festa Junina</h4>
//                       <p className="text-sm text-muted-foreground">4:00 PM - 6:00 PM</p>
//                     </div>
//                   </div>
//                   <Button variant="ghost" size="icon">
//                     <ExpandIcon className="h-5 w-5" />
//                   </Button>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <div className="bg-accent text-accent-foreground rounded-full px-3 py-1 text-sm font-medium">
//                       29/07
//                     </div>
//                     <div>
//                       <h4 className="font-medium">Campeonatinho</h4>
//                       <p className="text-sm text-muted-foreground">9:00 AM - 3:00 PM</p>
//                     </div>
//                   </div>
//                   <Button variant="ghost" size="icon">
//                     <ExpandIcon className="h-5 w-5" />
//                   </Button>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <div className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm font-medium">
//                       20/08
//                     </div>
//                     <div>
//                       <h4 className="font-medium">Dia dos Pais</h4>
//                       <p className="text-sm text-muted-foreground">7:00 PM - 9:00 PM</p>
//                     </div>
//                   </div>
//                   <Button variant="ghost" size="icon">
//                     <ExpandIcon className="h-5 w-5" />
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Link href="#" className="text-sm font-medium text-primary hover:underline" prefetch={false}>
//                 Ver eventos
//               </Link>
//             </CardFooter>
//           </Card>
//         </div>
      

//       </main>
//       <footer className="bg-[#114494] text-[#f9b800] py-4">
//         <div className="container mx-auto text-center">
//           <p>&copy; 2024 VOLEA. Todos os direitos reservados.</p>
//         </div>
//       </footer>
      
//     </div>
//   )
// }

export function HomeProfess() {
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
              href="/professores/perfil"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
              style={{ color: "#f9b800" }}
            >
              Perfil
            </Link>
            <Link
              href="/professores/relatorioFrequencia"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
              style={{ color: "#f9b800" }}
            >
              Frequencia
            </Link>
            <Link
              href="/professores/chamada"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
              style={{ color: "#f9b800" }}
            >
              Chamada
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center py-12 md:py-24">
        <div className="container text-center space-y-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Bem-vindo, Professor!
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Aqui você pode gerenciar suas turmas, alunos e eventos com facilidade.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Cartões (Cards) */}
            <Card className="bg-[#fff6d8]">
              <CardHeader>
                <CardTitle>Comunicados</CardTitle>
                <CardDescription>Ver Comunicdos</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Fique por dentro do que esta acontecendo em nossa escola.</p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/comunicacao"
                  className="text-sm font-medium text-primary hover:underline"
                  prefetch={false}
                >
                  Ver Comunicados
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


