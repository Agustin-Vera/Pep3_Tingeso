package com.prestabanco.mortgageloanbackend.services;

import com.prestabanco.mortgageloanbackend.entities.CreditApplicationEntity;
import com.prestabanco.mortgageloanbackend.entities.MortgageLoanConditionEntity;
import com.prestabanco.mortgageloanbackend.entities.SavingsAccountEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.AssertionsForClassTypes.within;
import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
public class BusinessLogicTest {

    @Mock
    private CreditApplicationService creditAppServ;

    @Mock
    private MortgageLoanConditionService mortgageLoanConditionService;

    @InjectMocks
    private BusinessLogicService businessLogicService;

    // Definiendo condiciones y comportamiento de crédito para un servicio que sera utlizado en muchos test
    // Si se pide la obtención de las condiciones del crédito con id = 1 (simula el comportamiento)
    private MortgageLoanConditionEntity defaultLoanCondition;
    @BeforeEach
    public void setUp() {
        defaultLoanCondition = new MortgageLoanConditionEntity();
        defaultLoanCondition.setInterestRate(4.5);                // Tasa de interés estándar (anual)
        defaultLoanCondition.setMaximumFinancingAmount(0.8);      // Máximo de financiamiento del 80%
        // Configura el mock para devolver esta instancia en todos los tests
        Mockito.lenient().when(mortgageLoanConditionService.getMortgageLoanConditionById(1L)).thenReturn(defaultLoanCondition);
    }

    @Test
    public void testCalculateMonthlyInstallment_thenCorrect() {
        // Given
        CreditApplicationEntity creditApp = new CreditApplicationEntity();
        creditApp.setType(1L); // tipo de credito 1
        creditApp.setAmount(100000000); // 100.000.000 monto solicitado (100 millones)
        creditApp.setTerm(20); // 20 años para pagar

        // When
        double monthlyInstallment = businessLogicService.calculateMonthlyInstallment(creditApp);

        // Then (Se siguio la evaluacion mostrada en el enunciado)
        assertThat(monthlyInstallment).isCloseTo(632649, within(1.0));
    }

    @Test
    public void testCalculateMonthlyInstallment_NegativeAmount_thenNegativeMonthlyInstallment() {
        CreditApplicationEntity creditApp = new CreditApplicationEntity();
        creditApp.setType(1L);
        creditApp.setAmount(-100000000); // Monto negativo
        creditApp.setTerm(20);

        // When
        double monthlyInstallment = businessLogicService.calculateMonthlyInstallment(creditApp);

        // Then
        assertThat(monthlyInstallment).isLessThan(0); // La cuota no debe ser negativa, en esta caso da, cambiar en un futuro
    }

    @Test
    public void testSimulateCreditApplication_thenCorrect() {
        // Given
        double amount = 100000000; // 100 millones
        int term = 20; // 20 años
        Long type = 1L; // tipo 1

        // When
        Integer result = businessLogicService.simulateCreditApllication(amount, term, type);

        // Then
        assertThat(result).isEqualTo(632649);
    }

    @Test
    public void testEvaluateR1_thenApproved() {
        // Given
        Long idApp = 1L;
        double income = 3000000; // Ingreso mensual de 3 millones

        CreditApplicationEntity creditApp = new CreditApplicationEntity();
        creditApp.setId_application(idApp);
        creditApp.setType(1L); // Tipo de crédito 1
        creditApp.setAmount(100000000); // Monto de 100 millones
        creditApp.setTerm(20); // Plazo de 20 años

        when(creditAppServ.getCreditApplicationById(idApp)).thenReturn(creditApp);

        // When
        Map<String, Object> result = businessLogicService.evaluateR1(idApp, income);

        // Then
        assertThat(result).containsEntry("approved", true);
        assertThat(result).containsKey("message");
        assertThat(result.get("message")).asString().contains("Se debe aprobar");
    }

