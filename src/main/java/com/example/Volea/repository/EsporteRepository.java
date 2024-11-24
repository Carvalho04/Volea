package com.example.Volea.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Volea.entity.Esporte;

public interface EsporteRepository extends JpaRepository<Esporte, Integer> {
    
}
