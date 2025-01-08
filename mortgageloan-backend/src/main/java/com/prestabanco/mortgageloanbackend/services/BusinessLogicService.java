package com.prestabanco.mortgageloanbackend.services;

import com.prestabanco.mortgageloanbackend.entities.CreditApplicationEntity;
import com.prestabanco.mortgageloanbackend.entities.MortgageLoanConditionEntity;
import com.prestabanco.mortgageloanbackend.entities.SavingsAccountEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BusinessLogicService {
    @Autowired
    CreditApplicationService creditAppServ;
    @Autowired
    MortgageLoanConditionService mortgageLoanConditionService;


    public double calculateMonthlyInstallment(CreditApplicationEntity creditApp) {
        MortgageLoanConditionEntity creditConditions = mortgageLoanConditionService.getMortgageLoanConditionById(creditApp.getType());
        double interestRate = creditConditions.getInterestRate();
        double amount = creditApp.getAmount();
        int term = creditApp.getTerm();
        int totalMonthTerm = term*12;
        double monthInterestRate = (interestRate/12)/100;
        double monthInterestRatePow = Math.pow(monthInterestRate+1, totalMonthTerm);

        double monthlyInstallment = (monthInterestRate * monthInterestRatePow)/(monthInterestRatePow - 1);
        return monthlyInstallment * amount;
    }

    public Integer simulateCreditApllication(double amount, int term, Long type){
        CreditApplicationEntity simulatedApplication = new CreditApplicationEntity();
        simulatedApplication.setAmount(amount);
        simulatedApplication.setTerm(term);
        simulatedApplication.setType(type);
        double monthlyInstallment = calculateMonthlyInstallment(simulatedApplication);
        return (Integer) (int) Math.round(monthlyInstallment);
    }

    public Map<String, Object> evaluateR1(Long idApp, double income) {
        CreditApplicationEntity creditApp = creditAppServ.getCreditApplicationById(idApp);
        double monthlyInstallment = calculateMonthlyInstallment(creditApp);
        double installmentIncome = (monthlyInstallment / income)*100;

        Map<String, Object> response = new HashMap<>();
        String message;
        if(installmentIncome > 35) {
            response.put("appproved", false);
            message = "Se debe rechazar, la relación cuota/ingresos es mayor a 35% dando: " + (int)installmentIncome + "% con una cuota mensual de: $" + (int)monthlyInstallment + " pesos";
            response.put("message", message);
            return response;
        }
        response.put("approved", true);
        message = "Se debe aprobar, la relación cuota/ingresos es menor a 35% dando: " + (int)installmentIncome + "% con una cuota mensual de: $" + (int)monthlyInstallment + " pesos";
        response.put("message", message);
        return response;
    }

    // R4
    public Map<String, Object> evaluateR4(Long idApp, double income, double debt) {
        CreditApplicationEntity creditApp = creditAppServ.getCreditApplicationById(idApp);
        double monthlyInstallment = calculateMonthlyInstallment(creditApp);
        Map<String, Object> response = new HashMap<>();
        String message;
        double incomeMonthlyInstallment = monthlyInstallment + debt;

        if(income/2 < incomeMonthlyInstallment) {
            response.put("appproved", false);
            message = "Se debe rechazar, la relación de todas las deudas + la cuota mensual $" + (int)monthlyInstallment + " pesos es mayor al 50% de los ingresos, dando: $" + (int)incomeMonthlyInstallment + " pesos";
            response.put("message", message);
            return response;
        }
        response.put("approved", true);
        message = "Se debe aprobar, la relación de todas las deudas + la cuota mensual $" + (int)monthlyInstallment + " pesos es menor al 50% de los ingresos, dando: $" + (int)incomeMonthlyInstallment + " pesos";
        response.put("message", message);
        return response;
    }

    // R5
    public Map<String, Object> evaluateR5(Long idApp, double propertyValue) {
        CreditApplicationEntity creditApp = creditAppServ.getCreditApplicationById(idApp);
        Long idType = Long.valueOf(creditApp.getType());
        MortgageLoanConditionEntity creditConditions = mortgageLoanConditionService.getMortgageLoanConditionById(idType);
        double maximumFinancingAmount = creditConditions.getMaximumFinancingAmount();
        double amount = creditApp.getAmount();
        Map<String, Object> response = new HashMap<>();
        String message;
        double propertyValueFinancingAmount = propertyValue*maximumFinancingAmount;
        if(amount > propertyValueFinancingAmount) {
            response.put("approved", false);
            message = "Se debe rechazar, el mónto máximo de financiamiento para el crédito " + creditConditions.getLoanType() + " es " + (int)(maximumFinancingAmount*100) + "% y el monto solicitado es mayor al porcentaje evaluado al valor de la propiedad";
            response.put("message", message);
            return response;
        }
        response.put("approved", true);
        message = "Se debe aprobar, el mónto máximo de financiamiento para el crédito " + creditConditions.getLoanType() + " es " + (int)(maximumFinancingAmount*100) + "% y el monto solicitado es menor al porcentaje evaluado al valor de la propiedad";
        response.put("message", message);
        return response;
    }

    public Map<String, Object> evaluateR6(Long idApp, LocalDate birthDate) {
        CreditApplicationEntity creditApp = creditAppServ.getCreditApplicationById(idApp);
        int term = creditApp.getTerm();
        LocalDate today = LocalDate.now();
        Period age = Period.between(birthDate, today);
        Map<String, Object> response = new HashMap<>();
        String message;
        if (age.getYears() + term >= 70) {
            response.put("approved", false);
            message = "Se debe rechazar, el cliente tiene una edad de " + age.getYears() + " años y su plazo para pagar el crédito solicitado son " + term + " años, no cumple la regla de estar a un margen de 5 años o menos de la edad de jubicación (75 años) cuando termine de pagar el crédito, en ese caso su edad sería " + (age.getYears()+term) + " años";
            response.put("message", message);
            return response;
        }
        response.put("approved", true);
        message = "Se debe aprobar, el cliente tiene una edad de " + age.getYears() + " años y su plazo para pagar el crédito solicitado son " + term + " años, cumple la regla de estar a un margen de 5 años o menos de la edad de jubicación (75 años) cuando termine de pagar el crédito, en ese caso su edad sería " + (age.getYears()+term) + " años";
        response.put("message", message);
        return response;
    }
    public Map<String, Object> evaluateR7(Long idApp, SavingsAccountEntity savingsAccount) {
        int count = 0;
        String message = "";
        Map<String, Object> response = new HashMap<>();
        if(evaluateR71(idApp, savingsAccount.getBalance())) {
            message = message + "R71 Saldo Minimo Requerido: Aprobado // ";
            count = count + 1;
        }
        if(evaluateR72(savingsAccount.getSavings())) {
            message = message + "R72 Historial de Ahorro Consistente: Aprobado // ";
            count = count + 1;
        }
        if(evaluateR73(savingsAccount.getIncome(), savingsAccount.getDeposits())) {
            message = message + "R73 Depósitos Periódicos: Aprobado // ";
            count = count + 1;
        }
        if(evaluateR74(idApp, savingsAccount.getBalance(), savingsAccount.getDate())) {
            message = message + "R74 Relación Saldo/Años de Antiguedad: Aprobado // ";
            count = count + 1;
        }
        if(evaluateR75(savingsAccount.getSavings())) {
            message = message + "R75 Retiros Recientes: Aprobado";
            count = count + 1;
        }
        if(count == 5) {
            response.put("approved", true);
            response.put("message", "Se debe aprobar, el cliente presenta una Capacidad de Ahorro sólida "+message);
        }
        else if(count == 3 || count == 4) {
            response.put("approved", false);
            response.put("message", "La evaluación es moderada, "+count+" puntos aprobados " + message);
        }
        else {
            response.put("approved", false);
            response.put("message", "Se debe rechazar, el cliente presenta una Capacidad de Ahorro insuficiente "+message);
        }
        return response;
    }

    public boolean evaluateR71(long idApp, double balance) {
        CreditApplicationEntity creditApp = creditAppServ.getCreditApplicationById(idApp);
        double amount = creditApp.getAmount();
        if(amount*0.1 > balance && amount > 0) {
            return false;
        }
        return true;
    }

    public boolean evaluateR72(List<Double> savings) {
        Double actualSaving = savings.get(0);
        for(int i = 1; i < savings.size(); i++) {
            if(actualSaving == 0.0) {
                return false;
            }
            if(actualSaving - savings.get(i) > actualSaving*0.5) {
                return false;
            }
            actualSaving = savings.get(i);
        }
        return true;
    }

    public boolean evaluateR73(double income, List<Double> deposits) {
        double totalDeposit = 0;
        for(double deposit : deposits) {
            totalDeposit = totalDeposit + deposit;
        }
        if(totalDeposit < income*0.05) {
            return false;
        }
        return true;
    }

    public boolean evaluateR74(long idApp, double balance, LocalDate date) {
        double amount = creditAppServ.getCreditApplicationById(idApp).getAmount();
        int years = Period.between(date, LocalDate.now()).getYears();
        if(years < 2) {
            if(amount*0.2 > balance) {
                return false;
            }
            return true;
        }
        if(amount*0.1 > balance) {
            return false;
        }
        return true;
    }

    public boolean evaluateR75(List<Double> savings) {
        double actualSaving = savings.get(6);
        for(int i = 7; i < savings.size(); i++) {
            if(actualSaving - savings.get(i) > actualSaving*0.3) {
                return false;
            }
            actualSaving = savings.get(i);
        }
        return true;
    }

    public CreditApplicationEntity calculateTotalCostsCreditApplication(long idApp) {
        CreditApplicationEntity creditApp = creditAppServ.getCreditApplicationById(idApp);
        int term = creditApp.getTerm();
        double amount = creditApp.getAmount();
        double monthlyInstallment = calculateMonthlyInstallment(creditApp);
        double commission = amount*0.01;
        double creditLifeInsurance = amount*0.0003;
        double fireInsurance = 20000;
        double totalCosts = (monthlyInstallment + creditLifeInsurance + fireInsurance) * (term*12) + commission;
        creditApp.setTotalCost(totalCosts);
        creditApp.setCreditLifeInsurance(creditLifeInsurance);
        creditApp.setCommission(commission);
        creditApp.setMonthlyInstallment(monthlyInstallment);
        creditApp.setFireInsurance(fireInsurance);
        creditApp.setState(4);
        CreditApplicationEntity updatedApp = creditAppServ.updateCreditApplication(creditApp);
        return updatedApp;
    }
}
