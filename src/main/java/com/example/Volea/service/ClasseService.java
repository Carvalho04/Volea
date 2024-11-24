package com.example.Volea.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Volea.entity.Classe;
import com.example.Volea.repository.ClasseRepository;

@Service
public class ClasseService {
    
    @Autowired
    private ClasseRepository ClasseRepository;


    public List<Classe> findAllClasse(){
        return ClasseRepository.findAll();       
    }


    public Optional<Classe> findClasseById(int id) {
        return ClasseRepository.findById(id);
    }

    public Classe saveClasse(Classe classe) {
        return ClasseRepository.save(classe);
    }

    public Classe atualizaClasse(Classe classe) {
        return ClasseRepository.save(classe);
    }
    

    public void deleteClasse(int id) {
        ClasseRepository.deleteById(id);
    }

   

}
    