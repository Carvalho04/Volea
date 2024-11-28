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

import com.example.Volea.dto.PlanoDTO;
import com.example.Volea.entity.Plano;
import com.example.Volea.repository.PlanoRepository;
import com.example.Volea.service.PlanoService;

@RestController
@RequestMapping("api/planos")
public class PlanoController {

    @Autowired
    private PlanoService planoService;

    @GetMapping
    public List<Plano> getAllPlanos() {
        return planoService.findAllPlano();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plano> getPlanoById(@PathVariable int id) {
        Optional<Plano> plano = planoService.findPlanoById(id);
        return plano.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ativos")
    public List<Plano> getPlanosAtivos() {
        return planoService.getPlanosAtivos();
    }

    @GetMapping("/inativos")
    public List<Plano> getPlanosInativos() {
        return planoService.getPlanosInativos();
    }    

    @PutMapping("/ativar/{id}")
    public ResponseEntity<Void> ativarPlano(@PathVariable int id) {
        Optional<Plano> planoOptional = planoService.findPlanoById(id);
        if (planoOptional.isPresent()) {
            Plano plano = planoOptional.get();
            plano.setAtivo(true); 
            planoService.savePlano(plano); 
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    @PutMapping("/desativar/{id}")
    public ResponseEntity<Void> desativarPlano(@PathVariable int id) {
        Optional<Plano> planoOptional = planoService.findPlanoById(id);
        if (planoOptional.isPresent()) {
            Plano plano = planoOptional.get();
            plano.setAtivo(false); 
            planoService.savePlano(plano);
            return ResponseEntity.noContent().build(); 
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public Plano createPlano(@RequestBody Plano plano) {
        return planoService.savePlano(plano);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlano(@PathVariable int id) {
        planoService.deletePlano(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Plano> updatePlano(@PathVariable int id, @RequestBody PlanoDTO planoDTO) {
        Optional<Plano> existingPlanoOptional = planoService.findPlanoById(id);
        
        if (existingPlanoOptional.isPresent()) {
            Plano existingPlano = existingPlanoOptional.get();

            // Atualize apenas os campos que não são nulos no DTO
            if (planoDTO.getNome() != null) {
                existingPlano.setNome(planoDTO.getNome());
            }
            if (planoDTO.getDescricao() != null) {
                existingPlano.setDescricao(planoDTO.getDescricao());
            }
            if (planoDTO.getValor() >  0 ) {
                existingPlano.setValor(planoDTO.getValor());
            }

            Plano updatedPlano = planoService.atualizaPlano(existingPlano);
            return ResponseEntity.ok(updatedPlano);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
