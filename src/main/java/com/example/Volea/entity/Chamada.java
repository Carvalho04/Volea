package com.example.Volea.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "attendance")
public class Chamada {

    @Id  
    @Column(name = "id", updatable = false, nullable = false) 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column (name = "data_chamada")
    private Date data;

    @Column (name = "presence")
    private boolean presence;

    @ManyToOne
    @JoinColumn (name = "classe_id")
    private Classe classe;

    @JsonCreator
    public Chamada(int id) {
        this.id = id;
    }
    @JsonValue
    public int getIdJson() {
        return id;
    }

 
}
