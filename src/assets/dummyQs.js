export const dummyQs = [
  {
    qType: 'shortAnswer',
    q: 'What is the radius of this circle?',
    a: '3',
    svg: {
      diag: ['circles', 'withDiameter'],
      params: { d: 6, penColour: 'black', fillColour: 'white', angle: 13 }
    }
  },
  {
    qType: 'shortAnswer',
    q: 'What is the diameter of this circle?',
    a: '6',
    svg: {
      diag: ['circles', 'withRadius'],
      params: { r: 3, penColour: 'black', fillColour: 'white', angle: -20 }
    }
  },
  {
    qType: 'shortAnswer',
    q: 'What is `2/6 + 2/7` \nSimplify your answer',
    a: '`13/21`',
  },
  { qType: 'shortAnswer', q: 'What is 2+1?', a: 3 },
  {
    qType: 'multiChoice', q: 'What do you call the longest chord in a circle?',
    a: 'diameter', wrongOptions: ['radius', 'tangent', 'line'],
    // feedback is optional
    feedback: 'The longest chord of a circle is called the diameter.' 
  },
  {
    qType: 'match', q: 'Match the following countries to their captials.',
    pairs: [['London', 'England'], ['Paris', 'France'], ['Brussels', 'Belgium'], ['Athens', 'Greece']]
  },
  {
    qType: 'sort', q: 'Sort these decimals into ascending order',
    a: [3.024, 3.1, 3.127, 3.14], giveHint: true
  },
  {
    qType: 'sort', q: 'Sort these numbers into ascending order',
    a: [-9, -4, -1, 3, 6], giveHint: true
  },
  {
    qType: 'classify', 
    buckets: ['Prime', 'Composite', 'Neither'], items: [[2, 5, 3, 7, 11], [4, 9, 15], [1]]
  },
  {
    qType: 'elimination', qList: ['What is 3 x 5?', 'What is 30 - 2?', 'What is 24/4 ?'],
    answerList: [15, 28, 6]
  }
];

export const defaultQ = {
  qType: 'shortAnswer',
  q: 'What is the answer to life, the universe and everything?',
  a: 42, feedback: 'Brain the size of a planet...!'
};
