package com.example.Volea.entity;



import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@Table (name = "calendar")
public class Aula {
    
    @Id  
    @Column(name = "id", updatable = false, nullable = false) 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column (name = "nome")
    private String nome;

    @Column (name = "data")
    private Date data;

    @ManyToOne
    @JsonBackReference(value="usuario-aula")
    @JoinColumn (name = "professor_id")
    private Usuario professor;

    @ManyToOne
    @JsonBackReference(value="classe-aula")
    @JoinColumn (name = "classe_id")
    private Classe classe;

//    @JsonCreator
//     public Aula(int id) {
//         this.id = id;
//     }
//     @JsonValue
//     public int getIdJson() {
//         return id;
//     }

    @Column (name = "ativo", nullable = false)
    private boolean ativo = true;
    
}