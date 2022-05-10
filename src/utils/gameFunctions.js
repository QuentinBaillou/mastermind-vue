import baseColors from './colors';
export function giveRandomColors() {
  let colors = [];
  for (let index = 0; index < 5; index++) {
    const colorIndex = Math.floor(Math.random() * 6);
    colors.push(baseColors[colorIndex]);
  }
  return colors;
}

export function test(propositionArray, answerArray) {
  let proposition = [...propositionArray],
    answer = [...answerArray];
  let wellPlaced = 0,
    misplaced = 0;

  // For each color, check if it is wellPlaced or not, and remove corresponding item
  for (let i = proposition.length - 1; i >= 0; i--) {
    console.log('Je check une couleur bien placé');
    if (proposition[i] === answer[i]) {
      console.log('une couleur est bien placé');
      wellPlaced++;
      proposition.splice(i, 1);
      answer.splice(i, 1);
    }
  }
  console.log("tableau answer après check des bonnes couleurs : ", answer);

  for (const color of proposition) {
    console.log('Je check une couleur mal placé');
    if (answer.includes(color)) {
      console.log('une couleur est mal placée');
      delete answer[answer.indexOf(color)];
      misplaced++;
    }
  }
  console.log("tableau answer après check des couleurs mal placées : ", answer);

  return [wellPlaced, misplaced];
}
