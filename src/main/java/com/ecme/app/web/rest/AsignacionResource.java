package com.ecme.app.web.rest;

import com.ecme.app.domain.Asignacion;
import com.ecme.app.repository.AsignacionRepository;
import com.ecme.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.ecme.app.domain.Asignacion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AsignacionResource {

    private final Logger log = LoggerFactory.getLogger(AsignacionResource.class);

    private static final String ENTITY_NAME = "asignacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AsignacionRepository asignacionRepository;

    public AsignacionResource(AsignacionRepository asignacionRepository) {
        this.asignacionRepository = asignacionRepository;
    }

    /**
     * {@code POST  /asignacions} : Create a new asignacion.
     *
     * @param asignacion the asignacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new asignacion, or with status {@code 400 (Bad Request)} if the asignacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/asignacions")
    public ResponseEntity<Asignacion> createAsignacion(@RequestBody Asignacion asignacion) throws URISyntaxException {
        log.debug("REST request to save Asignacion : {}", asignacion);
        if (asignacion.getId() != null) {
            throw new BadRequestAlertException("A new asignacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Asignacion result = asignacionRepository.save(asignacion);
        return ResponseEntity.created(new URI("/api/asignacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /asignacions} : Updates an existing asignacion.
     *
     * @param asignacion the asignacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated asignacion,
     * or with status {@code 400 (Bad Request)} if the asignacion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the asignacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/asignacions")
    public ResponseEntity<Asignacion> updateAsignacion(@RequestBody Asignacion asignacion) throws URISyntaxException {
        log.debug("REST request to update Asignacion : {}", asignacion);
        if (asignacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Asignacion result = asignacionRepository.save(asignacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, asignacion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /asignacions} : get all the asignacions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of asignacions in body.
     */
    @GetMapping("/asignacions")
    public List<Asignacion> getAllAsignacions() {
        log.debug("REST request to get all Asignacions");
        return asignacionRepository.findAll();
    }

    /**
     * {@code GET  /asignacions/:id} : get the "id" asignacion.
     *
     * @param id the id of the asignacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the asignacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/asignacions/{id}")
    public ResponseEntity<Asignacion> getAsignacion(@PathVariable Long id) {
        log.debug("REST request to get Asignacion : {}", id);
        Optional<Asignacion> asignacion = asignacionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(asignacion);
    }

    /**
     * {@code DELETE  /asignacions/:id} : delete the "id" asignacion.
     *
     * @param id the id of the asignacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/asignacions/{id}")
    public ResponseEntity<Void> deleteAsignacion(@PathVariable Long id) {
        log.debug("REST request to delete Asignacion : {}", id);
        asignacionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
