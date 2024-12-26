package com.prestabanco.mortgageloanbackend.services;

import com.prestabanco.mortgageloanbackend.entities.MortgageLoanConditionEntity;
import com.prestabanco.mortgageloanbackend.repositories.MortgageLoanConditionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
public class MortgageLoanConditionTest {

    @Mock
    private MortgageLoanConditionRepository mortgageConditionRepository;

    @InjectMocks
    private MortgageLoanConditionService mortgageLoanConditionService;

    @Test
    public void whenGetMortgageLoanConditionById_thenCorrect() {
        //Given
        MortgageLoanConditionEntity mortgageLoanCondition = new MortgageLoanConditionEntity(1L, "Primera Vivienda", 30, 5.0, 3.5, 0.8, 3.5);

        // When
        when(mortgageConditionRepository.findById(1L)).thenReturn(Optional.of(mortgageLoanCondition));
        //when(mortgageConditionRepository.findById(1L)).thenReturn(null);

        MortgageLoanConditionEntity foundMortgageCondition = mortgageLoanConditionService.getMortgageLoanConditionById(1L);

        // Then
        assertThat(foundMortgageCondition).isEqualTo(mortgageLoanCondition);
    }
}
