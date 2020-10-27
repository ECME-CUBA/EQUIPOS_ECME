package com.ecme.app.web.rest;

import com.ecme.app.domain.Motor;
import com.ecme.app.repository.MotorRepository;
import com.ecme.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.ecme.app.domain.Motor}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MotorResource {

    private final Logger log = LoggerFactory.getLogger(MotorResource.class);

    private static final String ENTITY_NAME = "motor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MotorRepository motorRepository;

    public MotorResource(MotorRepository motorRepository) {
        this.motorRepository = motorRepository;
    }

    /**
     * {@code POST  /motors} : Create a new motor.
     *
     * @param motor the motor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new motor, or with status {@code 400 (Bad Request)} if the motor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/motors")
    public ResponseEntity<Motor> createMotor(@Valid @RequestBody Motor motor) throws URISyntaxException {
        log.debug("REST request to save Motor : {}", motor);
        if (motor.getId() != null) {
            throw new BadRequestAlertException("A new motor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Motor result = motorRepository.save(motor);
        return ResponseEntity.created(new URI("/api/motors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /motors} : Updates an existing motor.
     *
     * @param motor the motor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated motor,
     * or with status {@code 400 (Bad Request)} if the motor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the motor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/motors")
    public ResponseEntity<Motor> updateMotor(@Valid @RequestBody Motor motor) throws URISyntaxException {
        log.debug("REST request to update Motor : {}", motor);
        if (motor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Motor result = motorRepository.save(motor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, motor.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /motors} : get all the motors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of motors in body.
     */
    @GetMapping("/motors")
    public List<Motor> getAllMotors() {
        log.debug("REST request to get all Motors");
        return motorRepository.findAll();
    }

    /**
     * {@code GET  /motors/:id} : get the "id" motor.
     *
     * @param id the id of the motor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the motor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/motors/{id}")
    public ResponseEntity<Motor> getMotor(@PathVariable Long id) {
        log.debug("REST request to get Motor : {}", id);
        Optional<Motor> motor = motorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(motor);
    }

    /**
     * {@code DELETE  /motors/:id} : delete the "id" motor.
     *
     * @param id the id of the motor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/motors/{id}")
    public ResponseEntity<Void> deleteMotor(@PathVariable Long id) {
        log.debug("REST request to delete Motor : {}", id);
        motorRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