    @Test
    public void testEvaluateR1_thenRejected() {
        // Given
        Long idApp = 1L;
        double income = 800000; // Ingreso mensual de 800 mil pesos

        CreditApplicationEntity creditApp = new CreditApplicationEntity();
        creditApp.setId_application(idApp);
        creditApp.setType(1L); // Tipo de crédito 1
        creditApp.setAmount(100000000); // Monto de 100 millones
        creditApp.setTerm(20); // Plazo de 20 años

        when(creditAppServ.getCreditApplicationById(idApp)).thenReturn(creditApp);

        // When
        Map<String, Object> result = businessLogicService.evaluateR1(idApp, income);

        // Then
        assertThat(result).containsEntry("appproved", false);
        assertThat(result).containsKey("message");
        assertThat(result.get("message")).asString().contains("Se debe rechazar");
    }

    @Test
    public void testEvaluateR4_thenApproved() {
        // Given
        Long idApp = 1L;
        double income = 3000000; // Ingreso mensual de 3 millones
        double debt = 500000; // Deuda de 500 mil

        CreditApplicationEntity creditApp = new CreditApplicationEntity();
        creditApp.setId_application(idApp);
        creditApp.setType(1L); // Tipo de crédito 1
        creditApp.setAmount(100000000); // Monto de 100 millones
        creditApp.setTerm(20); // Plazo de 20 años

        when(creditAppServ.getCreditApplicationById(idApp)).thenReturn(creditApp);

        // When
        Map<String, Object> result = businessLogicService.evaluateR4(idApp, income, debt);

        // Then
        assertThat(result).containsEntry("approved", true);
        assertThat(result).containsKey("message");
        assertThat(result.get("message")).asString().contains("Se debe aprobar");
    }

    @Test
    public void testEvaluateR4_thenRejected() {
        // Given
        Long idApp = 1L;
        double income = 2000000; // Ingreso mensual de 2 millones
        double debt = 1200000; // Deuda de 1.2 millones, el servicio le suma la cuota mensual

        CreditApplicationEntity creditApp = new CreditApplicationEntity();
        creditApp.setId_application(idApp);
        creditApp.setType(1L); // Tipo de crédito 1
        creditApp.setAmount(100000000); // Monto de 100 millones
        creditApp.setTerm(20); // Plazo de 20 años

        when(creditAppServ.getCreditApplicationById(idApp)).thenReturn(creditApp);

        // When
        Map<String, Object> result = businessLogicService.evaluateR4(idApp, income, debt);

        // Then
        assertThat(result).containsEntry("appproved", false);
        assertThat(result).containsKey("message");
        assertThat(result.get("message")).asString().contains("Se debe rechazar");
    }

    @Test
    public void testEvaluateR5_thenApproved() {
        // Given
        Long idApp = 1L;
        double propertyValue = 200000000; // Valor de la propiedad
        double requestedAmount = 150000000; // Monto solicitado es menor al 80% del valor de la propiedad

        CreditApplicationEntity creditApp = new CreditApplicationEntity();
        creditApp.setId_application(idApp);
        creditApp.setType(1L); // Tipo de crédito 1
        creditApp.setAmount(requestedAmount);

        when(creditAppServ.getCreditApplicationById(idApp)).thenReturn(creditApp);

        // When
        Map<String, Object> result = businessLogicService.evaluateR5(idApp, propertyValue);

        // Then
        assertThat(result).containsEntry("approved", true);
        assertThat(result).containsKey("message");
        assertThat(result.get("message")).asString().contains("Se debe aprobar");
    }

    @Test
    public void testEvaluateR5_thenRejected() {
        // Given
        Long idApp = 1L;
        double propertyValue = 200000000; // Valor de la propiedad
        double requestedAmount = 180000000; // Monto solicitado es mayor al 80% del valor de la propiedad

        CreditApplicationEntity creditApp = new CreditApplicationEntity();
        creditApp.setId_application(idApp);
        creditApp.setType(1L); // Tipo de crédito 1
        creditApp.setAmount(requestedAmount);

        when(creditAppServ.getCreditApplicationById(idApp)).thenReturn(creditApp);

        // When
        Map<String, Object> result = businessLogicService.evaluateR5(idApp, propertyValue);

        // Then
        assertThat(result).containsEntry("approved", false);
        assertThat(result).containsKey("message");
        assertThat(result.get("message")).asString().contains("Se debe rechazar");
    }

