
 import { useState } from "react"

// eslint-disable-next-line react/prop-types
export const Filter = ({persons}) => {
  const [search,setSearch] = useState('')
  const [result,setResult] = useState([])

    const buscar = (event) => {
        event.preventDefault()
      
        const searchLowerCase = search.toLowerCase()
        const searchResult = searchLowerCase
          // eslint-disable-next-line react/prop-types
          ? persons.filter(x => x.name.toLowerCase().includes(searchLowerCase))
          : [];
          
        setResult(searchResult)
        setSearch('')
      }

    const handleSearch = (event) => {
        setSearch(event.target.value)
      }
  return (
    <div>
      <form onSubmit={buscar}>
        <div>filter shown with <input  value={search} onChange={handleSearch} type="text" /></div>
        <button>filter</button>
      </form>


      {result.map((nombres) =>(
        <div key={nombres.id}>
            <p>{nombres.name} {nombres.number}</p>
        </div>
      ))}
    </div>
  )
}
