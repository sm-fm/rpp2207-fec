import React, { useState, useEffect } from 'react';
import Answer from './Answer.jsx';

const AnsList = ({mixedAns, openModal}) => {
  let [answers, setAnswers] = useState([]);
  let [rendered, setRendered] = useState([]);

  var handleCollapse = () => { setRendered([ answers[0], answers[1] ]); };
  var handleMore = () => {
    let rl = rendered.length;
    let al = answers.length;
    setRendered(al - rl > 2 ? [...rendered, answers[rl], answers[rl + 1]] : answers);
  };

  useEffect(() => {
    var ans = Object.values(mixedAns);
    var curr = 0;
    var next = 1;
    while (curr < ans.length - 1) {
      if (ans[curr].helpfulness < ans[next].helpfulness) {
        let temp = ans[curr];
        ans[curr] = ans[next];
        ans[next] = temp;
      }
      next++;

      if (next === ans.length) {
        curr++;
        next = curr + 1;
      }
    }
    setAnswers(ans);
    setRendered(ans.length > 2 ? [ans[0], ans[1]] : ans);
  }, [mixedAns]);

  return (
    <div id="a-content" className="qna-container">
      <div id="a-list" className="list-container">
        {rendered.map((a, idx) => {
          return (
            <Answer
              key={idx}
              answerId={a.id}
              body={a.body}
              date={a.date}
              helpful={a.helpfulness}
              name={a.answerer_name}
              photos={a.photos}
              openModal={openModal}
            />
          );
        })}
      </div>
      {rendered.length < answers.length ?
        <button id="more-a" className="btn" onClick={handleMore}> More Answers </button>
        : null}
      {rendered.length > 2 ?
        <button id="collapse-a" className="btn" onClick={handleCollapse}> Collapse Answers </button>
        : null}
    </div>
  );
};

export default AnsList;