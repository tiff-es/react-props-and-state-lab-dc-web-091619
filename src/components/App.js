import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }


  fetchPets = () => {
   let endpoint = '/api/pets'
   if (this.state.filters.type !== 'all'){
     endpoint += `?type=${this.state.filters.type}`}
   fetch(endpoint)
     .then(res => res.json())
     .then(pets => this.setState({pets: pets}))
  }


  onChangeType = (event) => {
   let value = event.target.value
    this.setState({filters: {type: value}})
  }


  changeAdoptionStatus = (petId) => {
  const updatedPets = this.state.pets.map(p => {
    return p.id === petId ? {...p, isAdopted: true} : p })
    this.setState({pets: updatedPets})
  }



  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                onAdoptPet={this.changeAdoptionStatus}
                pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
