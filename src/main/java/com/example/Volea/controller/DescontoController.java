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

import com.example.Volea.dto.DescontoDTO;
import com.example.Volea.entity.Desconto;
import com.example.Volea.repository.DescontoRepository;
import com.example.Volea.service.DescontoService;

@RestController
@RequestMapping("api/descontos")
public class DescontoController {

    @Autowired
    private DescontoService descontoService;

    @GetMapping
    public List<Desconto> getAllDescontos() {
        return descontoService.findAllDesconto();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Desconto> getDescontoById(@PathVariable int id) {
        Optional<Desconto> desconto = descontoService.findDescontoById(id);
        return desconto.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ativos")
    public List<Desconto> getDescontosAtivos() {
        return descontoService.getDescontosAtivos();
    }

    @GetMapping("/inativos")
    public List<Desconto> getDescontosInativos() {
        return descontoService.getDescontosInativos();
    }    

    @PutMapping("/ativar/{id}")
    public ResponseEntity<Void> ativarDesconto(@PathVariable int id) {
        Optional<Desconto> descontoOptional = descontoService.findDescontoById(id);
        if (descontoOptional.isPresent()) {
            Desconto desconto = descontoOptional.get();
            desconto.setAtivo(true); 
            descontoService.saveDesconto(desconto); 
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    @PutMapping("/desativar/{id}")
    public ResponseEntity<Void> desativarDesconto(@PathVariable int id) {
        Optional<Desconto> descontoOptional = descontoService.findDescontoById(id);
        if (descontoOptional.isPresent()) {
            Desconto desconto = descontoOptional.get();
            desconto.setAtivo(false); 
            descontoService.saveDesconto(desconto);
            return ResponseEntity.noContent().build(); 
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public Desconto createDesconto(@RequestBody Desconto desconto) {
        return descontoService.saveDesconto(desconto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDesconto(@PathVariable int id) {
        descontoService.deleteDesconto(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Desconto> updateDesconto(@PathVariable int id, @RequestBody DescontoDTO descontoDTO) {
        Optional<Desconto> existingDescontoOptional = descontoService.findDescontoById(id);
        
        if (existingDescontoOptional.isPresent()) {
            Desconto existingDesconto = existingDescontoOptional.get();

            // Atualize apenas os campos que não são nulos no DTO
            if (descontoDTO.getNome() != null) {
                existingDesconto.setNome(descontoDTO.getNome());
            }
            if (descontoDTO.getDescricao() != null) {
                existingDesconto.setDescricao(descontoDTO.getDescricao());
            }
            if (descontoDTO.getValor() >  0 ) {
                existingDesconto.setValor(descontoDTO.getValor());
            }

            Desconto updatedDesconto = descontoService.atualizaDesconto(existingDesconto);
            return ResponseEntity.ok(updatedDesconto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
