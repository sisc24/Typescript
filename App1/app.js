"use strict";
function getInputNumber(id) {
    const input = document.getElementById(id);
    if (!input)
        return 0;
    const val = Number(input.value);
    return isNaN(val) ? 0 : val;
}
function calculateInvestement(data) {
    const { initialAmount, annualContribution, expectedReturn, duration } = data;
    if (initialAmount < 0) {
        return 'Valor de investimento anual deverá ser pelo menos zero';
    }
    if (duration <= 0) {
        return 'Nenhum valor válido fornecido';
    }
    if (expectedReturn <= 0) {
        return 'Valor de taxa de declaração de rendimentos deverá ser pelo menos zero';
    }
    let total = initialAmount;
    let totalContributions = initialAmount; // initial amount counts as first contribution
    let totalInterestEarned = 0;
    const annualResults = [];
    for (let i = 0; i < duration; i++) {
        total = total * (1 + expectedReturn);
        totalInterestEarned = total - totalContributions;
        annualResults.push({
            year: `Ano ${i + 1}`,
            totalAmount: total,
            totalContributions,
            totalInterestEarned
        });
        totalContributions += annualContribution;
        total += annualContribution;
    }
    return annualResults;
}
function printResults(results) {
    if (typeof results === 'string') {
        console.log(results);
        return;
    }
    // Get the last year's result (most recent)
    const latestResult = results[results.length - 1];
    // Update each <p> element
    const yearEl = document.getElementById("Ano");
    const totalAmountEl = document.getElementById("ValorTotal");
    const totalContributionsEl = document.getElementById("ContribuicoesTotais");
    const totalInterestEarnedEl = document.getElementById("TotalJurosAcumulados");
    if (yearEl)
        yearEl.textContent = latestResult.year;
    if (totalAmountEl)
        totalAmountEl.textContent = `💲 Valor Total | ${latestResult.totalAmount.toFixed(2)}`;
    if (totalContributionsEl)
        totalContributionsEl.textContent = `💲 Contribuições Totais | ${latestResult.totalContributions.toFixed(2)}`;
    if (totalInterestEarnedEl)
        totalInterestEarnedEl.textContent = `💲 Total de Juros Acumulados | ${latestResult.totalInterestEarned.toFixed(2)}`;
}
const button = document.getElementById("botaoCalcular");
if (button) {
    button.addEventListener("click", () => {
        const varInvest = {
            initialAmount: getInputNumber("dado1"),
            annualContribution: getInputNumber("dado2"),
            expectedReturn: getInputNumber("dado3"),
            duration: getInputNumber("dado4"),
        };
        const results = calculateInvestement(varInvest);
        printResults(results);
    });
}
