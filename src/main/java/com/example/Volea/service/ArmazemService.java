package com.example.Volea.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Volea.entity.Armazem;
import com.example.Volea.entity.Esporte;
import com.example.Volea.repository.ArmazemRepository;
import com.example.Volea.repository.EsporteRepository;

@Service
public class ArmazemService {
    
    @Autowired
    private ArmazemRepository ArmazemRepository;


    public List<Armazem> findAllArmazem(){
        return ArmazemRepository.findAll();       
    }


    public Optional<Armazem> findArmazemById(int id) {
        return ArmazemRepository.findById(id);
    }

    public Armazem saveArmazem(Armazem armazem) {

        return ArmazemRepository.save(armazem);
    }

    public Armazem atualizaArmazem(Armazem armazem) {
        return ArmazemRepository.save(armazem);
    }
    

    public void deleteArmazem(int id) {
        ArmazemRepository.deleteById(id);
    }

   //Buscando por ativos e inativos
   public List<Armazem> getArmazemAtivos() {
        return ArmazemRepository.findByAtivoTrue();
    }

    public List<Armazem> getArmazemInativos() {
        return ArmazemRepository.findByAtivoFalse();
    }   

}
    