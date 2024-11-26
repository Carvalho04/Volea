package com.example.Volea.dto;

import com.example.Volea.entity.Classe;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClasseDTO {
    
    private int id;
    private String nome;
    private String descricao;
    private int esporteId;

}
