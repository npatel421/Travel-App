let UIData = {}

// deleteTrip function is the add on for the project. It will delete the div elements created when the UI is updated if the user decides to delete the trip.
const deleteTrip = async (event) => {
  event.preventDefault();
  console.log('deleting trip')
  const parent = document.getElementById('upcoming_trip')
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
}
}

// formHandler, initializes variables and includes the user input
const formHandler = async (event) => {

  event.preventDefault();
  const city = document.getElementById('city').value;
  const departDate = document.getElementById('departDate').value;
  const today = new Date();
  const departDateFormat = new Date(departDate)
  const timeOffset = today.getTimezoneOffset() * 60000
  const daysAway = (departDateFormat - today + timeOffset) / (1000*60*60*24)
  const data = {
    city: city,
    departDate: departDate,
    daysAway: daysAway,
  
  }
  if (departDateFormat < today) {
    alert('The date you entered is invalid! Please enter a future date.')
  } else{
    await getTripInfo('http://localhost:8082/tripInfo',data)
    await localUI(UIData)

  }
}

// getTripInfo, main function that sends user input back to the express server and then returns the trip information to the client side
const getTripInfo = async (url, data) => {
  console.log('inside trip info')
  const request = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  });

  try {
      UIData = await request.json();
      console.log(UIData)
      return UIData

  } catch (error) {
      return ({success: false});
  }
};

// localUI function creates divs based on the information needed to display to the user and then updates UI based on API trip info
function localUI (data) {

  const parentElement = document.getElementById('upcoming_trip');

  const divCreateDays = document.createElement("div")
  const divCreateTitle = document.createElement("div")
  const divCreateHigh = document.createElement("div")
  const divCreateLow = document.createElement("div")
  const divCreateWeather = document.createElement("div")
  const imgCreate = document.createElement("img")
  const divCreateDelBut = document.createElement("button")

  const daysAway = document.createTextNode(`Your trip to ${data.city}, ${data.country} is ${data.daysAway} days away!`)
  const title = document.createTextNode('Typical Weather for then is:')
  const highTemp = document.createTextNode(`High - ${data.highTemp}°F`)
  const lowTemp = document.createTextNode(`Low - ${data.lowTemp}°F`)
  const weatherDescription = document.createTextNode(`With ${data.weather}`)
  imgCreate.src = `${data.image}`
  const deleteTrip = document.createTextNode('Delete Trip')
  divCreateDelBut.setAttribute('onclick',"Client.deleteTrip(event)")


  divCreateDays.appendChild(daysAway)
  divCreateTitle.appendChild(title)
  divCreateHigh.appendChild(highTemp)
  divCreateLow.appendChild(lowTemp)
  divCreateWeather.appendChild(weatherDescription)
  divCreateDelBut.appendChild(deleteTrip)

  parentElement.appendChild(divCreateDays)
  parentElement.appendChild(divCreateTitle)
  parentElement.appendChild(divCreateHigh)
  parentElement.appendChild(divCreateLow)
  parentElement.appendChild(divCreateWeather)
  parentElement.appendChild(imgCreate)
  parentElement.appendChild(divCreateDelBut)
}

export { formHandler, deleteTrip, getTripInfo }
