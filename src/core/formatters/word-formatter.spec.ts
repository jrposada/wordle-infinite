import { wordFormatter } from "./word-formatter";

describe("Given wordFormatter()", () => {
  [
    { value: "fácil", result: "facil" },
    { value: "así", result: "asi" },
    { value: "tutú", result: "tutu" },
    { value: "paté", result: "pate" },
    { value: "cajón", result: "cajon" },
    { value: "ñoño", result: "ñoño" },
  ].forEach(({ value, result }) => {
    it(`when input is ${value} then is replaced formatted to ${result}`, () => {
      expect(wordFormatter(value)).toBe(result);
    });
  });
});
