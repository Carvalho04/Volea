package com.example.Volea.entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
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
@Table (name = "events")
public class Evento {
    
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
 
    @Column (name = "data_event")
    private Date dataEvento;

    @Column (name = "professorid")
    private int professorId;

    @Column(name = "maxparticipantes")
    private int maxPariticipantes;

    @ManyToMany
    @JoinTable(
    name = "evento_aluno",
    joinColumns = @JoinColumn(name = "evento_id"), 
    inverseJoinColumns = @JoinColumn(name = "usuario_id") 
    )
    private List<Usuario> alunos;

    // @JsonCreator
    // public Evento(int id) {
    //     this.id = id;
    // }
    // @JsonValue
    // public int getIdJson() {
    //     return id;
    // }
}
