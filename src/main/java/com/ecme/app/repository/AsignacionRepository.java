package com.ecme.app.repository;

import com.ecme.app.domain.Asignacion;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Asignacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AsignacionRepository extends JpaRepository<Asignacion, Long> {
}
