import React, {useState, useEffect, useCallback} from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    if (!event) {
      setValue('')
    }
    else if (event) {
    setValue(event.target.value)
  }
  }

  return {
    type,
    value,
    onChange
   // reset
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
 // console.log('resources', resources)

  // callback use to prevent react-hooks/exhaustive-deps
  const getAll = useCallback(async() => {
    const request = await axios.get(baseUrl)
    return  request.data
  }, [baseUrl])

  useEffect(() => {
    (async () => {
      const resources = await getAll()
      setResources(resources)
    })()

  }, [baseUrl, getAll])
  
  const create = async(resource) => {
    const response = await axios.post(baseUrl, resource)
    setResources(resources.concat(response.data))
    return response.data
  }
  const service = {
    getAll,
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')
  const notes = useResource('http://localhost:3006/notes')
  const persons = useResource('http://localhost:3006/persons')
  // console.log('notes', notes[0])
  // console.log('persons', persons[0])
  
  const handleNoteSubmit = (event) => {
    event.preventDefault()
    notes[1].create({ content: content.value })
    content.reset = () => content.onChange('')
    content.reset()
  }
    
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    persons[1].create({ name: name.value, number: number.value})
    name.reset = () => name.onChange('')
    number.reset = () => number.onChange('')
    name.reset()
    number.reset()
  }
  

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} 
          // type={content.type}
          // value={content.value}
          // onChange={content.onChange}
        />
        <button>create</button>
      </form>
      {notes[0].map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input //{...name}
                 type={name.type}
                 value={name.value}
                 onChange={name.onChange}
                /> <br/>
        number <input //{...number.value}
                 type={number.type}
                 value={number.value}
                 onChange={number.onChange}
                />
        <button>create</button>
      </form>
      {persons[0].map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App