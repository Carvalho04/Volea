package com.example.Volea.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Volea.entity.Item_Armazem;

public interface Item_ArmazemRepository extends JpaRepository<Item_Armazem, Integer> {
    
}
