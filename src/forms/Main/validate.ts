export const validate = (str: string): string => {
  if (!String(str)) {
    return 'required';
  }
  const from = 5;
  const to = 10;
  const testLengt = new RegExp(`^(?=.{${from},${to}}$)`).test(str);
  if (!testLengt) {
    return `the length of the string should be from ${from} to ${to}`;
  }
  return '';
};
