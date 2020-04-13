class Questions {

  static questions() {
    return ["On a night out <name> is most likely to ____.", 
  "<name>'s super power would be ____.",
  "<name> and <names>'s band name would be ____."]
  }

  static getQuestions(num) {
    return this.getRandom(this.questions(), num);
  }

  // https://stackoverflow.com/questions/19269545/how-to-get-n-no-elements-randomly-from-an-array
  static getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len)
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available")
    while (n--) {
        var x = Math.floor(Math.random() * len)
        result[n] = arr[x in taken ? taken[x] : x]
        taken[x] = --len in taken ? taken[len] : len
    }
    return result
  }
}

export default Questions
  