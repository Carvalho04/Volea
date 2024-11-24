package com.example.Volea.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Volea.entity.Evento;

public interface EventoRepository extends JpaRepository<Evento, Integer> {
    
}
