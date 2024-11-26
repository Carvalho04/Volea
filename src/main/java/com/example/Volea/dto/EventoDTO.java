package com.example.Volea.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventoDTO {

    private String nome;
    private String descricao;
    private Date dataEvento;
    private int maxParticipantes;
    private int idProfessor;
}
