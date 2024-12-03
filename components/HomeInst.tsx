import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { JSX, SVGProps, useEffect, useState } from "react"
import Head from "next/head"
import api from "@/service/api"

  
export function HomeInst() {

  const [usuariosAtivos, setUsuariosAtivos] = useState(0);
  const [professoresAtivos, setProfessoresAtivos] = useState(0);
  const [alunosAtivos, setAlunosAtivos] = useState(0);
  const [admAtivos, setAdmAtivos] = useState(0);
  

  useEffect(() => {
      const fetchProfessoresAtivos = async () => {
          try {
              const response = await api.get("/api/usuarios/professores/ativos");
              setProfessoresAtivos(response.data.length);
          } catch (error) {
              console.error("Erro ao buscar professores ativos:", error);
          }
      };

      const fetchAlunosAtivos = async () => {
          try {
              const response = await api.get("/api/usuarios/alunos/ativos");
              setAlunosAtivos(response.data.length);
          } catch (error) {
              console.error("Erro ao buscar alunos ativos:", error);
          }
      };

      const fetchAdmAtivos = async () => {
        try {
            const response = await api.get("/api/usuarios/adm");
            setAdmAtivos(response.data.length);
        } catch (error) {
            console.error("Erro ao buscar administradores ativos:", error);
        }
    };

        fetchAdmAtivos();
      fetchAlunosAtivos();
      fetchProfessoresAtivos();
  }, []); 
  
  return (
      <div className="flex flex-col min-h-screen" style={{
        backgroundColor: "#deecff", 
        // backgroundImage: "/Logo_Volea.png", 
        // backgroundRepeat: "no-repeat", 
        // backgroundPosition: "center", 
        // backgroundSize: "contain", 
        // backgroundBlendMode: "overlay",
      }}>
          <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="#" prefetch={false} className="flex items-center gap-2">
            <img src="/Logo_Volea.png" alt="Logo Volea" className="h-8" />
            <span className="font-bold text-2xl" style={{ color: "#f9b800" }}>
              Volea
            </span>
          </Link>
                  <nav className="ml-auto flex items-center gap-4 md:gap-6">
                      <Link href="/alunos/cadastroAlunos" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false} style={{ color: "#f9b800" }}>
                          Alunos
                      </Link>
                      <Link href="/professores/cadastroProfessores" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false} style={{ color: "#f9b800" }}>
                          Professores
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
                                  <Link href="/financeiro/entradaFinanceiro" prefetch={false} style={{ color: "#f9b800" }}>
                                      Entrada Financeira
                                  </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                  <Link href="/financeiro/descontos" prefetch={false} style={{ color: "#f9b800" }}>
                                      Criat Desconto
                                  </Link>
                                  
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                  <Link href="/comunicacao/cadastrarComunicacao" prefetch={false} style={{ color: "#f9b800" }}>
                                      Comunicados
                                  </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                  <Link href="/eventos/cadastrarEventos" prefetch={false} style={{ color: "#f9b800" }}>
                                      Eventos
                                  </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                  <Link href="/financeiro/planos" prefetch={false} style={{ color: "#f9b800" }}>
                                      Criar Plano
                                  </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                  <Link href="/estoque" prefetch={false} style={{ color: "#f9b800" }}>
                                      Estoque
                                  </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                  <Link href="/estoque/cadastroMateriais" prefetch={false} style={{ color: "#f9b800" }}>
                                      Cadastro de Materiais
                                  </Link>
                              </DropdownMenuItem>
                          </DropdownMenuContent>
                      </DropdownMenu>
                  </nav>
              </div>
          </header>

          <main className="flex-1 bg-muted/40 py-12 md:py-24 flex items-center justify-center">
              <div className="container px-4 md:px-6 grid gap-12 text-center">
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
                        <CardTitle>Professores Ativos</CardTitle>
                        <CardDescription>Quantidade de professores ativos no sistema.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <span className="text-4xl font-bold">{professoresAtivos}</span>
                            <UsersIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Link href="/professores/cadastroProfessores" className="w-full" prefetch={false}>
                            Ver Detalhes
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
                                <span className="text-4xl font-bold">{alunosAtivos}</span>
                                <UsersIcon className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                          <CardFooter>
                              <Link href="/alunos/cadastroAlunos" className="w-full" prefetch={false}>
                                  Ver Alunos
                              </Link>
                          </CardFooter>
                      </Card>

                      <Card className="bg-[#fff6d8]">
                          <CardHeader>
                              <CardTitle>Administradores</CardTitle>
                              <CardDescription>Veja e Organize os demais administradores da Escola.</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                                <span className="text-4xl font-bold">{admAtivos}</span>
                                <UsersIcon className="h-8 w-8 text-muted-foreground" />
                            </div>
                        </CardContent>
                          <CardFooter>
                              <Link href="/instituicao/cadastroAdm" className="w-full" prefetch={false}>
                                  Ver Administradores
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
