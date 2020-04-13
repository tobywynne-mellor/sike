class IdFactory {

  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  static uuidv4(len) {
    return IdFactory.strRepeat('x', len).replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // https://github.com/esamattis/underscore.string/blob/e5e0246374df7d6cdf1630dee54ac42585814f4e/helper/strRepeat.js
  static strRepeat(str, qty){
    if (qty < 1) return '';
    var result = '';
    while (qty > 0) {
      if (qty & 1) result += str;
      qty >>= 1, str += str;
    }
    return result;
  };
}

export default IdFactory