import React, { useState } from 'react';
import '../styles/MonthlyTable.css';

const persons = ['Bence', 'Dávid', 'Gábor', 'Gyöngyi']

const MonthlyTable = () => {
  const today = new Date()

  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())

  const [personSelections, setPersonSelections] = useState({})
  const [messages, setMessages] = useState({})

  const weeks = getWeeksInMonth(year, month)

  const handlePersonChange = (key, value) => {
    setPersonSelections((prev) => ({ ...prev, [key]: value }))
  }

  const handleMessageChange = (key, value) => {
    setMessages((prev) => ({ ...prev, [key]: value }))
  }

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
      </div>

      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="week-wrapper">
          <table className="monthly-table">
            <thead>
              <tr>
                <th>Week {weekIndex + 1}</th>
                {week.flatMap((date, i) => {
                  if (!date) return [<th key={`empty-${i}`}></th>]

                  const isWeekend = date.getDay() === 0 || date.getDay() === 6

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
                    ]
                  } else {
                    return [
                      <th key={i}>{date.toLocaleDateString('en-US', { weekday: 'short' })}<br />{date.getDate()}</th>,
                    ]
                  }
                })}
              </tr>
            </thead>

            <tbody>
              {/* TIME ROW */}
              <tr>
                <td><strong>Time</strong></td>
                {week.flatMap((date, i) => {
                  if (!date) return [<td key={`empty-${i}`}></td>]
                  const isWeekend = date.getDay() === 0 || date.getDay() === 6
                  if (isWeekend) {
                    return [
                      <td key={`morning-time-${i}`}>08–15</td>,
                      <td key={`evening-time-${i}`}>15–22</td>,
                    ]
                  } else {
                    return [<td key={`weekday-time-${i}`}>18–22</td>]
                  }
                })}
              </tr>

              {/* NAME ROW */}
              <tr>
                <td><strong>Name</strong></td>
                {week.flatMap((date, i) => {
                  if (!date) return [<td key={`empty-${i}`}></td>]

                  const isWeekend = date.getDay() === 0 || date.getDay() === 6
                  if (isWeekend) {
                    return [
                      <td key={`morning-${i}`}>
                        <select
                          value={personSelections[`${date.toISOString()}-morning`] || ''}
                          onChange={(e) =>
                            handlePersonChange(`${date.toISOString()}-morning`, e.target.value)
                          }
                        >
                          <option value="">—</option>
                          {persons.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </td>,
                      <td key={`evening-${i}`}>
                        <select
                          value={personSelections[`${date.toISOString()}-evening`] || ''}
                          onChange={(e) =>
                            handlePersonChange(`${date.toISOString()}-evening`, e.target.value)
                          }
                        >
                          <option value="">—</option>
                          {persons.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </td>,
                    ]
                  } else {
                    return [
                      <td key={`weekday-${i}`}>
                        <select
                          value={personSelections[`${date.toISOString()}-full`] || ''}
                          onChange={(e) =>
                            handlePersonChange(`${date.toISOString()}-full`, e.target.value)
                          }
                        >
                          <option value="">—</option>
                          {persons.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </td>,
                    ]
                  }
                })}
              </tr>

              {/* MESSAGE ROW */}
              <tr>
                <td><strong>Message</strong></td>
                {week.flatMap((date, i) => {
                  if (!date) return [<td key={`empty-${i}`}></td>]

                  const isWeekend = date.getDay() === 0 || date.getDay() === 6
                  if (isWeekend) {
                    return [
                      <td key={`morning-msg-${i}`}>
                        <input
                          type="text"
                          value={messages[`${date.toISOString()}-morning`] || ''}
                          onChange={(e) =>
                            handleMessageChange(`${date.toISOString()}-morning`, e.target.value)
                          }
                          placeholder="Comment"
                        />
                      </td>,
                      <td key={`evening-msg-${i}`}>
                        <input
                          type="text"
                          value={messages[`${date.toISOString()}-evening`] || ''}
                          onChange={(e) =>
                            handleMessageChange(`${date.toISOString()}-evening`, e.target.value)
                          }
                          placeholder="Comment"
                        />
                      </td>,
                    ]
                  } else {
                    return [
                      <td key={`weekday-msg-${i}`}>
                        <input
                          type="text"
                          value={messages[`${date.toISOString()}-full`] || ''}
                          onChange={(e) =>
                            handleMessageChange(`${date.toISOString()}-full`, e.target.value)
                          }
                          placeholder="Comment"
                        />
                      </td>,
                    ]
                  }
                })}
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )

  // ------------------- Helpers -------------------
  function getWeeksInMonth(year, month) {
    const weeks = []
    let currentWeek = []

    const date = new Date(year, month, 1)
    const firstDay = date.getDay() === 0 ? 7 : date.getDay() // treat Sunday as 7

    for (let i = 1; i < firstDay; i++) currentWeek.push(null)

    while (date.getMonth() === month) {
      currentWeek.push(new Date(date))

      if (date.getDay() === 0) {
        weeks.push(currentWeek)
        currentWeek = []
      }

      date.setDate(date.getDate() + 1)
    }

    if (currentWeek.length) weeks.push(currentWeek)

    weeks.forEach((week) => {
      while (week.length < 7) week.push(null)
    })

    return weeks
  }

  function getYearRange(start, end) {
    const years = []
    for (let y = start; y <= end; y++) years.push(y)
    return years
  }
}

export default MonthlyTable
