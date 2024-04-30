

// eslint-disable-next-line react/prop-types
export const PersonForm = ({handleChange,addPerson,personData}) => {
     

  return (
    <div>
        <form  onSubmit={addPerson}>
        <div>
          name: <input type="text" name="name" value={personData.name}  onChange={handleChange}/>
        </div>
         
        <div>number: <input  type="text" name="number" value={personData.number} onChange={handleChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}
