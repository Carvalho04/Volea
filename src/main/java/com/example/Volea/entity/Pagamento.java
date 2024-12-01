    package com.example.Volea.entity;

    import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonCreator;
    import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Table (name = "payment")
    public class Pagamento {


        @Id  
        @Column(name = "id", updatable = false, nullable = false) 
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;
        
        @ManyToOne
        @JsonBackReference(value="usuario-pagamento")
        @JoinColumn(name = "user_id")
        private Usuario usuario;

        @ManyToOne
        @JsonBackReference(value="desconto-pagamento")
        @JoinColumn(name = "desconto_id", nullable = true)
        private Desconto desconto;

        @ManyToOne
        @JsonBackReference(value="plano-pagamento")
        @JoinColumn(name = "plano_id", nullable = true)
        private Plano plano;

        
        @Column (name = "valor_imposto")
        private double valorImposto;

        @Column (name = "valor_total")
        private double valorTotal;

        @Column (name = "data_vencimento")
        private Date dataVencimento;
        
        @Column (name = "data_pagamento")
        private Date dataPagamento;
        
        @Column (name = "ativo", nullable = false)
        private boolean ativo = true;
        
        // @JsonCreator
        // public Pagamento(int id) {
        //     this.id = id;
        // }
        // @JsonValue
        // public int getIdJson() {
        //     return id;
        // }

    }
