import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import questionAPI from '../client/src/API/Questions.js';
import qnaData from './mockQnA.js';
import Questions from '../client/src/components/Questions/Questions.jsx';
import QuestList from '../client/src/components/Questions/Q-Components/QuestList.jsx';
// import AnsList from '../client/src/components/Questions/A-Components/AnsList.jsx';

// API Tests


// Test that questions renders Search and QuestList and provides correct data
describe('Questions module', () => {
  test('Questions renders Search bar with bad ID', async () => {
    render(
      <Questions objID={1}/>
    );
    const searchBar = await screen.queryAllByRole('input');
    expect(searchBar[0]).toBeInTheDocument();
  });
  test('Questions renders Search bar with valid ID', async () => {
    render(
      <Questions objID={71704}/>
    );
    var searchBar = screen.queryAllByRole('input');
    expect(searchBar[0]).toBeInTheDocument();
  });
});

// Test that QuestList renders the two most helpful questions
describe('QuestList module', () => {
  test('QuestList renders two most helpful questions', async () => {
    render(
      <QuestList
        questions={qnaData.qData.results}
        length={qnaData.qData.results.length}
      />
    );
    var questions = screen.queryAllByRole('h1');
    expect(questions[0]).toHaveTextContent('Q: ' + qnaData.qData.results[0].question_body);
    expect(questions[1]).toHaveTextContent('Q: ' + qnaData.qData.results[1].question_body);
    expect(questions[2]).toBe(undefined);
  });
});

// Test that AnsList renders the two most helpful answers
describe('AnsList module', () => {
  // test('AnsList renders two most helpful answers', async () => {
  //   render(
  //     <AnsList
  //       questions={qnaData.a2.results}
  //       length={qnaData.qData.results.length}
  //     />
  //   );
  //   var answers = screen.queryAllByRole('h1');
  //   expect(answers[0]).toHaveTextContent('A: ' + qnaData.a2.results[0].body);
  //   expect(answers[1]).toHaveTextContent('A: ' + qnaData.a2.results[1].body);
  //   expect(answers[2]).toBe(undefined);
  // });
});