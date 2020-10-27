package com.ecme.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.ecme.app.domain.enumeration.UnidadDeMedida;

import com.ecme.app.domain.enumeration.TipoRecurso;

/**
 * A Recurso.
 */
@Entity
@Table(name = "recurso")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Recurso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(name = "um")
    private UnidadDeMedida um;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoRecurso tipo;

    @OneToMany(mappedBy = "recurso")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Asignacion> asignacions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Recurso nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public UnidadDeMedida getUm() {
        return um;
    }

    public Recurso um(UnidadDeMedida um) {
        this.um = um;
        return this;
    }

    public void setUm(UnidadDeMedida um) {
        this.um = um;
    }

    public TipoRecurso getTipo() {
        return tipo;
    }

    public Recurso tipo(TipoRecurso tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoRecurso tipo) {
        this.tipo = tipo;
    }

    public Set<Asignacion> getAsignacions() {
        return asignacions;
    }

    public Recurso asignacions(Set<Asignacion> asignacions) {
        this.asignacions = asignacions;
        return this;
    }

    public Recurso addAsignacion(Asignacion asignacion) {
        this.asignacions.add(asignacion);
        asignacion.setRecurso(this);
        return this;
    }

    public Recurso removeAsignacion(Asignacion asignacion) {
        this.asignacions.remove(asignacion);
        asignacion.setRecurso(null);
        return this;
    }

    public void setAsignacions(Set<Asignacion> asignacions) {
        this.asignacions = asignacions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Recurso)) {
            return false;
        }
        return id != null && id.equals(((Recurso) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Recurso{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", um='" + getUm() + "'" +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}
