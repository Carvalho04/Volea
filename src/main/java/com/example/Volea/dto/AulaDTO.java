package com.example.Volea.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AulaDTO {

    private int id;    
    private String nome;
    private Date data;
    private int classeId; 
    private int professorId;
    private String classeNome;
    private String professorNome;   
    private boolean ativo;

}