    @Test
    public void testEvaluateR6_Approved() {
        // Given
        Long idApp = 1L;
        LocalDate birthDate = LocalDate.now().minusYears(30); // Cliente de 30 años
        int term = 20; // Plazo de 20 años para el crédito

        CreditApplicationEntity creditApp = new CreditApplicationEntity();
        creditApp.setId_application(idApp);
        creditApp.setTerm(term);

        when(creditAppServ.getCreditApplicationById(idApp)).thenReturn(creditApp);

        // When
        Map<String, Object> result = businessLogicService.evaluateR6(idApp, birthDate);

        // Then
        assertThat(result).containsEntry("approved", true);
        assertThat(result).containsKey("message");
        assertThat(result.get("message")).asString().contains("Se debe aprobar");
    }

    @Test
    public void testEvaluateR6_thenRejected() {
        // Given
        Long idApp = 1L;
        LocalDate birthDate = LocalDate.now().minusYears(55); // Cliente de 55 años
        int term = 20; // Plazo de 20 años para el crédito

        CreditApplicationEntity creditApp = new CreditApplicationEntity();
        creditApp.setId_application(idApp);
        creditApp.setTerm(term);

        when(creditAppServ.getCreditApplicationById(idApp)).thenReturn(creditApp);

        // When
        Map<String, Object> result = businessLogicService.evaluateR6(idApp, birthDate);

        // Then
        assertThat(result).containsEntry("approved", false);
        assertThat(result).containsKey("message");
        assertThat(result.get("message")).asString().contains("Se debe rechazar");
    }

    @Test
    public void testEvaluateR71_thenApproved() {
        // Given
        Long idApp = 1L;
        double balance = 15000000; // Saldo de 15 millones (cuenta de ahorros)
        double amount = 100000000; // Monto  solicitado 100 millones

        CreditApplicationEntity creditApp = new CreditApplicationEntity();
        creditApp.setId_application(idApp);
        creditApp.setAmount(amount);

        when(creditAppServ.getCreditApplicationById(idApp)).thenReturn(creditApp);

        // When
        boolean result = businessLogicService.evaluateR71(idApp, balance);

        // Then
        assertThat(result).isTrue(); // El saldo es al menos el 10% del monto
    }

    @Test
    public void testEvaluateR71_thenRejected() {
        // Given
        Long idApp = 1L;
        double balance = 5000000; // Saldo de 5 millones (cuenta de ahorros)
        double amount = 100000000; // Monto solicitado 100 millones

        CreditApplicationEntity creditApp = new CreditApplicationEntity();
        creditApp.setId_application(idApp);
        creditApp.setAmount(amount);

        when(creditAppServ.getCreditApplicationById(idApp)).thenReturn(creditApp);

        // When
        boolean result = businessLogicService.evaluateR71(idApp, balance);

        // Then
        assertThat(result).isFalse(); // El saldo es menor al 10% del monto
    }

    @Test
    public void testEvaluateR72_thenApproved() {
        // Given
        List<Double> consistentSavings = Arrays.asList(10000.0, 9500.0, 9000.0, 8500.0, 8000.0, 7600.0,
                7200.0, 7000.0, 6900.0, 6800.0, 6700.0, 6600.0); // saldo mensual en cuenta de ahorros

        // When
        boolean result = businessLogicService.evaluateR72(consistentSavings);

        // Then
        assertThat(result).isTrue(); // Los ahorros son consistentes
    }

    @Test
    public void testEvaluateR72_zeroSaving_thenRejected() {
        // Given
        List<Double> savingsWithZero = Arrays.asList(10000.0, 0.0, 9000.0, 8500.0, 8000.0, 0.0,
                7200.0, 7000.0, 6900.0, 6800.0, 6700.0, 6600.0);

        // When
        boolean result = businessLogicService.evaluateR72(savingsWithZero);

        // Then
        assertThat(result).isFalse();
    }

    @Test
    public void testEvaluateR72_significantWithdrawal_thenRejected() {
        // Given
        List<Double> savingsWithDrop = Arrays.asList(10000.0, 9500.0, 9000.0, 8500.0, 8000.0, 3000.0,
                7200.0, 7000.0, 6900.0, 6800.0, 6700.0, 6600.0);

        // When
        boolean result = businessLogicService.evaluateR72(savingsWithDrop);

        // Then
        assertThat(result).isFalse(); // Hay un retiro significativo, rechazado
    }

