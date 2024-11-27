// package com.example.Volea.controller;

// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.example.Volea.dto.LoginDTO;
// import com.example.Volea.entity.Usuario;
// import com.example.Volea.service.UsuarioService;

// @RestController
// @RequestMapping("/api/auth")
// public class AuthController {

//     @Autowired
//     private UsuarioService usuarioService;

//     @PostMapping("/login")
//     public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
//         Optional<Usuario> usuarioOptional = usuarioService.findByEmailAndPass(loginDTO.getEmail(), loginDTO.getPass());

//         if (usuarioOptional.isPresent()) {
//             Usuario usuario = usuarioOptional.get();
//             int tipoUsuarioId = usuario.getTipo().getId();

//             switch (tipoUsuarioId) {
//                 case 1:
//                     return ResponseEntity.ok("/professores  ");
//                 case 2:
//                     return ResponseEntity.ok("/alunos");
//                 case 3:
//                     return ResponseEntity.ok("/instituicao");
//                 default:
//                     return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuário inválido");
//             }
//         } else {
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
//         }
//     }
// }

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

            // Determina o caminho de redirecionamento com base no tipo de usuário
            String redirectUrl = "";
            switch (tipoUsuarioId) {
                case 1:
                    redirectUrl = "/professores/perfil";
                    break;
                case 2:
                    redirectUrl = "/alunos/perfil";
                    break;
                case 3:
                    redirectUrl = "/instituicao/perfil";
                    break;
                default:
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuário inválido");
            }

            // Retorna os dados do usuário e o caminho para redirecionamento
            return ResponseEntity.ok(new LoginResponse(usuario.getId(), usuario.getNome(), usuario.getEmail(), tipoUsuarioId, redirectUrl));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
        }
    }

    // Classe interna para encapsular a resposta do login com os dados e URL de redirecionamento
    public static class LoginResponse {
        private int id;
        private String name;
        private String email;
        private int tipoUsuarioId;
        private String redirectUrl;

        public LoginResponse(int id, String name, String email, int tipoUsuarioId, String redirectUrl) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.tipoUsuarioId = tipoUsuarioId;
            this.redirectUrl = redirectUrl;
        }

        public int getId() {
            return id;
        }

        public String getName() {
            return name;
        }

        public String getEmail() {
            return email;
        }

        public int getTipoUsuarioId() {
            return tipoUsuarioId;
        }

        public String getRedirectUrl() {
            return redirectUrl;
        }
    }
}
