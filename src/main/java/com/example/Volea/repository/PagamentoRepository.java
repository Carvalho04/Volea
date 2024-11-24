package com.example.Volea.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Volea.entity.Pagamento;

public interface PagamentoRepository extends JpaRepository<Pagamento, Integer> {
    
}
