package com.example.Volea.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Volea.dto.LoginDTO;
import com.example.Volea.entity.Usuario;
import com.example.Volea.service.UsuarioService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        Optional<Usuario> usuarioOptional = usuarioService.findByEmailAndPass(loginDTO.getEmail(), loginDTO.getPass());

        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            int tipoUsuarioId = usuario.getTipo().getId();

            switch (tipoUsuarioId) {
                case 1:
                    return ResponseEntity.ok("/professores  ");
                case 2:
                    return ResponseEntity.ok("/alunos");
                case 3:
                    return ResponseEntity.ok("/instituicao");
                default:
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuário inválido");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
        }
    }
}
