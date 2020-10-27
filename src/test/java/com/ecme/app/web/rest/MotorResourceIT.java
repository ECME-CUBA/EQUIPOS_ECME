package com.ecme.app.web.rest;

import com.ecme.app.EquiposApp;
import com.ecme.app.domain.Motor;
import com.ecme.app.repository.MotorRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ecme.app.domain.enumeration.Estado;
/**
 * Integration tests for the {@link MotorResource} REST controller.
 */
@SpringBootTest(classes = EquiposApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MotorResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final Estado DEFAULT_ESTADO = Estado.BUENO;
    private static final Estado UPDATED_ESTADO = Estado.REGULAR;

    private static final String DEFAULT_MARCA = "AAAAAAAAAA";
    private static final String UPDATED_MARCA = "BBBBBBBBBB";

    @Autowired
    private MotorRepository motorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMotorMockMvc;

    private Motor motor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Motor createEntity(EntityManager em) {
        Motor motor = new Motor()
            .codigo(DEFAULT_CODIGO)
            .estado(DEFAULT_ESTADO)
            .marca(DEFAULT_MARCA);
        return motor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Motor createUpdatedEntity(EntityManager em) {
        Motor motor = new Motor()
            .codigo(UPDATED_CODIGO)
            .estado(UPDATED_ESTADO)
            .marca(UPDATED_MARCA);
        return motor;
    }

    @BeforeEach
    public void initTest() {
        motor = createEntity(em);
    }

    @Test
    @Transactional
    public void createMotor() throws Exception {
        int databaseSizeBeforeCreate = motorRepository.findAll().size();
        // Create the Motor
        restMotorMockMvc.perform(post("/api/motors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(motor)))
            .andExpect(status().isCreated());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeCreate + 1);
        Motor testMotor = motorList.get(motorList.size() - 1);
        assertThat(testMotor.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testMotor.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testMotor.getMarca()).isEqualTo(DEFAULT_MARCA);
    }

    @Test
    @Transactional
    public void createMotorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = motorRepository.findAll().size();

        // Create the Motor with an existing ID
        motor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMotorMockMvc.perform(post("/api/motors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(motor)))
            .andExpect(status().isBadRequest());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMotors() throws Exception {
        // Initialize the database
        motorRepository.saveAndFlush(motor);

        // Get all the motorList
        restMotorMockMvc.perform(get("/api/motors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(motor.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].marca").value(hasItem(DEFAULT_MARCA)));
    }
    
    @Test
    @Transactional
    public void getMotor() throws Exception {
        // Initialize the database
        motorRepository.saveAndFlush(motor);

        // Get the motor
        restMotorMockMvc.perform(get("/api/motors/{id}", motor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(motor.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()))
            .andExpect(jsonPath("$.marca").value(DEFAULT_MARCA));
    }
    @Test
    @Transactional
    public void getNonExistingMotor() throws Exception {
        // Get the motor
        restMotorMockMvc.perform(get("/api/motors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMotor() throws Exception {
        // Initialize the database
        motorRepository.saveAndFlush(motor);

        int databaseSizeBeforeUpdate = motorRepository.findAll().size();

        // Update the motor
        Motor updatedMotor = motorRepository.findById(motor.getId()).get();
        // Disconnect from session so that the updates on updatedMotor are not directly saved in db
        em.detach(updatedMotor);
        updatedMotor
            .codigo(UPDATED_CODIGO)
            .estado(UPDATED_ESTADO)
            .marca(UPDATED_MARCA);

        restMotorMockMvc.perform(put("/api/motors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMotor)))
            .andExpect(status().isOk());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeUpdate);
        Motor testMotor = motorList.get(motorList.size() - 1);
        assertThat(testMotor.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testMotor.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testMotor.getMarca()).isEqualTo(UPDATED_MARCA);
    }

    @Test
    @Transactional
    public void updateNonExistingMotor() throws Exception {
        int databaseSizeBeforeUpdate = motorRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMotorMockMvc.perform(put("/api/motors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(motor)))
            .andExpect(status().isBadRequest());

        // Validate the Motor in the database
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMotor() throws Exception {
        // Initialize the database
        motorRepository.saveAndFlush(motor);

        int databaseSizeBeforeDelete = motorRepository.findAll().size();

        // Delete the motor
        restMotorMockMvc.perform(delete("/api/motors/{id}", motor.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Motor> motorList = motorRepository.findAll();
        assertThat(motorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