    @Test
    public void testEvaluateR73_thenApproved() {
        // Given
        double income = 1000000; // Ingreso mensual de 1 millón
        List<Double> deposits = Arrays.asList(5000.0, 6000.0, 7000.0, 5500.0, 8000.0, 5000.0,
                6000.0, 7000.0, 5000.0, 6000.0, 5500.0, 7000.0);

        // When
        boolean result = businessLogicService.evaluateR73(income, deposits);

        // Then
        assertThat(result).isTrue(); // El total de depósitos es al menos el 5% del ingreso
    }

    @Test
    public void testEvaluateR73_thenRejected() {
        // Given
        double income = 1000000; // Ingreso mensual de 1 millón
        List<Double> deposits = Arrays.asList(1000.0, 1500.0, 2000.0, 1000.0, 1500.0, 2000.0,
                1000.0, 1500.0, 1000.0, 1500.0, 2000.0, 1500.0);

        // When
        boolean result = businessLogicService.evaluateR73(income, deposits);

        // Then
        assertThat(result).isFalse(); // El total de depósitos es menor al 5% del ingreso
    }

    @Test
    public void testEvaluateR74_lessThanTwoYears_thenApproved() {
        // Given
        Long idApp = 1L;
        double balance = 25000000; // Saldo de 25 millones
        double amount = 100000000; // Monto del crédito de 100 millones
        LocalDate date = LocalDate.now().minusYears(1); // 1 año de antigüedad (cuenta)

        CreditApplicationEntity creditApp = new CreditApplicationEntity();
        creditApp.setId_application(idApp);
        creditApp.setAmount(amount);

        when(creditAppServ.getCreditApplicationById(idApp)).thenReturn(creditApp);

        // When
        boolean result = businessLogicService.evaluateR74(idApp, balance, date);

        // Then
        assertThat(result).isTrue(); // El saldo es mayor al 20% del monto
    }

    @Test
    public void testEvaluateR74_lessThanTwoYears_thenRejected() {
        // Given
        Long idApp = 1L;
        double balance = 15000000; // Saldo de 15 millones
        double amount = 100000000; // Monto del crédito de 100 millones
        LocalDate date = LocalDate.now().minusYears(1); // 1 año de antigüedad (cuenta)

        CreditApplicationEntity creditApp = new CreditApplicationEntity();
        creditApp.setId_application(idApp);
        creditApp.setAmount(amount);

        when(creditAppServ.getCreditApplicationById(idApp)).thenReturn(creditApp);

        // When
        boolean result = businessLogicService.evaluateR74(idApp, balance, date);

        // Then
        assertThat(result).isFalse(); // El saldo es menor al 20% del monto
    }

    @Test
    public void testEvaluateR74_MoreThanTwoYear_thenApproved() {
        // Given
        Long idApp = 1L;
        double balance = 12000000; // Saldo de 12 millones
        double amount = 100000000; // Monto del crédito de 100 millones
        LocalDate date = LocalDate.now().minusYears(3); // mas de dos años de antiguedad

        CreditApplicationEntity creditApp = new CreditApplicationEntity();
        creditApp.setId_application(idApp);
        creditApp.setAmount(amount);

        when(creditAppServ.getCreditApplicationById(idApp)).thenReturn(creditApp);

        // When
        boolean result = businessLogicService.evaluateR74(idApp, balance, date);

        // Then
        assertThat(result).isTrue(); // El saldo es mayor al 10% del monto
    }

    @Test
    public void testEvaluateR74_MoreThanTwoYear_thenRejected() {
        // Given
        Long idApp = 1L;
        double balance = 5000000; // Saldo de 5 millones
        double amount = 100000000; // Monto del crédito de 100 millones
        LocalDate date = LocalDate.now().minusYears(3); // mas de dos años de antiguedad

        CreditApplicationEntity creditApp = new CreditApplicationEntity();
        creditApp.setId_application(idApp);
        creditApp.setAmount(amount);

        when(creditAppServ.getCreditApplicationById(idApp)).thenReturn(creditApp);

        // When
        boolean result = businessLogicService.evaluateR74(idApp, balance, date);

        // Then
        assertThat(result).isFalse(); // El saldo es menor al 10% del monto
    }

