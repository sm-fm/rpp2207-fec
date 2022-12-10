import React, { useState, useEffect } from 'react';
import questionAPI from '../../API/Questions.js';

const HelpReport = (props) => {
  let [reported, setReported] = useState(false);
  let [helpful, setHelpful] = useState(0);
  let [type, setType] = useState('');
  let [id, setId] = useState('');

  useEffect(() => {
    setHelpful(props.helpful);
    setType(props.type);
    setId(props.val);
  }, [props.helpful, props.type, props.val]);

  var handleHelpful = () => {
    questionAPI.markHelpful(type, id)
      .then(() => {
        let tmp = helpful + 1;
        setHelpful(tmp);
      })
      .catch(err => {
        console.log(err);
      });
  };

  var handleReport = () => {
    questionAPI.report(type, id)
      .then(() => {
        setReported(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <span className="helpful-report">
      <span id="helpful">
        Helpful?
        <button
          id="yes-btn"
          className="btn"
          onClick={handleHelpful}
        >Yes ({helpful}) </button>
      </span>
      <span id="report">
        {!reported ?
          <button
            id="report-btn"
            className="btn"
            onClick={handleReport}
          >Report</button>
          : <p id="reported">Reported</p>
        }
      </span>
    </span>
  );
};

export default HelpReport;