    // URL's
const allMonstersURL = 'http://localhost:3000/monsters'
const getFirst50MonstersURL = `http://localhost:3000/monsters/?_limit=50&_page=1`

    // helpers
const create = el => document.createElement(el)
const select = el => document.querySelector(el)
const selectAll = el => document.querySelectorAll(el)

    // assign page # variable
let page = 1

    // grab stuff
const formContainer = select('#create-monster')
const monsterContainer = select('#monster-container')
const nextPage = select('#forward')
const previousPage = select('#back')


    // make the form
const newMonsterName = create('input')
const newMonsterAge = create('input')
const newMonsterDescription = create('input')
const newMonsterSubmit = create('input')
const newMonsterForm = create('form')

    // attributes for the form
newMonsterName.type = 'text'
newMonsterName.placeholder = 'name...'
newMonsterName.id = 'name'
newMonsterAge.type = 'number'
newMonsterAge.placeholder = 'age...'
newMonsterAge.id = 'age'
newMonsterDescription.type = 'text'
newMonsterDescription.placeholder = 'description...'
newMonsterDescription.id = 'description'
newMonsterSubmit.type = 'submit'
newMonsterSubmit.value = 'create'
newMonsterSubmit.id = 'submit-monster'

    // append stuff to the form and the form to the form container
newMonsterForm.append(newMonsterName, newMonsterAge, newMonsterDescription, newMonsterSubmit)
formContainer.append(newMonsterForm)

    // event listeners
newMonsterForm.addEventListener('submit', handleSubmit)
nextPage.addEventListener('click', () => getNext50Monsters())
previousPage.addEventListener('click', () => getPrevious50Monsters())

    // crud
fetch(getFirst50MonstersURL)
    .then(r => r.json())
    .then(monsters => monsters.forEach(monster => renderOneMonster(monster)))

    // crud callbacks

function createMonster(monsters) {
    console.log(JSON.stringify(monsters))
    fetch(allMonstersURL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(monsters)
    })
    .then(r => r.json())
    .then(monster => console.log(monster))
}

function getNext50Monsters() {
    monsterContainer.innerText = ''
    page += 1
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(r => r.json())
        .then(monsters => monsters.forEach(monster => renderOneMonster(monster)))
}

function getPrevious50Monsters() {
    monsterContainer.innerText = ''
    page -= 1
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(r => r.json())
        .then(monsters => monsters.forEach(monster => renderOneMonster(monster)))
}

    // callbacks
function renderOneMonster(monster) {
        // make stuff
    const monsterName = create('h2')
    const monsterAge = create('h3')
    const monsterDescription = create('p')

        // assign attributes
    monsterName.innerText = monster.name
    monsterAge.innerText = monster.age
    monsterDescription.innerText = monster.description

        // append
    monsterContainer.append(monsterName, monsterAge, monsterDescription)
}

function handleSubmit(e) {
    e.preventDefault()

    let monsterObj = {
        name: e.target.name.value,
        age: e.target.age.value,
        description: e.target.description.value
    }
    
    createMonster(monsterObj)
}