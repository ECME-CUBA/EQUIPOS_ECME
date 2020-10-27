package com.ecme.app.web.rest;

import com.ecme.app.domain.Recurso;
import com.ecme.app.repository.RecursoRepository;
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
 * REST controller for managing {@link com.ecme.app.domain.Recurso}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RecursoResource {

    private final Logger log = LoggerFactory.getLogger(RecursoResource.class);

    private static final String ENTITY_NAME = "recurso";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RecursoRepository recursoRepository;

    public RecursoResource(RecursoRepository recursoRepository) {
        this.recursoRepository = recursoRepository;
    }

    /**
     * {@code POST  /recursos} : Create a new recurso.
     *
     * @param recurso the recurso to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new recurso, or with status {@code 400 (Bad Request)} if the recurso has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/recursos")
    public ResponseEntity<Recurso> createRecurso(@RequestBody Recurso recurso) throws URISyntaxException {
        log.debug("REST request to save Recurso : {}", recurso);
        if (recurso.getId() != null) {
            throw new BadRequestAlertException("A new recurso cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Recurso result = recursoRepository.save(recurso);
        return ResponseEntity.created(new URI("/api/recursos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /recursos} : Updates an existing recurso.
     *
     * @param recurso the recurso to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated recurso,
     * or with status {@code 400 (Bad Request)} if the recurso is not valid,
     * or with status {@code 500 (Internal Server Error)} if the recurso couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/recursos")
    public ResponseEntity<Recurso> updateRecurso(@RequestBody Recurso recurso) throws URISyntaxException {
        log.debug("REST request to update Recurso : {}", recurso);
        if (recurso.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Recurso result = recursoRepository.save(recurso);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, recurso.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /recursos} : get all the recursos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of recursos in body.
     */
    @GetMapping("/recursos")
    public List<Recurso> getAllRecursos() {
        log.debug("REST request to get all Recursos");
        return recursoRepository.findAll();
    }

    /**
     * {@code GET  /recursos/:id} : get the "id" recurso.
     *
     * @param id the id of the recurso to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the recurso, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/recursos/{id}")
    public ResponseEntity<Recurso> getRecurso(@PathVariable Long id) {
        log.debug("REST request to get Recurso : {}", id);
        Optional<Recurso> recurso = recursoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(recurso);
    }

    /**
     * {@code DELETE  /recursos/:id} : delete the "id" recurso.
     *
     * @param id the id of the recurso to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/recursos/{id}")
    public ResponseEntity<Void> deleteRecurso(@PathVariable Long id) {
        log.debug("REST request to delete Recurso : {}", id);
        recursoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
