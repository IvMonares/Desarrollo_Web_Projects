downloadUsers(5);

function downloadUsers(amount) {
    const api = `https://api.randomuser.me/?nat=US&results=${amount}`;
    fetch(api)
        .then((answer) => answer.json())
        .then((data) => printHTML(data.results));
}

function printHTML(data) {
    data.forEach((user) => {
        const li = document.createElement("li");

        const {
            name: { first },
            name: { last },
            picture: { medium },
            nat,
        } = user;

        li.innerHTML = `
            Nombre: ${first} ${last}
            Pais: ${nat}
            <br>
            <img src="${medium}">
            <hr>
        `;
        document.querySelector('#app').appendChild(li)
    });
}

// index.html - Map
try {

    if ($('#map')) {
        var map = L.map('map').setView([20.674781, -103.38749], 18);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '<a href="itcj.edu.mx">ITCJ</a>'
        }).addTo(map);

        L.marker([20.674781, -103.38749]).addTo(map)
            .bindPopup('GdlWebCamp')
            .openPopup()
            .bindTooltip('La mejor conferencia de diseño web')
    }
} catch (e) {
    //console.error(e);
}