import React from 'react'

const Quotes = ({ quotes }) => (
  <ul className="quotes">
    {quotes.map((quote, x) => (
      <li key={x} className="quote">
          <div>
              <span className="quote_text">{quote.quoteText}</span>
              <span className="quote_author">{quote.quoteAuthor}</span>
          </div>
      </li>
    ))}
  </ul>
);

export default Quotes





