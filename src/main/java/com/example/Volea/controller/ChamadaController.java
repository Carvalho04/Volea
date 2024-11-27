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

import com.example.Volea.dto.ChamadaDTO;
import com.example.Volea.entity.Chamada;
import com.example.Volea.entity.Chamada;
import com.example.Volea.repository.ChamadaRepository;
import com.example.Volea.service.ChamadaService;

@RestController
@RequestMapping("api/chamadas")
public class ChamadaController {

    @Autowired
    private ChamadaService chamadaService;

    @GetMapping
    public List<Chamada> getAllChamadas() {
        return chamadaService.findAllChamada();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Chamada> getChamadaById(@PathVariable int id) {
        Optional<Chamada> chamada = chamadaService.findChamadaById(id);
        return chamada.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ativos")
    public List<Chamada> getChamadasAtivos() {
        return chamadaService.getChamadasAtivos();
    }

    @GetMapping("/inativos")
    public List<Chamada> getChamadasInativos() {
        return chamadaService.getChamadasInativos();
    }    

    @PutMapping("/ativar/{id}")
    public ResponseEntity<Void> ativarChamada(@PathVariable int id) {
        Optional<Chamada> chamadaOptional = chamadaService.findChamadaById(id);
        if (chamadaOptional.isPresent()) {
            Chamada chamada = chamadaOptional.get();
            chamada.setAtivo(true); 
            chamadaService.saveChamada(chamada); 
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    @PutMapping("/desativar/{id}")
    public ResponseEntity<Void> desativarChamada(@PathVariable int id) {
        Optional<Chamada> chamadaOptional = chamadaService.findChamadaById(id);
        if (chamadaOptional.isPresent()) {
            Chamada chamada = chamadaOptional.get();
            chamada.setAtivo(false); 
            chamadaService.saveChamada(chamada);
            return ResponseEntity.noContent().build(); 
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
    @PostMapping
    public Chamada createChamada(@RequestBody Chamada chamada) {
        return chamadaService.saveChamada(chamada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChamada(@PathVariable int id) {
        chamadaService.deleteChamada(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Chamada> updateChamada(@PathVariable int id, @RequestBody ChamadaDTO chamadaDTO) {
        Optional<Chamada> existingChamadaOptional = chamadaService.findChamadaById(id);
        
        if (existingChamadaOptional.isPresent()) {
            Chamada existingChamada = existingChamadaOptional.get();

            // Atualize apenas os campos que não são nulos no DTO
            if (chamadaDTO.getData() != null) {
                existingChamada.setData(chamadaDTO.getData());
            }
            Chamada updatedChamada = chamadaService.atualizaChamada(existingChamada);
            return ResponseEntity.ok(updatedChamada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
