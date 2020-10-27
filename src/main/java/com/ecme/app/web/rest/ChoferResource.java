package com.ecme.app.web.rest;

import com.ecme.app.domain.Chofer;
import com.ecme.app.repository.ChoferRepository;
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
 * REST controller for managing {@link com.ecme.app.domain.Chofer}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ChoferResource {

    private final Logger log = LoggerFactory.getLogger(ChoferResource.class);

    private static final String ENTITY_NAME = "chofer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ChoferRepository choferRepository;

    public ChoferResource(ChoferRepository choferRepository) {
        this.choferRepository = choferRepository;
    }

    /**
     * {@code POST  /chofers} : Create a new chofer.
     *
     * @param chofer the chofer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new chofer, or with status {@code 400 (Bad Request)} if the chofer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/chofers")
    public ResponseEntity<Chofer> createChofer(@RequestBody Chofer chofer) throws URISyntaxException {
        log.debug("REST request to save Chofer : {}", chofer);
        if (chofer.getId() != null) {
            throw new BadRequestAlertException("A new chofer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Chofer result = choferRepository.save(chofer);
        return ResponseEntity.created(new URI("/api/chofers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /chofers} : Updates an existing chofer.
     *
     * @param chofer the chofer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated chofer,
     * or with status {@code 400 (Bad Request)} if the chofer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the chofer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/chofers")
    public ResponseEntity<Chofer> updateChofer(@RequestBody Chofer chofer) throws URISyntaxException {
        log.debug("REST request to update Chofer : {}", chofer);
        if (chofer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Chofer result = choferRepository.save(chofer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, chofer.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /chofers} : get all the chofers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of chofers in body.
     */
    @GetMapping("/chofers")
    public List<Chofer> getAllChofers() {
        log.debug("REST request to get all Chofers");
        return choferRepository.findAll();
    }

    /**
     * {@code GET  /chofers/:id} : get the "id" chofer.
     *
     * @param id the id of the chofer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the chofer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/chofers/{id}")
    public ResponseEntity<Chofer> getChofer(@PathVariable Long id) {
        log.debug("REST request to get Chofer : {}", id);
        Optional<Chofer> chofer = choferRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(chofer);
    }

    /**
     * {@code DELETE  /chofers/:id} : delete the "id" chofer.
     *
     * @param id the id of the chofer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/chofers/{id}")
    public ResponseEntity<Void> deleteChofer(@PathVariable Long id) {
        log.debug("REST request to delete Chofer : {}", id);
        choferRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
