/* eslint-disable react/prop-types */
import axios from 'axios'
import { useEffect, useState } from 'react'

const Country = ({ country }) => (
	<div>
		<h2>{country.name.common}</h2>
		<p>capital {country.capital}</p>
		<p>area {country.area}</p>

		<h4>languages:</h4>
		<ul>
			{Object.entries(country.languages).map(([keys, value]) => (
				<li key={keys}>{value}</li>
			))}
		</ul>
		<br />
		<div>
			<img
				src={country.flags.svg}
				alt={country.flags.alt}
				style={{ width: '130px ', height: '130px' }}
			/>
		</div>
	</div>
)

function App() {
	const [countries, setCountries] = useState([])
	const [query, setQuery] = useState('')   
  const [showInfo,setShowInfo] = useState(null)

	useEffect(() => {
		axios
			.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then( ( response ) => setCountries( response.data ) ).catch( error => {
        alert(error)
      })
	}, [])

	const handleQuery = (e) => setQuery(e.target.value)

	const filteredCountries = countries.filter(
		(country) =>
			country.name.common.toLowerCase().indexOf(query.toLowerCase()) !== -1
	)
  
  const handleShow = (countryName) => {		
		setShowInfo(prevShowInfo => 
			prevShowInfo === countryName ? null : countryName			
		)
	} 

	return (
		<>
			Find countries:{' '}
			<input
				type='text'
				onChange={handleQuery}
				placeholder='Search countries'
			/>
			<ul>
				{filteredCountries.length <= 0
					? `No result found for ${query}. Try agin!`
					: filteredCountries.length <= 1
					? filteredCountries.map((country, index) => (
							<li key={index}>
								<Country country={country} />
							</li>
					))
					: filteredCountries.length < 10
					? filteredCountries.map((country, index) => (
							<li key={index}>
								{country.name.common}{' '}
								<button onClick={() => handleShow(country.name.common)}>
									{showInfo === country.name.common ? 'hide' : 'show'}
								</button>
								{showInfo === country.name.common && (
									<Country country={country} />
								)}
							</li>
					))
					: 'Too many matches, specify another filter'}
			</ul>
		</>
	)
}

export default App
