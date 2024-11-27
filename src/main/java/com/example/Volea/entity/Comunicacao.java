package com.example.Volea.entity;


import java.util.Date;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString

@Entity
@Table(name = "comunication")
public class Comunicacao {

    @Id  
    @Column(name = "id", updatable = false, nullable = false) 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column (name = "titulo")
    private String nome;

    @Column (name = "descricao")
    private String descricao;

    @Column (name = "data_publi")
    private Date dataPublic;

    @Column (name = "ativo", nullable = false)
    private boolean ativo = true;
    
//    @JsonCreator
//     public Comunicacao(int id) {
//         this.id = id;
//     }
//     @JsonValue
//     public int getIdJson() {
//         return id;
    // }

  
}