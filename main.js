/* VARIABLES */
const ipInput = document.getElementById('ipInput')
const ipSearched = document.getElementById('ipSearched')
const nameLocation = document.getElementById('location')
const timeZone = document.getElementById('timezone')
const isp = document.getElementById('isp')

/** Function get data address like ip, region, lat, lng*/

async function getDataAddress(ipValue) {
  const url = ipValue
    ? `https://geo.ipify.org/api/v2/country,city?apiKey=at_x5rQ5qqQKbHDKLEGBe4Y07fmZKOrj&ipAddress=${ipValue.trim()}`
    : 'https://geo.ipify.org/api/v2/country,city?apiKey=at_x5rQ5qqQKbHDKLEGBe4Y07fmZKOrj&ipAddress='
  const data = await fetch(url)
  const response = await data.json()
  return data.status >= 400
    ? false
    : {
        ip: response.ip,
        location: `${response.location.region}, ${response.location.country}`,
        timezone: `UTC ${response.location.timezone}`,
        isp: response.isp,
        lat: response.location.lat,
        lng: response.location.lng,
      }
}

/** Function that set the values in the DOM */
async function setNewValues() {
  const valueIpInput = ipInput.value
  const newData = await getDataAddress(valueIpInput)
  ipSearched.textContent = newData.ip ? newData.ip : 'none'
  nameLocation.textContent = newData.location ? newData.location : 'none'
  timeZone.textContent = newData.timezone ? newData.timezone : 'none'
  isp.textContent = newData.isp ? newData.isp : 'none'

  if (newData.lat && newData.lng) {
    map.setView([newData.lat, newData.lng], 17)
    marker.setLatLng([newData.lat, newData.lng])
  }
}
setNewValues()
/** Events to search de new values */

const searchBtn = document.getElementById('searchBtn')
searchBtn.addEventListener('click', async () => setNewValues())
document.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') setNewValues()
})

/** Map -- LeafletJS -- */

let map = L.map('map').setView([34.04, -118.09], 17)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map)

let marker = L.marker([34.04, -118.09]).addTo(map)
