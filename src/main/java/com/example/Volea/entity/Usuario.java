package com.example.Volea.entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.Builder.Default;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString

@Entity
@Table(name = "users")
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Usuario {

    @Id  
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false, nullable = false) 
    private int id;
    
    @NotNull(message = "O nome é obrigatório")
    @Column(name = "nome")
    private String nome;

    @Email(message = "Email inválido")
    @NotNull(message = "O email é obrigatório")
    @Column(name = "email")
    private String email;

    @NotNull(message = "O Cpf é obrigatório")
    @Column(name = "cpf")
    private String cpf;

    @Column(name = "pass")
    @NotNull(message = "A senha é obrigatória")
    @Size(min = 6, message = "A senha deve ter pelo menos 6 caracteres")
    private String pass;

    @Temporal(TemporalType.DATE)
    @Column(name = "data_nasc")
    private Date dataNasc;

    @Column(name = "ativo", nullable = false)
    private boolean ativo = true;

    @ManyToOne(fetch = FetchType.EAGER) 
    @JsonBackReference (value="usuario-tipo")   
    @JoinColumn(name = "tp_user_id")
    private Tp_Usuario tipo;

    @OneToMany(mappedBy = "usuario")
    @JsonManagedReference(value="usuario-pagamento")
    private List<Pagamento> pagamentos;

    @ManyToMany(mappedBy = "alunos")
    private List<Classe> classes;

    @Nullable
    @OneToMany(mappedBy = "professor")
    @JsonManagedReference(value="usuario-aula")
    private List<Aula> aula;

    @ManyToMany(mappedBy = "alunos")
    private List<Evento> eventos;

    @Override
    public String toString() {
    return "Usuario{id=" + id + ", nome='" + nome + "', email='" + email + "'}";
}

}


