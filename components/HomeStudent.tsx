import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react";
import api from "@/service/api";
import { Button } from "./ui/button";

export function HomeStudent() {
  const [comunicacoes, setComunicacoes] = useState([]);
  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Usando o serviço api para fazer as requisições
        const comunicacaoResponse = await api.get("/api/comunicacao/ativos");
        const professoresResponse = await api.get("/api/usuarios/professores/ativos");

        // Verificando se as respostas das APIs têm status 200
        if (comunicacaoResponse.status !== 200 || professoresResponse.status !== 200) {
          throw new Error("Erro ao carregar dados das APIs");
        }

        // Definindo os dados no estado
        setComunicacoes(comunicacaoResponse.data);
        setProfessores(professoresResponse.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

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
          <Link href="/login" passHref>
          <Button variant="ghost" size="sm" style={{ color: "#f9b800" }}>
            Fazer Login
          </Button>
          </Link>
        </div>
      </header>

      
      <main className="flex-1 flex flex-col justify-center items-center">
        <section className="py-12 md:py-24 items-center text-center">
          <div className="container grid gap-8 md:grid-cols-2 items-center text-center">
            <div className="space-y-4 ">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Bem Vindo à Volea</h1>
              <p className="text-muted-foreground md:text-xl">
                Descubra a melhor experiencia em gerenciamento escolar conosco.
              </p>
              {/* <div className="flex flex-col gap-2 sm:flex-4xl items-center">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-10 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Se cadastrar
                </Link>
              </div> */}
            </div>
            <img
              src="volei.png"
              width={550}
              height={550}
              alt="School"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
            />
          </div>
        </section>

        {/* Seção Sobre Nós */}
        <section className="py-12 md:py-24 bg-gray-100">
          <div className="container text-center space-y-4">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Sobre Nós</h2>
            <p className="text-muted-foreground md:text-xl">
            Somos uma plataforma dedicada a facilitar a vida dos gestores e administradores de escolas de esportes. Nosso objetivo é transformar o gerenciamento do seu negócio em algo mais simples e eficiente, oferecendo soluções práticas e intuitivas para o controle de turmas, alunos, funcionários e muito mais. <br />
            <br />
            Entendemos os desafios de administrar uma escola de esportes e por isso, criamos ferramentas que otimizam o dia a dia, tornando os processos mais ágeis e reduzindo o tempo gasto com tarefas burocráticas. Estamos aqui para apoiar você, permitindo que foque no que realmente importa: o desenvolvimento dos seus alunos e o crescimento da sua escola.<br />
            <br />
            Com a nossa plataforma, o controle de dados se torna mais organizado e acessível, trazendo mais tranquilidade e segurança para o seu trabalho. <br /> Junte-se a nós e simplifique o gerenciamento da sua escola de esportes! 
             
            </p>
          </div>
        </section>
        {/* Seção de Comunicações */}
        <section className="py-12 md:py-24">
          <div className="container grid gap-8">
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Últimos Comunicados</h2>
              <p className="text-muted-foreground md:text-xl">
                Confira as últimas mensagens e avisos importantes.
              </p>
            </div>

            {/* Exibindo os top 3 comunicados */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {comunicacoes.length > 0 ? (
                comunicacoes.slice(0, 3).map((comunicacao: any) => (
                  <Card key={comunicacao.id}>
                    <CardHeader>
                      <CardTitle>{comunicacao.nome}</CardTitle>
                      <CardDescription>{comunicacao.descricao}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{comunicacao.conteudo}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>Carregando comunicações...</p>
              )}
            </div>
          </div>
        </section>

        {/* Seção de professores */}
        <section className="py-12 md:py-24">
          <div className="container grid gap-8">
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">Conheça os Professores</h2>
              <p className="text-muted-foreground md:text-xl">
                Conheça os professores que fazem parte da nossa escola.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {professores.length > 0 ? (
                professores.slice(0, 3).map((professor: any) => (
                  <Card key={professor.id}>
                    <CardHeader>
                    <div className="flex justify-center">
                    <img
                      src="avatar.png"
                      width={50}
                      height={50}
                      alt={`Professor ${professor.nome}`}
                      className="w-30 h-30 object-cover"
                    />
                    </div>
                      <CardTitle>{professor.nome}</CardTitle>
                      <CardDescription>{professor.especialidade}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{professor.descricao}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>Carregando professores...</p>
              )}
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
