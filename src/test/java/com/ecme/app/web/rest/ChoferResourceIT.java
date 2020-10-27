package com.ecme.app.web.rest;

import com.ecme.app.EquiposApp;
import com.ecme.app.domain.Chofer;
import com.ecme.app.repository.ChoferRepository;

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

import com.ecme.app.domain.enumeration.Licencia;
/**
 * Integration tests for the {@link ChoferResource} REST controller.
 */
@SpringBootTest(classes = EquiposApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ChoferResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Licencia DEFAULT_LICENCIA = Licencia.A_1;
    private static final Licencia UPDATED_LICENCIA = Licencia.A;

    @Autowired
    private ChoferRepository choferRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restChoferMockMvc;

    private Chofer chofer;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Chofer createEntity(EntityManager em) {
        Chofer chofer = new Chofer()
            .nombre(DEFAULT_NOMBRE)
            .licencia(DEFAULT_LICENCIA);
        return chofer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Chofer createUpdatedEntity(EntityManager em) {
        Chofer chofer = new Chofer()
            .nombre(UPDATED_NOMBRE)
            .licencia(UPDATED_LICENCIA);
        return chofer;
    }

    @BeforeEach
    public void initTest() {
        chofer = createEntity(em);
    }

    @Test
    @Transactional
    public void createChofer() throws Exception {
        int databaseSizeBeforeCreate = choferRepository.findAll().size();
        // Create the Chofer
        restChoferMockMvc.perform(post("/api/chofers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(chofer)))
            .andExpect(status().isCreated());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeCreate + 1);
        Chofer testChofer = choferList.get(choferList.size() - 1);
        assertThat(testChofer.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testChofer.getLicencia()).isEqualTo(DEFAULT_LICENCIA);
    }

    @Test
    @Transactional
    public void createChoferWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = choferRepository.findAll().size();

        // Create the Chofer with an existing ID
        chofer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChoferMockMvc.perform(post("/api/chofers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(chofer)))
            .andExpect(status().isBadRequest());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllChofers() throws Exception {
        // Initialize the database
        choferRepository.saveAndFlush(chofer);

        // Get all the choferList
        restChoferMockMvc.perform(get("/api/chofers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chofer.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].licencia").value(hasItem(DEFAULT_LICENCIA.toString())));
    }
    
    @Test
    @Transactional
    public void getChofer() throws Exception {
        // Initialize the database
        choferRepository.saveAndFlush(chofer);

        // Get the chofer
        restChoferMockMvc.perform(get("/api/chofers/{id}", chofer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(chofer.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.licencia").value(DEFAULT_LICENCIA.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingChofer() throws Exception {
        // Get the chofer
        restChoferMockMvc.perform(get("/api/chofers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChofer() throws Exception {
        // Initialize the database
        choferRepository.saveAndFlush(chofer);

        int databaseSizeBeforeUpdate = choferRepository.findAll().size();

        // Update the chofer
        Chofer updatedChofer = choferRepository.findById(chofer.getId()).get();
        // Disconnect from session so that the updates on updatedChofer are not directly saved in db
        em.detach(updatedChofer);
        updatedChofer
            .nombre(UPDATED_NOMBRE)
            .licencia(UPDATED_LICENCIA);

        restChoferMockMvc.perform(put("/api/chofers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedChofer)))
            .andExpect(status().isOk());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeUpdate);
        Chofer testChofer = choferList.get(choferList.size() - 1);
        assertThat(testChofer.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testChofer.getLicencia()).isEqualTo(UPDATED_LICENCIA);
    }

    @Test
    @Transactional
    public void updateNonExistingChofer() throws Exception {
        int databaseSizeBeforeUpdate = choferRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChoferMockMvc.perform(put("/api/chofers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(chofer)))
            .andExpect(status().isBadRequest());

        // Validate the Chofer in the database
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChofer() throws Exception {
        // Initialize the database
        choferRepository.saveAndFlush(chofer);

        int databaseSizeBeforeDelete = choferRepository.findAll().size();

        // Delete the chofer
        restChoferMockMvc.perform(delete("/api/chofers/{id}", chofer.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Chofer> choferList = choferRepository.findAll();
        assertThat(choferList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
