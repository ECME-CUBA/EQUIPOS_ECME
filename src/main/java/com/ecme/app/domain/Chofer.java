package com.ecme.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.ecme.app.domain.enumeration.Licencia;

/**
 * A Chofer.
 */
@Entity
@Table(name = "chofer")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Chofer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(name = "licencia")
    private Licencia licencia;

    @OneToMany(mappedBy = "chofer")
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

    public Chofer nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Licencia getLicencia() {
        return licencia;
    }

    public Chofer licencia(Licencia licencia) {
        this.licencia = licencia;
        return this;
    }

    public void setLicencia(Licencia licencia) {
        this.licencia = licencia;
    }

    public Set<Asignacion> getAsignacions() {
        return asignacions;
    }

    public Chofer asignacions(Set<Asignacion> asignacions) {
        this.asignacions = asignacions;
        return this;
    }

    public Chofer addAsignacion(Asignacion asignacion) {
        this.asignacions.add(asignacion);
        asignacion.setChofer(this);
        return this;
    }

    public Chofer removeAsignacion(Asignacion asignacion) {
        this.asignacions.remove(asignacion);
        asignacion.setChofer(null);
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
        if (!(o instanceof Chofer)) {
            return false;
        }
        return id != null && id.equals(((Chofer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Chofer{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", licencia='" + getLicencia() + "'" +
            "}";
    }
}
