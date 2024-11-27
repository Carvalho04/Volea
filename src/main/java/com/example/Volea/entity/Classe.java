package com.example.Volea.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonValue;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
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
@Table(name = "classe")
public class Classe {


    @Id  
    @Column(name = "id", updatable = false, nullable = false) 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @Column (name = "nome")
    private String nome;
    
    @Column (name = "descricao")
    private String descricao;

    @ManyToMany
    @JoinTable(name = "classe_alunos", joinColumns = @JoinColumn(name = "classe_id"), inverseJoinColumns = @JoinColumn(name = "usuario_id"))
    private List<Usuario> alunos;

    @Column (name = "ativo", nullable = false)
    private boolean ativo = true;
    
    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn (name = "id_esporte")
    private Esporte esporte;

    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn (name = "id_professor")
    private Usuario professor;

    // @ManyToOne
    // @JoinColumn (name = "id_professor")
    // private Usuario idProfessor;

    @OneToMany (mappedBy = "classe")
    private List <Aula> aulas;
    
    @OneToMany (mappedBy = "classe")
    private List <Chamada> chamadas;

    // @JsonCreator
    // public Classe(int id) {
    //     this.id = id;
    // }
    // @JsonValue
    // public int getIdJson() {
    //     return id;
    // }


}