package com.ecme.app.repository;

import com.ecme.app.domain.Chofer;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Chofer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChoferRepository extends JpaRepository<Chofer, Long> {
}
