package com.ecme.app.web.rest;

import com.ecme.app.EquiposApp;
import com.ecme.app.domain.Asignacion;
import com.ecme.app.repository.AsignacionRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AsignacionResource} REST controller.
 */
@SpringBootTest(classes = EquiposApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AsignacionResourceIT {

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Float DEFAULT_CANTIDAD = 1F;
    private static final Float UPDATED_CANTIDAD = 2F;

    @Autowired
    private AsignacionRepository asignacionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAsignacionMockMvc;

    private Asignacion asignacion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Asignacion createEntity(EntityManager em) {
        Asignacion asignacion = new Asignacion()
            .fecha(DEFAULT_FECHA)
            .cantidad(DEFAULT_CANTIDAD);
        return asignacion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Asignacion createUpdatedEntity(EntityManager em) {
        Asignacion asignacion = new Asignacion()
            .fecha(UPDATED_FECHA)
            .cantidad(UPDATED_CANTIDAD);
        return asignacion;
    }

    @BeforeEach
    public void initTest() {
        asignacion = createEntity(em);
    }

    @Test
    @Transactional
    public void createAsignacion() throws Exception {
        int databaseSizeBeforeCreate = asignacionRepository.findAll().size();
        // Create the Asignacion
        restAsignacionMockMvc.perform(post("/api/asignacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(asignacion)))
            .andExpect(status().isCreated());

        // Validate the Asignacion in the database
        List<Asignacion> asignacionList = asignacionRepository.findAll();
        assertThat(asignacionList).hasSize(databaseSizeBeforeCreate + 1);
        Asignacion testAsignacion = asignacionList.get(asignacionList.size() - 1);
        assertThat(testAsignacion.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testAsignacion.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
    }

    @Test
    @Transactional
    public void createAsignacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = asignacionRepository.findAll().size();

        // Create the Asignacion with an existing ID
        asignacion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAsignacionMockMvc.perform(post("/api/asignacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(asignacion)))
            .andExpect(status().isBadRequest());

        // Validate the Asignacion in the database
        List<Asignacion> asignacionList = asignacionRepository.findAll();
        assertThat(asignacionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAsignacions() throws Exception {
        // Initialize the database
        asignacionRepository.saveAndFlush(asignacion);

        // Get all the asignacionList
        restAsignacionMockMvc.perform(get("/api/asignacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(asignacion.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getAsignacion() throws Exception {
        // Initialize the database
        asignacionRepository.saveAndFlush(asignacion);

        // Get the asignacion
        restAsignacionMockMvc.perform(get("/api/asignacions/{id}", asignacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(asignacion.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingAsignacion() throws Exception {
        // Get the asignacion
        restAsignacionMockMvc.perform(get("/api/asignacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAsignacion() throws Exception {
        // Initialize the database
        asignacionRepository.saveAndFlush(asignacion);

        int databaseSizeBeforeUpdate = asignacionRepository.findAll().size();

        // Update the asignacion
        Asignacion updatedAsignacion = asignacionRepository.findById(asignacion.getId()).get();
        // Disconnect from session so that the updates on updatedAsignacion are not directly saved in db
        em.detach(updatedAsignacion);
        updatedAsignacion
            .fecha(UPDATED_FECHA)
            .cantidad(UPDATED_CANTIDAD);

        restAsignacionMockMvc.perform(put("/api/asignacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAsignacion)))
            .andExpect(status().isOk());

        // Validate the Asignacion in the database
        List<Asignacion> asignacionList = asignacionRepository.findAll();
        assertThat(asignacionList).hasSize(databaseSizeBeforeUpdate);
        Asignacion testAsignacion = asignacionList.get(asignacionList.size() - 1);
        assertThat(testAsignacion.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testAsignacion.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
    }

    @Test
    @Transactional
    public void updateNonExistingAsignacion() throws Exception {
        int databaseSizeBeforeUpdate = asignacionRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAsignacionMockMvc.perform(put("/api/asignacions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(asignacion)))
            .andExpect(status().isBadRequest());

        // Validate the Asignacion in the database
        List<Asignacion> asignacionList = asignacionRepository.findAll();
        assertThat(asignacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAsignacion() throws Exception {
        // Initialize the database
        asignacionRepository.saveAndFlush(asignacion);

        int databaseSizeBeforeDelete = asignacionRepository.findAll().size();

        // Delete the asignacion
        restAsignacionMockMvc.perform(delete("/api/asignacions/{id}", asignacion.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Asignacion> asignacionList = asignacionRepository.findAll();
        assertThat(asignacionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
