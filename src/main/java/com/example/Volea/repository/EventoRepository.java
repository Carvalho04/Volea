package com.example.Volea.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Volea.entity.Evento;

public interface EventoRepository extends JpaRepository<Evento, Integer> {
    
    //Buscando por Ativos e Inativos
    List<Evento> findByAtivoTrue();
    List<Evento> findByAtivoFalse();
}
