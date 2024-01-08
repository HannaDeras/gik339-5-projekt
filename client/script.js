

const url = "http://localhost:3000/cars";

window.addEventListener('load', fetchData);

function fetchData() {
    fetch(url)
        .then((response) => response.json())
        .then((cars) => {
            if (cars.length > 0) {
            // const newUl = document.createElement('ul');
            // const div = document.querySelector('.container');
            // div.insertAdjacentElement('beforeend', newUl);
                console.log("hej");
                let html = `<ul>`;

        // loopa igenom alla users och placera dom individuellt i DOM-trädet 
                cars.forEach((car) => {
                // const newLi = document.createElement('li');     
                // newLi.style.backgroundColor = car.color;
                    const brand = car.brand;
                    const model = car.model;
                    const year = car.year;
                    const id = car.id;
                    const color = car.color;
                // newLi.id = id;  
                // const html = `${brand}, ${model}, ${year}`; 
                // const deleteBtn = `<button class="btn btn-primary"> Delete </button>`;
            
                    html += `
                    <li id="${id}" class="list list-group" style="background-color:${color}">${brand}, ${model}, ${year} 
                    <button class="btn btm-sm btn-primary" onclick="deleteCar(${car.id})">Delete</button>
                    </li>`;
                });
                html += `</ul>`;
                const listContainer = document.getElementById('listContainer');
                listContainer.innerHTML = '';
                listContainer.insertAdjacentHTML('beforeend', html); 
                
            }
            
        });
}



function deleteCar(id) {
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
    serverCarObject.brand = carForm.carBrand.value;
    serverCarObject.model = carForm.carModel.value;
    serverCarObject.year = carForm.carYear.value;
    serverCarObject.color = carForm.carColor.value;

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
  