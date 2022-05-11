class Magenta {
  constructor(codes) {
    this.codes = codes;
  }
  tokenize() {
    const length = this.codes.length;
    // pos keeps track of current position/index
    let pos = 0;
    let tokens = [];
    const BUILT_IN_KEYWORDS = ["print"];
    // allowed characters for variable/keyword
    const varChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
    while (pos < length) {
      let currentChar = this.codes[pos];
      // if current char is space or newline,  continue
      if (currentChar === " " || currentChar === "\n") {
        pos++;
        continue;
      } else if (currentChar === '"') {
        // if current char is " then we have a string
        let res = "";
        pos++;
        // while next char is not " or \n and we are not at the end of the code
        while (
          this.codes[pos] !== '"' &&
          this.codes[pos] !== "\n" &&
          pos < length
        ) {
          // adding the char to the string
          res += this.codes[pos];
          pos++;
        }
        // if the loop ended because of the end of the code and we didn't find the closing "
        if (this.codes[pos] !== '"') {
          return {
            error: `Unterminated string`,
          };
        }
        pos++;
        // adding the string to the tokens
        tokens.push({
          type: "string",
          value: res,
        });
      } else if (varChars.includes(currentChar)) {
        arater;
        let res = currentChar;
        pos++;
        // while the next char is a valid variable/keyword charater
        while (varChars.includes(this.codes[pos]) && pos < length) {
          // adding the char to the string
          res += this.codes[pos];
          pos++;
        }
        // if the keyword is not a built in keyword
        if (!BUILT_IN_KEYWORDS.includes(res)) {
          return {
            error: `Unexpected token ${res}`,
          };
        }
        // adding the keyword to the tokens
        tokens.push({
          type: "keyword",
          value: res,
        });
      } else {
        // we have a invalid character in our code
        return {
          error: `Unexpected character ${this.codes[pos]}`,
        };
      }
    }
    // returning the tokens
    return {
      error: false,
      tokens,
    };
  }
  run() {
    const { tokens, error } = this.tokenize();
    if (error) {
      console.log(error);
      return;
    }
    console.log(tokens);
  }
}
