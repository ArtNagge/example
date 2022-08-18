const checkDigit = function (inn: string, coefficients: number[]) {
  const n = coefficients.reduce(
    (acc, a, index) => +(acc + coefficients[index] * +inn[index]),
    0,
  );

  return (n % 11) % 10;
};

const validateInn = (innNumber: string) => {
  const inn = `${innNumber}`;

  if (!inn.length || /[^0-9]/.test(inn) || [10, 12].indexOf(inn.length) === -1)
    return false;

  switch (inn.length) {
    case 10:
      return checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]) === parseInt(inn[9]);
    case 12:
      const n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
      const n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
      return n11 === parseInt(inn[10]) && n12 === parseInt(inn[11]);
    default:
      return false;
  }
};

export default validateInn;
