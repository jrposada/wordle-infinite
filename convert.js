const parseString = require("xml2js").parseString;
const fs = require("fs");

const minLength = 4;
const maxLength = 6;

fs.readFile("./src/api/list.xml", (err, xml) => {
  if (err) {
    console.log(err);
    return;
  }

  parseString(xml, (err, data) => {
    const words = { l: [] };
    data.dic.l[0].w.forEach(({ d }) => {
      d[0]
        .replace(",", "")
        .split(" ")
        .forEach((word) => {
          if (
            word.match(/^[A-z]+$/) &&
            !words.l.includes(word) &&
            word.length >= minLength &&
            word.length <= maxLength
          ) {
            words.l.push(word);
          }
        });
    });

    console.log(words.l.length);
    fs.writeFileSync("./src/api/list-formatted.json", JSON.stringify(words));
  });
});
