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

import com.example.Volea.dto.Item_ArmazemDTO;
import com.example.Volea.entity.Aula;
import com.example.Volea.entity.Item_Armazem;
import com.example.Volea.repository.Item_ArmazemRepository;
import com.example.Volea.service.Item_ArmazemService;

@RestController
@RequestMapping("api/itens")
public class Item_ArmazemController {

    @Autowired
    private Item_ArmazemService itemService;

    @GetMapping
    public List<Item_Armazem> getAllItem_Armazems() {
        return itemService.findAllItem_Armazem();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item_Armazem> getItem_ArmazemById(@PathVariable int id) {
        Optional<Item_Armazem> item = itemService.findItem_ArmazemById(id);
        return item.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ativos")
    public List<Item_Armazem> getItensAtivos() {
        return itemService.getItensAtivos();
    }

    @GetMapping("/inativos")
    public List<Item_Armazem> getItensInativos() {
        return itemService.getItensInativos();
    }   

    @PutMapping("/ativar/{id}")
    public ResponseEntity<Void> ativarItem(@PathVariable int id) {
        Optional<Item_Armazem> itemOptional = itemService.findItem_ArmazemById(id);
        if (itemOptional.isPresent()) {
            Item_Armazem item = itemOptional.get();
            item.setAtivo(true); 
            itemService.saveItem_Armazem(item); 
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }

    @PutMapping("/desativar/{id}")
    public ResponseEntity<Void> desativarAula(@PathVariable int id) {
        Optional<Item_Armazem> itemOptional = itemService.findItem_ArmazemById(id);
        if (itemOptional.isPresent()) {
            Item_Armazem item = itemOptional.get();
            item.setAtivo(false); 
            itemService.saveItem_Armazem(item);
            return ResponseEntity.noContent().build(); 
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Item_Armazem createItem_Armazem(@RequestBody Item_Armazem item) {
        return itemService.saveItem_Armazem(item);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem_Armazem(@PathVariable int id) {
        itemService.deleteItem_Armazem(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item_Armazem> updateItem_Armazem(@PathVariable int id, @RequestBody Item_ArmazemDTO itemDTO) {
        Optional<Item_Armazem> existingItem_ArmazemOptional = itemService.findItem_ArmazemById(id);
        
        if (existingItem_ArmazemOptional.isPresent()) {
            Item_Armazem existingItem_Armazem = existingItem_ArmazemOptional.get();

            // Atualize apenas os campos que não são nulos no DTO
            if (itemDTO.getDescricao() != null) {
                existingItem_Armazem.setDescricao(itemDTO.getDescricao());
            }

            Item_Armazem updatedItem_Armazem = itemService.atualizaItem_Armazem(existingItem_Armazem);
            return ResponseEntity.ok(updatedItem_Armazem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
