package com.example.Volea.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.Volea.entity.Aula;
import com.example.Volea.entity.Classe;
import com.example.Volea.entity.Esporte;
import com.example.Volea.repository.AulaRepository;
import com.example.Volea.repository.ClasseRepository;
import com.example.Volea.repository.EsporteRepository;

@Service
public class AulaService {
    
    @Autowired
    private AulaRepository AulaRepository;
    
    @Autowired
    private ClasseRepository turmaRepository;



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

   

    public Aula criarAula(Aula aula) {
        Optional<Classe> turmaOpt = turmaRepository.findById(aula.getClasse().getId());
        
        if (turmaOpt.isPresent()) {
            aula.setClasse(turmaOpt.get());
            return AulaRepository.save(aula);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Turma não encontrada");
        }
    }
    
    //Buscando por ativos e inativos
   public List<Aula> getAulasAtivos() {
        return AulaRepository.findByAtivoTrue();
    }

    public List<Aula> getAulasInativos() {
        return AulaRepository.findByAtivoFalse();
    }
}
    