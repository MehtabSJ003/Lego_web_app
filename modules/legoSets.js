const setData = require("../data/setData");
const themeData = require("../data/themeData");
let sets = [];
function initialize() {
  return new Promise((resolve, reject) => {
    setData.forEach((elementOfSet) => {
      const themeInfo = themeData.find(
        (theme) => theme.id === elementOfSet.theme_id
      );
      if (themeInfo) {
        elementOfSet.theme = themeInfo.name;
        sets.push(elementOfSet);
        resolve();
      }
    });
  });
}
function getAllSets() {
  return new Promise((resolve, reject) => resolve(sets));
}

function getSetByNum(setNum) {
  return new Promise((resolve, reject) => {
    const matchingNums = sets.find((set) => set.set_num === setNum);
    if (matchingNums) {
      resolve(matchingNums);
    } else {
      reject(new error("unable to find requested set"));
    }
  });
}

function getSetsByTheme(theme) {
  return new Promise((resolve, reject) => {
    const themeLowerCase = theme.toLowerCase();
    const matchingTheme = sets.filter((set) =>
      set.theme.toLowerCase().includes(themeLowerCase)
    );
    if (matchingTheme.length > 0) {
      resolve(matchingTheme);
    } else {
      reject(new error("unable to find requested set"));
    }
  });
}

module.exports = {
  initialize,
  getAllSets,
  getSetByNum,
  getSetsByTheme,
};
