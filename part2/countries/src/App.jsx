import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
	const [countries, setCountries] = useState([])
	const [query, setQuery] = useState('')

	useEffect(() => {
		axios
			.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
			.then((response) => setCountries(response.data))
	}, [])

	const handleQuery = (e) => setQuery(e.target.value)

	const filteredCountries = countries.filter(
		(country) =>
			country.name.common.toLowerCase().indexOf(query.toLowerCase()) !== -1
	)

	return (
		<>
			Find countries:{' '}
			<input
				type='text'
				onChange={handleQuery}
				placeholder='Search countries'
			/>
			<ul>
        {
          filteredCountries.length <= 0
          ? `No result found for ${query}. Try agin!` : filteredCountries.length <= 1 ? (
            filteredCountries.map( ( country, index ) => (
              <li key={index}>
								<h2>{country.name.common}</h2>
								<p>capital {country.capital}</p>
                <p>area { country.area }</p>
                
                <h4>languages:</h4>
                <ul>
                  {
                    Object.entries(country.languages)
                    .map( ([keys, value]) => (
                      <li key={ keys }>{ value }</li>
                    ))
                  }
                </ul>
                <br />
                <div>
                  <img
                    src={ country.flags.svg }
                    alt={ country.flags.alt }
                    style={ { width: '130px ', height: '130px' } }
                  />
                </div>
                
							</li>
            ))
          )
					: filteredCountries.length < 10
            ? (
              filteredCountries.map( ( country, index ) => (
                <li key={ index }>{ country.name.common }</li>
              ))
          )
					: 'Too many matches, specify another filter'
                
        }
			</ul>
		</>
	)
}

export default App
