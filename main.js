const ipInput = document.getElementById('ipInput')

const map = L.map('map').setView([51.505, -0.09], 13)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map)

let marker = L.marker([51.5, -0.09]).addTo(map)

const ipSearched = document.getElementById('ipSearched')
const nameLocation = document.getElementById('location')
const timeZone = document.getElementById('timezone')
const isp = document.getElementById('isp')

async function getDataAddress(ipValue) {
  const url = `https://geo.ipify.org/api/v2/country?apiKey=at_x5rQ5qqQKbHDKLEGBe4Y07fmZKOrj&ipAddress=${ipValue.trim()}`
  const data = await fetch(url)
  const response = await data.json()
  return data.status >= 400
    ? false
    : {
        ip: response.ip,
        location: `${response.location.region}, ${response.location.country}`,
        timezone: `UTC ${response.location.timezone}`,
        isp: response.isp,
      }
}
async function setNewValues() {
  const valueIpInput = ipInput.value
  const newData = await getDataAddress(valueIpInput)
  ipSearched.textContent = newData.ip ? newData.location : 'none'
  nameLocation.textContent = newData.location ? newData.location : 'none'
  timeZone.textContent = newData.timezone ? newData.timezone : 'none'
  isp.textContent = newData.isp ? newData.isp : 'none'
  console.log(newData)
}

const searchBtn = document.getElementById('searchBtn')
searchBtn.addEventListener('click', async () => setNewValues())
document.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') setNewValues()
})
