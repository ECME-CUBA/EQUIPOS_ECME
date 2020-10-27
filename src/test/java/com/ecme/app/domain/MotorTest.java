package com.ecme.app.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ecme.app.web.rest.TestUtil;

public class MotorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Motor.class);
        Motor motor1 = new Motor();
        motor1.setId(1L);
        Motor motor2 = new Motor();
        motor2.setId(motor1.getId());
        assertThat(motor1).isEqualTo(motor2);
        motor2.setId(2L);
        assertThat(motor1).isNotEqualTo(motor2);
        motor1.setId(null);
        assertThat(motor1).isNotEqualTo(motor2);
    }
}
