


import { useEffect, useState } from 'react';
import { createClient } from 'urql';
import './App.css';

function App() {
  const [token, setTokens] = useState([]);
  const QueryURL = "https://gateway.thegraph.com/api/10cb3f9d53ab0f11fbfc55d43fdcf28f/subgraphs/id/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7";
  const client = createClient({
    url: QueryURL
  });
  const query =
    `
  {
    tokens(first: 5) {
      id
      name
      symbol
      decimals
      lastPriceUSD
    }
  }
  `;

  useEffect(() => {
    const getTokens = async () => {
      const  {data } = await client.query(query).toPromise();
      console.log("token",data);
      setTokens(data.tokens);
    };
    getTokens();
  }, []);

  return (
    <>
      <div>
        <h1>Tokens Information</h1>
        {token !== null && token.length > 0 && token.map((token) => {
          return (
            <div key={token.id}>
              <div>{token.id}</div>
              <div>{token.name}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;