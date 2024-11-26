package com.example.Volea.dto;

import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioDTO {
    
    private String nome;
    private String email;
    
    @Pattern(regexp = "\\d{11}", message = "CPF deve conter 11 dígitos")
    private String cpf;
    private String pass;
    private String dataNasc;
    private int tipo;  
    
}