    @Test
    public void testEvaluateR75_thenApproved() {
        // Given
        // primeros 6 meses - últimos 6 meses
        List<Double> savings = Arrays.asList(
                10000.0, 9500.0, 9000.0, 8500.0, 8000.0, 7800.0,
                7600.0, 7400.0, 7300.0, 7200.0, 7100.0, 7000.0
        );

        // When
        boolean result = businessLogicService.evaluateR75(savings);

        // Then
        assertThat(result).isTrue(); // No hay disminuciones mayores al 30%
    }

    @Test
    public void testEvaluateR75_significantWithdrawal_thenRejected() {
        // Given
        // primeros 6 meses - últimos 6 meses
        List<Double> savings = Arrays.asList(
                10000.0, 9500.0, 9000.0, 8500.0, 8000.0, 7800.0,
                7600.0, 5000.0, 7300.0, 7200.0, 7100.0, 7000.0
        );

        // When
        boolean result = businessLogicService.evaluateR75(savings);

        // Then
        assertThat(result).isFalse(); // Hay una disminución mayor al 30%
    }

    @Test
    public void testCalculateTotalCostsCreditApplication_thenCorrect() {
        // Given
        long idApp = 1L;
        double amount = 100000000; // Monto de 100 millones
        int term = 20; // Plazo de 20 años

        CreditApplicationEntity creditApp = new CreditApplicationEntity();
        creditApp.setId_application(idApp);
        creditApp.setAmount(amount);
        creditApp.setTerm(term);
        creditApp.setType(1L);

        double expectedMonthlyInstallment = businessLogicService.calculateMonthlyInstallment(creditApp);

        when(creditAppServ.getCreditApplicationById(idApp)).thenReturn(creditApp);
        when(creditAppServ.updateCreditApplication(creditApp)).thenReturn(creditApp); // Configura el mock para devolver el objeto actualizado

        // When
        CreditApplicationEntity result = businessLogicService.calculateTotalCostsCreditApplication(idApp);

        // Calculando valores esperados manualmente
        double expectedCommission = amount * 0.01;                // comision
        double expectedCreditLifeInsurance = amount * 0.0003;     // desgravamen
        double expectedFireInsurance = 20000;                    // incendio
        double expectedTotalCosts = (expectedMonthlyInstallment + expectedCreditLifeInsurance + expectedFireInsurance) * (term * 12) + expectedCommission;

        // Then
        assertThat(result.getTotalCost()).isCloseTo(expectedTotalCosts, within(1.0));
        assertThat(result.getCreditLifeInsurance()).isEqualTo(expectedCreditLifeInsurance);
        assertThat(result.getCommission()).isEqualTo(expectedCommission);
        assertThat(result.getMonthlyInstallment()).isEqualTo(expectedMonthlyInstallment);
        assertThat(result.getFireInsurance()).isEqualTo(expectedFireInsurance);
    }

    @Test
    public void testEvaluateR7_thenApproved() {
        // Given
        Long idApp = 1L;
        double balance = 5000000; // Saldo de 5 millones
        double amount = 100000000; // Monto del crédito de 100 millones
        LocalDate date = LocalDate.now().minusYears(3); // mas de dos años de antiguedad

        CreditApplicationEntity creditApp = new CreditApplicationEntity();
        creditApp.setId_application(idApp);
        creditApp.setAmount(amount);

        when(creditAppServ.getCreditApplicationById(idApp)).thenReturn(creditApp);

        //Long idApp = 1L;
        SavingsAccountEntity savingsAccount = new SavingsAccountEntity();
        savingsAccount.setBalance(15000000); // Suficiente saldo mínimo
        savingsAccount.setIncome(1000000); // Ingreso de 1 millón
        savingsAccount.setDeposits(Arrays.asList(5000.0, 6000.0, 7000.0, 5000.0, 6000.0, 7000.0, 5000.0, 6000.0, 7000.0, 5000.0, 6000.0, 7000.0)); // Depósitos consistentes
        savingsAccount.setSavings(Arrays.asList(10000.0, 9500.0, 9000.0, 8500.0, 8000.0, 7600.0, 7200.0, 7000.0, 6900.0, 6800.0, 6700.0, 6600.0)); // Ahorros consistentes
        savingsAccount.setDate(LocalDate.now().minusYears(3)); // Más de 2 años de antigüedad

        // When
        Map<String, Object> result = businessLogicService.evaluateR7(idApp, savingsAccount);

        // Then
        assertThat(result).containsEntry("approved", true);
        assertThat(result.get("message").toString()).contains("Se debe aprobar");
    }

