export const validate = (str?: string): void | never => {
  if (!str) {
    throw new Error('is empty');
  }
  const from = 5;
  const to = 10;
  const testLengt = new RegExp(`^(?=.{${from},${to}}$)`).test(str);
  if (!testLengt) {
    throw new Error(`the length of the string should be from ${from} to ${to}`);
  }
};
