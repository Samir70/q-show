export const dummyQs = [
  {
    qType: 'multiChoice', question: 'What do you call the longest chord in a circle?',
    answer: 'diameter', wrongOptions: ['radius', 'tangent', 'line'],
    // feedback is optional
    feedback: 'The longest chord of a circle is called the diameter.' 
  },
  { qType: 'shortAnswer', question: 'What is 2+1?', answer: 3 },
  {
    qType: 'match', question: 'Match the following countries to their captials.',
    pairs: [['London', 'England'], ['Paris', 'France'], ['Brussels', 'Belgium'], ['Athens', 'Greece']]
  },
  {
    qType: 'sort', question: 'Sort these decimals into ascending order',
    answer: [3.024, 3.1, 3.127, 3.14], giveHint: true
  },
  {
    qType: 'sort', question: 'Sort these numbers into ascending order',
    answer: [-9, -4, -1, 3, 6], giveHint: true
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
  question: 'What is the answer to life, the universe and everything?',
  answer: 42, feedback: 'Brain the size of a planet...!'
};
