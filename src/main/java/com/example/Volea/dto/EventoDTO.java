package com.example.Volea.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventoDTO {

    private String nome;
    private String desc;
    private Date dataPublic;
    private Date dataEvento;
}
