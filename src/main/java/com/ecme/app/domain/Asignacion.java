package com.ecme.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Asignacion.
 */
@Entity
@Table(name = "asignacion")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Asignacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "fecha")
    private Instant fecha;

    @Column(name = "cantidad")
    private Float cantidad;

    @ManyToOne
    @JsonIgnoreProperties(value = "asignacions", allowSetters = true)
    private Chofer chofer;

    @ManyToOne
    @JsonIgnoreProperties(value = "asignacions", allowSetters = true)
    private Recurso recurso;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFecha() {
        return fecha;
    }

    public Asignacion fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public Float getCantidad() {
        return cantidad;
    }

    public Asignacion cantidad(Float cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Float cantidad) {
        this.cantidad = cantidad;
    }

    public Chofer getChofer() {
        return chofer;
    }

    public Asignacion chofer(Chofer chofer) {
        this.chofer = chofer;
        return this;
    }

    public void setChofer(Chofer chofer) {
        this.chofer = chofer;
    }

    public Recurso getRecurso() {
        return recurso;
    }

    public Asignacion recurso(Recurso recurso) {
        this.recurso = recurso;
        return this;
    }

    public void setRecurso(Recurso recurso) {
        this.recurso = recurso;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Asignacion)) {
            return false;
        }
        return id != null && id.equals(((Asignacion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Asignacion{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", cantidad=" + getCantidad() +
            "}";
    }
}
