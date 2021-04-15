const params = (new URL(document.location)).searchParams
const id = params.get('id')
const getData = () => import('../../data.json')
getData().then(res => {
  const data = res.default
  const photographer = data.photographers.find(p => `${p.id}` === id)
  console.log(photographer)
  if (photographer === undefined) {
    window.location = 'index.html'
  }
  // Créer la page
  // Filtrer Tableau / comment filtrer un tableau
  // Utiliser fonction render de l'objet media
})
