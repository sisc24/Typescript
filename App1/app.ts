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

type resultCalculation = resultInvest | string;

function calculateInvestement(data: VarInvest): resultCalculation {
    const { initialAmount, annualContribution, expectedReturn, duration } = data;
    if (initialAmount < 0) {
        return 'Valor de investimento anual deverá ser pelo menos zero'
    }
    if (duration <= 0) {
        return 'Nenhum valor válido fornecido'
    }
    if (expectedReturn <= 0) {
        return 'Valor de taxa de declaração de rendimentos deverá ser pelo menos zero'
    }

    let total = initialAmount;
    let totalContributions = 0;
    let totalInterestEarned = 0;

    const annualResults: resultInvest[] = [];

    for (let i = 0; i < duration; i++) {
        total = total * (1+ expectedReturn); 
        totalInterestEarned = total - totalContributions - initialAmount;
        totalContributions = totalContributions + annualContribution;
        total = total + annualContribution;

        annualResults.push({
            year: `Year ${i + 1}`,
            totalAmount: total,
            totalInterestEarned,
            totalContributions
        })
    }
}

function printResults(results) {
    //
}

const results = calculateInvestement(..)

printResults(results);