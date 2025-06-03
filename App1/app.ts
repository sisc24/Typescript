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
        total = total * (1 + expectedReturn); 
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


    return annualResults;
}

function printResults(results: resultCalculation) {
    if (typeof results === 'string') {
        console.log(results);
        return;
    }
    
    for (const yearEndResult of results) {
        console.log(yearEndResult.year);
        console.log(`Total: ${yearEndResult.totalAmount.toFixed(0)}`);
        console.log(`Total: ${yearEndResult.totalContributions.toFixed(0)}`);
        console.log(`Total: ${yearEndResult.totalInterestEarned.toFixed(0)}`);
        console.log('---------------------');
    }
}

const VarInvest: VarInvest = {
    initialAmount: 5000,
    annualContribution: 500,
    expectedReturn: 0.08,
    duration: 10
}

const results = calculateInvestement(VarInvest)

printResults(results);