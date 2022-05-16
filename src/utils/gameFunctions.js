import baseColors from './colors';
export function giveRandomColors() {
  let colors = [];
  for (let index = 0; index < 4; index++) {
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
    if (proposition[i] === answer[i]) {
      wellPlaced++;
      proposition.splice(i, 1);
      answer.splice(i, 1);
    }
  }

  for (const color of proposition) {
    if (answer.includes(color)) {
      delete answer[answer.indexOf(color)];
      misplaced++;
    }
  }

  return [wellPlaced, misplaced];
}
