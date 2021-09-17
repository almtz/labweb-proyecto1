const NewTopList = () => {

    const testFunction = async event => {
      event.preventDefault()
  
      const res = await fetch('/api/registerTopList', {
        body: JSON.stringify({
          name: event.target.name.value
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
  
      const result = await res.json()
    }
  
    return (
      <form onSubmit={testFunction}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" required />
        <button type="submit">Register</button>
      </form>
    )
  };
  
  export default NewTopList;