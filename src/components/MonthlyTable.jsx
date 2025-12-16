import React, { useState } from 'react';
import '../styles/MonthlyTable.css';

const persons = ['Bence', 'Dávid', 'Gábor', 'Gyöngyi'];

const MonthlyTable = () => {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const [personSelections, setPersonSelections] = useState({});
  const [messages, setMessages] = useState({});
  const [highlightName, setHighlightName] = useState(''); // New: name to highlight

  const weeks = getWeeksInMonth(year, month);

  const handlePersonChange = (key, value) => {
    setPersonSelections((prev) => ({ ...prev, [key]: value }));
  };

  const handleMessageChange = (key, value) => {
    setMessages((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="table-container">
      <div className="controls">
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>

        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {getYearRange(2020, 2035).map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        {/* Highlight filter */}
        <select
          value={highlightName}
          onChange={(e) => setHighlightName(e.target.value)}
          style={{ marginLeft: '20px' }}
        >
          <option value="">Highlight Name...</option>
          {persons.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="week-wrapper">
          <table className="monthly-table">
            <thead>
              <tr>
                <th>Week {weekIndex + 1}</th>
                {week.flatMap((date, i) => {
                  if (!date) return [<th key={`empty-${i}`}></th>];

                  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

                  if (isWeekend) {
                    return [
                      <th key={`morning-${i}`} className="weekend">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        <br />
                        {date.getDate()}
                      </th>,
                      <th key={`evening-${i}`} className="weekend">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        <br />
                        {date.getDate()}
                      </th>,
                    ];
                  } else {
                    return [
                      <th key={i}>
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        <br />
                        {date.getDate()}
                      </th>,
                    ];
                  }
                })}
              </tr>
            </thead>

            <tbody>
              {/* TIME ROW */}
              <tr>
                <td><strong>Time</strong></td>
                {week.flatMap((date, i) => {
                  if (!date) return [<td key={`empty-${i}`}></td>];
                  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                  if (isWeekend) {
                    return [
                      <td key={`morning-time-${i}`}>08–15</td>,
                      <td key={`evening-time-${i}`}>15–22</td>,
                    ];
                  } else {
                    return [<td key={`weekday-time-${i}`}>18–22</td>];
                  }
                })}
              </tr>

              {/* NAME ROW */}
              <tr>
                <td><strong>Name</strong></td>
                {week.flatMap((date, i) => {
                  if (!date) return [<td key={`empty-${i}`}></td>];

                  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

                  const morningKey = `${date.toISOString()}-morning`;
                  const eveningKey = `${date.toISOString()}-evening`;
                  const fullKey = `${date.toISOString()}-full`;

                  if (isWeekend) {
                    return [
                      <td
                        key={`morning-${i}`}
                        className={personSelections[morningKey] === highlightName ? 'highlight' : ''}
                      >
                        <select
                          value={personSelections[morningKey] || ''}
                          onChange={(e) => handlePersonChange(morningKey, e.target.value)}
                        >
                          <option value="">—</option>
                          {persons.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </td>,
                      <td
                        key={`evening-${i}`}
                        className={personSelections[eveningKey] === highlightName ? 'highlight' : ''}
                      >
                        <select
                          value={personSelections[eveningKey] || ''}
                          onChange={(e) => handlePersonChange(eveningKey, e.target.value)}
                        >
                          <option value="">—</option>
                          {persons.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </td>,
                    ];
                  } else {
                    return [
                      <td
                        key={`weekday-${i}`}
                        className={personSelections[fullKey] === highlightName ? 'highlight' : ''}
                      >
                        <select
                          value={personSelections[fullKey] || ''}
                          onChange={(e) => handlePersonChange(fullKey, e.target.value)}
                        >
                          <option value="">—</option>
                          {persons.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </td>,
                    ];
                  }
                })}
              </tr>

              {/* MESSAGE ROW */}
              <tr>
                <td><strong>Message</strong></td>
                {week.flatMap((date, i) => {
                  if (!date) return [<td key={`empty-${i}`}></td>];

                  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                  const morningKey = `${date.toISOString()}-morning`;
                  const eveningKey = `${date.toISOString()}-evening`;
                  const fullKey = `${date.toISOString()}-full`;

                  if (isWeekend) {
                    return [
                      <td key={`morning-msg-${i}`}>
                        <input
                          type="text"
                          value={messages[morningKey] || ''}
                          onChange={(e) => handleMessageChange(morningKey, e.target.value)}
                          placeholder="Comment"
                        />
                      </td>,
                      <td key={`evening-msg-${i}`}>
                        <input
                          type="text"
                          value={messages[eveningKey] || ''}
                          onChange={(e) => handleMessageChange(eveningKey, e.target.value)}
                          placeholder="Comment"
                        />
                      </td>,
                    ];
                  } else {
                    return [
                      <td key={`weekday-msg-${i}`}>
                        <input
                          type="text"
                          value={messages[fullKey] || ''}
                          onChange={(e) => handleMessageChange(fullKey, e.target.value)}
                          placeholder="Comment"
                        />
                      </td>,
                    ];
                  }
                })}
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );

  // ------------------- Helpers -------------------
  function getWeeksInMonth(year, month) {
    const weeks = [];
    let currentWeek = [];

    const date = new Date(year, month, 1);
    const firstDay = date.getDay() === 0 ? 7 : date.getDay(); // Monday as first day

    for (let i = 1; i < firstDay; i++) currentWeek.push(null);

    while (date.getMonth() === month) {
      currentWeek.push(new Date(date));

      if (date.getDay() === 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      date.setDate(date.getDate() + 1);
    }

    if (currentWeek.length) weeks.push(currentWeek);

    weeks.forEach((week) => {
      while (week.length < 7) week.push(null);
    });

    return weeks;
  }

  function getYearRange(start, end) {
    const years = [];
    for (let y = start; y <= end; y++) years.push(y);
    return years;
  }
};

export default MonthlyTable;
