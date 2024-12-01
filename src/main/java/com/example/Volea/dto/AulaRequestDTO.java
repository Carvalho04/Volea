package com.example.Volea.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AulaRequestDTO {
    private String nome;
    private String data;
    private int classeId;
    private int professorId;
    private boolean ativo;
}
