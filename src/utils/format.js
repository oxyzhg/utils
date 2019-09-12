/**
 * @description remove string space
 * @param {String} str
 * @param {Number} type 1:all  2:before&after  3:before 4:after
 * @returns {String}
 */
function stringTrim(str, type) {
  switch (type) {
    case 1:
      return str.replace(/\s+/g, '');
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, '');
    case 3:
      return str.replace(/(^\s*)/g, '');
    case 4:
      return str.replace(/(\s*$)/g, '');
    default:
      return str;
  }
}

/**
 * @description array equal
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {Boolean}
 */
function arrayEqual(arr1, arr2) {
  if (arr1 === arr2) return true;
  if (arr1.length != arr2.length) return false;
  for (var i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
