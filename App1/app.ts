function getInputNumber(id: string): number {
  const input = document.getElementById(id) as HTMLInputElement | null;
  if (!input) return 0;
  const val = Number(input.value);
  return isNaN(val) ? 0 : val;
}

type VarInvest = {
  initialAmount: number;
  annualContribution: number;
  expectedReturn: number;
  duration: number;
};

type resultInvest = {
  year: string;
  totalAmount: number;
  totalContributions: number;
  totalInterestEarned: number;
};

type resultCalculation = resultInvest[] | string;

function calculateInvestement(data: VarInvest): resultCalculation {
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
  let totalContributions = initialAmount;
  let totalInterestEarned = 0;

  const annualResults: resultInvest[] = [];

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

function printResults(results: resultCalculation) {
  if (typeof results === 'string') {
    console.log(results);
    return;
  }

  const latestResult = results[results.length - 1];

  const yearEl = document.getElementById("Ano");
  const totalAmountEl = document.getElementById("ValorTotal");
  const totalContributionsEl = document.getElementById("ContribuicoesTotais");
  const totalInterestEarnedEl = document.getElementById("TotalJurosAcumulados");

  if (yearEl) yearEl.textContent = latestResult.year;
  if (totalAmountEl) totalAmountEl.textContent = `💲 Valor Total | ${latestResult.totalAmount.toFixed(2)}`;
  if (totalContributionsEl) totalContributionsEl.textContent = `💲 Contribuições Totais | ${latestResult.totalContributions.toFixed(2)}`;
  if (totalInterestEarnedEl) totalInterestEarnedEl.textContent = `💲 Total de Juros Acumulados | ${latestResult.totalInterestEarned.toFixed(2)}`;
}


const button = document.getElementById("botaoCalcular");
if (button) {
  button.addEventListener("click", () => {
    const varInvest: VarInvest = {
      initialAmount: getInputNumber("dado1"),
      annualContribution: getInputNumber("dado2"),
      expectedReturn: getInputNumber("dado3"),
      duration: getInputNumber("dado4"),
    };

    const results = calculateInvestement(varInvest);

    printResults(results);
  });
}