package com.example.Volea.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Volea.entity.Chamada;

public interface ChamadaRepository extends JpaRepository<Chamada, Integer> {
    
}
