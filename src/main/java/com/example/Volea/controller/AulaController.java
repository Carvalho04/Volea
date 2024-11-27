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

import com.example.Volea.dto.AulaDTO;
import com.example.Volea.entity.Aula;
import com.example.Volea.repository.AulaRepository;
import com.example.Volea.service.AulaService;

@RestController
@RequestMapping("api/aulas")
public class AulaController {

    @Autowired
    private AulaService aulaService;

    @GetMapping
    public List<Aula> getAllAulas() {
        return aulaService.findAllAula();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aula> getAulaById(@PathVariable int id) {
        Optional<Aula> aula = aulaService.findAulaById(id);
        return aula.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //Listar ativos e inativos
    @GetMapping("/ativos")
    public List<Aula> getAulaAtivos() {
        return aulaService.getAulasAtivos();
    }

    @GetMapping("/inativos")
    public List<Aula> getAulasInativos() {
        return aulaService.getAulasInativos();
    }

    @PutMapping("/ativar/{id}")
    public ResponseEntity<Void> ativarAula(@PathVariable int id) {
        Optional<Aula> aulaOptional = aulaService.findAulaById(id);
        if (aulaOptional.isPresent()) {
            Aula aula = aulaOptional.get();
            aula.setAtivo(true); 
            aulaService.saveAula(aula); 
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    @PutMapping("/desativar/{id}")
    public ResponseEntity<Void> desativarAula(@PathVariable int id) {
        Optional<Aula> aulaOptional = aulaService.findAulaById(id);
        if (aulaOptional.isPresent()) {
            Aula aula = aulaOptional.get();
            aula.setAtivo(false); 
            aulaService.saveAula(aula);
            return ResponseEntity.noContent().build(); 
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Aula createAula(@RequestBody Aula aula) {
        return aulaService.saveAula(aula);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAula(@PathVariable int id) {
        aulaService.deleteAula(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aula> updateAula(@PathVariable int id, @RequestBody AulaDTO aulaDTO) {
        Optional<Aula> existingAulaOptional = aulaService.findAulaById(id);
        
        if (existingAulaOptional.isPresent()) {
            Aula existingAula = existingAulaOptional.get();

            // Atualize apenas os campos que não são nulos no DTO
            if (aulaDTO.getNome() != null) {
                existingAula.setNome(aulaDTO.getNome());
            }
            if (aulaDTO.getDesc() != null) {
                existingAula.setDesc(aulaDTO.getDesc());
            }

            Aula updatedAula = aulaService.atualizaAula(existingAula);
            return ResponseEntity.ok(updatedAula);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
