function wordFormatter(value: string) {
  return value
    .replace("á", "a")
    .replace("í", "i")
    .replace("ú", "u")
    .replace("é", "e")
    .replace("ó", "o");
}

export { wordFormatter };
