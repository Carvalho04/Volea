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

import com.example.Volea.dto.ArmazemDTO;
import com.example.Volea.entity.Armazem;
import com.example.Volea.repository.ArmazemRepository;
import com.example.Volea.service.ArmazemService;

@RestController
@RequestMapping("api/armazem")
public class ArmazemController {

    @Autowired
    private ArmazemService armazemService;

    @GetMapping
    public List<Armazem> getAllArmazems() {
        return armazemService.findAllArmazem();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Armazem> getArmazemById(@PathVariable int id) {
        Optional<Armazem> armazem = armazemService.findArmazemById(id);
        return armazem.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //Listar ativos e inativos
    @GetMapping("/ativos")
    public List<Armazem> getArmazemAtivos() {
        return armazemService.getArmazemAtivos();
    }

    @GetMapping("/inativos")
    public List<Armazem> getArmazemInativos() {
        return armazemService.getArmazemInativos();
    }

    @PutMapping("/ativar/{id}")
    public ResponseEntity<Void> ativarArmazem(@PathVariable int id) {
        Optional<Armazem> armazemOptional = armazemService.findArmazemById(id);
        if (armazemOptional.isPresent()) {
            Armazem armazem = armazemOptional.get();
            armazem.setAtivo(true); 
            armazemService.saveArmazem(armazem); 
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    @PutMapping("/desativar/{id}")
    public ResponseEntity<Void> desativarArmazem(@PathVariable int id) {
        Optional<Armazem> armazemOptional = armazemService.findArmazemById(id);
        if (armazemOptional.isPresent()) {
            Armazem armazem = armazemOptional.get();
            armazem.setAtivo(false); 
            armazemService.saveArmazem(armazem);
            return ResponseEntity.noContent().build(); 
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

    @PostMapping
    public Armazem createArmazem(@RequestBody Armazem armazem) {
        return armazemService.saveArmazem(armazem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArmazem(@PathVariable int id) {
        armazemService.deleteArmazem(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Armazem> updateArmazem(@PathVariable int id, @RequestBody ArmazemDTO armazemDTO) {
        Optional<Armazem> existingArmazemOptional = armazemService.findArmazemById(id);
        
        if (existingArmazemOptional.isPresent()) {
            Armazem existingArmazem = existingArmazemOptional.get();

            if (armazemDTO.getQuantidade() >= -1) {
                existingArmazem.setQuantidade(armazemDTO.getQuantidade());
            }

            Armazem updatedArmazem = armazemService.atualizaArmazem(existingArmazem);
            return ResponseEntity.ok(updatedArmazem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
