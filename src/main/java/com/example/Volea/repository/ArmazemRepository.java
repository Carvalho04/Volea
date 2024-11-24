package com.example.Volea.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Volea.entity.Armazem;

public interface ArmazemRepository extends JpaRepository<Armazem, Integer> {
    
}
