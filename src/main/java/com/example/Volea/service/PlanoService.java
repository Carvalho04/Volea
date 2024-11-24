package com.example.Volea.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Volea.entity.Plano;
import com.example.Volea.repository.PlanoRepository;

@Service
public class PlanoService {
    
    @Autowired
    private PlanoRepository PlanoRepository;


    public List<Plano> findAllPlano(){
        return PlanoRepository.findAll();       
    }


    public Optional<Plano> findPlanoById(int id) {
        return PlanoRepository.findById(id);
    }

    public Plano savePlano(Plano plano) {
        return PlanoRepository.save(plano);
    }

    public Plano atualizaPlano(Plano plano) {
        return PlanoRepository.save(plano);
    }
    

    public void deletePlano(int id) {
        PlanoRepository.deleteById(id);
    }

   

}
    