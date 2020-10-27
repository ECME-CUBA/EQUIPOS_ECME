package com.ecme.app.web.rest;

import com.ecme.app.EquiposApp;
import com.ecme.app.domain.Equipo;
import com.ecme.app.repository.EquipoRepository;

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

import com.ecme.app.domain.enumeration.Clase;
import com.ecme.app.domain.enumeration.Estado;
import com.ecme.app.domain.enumeration.UEB;
/**
 * Integration tests for the {@link EquipoResource} REST controller.
 */
@SpringBootTest(classes = EquiposApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EquipoResourceIT {

    private static final String DEFAULT_CHAPILLA = "AAAAAAAAAA";
    private static final String UPDATED_CHAPILLA = "BBBBBBBBBB";

    private static final Clase DEFAULT_CLASE = Clase.Ligero;
    private static final Clase UPDATED_CLASE = Clase.Pesado;

    private static final String DEFAULT_MODELO = "AAAAAAAAAA";
    private static final String UPDATED_MODELO = "BBBBBBBBBB";

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_CHAPA = "AAAAAAAAAA";
    private static final String UPDATED_CHAPA = "BBBBBBBBBB";

    private static final Estado DEFAULT_ESTADO = Estado.BUENO;
    private static final Estado UPDATED_ESTADO = Estado.REGULAR;

    private static final Integer DEFAULT_ANNO = 1;
    private static final Integer UPDATED_ANNO = 2;

    private static final UEB DEFAULT_UEB = UEB.PROYECTO;
    private static final UEB UPDATED_UEB = UEB.COES;

    @Autowired
    private EquipoRepository equipoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEquipoMockMvc;

    private Equipo equipo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Equipo createEntity(EntityManager em) {
        Equipo equipo = new Equipo()
            .chapilla(DEFAULT_CHAPILLA)
            .clase(DEFAULT_CLASE)
            .modelo(DEFAULT_MODELO)
            .codigo(DEFAULT_CODIGO)
            .chapa(DEFAULT_CHAPA)
            .estado(DEFAULT_ESTADO)
            .anno(DEFAULT_ANNO)
            .ueb(DEFAULT_UEB);
        return equipo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Equipo createUpdatedEntity(EntityManager em) {
        Equipo equipo = new Equipo()
            .chapilla(UPDATED_CHAPILLA)
            .clase(UPDATED_CLASE)
            .modelo(UPDATED_MODELO)
            .codigo(UPDATED_CODIGO)
            .chapa(UPDATED_CHAPA)
            .estado(UPDATED_ESTADO)
            .anno(UPDATED_ANNO)
            .ueb(UPDATED_UEB);
        return equipo;
    }

    @BeforeEach
    public void initTest() {
        equipo = createEntity(em);
    }

    @Test
    @Transactional
    public void createEquipo() throws Exception {
        int databaseSizeBeforeCreate = equipoRepository.findAll().size();
        // Create the Equipo
        restEquipoMockMvc.perform(post("/api/equipos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(equipo)))
            .andExpect(status().isCreated());

        // Validate the Equipo in the database
        List<Equipo> equipoList = equipoRepository.findAll();
        assertThat(equipoList).hasSize(databaseSizeBeforeCreate + 1);
        Equipo testEquipo = equipoList.get(equipoList.size() - 1);
        assertThat(testEquipo.getChapilla()).isEqualTo(DEFAULT_CHAPILLA);
        assertThat(testEquipo.getClase()).isEqualTo(DEFAULT_CLASE);
        assertThat(testEquipo.getModelo()).isEqualTo(DEFAULT_MODELO);
        assertThat(testEquipo.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testEquipo.getChapa()).isEqualTo(DEFAULT_CHAPA);
        assertThat(testEquipo.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testEquipo.getAnno()).isEqualTo(DEFAULT_ANNO);
        assertThat(testEquipo.getUeb()).isEqualTo(DEFAULT_UEB);
    }

    @Test
    @Transactional
    public void createEquipoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = equipoRepository.findAll().size();

        // Create the Equipo with an existing ID
        equipo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEquipoMockMvc.perform(post("/api/equipos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(equipo)))
            .andExpect(status().isBadRequest());

        // Validate the Equipo in the database
        List<Equipo> equipoList = equipoRepository.findAll();
        assertThat(equipoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEquipos() throws Exception {
        // Initialize the database
        equipoRepository.saveAndFlush(equipo);

        // Get all the equipoList
        restEquipoMockMvc.perform(get("/api/equipos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(equipo.getId().intValue())))
            .andExpect(jsonPath("$.[*].chapilla").value(hasItem(DEFAULT_CHAPILLA)))
            .andExpect(jsonPath("$.[*].clase").value(hasItem(DEFAULT_CLASE.toString())))
            .andExpect(jsonPath("$.[*].modelo").value(hasItem(DEFAULT_MODELO)))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)))
            .andExpect(jsonPath("$.[*].chapa").value(hasItem(DEFAULT_CHAPA)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].anno").value(hasItem(DEFAULT_ANNO)))
            .andExpect(jsonPath("$.[*].ueb").value(hasItem(DEFAULT_UEB.toString())));
    }
    
    @Test
    @Transactional
    public void getEquipo() throws Exception {
        // Initialize the database
        equipoRepository.saveAndFlush(equipo);

        // Get the equipo
        restEquipoMockMvc.perform(get("/api/equipos/{id}", equipo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(equipo.getId().intValue()))
            .andExpect(jsonPath("$.chapilla").value(DEFAULT_CHAPILLA))
            .andExpect(jsonPath("$.clase").value(DEFAULT_CLASE.toString()))
            .andExpect(jsonPath("$.modelo").value(DEFAULT_MODELO))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO))
            .andExpect(jsonPath("$.chapa").value(DEFAULT_CHAPA))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()))
            .andExpect(jsonPath("$.anno").value(DEFAULT_ANNO))
            .andExpect(jsonPath("$.ueb").value(DEFAULT_UEB.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingEquipo() throws Exception {
        // Get the equipo
        restEquipoMockMvc.perform(get("/api/equipos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEquipo() throws Exception {
        // Initialize the database
        equipoRepository.saveAndFlush(equipo);

        int databaseSizeBeforeUpdate = equipoRepository.findAll().size();

        // Update the equipo
        Equipo updatedEquipo = equipoRepository.findById(equipo.getId()).get();
        // Disconnect from session so that the updates on updatedEquipo are not directly saved in db
        em.detach(updatedEquipo);
        updatedEquipo
            .chapilla(UPDATED_CHAPILLA)
            .clase(UPDATED_CLASE)
            .modelo(UPDATED_MODELO)
            .codigo(UPDATED_CODIGO)
            .chapa(UPDATED_CHAPA)
            .estado(UPDATED_ESTADO)
            .anno(UPDATED_ANNO)
            .ueb(UPDATED_UEB);

        restEquipoMockMvc.perform(put("/api/equipos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEquipo)))
            .andExpect(status().isOk());

        // Validate the Equipo in the database
        List<Equipo> equipoList = equipoRepository.findAll();
        assertThat(equipoList).hasSize(databaseSizeBeforeUpdate);
        Equipo testEquipo = equipoList.get(equipoList.size() - 1);
        assertThat(testEquipo.getChapilla()).isEqualTo(UPDATED_CHAPILLA);
        assertThat(testEquipo.getClase()).isEqualTo(UPDATED_CLASE);
        assertThat(testEquipo.getModelo()).isEqualTo(UPDATED_MODELO);
        assertThat(testEquipo.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testEquipo.getChapa()).isEqualTo(UPDATED_CHAPA);
        assertThat(testEquipo.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testEquipo.getAnno()).isEqualTo(UPDATED_ANNO);
        assertThat(testEquipo.getUeb()).isEqualTo(UPDATED_UEB);
    }

    @Test
    @Transactional
    public void updateNonExistingEquipo() throws Exception {
        int databaseSizeBeforeUpdate = equipoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEquipoMockMvc.perform(put("/api/equipos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(equipo)))
            .andExpect(status().isBadRequest());

        // Validate the Equipo in the database
        List<Equipo> equipoList = equipoRepository.findAll();
        assertThat(equipoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEquipo() throws Exception {
        // Initialize the database
        equipoRepository.saveAndFlush(equipo);

        int databaseSizeBeforeDelete = equipoRepository.findAll().size();

        // Delete the equipo
        restEquipoMockMvc.perform(delete("/api/equipos/{id}", equipo.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Equipo> equipoList = equipoRepository.findAll();
        assertThat(equipoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
