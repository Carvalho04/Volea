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

import com.example.Volea.entity.Tp_Usuario;
import com.example.Volea.repository.Tp_UsuarioRepository;
import com.example.Volea.service.Tp_UsuarioService;

@RestController
@RequestMapping("api/tpusers")
public class Tp_UsuarioController {

    @Autowired
    private Tp_UsuarioService tp_UserService;

    @GetMapping
    public List<Tp_Usuario> getAllUsers() {
        return tp_UserService.findAllTpUser();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tp_Usuario> getUserById(@PathVariable int id) {
        Optional<Tp_Usuario> user = tp_UserService.findTpUserById(id);
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Tp_Usuario createUser(@RequestBody Tp_Usuario user) {
        return tp_UserService.saveTpUser(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        tp_UserService.deleteTpUser(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tp_Usuario> updateTpUser(@PathVariable int id, @RequestBody Tp_Usuario tpUsuario) {
    Optional<Tp_Usuario> existingUserOptional = tp_UserService.findTpUserById(id);
    
    if (existingUserOptional.isPresent()) {
        Tp_Usuario existingUser = existingUserOptional.get();
        
        existingUser.setDescricao(tpUsuario.getDescricao());

        Tp_Usuario updatedUser = tp_UserService.AtualizaTpUser(existingUser);
        return ResponseEntity.ok(updatedUser);
    } else {
        return ResponseEntity.notFound().build();
    }
}

    

}
