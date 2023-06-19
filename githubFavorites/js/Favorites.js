import { GithubUser } from "./GithubUser.js"
// classe que vai conter a lógica dos dados
// como os dados serão estruturados

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load () {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  async add(username) {
    try {

      const userExistis = this.entries.find(entry => entry.login === username)

      if(userExistis) {
        throw new Error('Usuário já cadastrado')
      }

      const user = await GithubUser.search(username)
      if (user.login === undefined) {
        throw new Error('Usuário não encontrado!')
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()
      this.cleanInput()
    }
    catch(error) {
      alert(error.message)
    }

  }

  cleanInput() {
    this.clean = document.getElementById("input-search").value=""
  }

  delete(user) {
    const filteredEntries = this.entries.filter(entry => {
      return entry.login !== user.login
      // this.entries.filter(entry => entry.login !== user.login) também posso usar dessa forma
    })

    this.entries = filteredEntries
    this.update()
    this.save()
  }
}

// classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
    this.onadd()
  }

  onadd() {
    
    const addButton = this.root.querySelector('.search button')
    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input')

      this.add(value)
    }

  }

  onadd2() {
    const enterAsButton = this.root.querySelector('.search input')
    enterAsButton.addEventListener('keydown', enter)
      enter.preventDefault()
      if (enter.key === 'Enter') {
      const { value } = this.root.querySelector('.search input')

      this.add(value)
      }
  }


  update() {
    this.removeAllTr()

    
    this.entries.forEach( user => {
      const row = this.createRow()

      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `/imagem de ${user.name}`
      row.querySelector(`.user a`).href = `https://github.com/${user.login}`
      row.querySelector(`.user p`).textContent = user.name
      row.querySelector(`.user span`).textContent = user.login
      row.querySelector(`.repositories`).textContent = user.public_repos
      row.querySelector(`.followers`).textContent = user.followers

      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Are you sure you wanna delete this line?')

        if (isOk) {
          this.delete(user)
        }
      }

      this.tbody.append(row)
    })
  
  }

  createRow() {

    const tr = document.createElement('tr')

    tr.innerHTML = `
      <td class="user">
        <img src="https://github.com/zodisantos.png" alt="Imagem de zodisantos">
        <a href="https://github.com/zodisantos" target="_blank">
          <p>Zodi Santos</p>
          <span>zodisantos</span>
        </a>
      </td>
      <td class="repositories">
        76
      </td>
      <td class="followers">
        9589
      </td>
      <td>
        <button class="remove">
          &times;
        </button>
      </td>   
    `
    return tr 
  }

  removeAllTr() {

    this.tbody.querySelectorAll('tr')
    .forEach((tr) => {
      tr.remove()
    })
  }
}

