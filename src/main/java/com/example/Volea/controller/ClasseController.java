package com.example.Volea.controller;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Volea.dto.ClasseDTO;
import com.example.Volea.entity.Classe;
import com.example.Volea.repository.ClasseRepository;
import com.example.Volea.service.ClasseService;

@RestController
@RequestMapping("api/classes")
public class ClasseController {

    @Autowired
    private ClasseService classeService;

    @GetMapping
    public List<Classe> getAllClasses() {
        return classeService.findAllClasse();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Classe> getClasseById(@PathVariable int id) {
        Optional<Classe> classe = classeService.findClasseById(id);
        return classe.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Classe createClasse(@RequestBody Classe classe) {
        return classeService.saveClasse(classe);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClasse(@PathVariable int id) {
        classeService.deleteClasse(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Classe> updateClasse(@PathVariable int id, @RequestBody ClasseDTO classeDTO) {
        Optional<Classe> existingClasseOptional = classeService.findClasseById(id);
        
        if (existingClasseOptional.isPresent()) {
            Classe existingClasse = existingClasseOptional.get();

            // Atualize apenas os campos que não são nulos no DTO
            if (classeDTO.getNome() != null) {
                existingClasse.setNome(classeDTO.getNome());
            }
            if (classeDTO.getDesc() != null) {
                existingClasse.setDesc(classeDTO.getDesc());
            }
    
            Classe updatedClasse = classeService.atualizaClasse(existingClasse);
            return ResponseEntity.ok(updatedClasse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
