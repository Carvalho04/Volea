'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CalendarDays } from "lucide-react"
import Link from 'next/link'
import { useState, useEffect } from 'react';
import api from "@/service/api"

interface Comunicacao {
  id: string;
  nome: string;
  descricao: string;
  dataPublic: string;
}

export function Comunicacao() {
  const [comunicacoes, setComunicacoes] = useState<Comunicacao[]>([]);

  // Busca inicial dos dados
  useEffect(() => {
    const fetchComunicacoes = async () => {
      try {
        const response = await api.get('/api/comunicacao/ativos');
        setComunicacoes(response.data);
      } catch (error) {
        console.error("Erro ao carregar comunicações.", error);
      }
    };
    fetchComunicacoes();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="#" prefetch={false} className="flex items-center gap-2">
            <img src="/Logo_Volea.png" alt="Logo Volea" className="h-8" />
            <span className="font-bold text-2xl" style={{ color: "#f9b800" }}>
              Volea
            </span>
          </Link>
          <Button variant="ghost" size="sm" style={{ color: "#f9b800" }}>
            <ArrowLeft className="h-4 w-4 mr-2" style={{ color: "#f9b800" }} />
            Voltar
          </Button>
        </div>
      </header>


      {/* Conteúdo */}
      <main className="p-8 flex-grow container mx-auto">
        {comunicacoes.length > 0 ? (
          comunicacoes.map((comunicacao) => (
            <Card key={comunicacao.id} className="max-w-3xl mx-auto mb-4">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl">{comunicacao.nome}</CardTitle>
                    <CardDescription className="text-lg mt-2">
                      <CalendarDays className="inline mr-2" />
                      {new Date(comunicacao.dataPublic).toLocaleDateString("pt-BR")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                  <p>{comunicacao.descricao}</p>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <p>Para mais informações entre em contato com a coordenação.</p>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg">Nenhuma comunicação encontrada.</p>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#114494] text-[#f9b800] py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 VOLEA. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
