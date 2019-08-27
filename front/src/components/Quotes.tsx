import quotes from './quotes/quotes.json';

const Quotes = () => {
  const res = JSON.parse(JSON.stringify(quotes));
  const rand = Math.floor(Math.random() * Math.floor(res.quotes.length - 1));
  return res.quotes[rand];
};

export default Quotes;
