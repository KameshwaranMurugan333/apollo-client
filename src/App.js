import './App.css';
import { useQuery, gql, useLazyQuery } from '@apollo/client';

const GET_ALL_COUNTRIES = gql`
query getAllCountry($code:String) {
  countries(
    filter:{
      code:{
        eq: $code
      }
    }
  ){
    code
    name
    capital
  }
}
`

function App() {

  const { loading, error, data, refetch } = useQuery(GET_ALL_COUNTRIES, {
    variables: { code: "IN" }
  });

  const [getAllCountry, { loading: isLoading, error: isError, data: _data }] = useLazyQuery(GET_ALL_COUNTRIES);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() =>getAllCountry({
          variables:{code:"PA"}
        })}>Refetch</button>
        {loading && <p>Loading....</p>}
        {!loading && error && <p>Opps! Something Went Wrong</p>}
        {!loading && !error && <div>{
          data.countries.map(country => {
            return <p key={country.code}>{country.name}</p>
          })
        }</div>}
        {isLoading && <p>Is Loading....</p>}
        {!isLoading && isError && <p>Opps! Something Went Wrong Is Error</p>}
        {!isLoading && !isError && <div>{
          _data?.countries?.map(country => {
            return <p key={country.code}>{country.name}</p>
          })
        }</div>}
      </header>
    </div>
  );
}

export default App;