    @Test
    public void testEvaluateR7_thenModerate() {
        // Given
        Long idApp = 1L;
        double balance = 5000000; // Saldo de 5 millones
        double amount = 100000000; // Monto del crédito de 100 millones
        LocalDate date = LocalDate.now().minusYears(3); // mas de dos años de antiguedad

        CreditApplicationEntity creditApp = new CreditApplicationEntity();
        creditApp.setId_application(idApp);
        creditApp.setAmount(amount);

        when(creditAppServ.getCreditApplicationById(idApp)).thenReturn(creditApp);

        //Long idApp = 1L;
        SavingsAccountEntity savingsAccount = new SavingsAccountEntity();
        savingsAccount.setBalance(10000000); // Suficiente saldo mínimo
        savingsAccount.setIncome(1000000); // Ingreso de 1 millón
        savingsAccount.setDeposits(Arrays.asList(5000.0, 6000.0, 7000.0, 5000.0, 6000.0, 7000.0, 5000.0, 6000.0, 7000.0, 5000.0, 6000.0, 7000.0)); // Depósitos consistentes
        savingsAccount.setSavings(Arrays.asList(10000.0, 0.0, 9000.0, 8500.0, 8000.0, 7600.0, 7200.0, 7000.0, 6900.0, 6800.0, 6700.0, 6600.0)); // Historial de ahorros inconsistente (contiene 0)
        savingsAccount.setDate(LocalDate.now().minusYears(3)); // Más de 2 años de antigüedad

        // When
        Map<String, Object> result = businessLogicService.evaluateR7(idApp, savingsAccount);

        // Then
        assertThat(result).containsEntry("approved", false);
        assertThat(result.get("message").toString()).contains("La evaluación es moderada, 4 puntos aprobados");
    }

    @Test
    public void testEvaluateR7_thenRejected() {
        // Given
        Long idApp = 1L;
        double balance = 5000000; // Saldo de 5 millones, insuficiente para cumplir R71
        double amount = 100000000; // Monto del crédito de 100 millones

        CreditApplicationEntity creditApp = new CreditApplicationEntity();
        creditApp.setId_application(idApp);
        creditApp.setAmount(amount);

        when(creditAppServ.getCreditApplicationById(idApp)).thenReturn(creditApp);

        // Configuración de una cuenta de ahorros que no cumple varios criterios
        SavingsAccountEntity savingsAccount = new SavingsAccountEntity();
        savingsAccount.setBalance(balance);
        savingsAccount.setIncome(1000000); // Ingreso de 1 millón
        savingsAccount.setDeposits(Arrays.asList(1000.0, 1500.0, 2000.0, 1000.0, 1500.0, 2000.0, 1000.0, 1500.0, 2000.0, 1000.0, 1500.0, 2000.0)); // Depósitos insuficientes
        savingsAccount.setSavings(Arrays.asList(10000.0, 9500.0, 9000.0, 8500.0, 8000.0, 3000.0, 7200.0, 7000.0, 6900.0, 6800.0, 6700.0, 6600.0)); // Historial de ahorros inconsistente
        savingsAccount.setDate(LocalDate.now().minusMonths(18)); // Menos de 2 años de antigüedad

        // When
        Map<String, Object> result = businessLogicService.evaluateR7(idApp, savingsAccount);

        // Then
        assertThat(result).containsEntry("approved", false);
        assertThat(result.get("message").toString()).contains("Se debe rechazar");
    }
}
