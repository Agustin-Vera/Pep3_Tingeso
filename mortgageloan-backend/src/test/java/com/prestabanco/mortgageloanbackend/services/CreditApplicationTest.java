package com.prestabanco.mortgageloanbackend.services;

import com.prestabanco.mortgageloanbackend.entities.CreditApplicationEntity;
import com.prestabanco.mortgageloanbackend.entities.UserEntity;
import com.prestabanco.mortgageloanbackend.repositories.CreditApplicationRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CreditApplicationTest {

    @Mock
    private CreditApplicationRepository creditApplicationRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private CreditApplicationService creditApplicationService;

    @Test
    public void testSaveCreditApplication_UserExist_thenSavesCreditApplication() {
        // Given
        CreditApplicationEntity creditApplication = new CreditApplicationEntity();
        creditApplication.setRutUser("12345678-9");

        // Simulamos que el usuario existe devolviendo una instancia de UserEntity
        UserEntity user = new UserEntity();
        when(userService.getUserByRut("12345678-9")).thenReturn(user);
        when(creditApplicationRepository.save(creditApplication)).thenReturn(creditApplication);

        // When
        CreditApplicationEntity result = creditApplicationService.saveCreditApplication(creditApplication);

        // Then
        assertEquals(creditApplication, result);
        assertEquals(1, result.getState());
        assertEquals("En Revisión Inicial", result.getStateDescription());
        verify(creditApplicationRepository).save(creditApplication); // Verifica que se haya llamado al método save
    }

    @Test
    public void testSaveCreditApplication_UserNotExists_thenReturnsNull() {
        // Given
        CreditApplicationEntity creditApplication = new CreditApplicationEntity();
        creditApplication.setRutUser("12345678-9");

        when(userService.getUserByRut("12345678-9")).thenReturn(null); // Simulamos que el usuario no existe

        // When
        CreditApplicationEntity result = creditApplicationService.saveCreditApplication(creditApplication);

        // Then
        assertNull(result, "El resultado debe ser null cuando el usuario no existe");
    }

    @Test
    public void testGetCreditApplications_thenReturnsAllApplications() {
        // Given
        CreditApplicationEntity app1 = new CreditApplicationEntity();
        CreditApplicationEntity app2 = new CreditApplicationEntity();
        List<CreditApplicationEntity> applications = Arrays.asList(app1, app2);

        when(creditApplicationRepository.findAll()).thenReturn(applications);

        // When
        List<CreditApplicationEntity> result = creditApplicationService.getCreditApplications();

        // Then
        assertEquals(applications, result, "El resultado debe contener todas las solicitudes de crédito");
    }


    @Test
    public void testGetCreditApplicationById_thenReturnsApplication() {
        // Given
        Long id = 1L;
        CreditApplicationEntity creditApplication = new CreditApplicationEntity();
        creditApplication.setId_application(id);

        when(creditApplicationRepository.findById(id)).thenReturn(Optional.of(creditApplication));

        // When
        CreditApplicationEntity result = creditApplicationService.getCreditApplicationById(id);

        // Then
        assertThat(result.getId_application()).isEqualTo(creditApplication.getId_application());
    }


    @Test
    public void testUpdateCreditApplication_thenSavesUpdatedApplication() {
        // Given
        CreditApplicationEntity creditApplication = new CreditApplicationEntity();
        creditApplication.setId_application(1L);
        creditApplication.setState(1);
        creditApplication.setStateDescription("En Revisión Inicial");

        when(creditApplicationRepository.save(creditApplication)).thenReturn(creditApplication);

        // Cambios a testear
        creditApplication.setState(2);
        creditApplication.setStateDescription("Falta documentación");

        // When
        CreditApplicationEntity result = creditApplicationService.updateCreditApplication(creditApplication);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getId_application()).isEqualTo(1L);
        assertThat(result.getState()).isEqualTo(2);
        assertThat(result.getStateDescription()).isEqualTo("Falta documentación");
    }


}
