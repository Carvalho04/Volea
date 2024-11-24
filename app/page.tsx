'use client';

import React from 'react';
import { useAuth } from "@/context/AuthContext";
import { HomeStudent } from '@/components/HomeStudent';
import { HomeInst } from '@/components/HomeInst';
import { HomeAlunos } from '@/components/HomeAlunos';

export default function Home() {
  const { user, isLoading } = useAuth();

  // if (isLoading) {
  //   return <div>Carregando...</div>;
  // }

  // if (!user) {
  //   return <div> <HomeStudent/> </div>;
  // }

  return (
    <div>
      {/* Exemplo: Renderiza um componente diferente dependendo do tipo de usuário */}
      {/* {user.role === 'student' ? <HomeStudent /> : <HomeInst />} */}

      <HomeStudent />
    </div>
  );
}
