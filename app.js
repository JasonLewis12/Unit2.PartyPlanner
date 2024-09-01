//creating API url
const COHORT = "2406-FTB-MT-WEB-PT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}`;
//***********************************************************************/
//grabing HTML into javascript
const newParty = document.querySelector("#newParty");
const listParty = document.querySelector("#listParty");
//***********************************************************************/
// creating fetch all to grab full list for later use
async function fetchAll() {
  try {
    const response = await fetch(`${API_URL}/events`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("/GET there was an error here");
  }
}
//***********************************************************************/
//creating post request so partys can be updated
async function createParty(name, description, location) {
  try {
    const response = await fetch(`${API_URL}/events`, {
      method: `POST`,
      body: JSON.stringify({
        name,
        description,
        location,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const party = await response.json();
  } catch (error) {
    console.error("Error in /POST request:", error);
  }
}

//***********************************************************************/
//creating delete request to delete partys
async function deleteParty(id) {
  try {
    const reponse = fetch(`${API_URL}/events/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("/DELETE there was an error here");
  }
}
//***********************************************************************/
// function to put all party on users web page
async function renderPartys(party) {
  if (!party || party.length === 0) {
    listParty.innerHTML = "<h1>No partys are happening sadly...</h1>";
    return; // if no partys inform user that there is no partys
  }
  listParty.innerHTML = "";
  party.forEach(function (party) {
    const partyElement = document.createElement("div");
    partyElement.classList.add("partyItem");
    partyElement.innerHTML = ` <h1>${party.name}</h1>
    <p>${party.description}</p>
    <p>${party.location}</p>
    <button class="delete-Party" data-id="${party.id}">Delete Party</button>`;

    listParty.appendChild(partyElement);

    let deleteparty = partyElement.querySelector(".delete-Party");
    deleteparty.addEventListener("click", async function (event) {
      event.preventDefault;
      await deleteParty(party.id);

      const party = fetchAll();
      renderPartys(party);
    });
  });
}
//***********************************************************************/
//function so that the user can create a party them self
async function newUserParty() {
  const userForm = ` <form>
      <h2>Create your party!</h2>
      <label for="name">name</label>
      <input type="text" id="name" name="name" placeholder="Party's name" />
      <label for="description">description</label>
      <input
        type="text"
        id="description"
        name="description"
        placeholder="Description of your party"
      />
      <label for="location">location</label>
      <input
        type="text"
        name="location"
        id="location"
        placeholder="Where is your party?"
      />
      <button type="submit">Submit</button>
    </form>`;
  newParty.innerHTML = userForm;
  const form = newParty.querySelector("form");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const partyinfo = await {
      name: form.name.value,
      description: form.description.value,
      location: form.location.value,
    };
    await createParty(
      partyinfo.name,
      partyinfo.description,
      partyinfo.location
    );
    const party = await fetchAll();
    renderPartys(party);
    form.name.value = "";
    form.description.value = "";
    form.location.value = "";
  });
}
//***********************************************************************/
//puting it all togather and rendering webpage
async function render() {
  const partys = await fetchAll();
  renderPartys(partys);
  newUserParty();
}

render();
