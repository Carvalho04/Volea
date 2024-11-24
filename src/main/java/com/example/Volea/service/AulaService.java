package com.example.Volea.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Volea.entity.Aula;
import com.example.Volea.repository.AulaRepository;

@Service
public class AulaService {
    
    @Autowired
    private AulaRepository AulaRepository;


    public List<Aula> findAllAula(){
        return AulaRepository.findAll();       
    }


    public Optional<Aula> findAulaById(int id) {
        return AulaRepository.findById(id);
    }

    public Aula saveAula(Aula aula) {
        return AulaRepository.save(aula);
    }

    public Aula atualizaAula(Aula aula) {
        return AulaRepository.save(aula);
    }
    

    public void deleteAula(int id) {
        AulaRepository.deleteById(id);
    }

   

}
    