const url = "http://localhost:3000/cars";

window.addEventListener('load', fetchData);

function fetchData() {
    fetch(url)
        .then((result) => result.json())
        .then((cars) => {
            if (cars.length > 0) {
                let html = `<ul class="row g-2 g-lg-3 justify-content-center" style="list-style-type: none">`;

                // loopa igenom alla users och placera dom individuellt i DOM-trädet 
                cars.forEach((car) => {
                    const brand = car.brand;
                    const model = car.model;
                    const year = car.year;
                    const id = car.id;
                    const color = car.color;
            
                    html += `
                    <li id="${id}" class="col-xs-9 col-md-3 p-3 m-1 rounded-3" style="background-color:${color}"> <br>${brand} <br>${model} <br>${year} <br>
                    <div class="d-grid gap-2 col-4 mx-auto justify-content-center"> 
                        <button class="btn btn-primary" onclick="deleteCar(${car.id})" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
                        <button class="btn btn-primary" onclick="updateCar(${car.id})">Update</button>
                        </div>
                    </li>`;
                });
                html += `</ul>`;
                const listContainer = document.getElementById('listContainer');
                listContainer.innerHTML = '';
                listContainer.insertAdjacentHTML('beforeend', html); 
                
            }
            
        });
}

function updateCar(id) {
    console.log('current', id); 
    fetch(`${url}/${id}`)
        .then((result) => result.json())
        .then((car) => {
            console.log(car);
            carForm.brand.value = car.brand;
            carForm.model.value = car.model;
            carForm.year.value = car.year;
            carForm.color.value = car.color;

            localStorage.setItem('currentId', car.id);

            // var myModal = new bootstrap.Modal(document.getElementById('myModal'), {backdrop: true})

        });
}


function deleteCar(id) {
    //e.preventDefault();
    console.log('delete', id);
    fetch(`${url}/${id}`, { method: 'DELETE' }).then((result) => fetchData());
}

carForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const serverCarObject = {
        brand: "",
        model: "",
        year: "",
        color: ""
    };
    serverCarObject.brand = carForm.brand.value;
    serverCarObject.model = carForm.model.value;
    serverCarObject.year = carForm.year.value;
    serverCarObject.color = carForm.color.value;

    const id = localStorage.getItem("currentId");
    if (id) {
        serverCarObject.id = id;
    }

    const request = new Request(url, {
    method: serverCarObject.id ? 'PUT' : 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(serverCarObject)
    });

    fetch(request).then((response) => {
    fetchData();

    localStorage.removeItem('currentId');
    carForm.reset();
    });
}
  