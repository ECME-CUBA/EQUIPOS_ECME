package com.ecme.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.ecme.app.domain.enumeration.Clase;

import com.ecme.app.domain.enumeration.Estado;

import com.ecme.app.domain.enumeration.UEB;

/**
 * A Equipo.
 */
@Entity
@Table(name = "equipo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Equipo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    
    @Column(name = "chapilla", unique = true)
    private String chapilla;

    @Enumerated(EnumType.STRING)
    @Column(name = "clase")
    private Clase clase;

    @Column(name = "modelo")
    private String modelo;

    
    @Column(name = "codigo", unique = true)
    private String codigo;

    
    @Column(name = "chapa", unique = true)
    private String chapa;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private Estado estado;

    @Column(name = "anno")
    private Integer anno;

    @Enumerated(EnumType.STRING)
    @Column(name = "ueb")
    private UEB ueb;

    @OneToOne
    @JoinColumn(unique = true)
    private Motor motor;

    @OneToOne
    @JoinColumn(unique = true)
    private Chofer cofer;

    @OneToOne
    @JoinColumn(unique = true)
    private Marca marca;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getChapilla() {
        return chapilla;
    }

    public Equipo chapilla(String chapilla) {
        this.chapilla = chapilla;
        return this;
    }

    public void setChapilla(String chapilla) {
        this.chapilla = chapilla;
    }

    public Clase getClase() {
        return clase;
    }

    public Equipo clase(Clase clase) {
        this.clase = clase;
        return this;
    }

    public void setClase(Clase clase) {
        this.clase = clase;
    }

    public String getModelo() {
        return modelo;
    }

    public Equipo modelo(String modelo) {
        this.modelo = modelo;
        return this;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getCodigo() {
        return codigo;
    }

    public Equipo codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getChapa() {
        return chapa;
    }

    public Equipo chapa(String chapa) {
        this.chapa = chapa;
        return this;
    }

    public void setChapa(String chapa) {
        this.chapa = chapa;
    }

    public Estado getEstado() {
        return estado;
    }

    public Equipo estado(Estado estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public Integer getAnno() {
        return anno;
    }

    public Equipo anno(Integer anno) {
        this.anno = anno;
        return this;
    }

    public void setAnno(Integer anno) {
        this.anno = anno;
    }

    public UEB getUeb() {
        return ueb;
    }

    public Equipo ueb(UEB ueb) {
        this.ueb = ueb;
        return this;
    }

    public void setUeb(UEB ueb) {
        this.ueb = ueb;
    }

    public Motor getMotor() {
        return motor;
    }

    public Equipo motor(Motor motor) {
        this.motor = motor;
        return this;
    }

    public void setMotor(Motor motor) {
        this.motor = motor;
    }

    public Chofer getCofer() {
        return cofer;
    }

    public Equipo cofer(Chofer chofer) {
        this.cofer = chofer;
        return this;
    }

    public void setCofer(Chofer chofer) {
        this.cofer = chofer;
    }

    public Marca getMarca() {
        return marca;
    }

    public Equipo marca(Marca marca) {
        this.marca = marca;
        return this;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Equipo)) {
            return false;
        }
        return id != null && id.equals(((Equipo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Equipo{" +
            "id=" + getId() +
            ", chapilla='" + getChapilla() + "'" +
            ", clase='" + getClase() + "'" +
            ", modelo='" + getModelo() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", chapa='" + getChapa() + "'" +
            ", estado='" + getEstado() + "'" +
            ", anno=" + getAnno() +
            ", ueb='" + getUeb() + "'" +
            "}";
    }
}
