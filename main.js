const mainContainer = document.querySelector('main')

const ipInput = document.getElementById('ipInput')
ipInput.addEventListener('change', (e) => {
  console.log(e.target.value)
})

const map = L.map('map').setView([51.505, -0.09], 13)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map)

let marker = L.marker([51.5, -0.09]).addTo(map)
