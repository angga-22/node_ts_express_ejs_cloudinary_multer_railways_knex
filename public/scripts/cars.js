const carEl = document.getElementById("cars-lists");
const formSubmit = document.getElementById("onSubmitForm");
const imageFile = document.getElementById("image");
const carName = document.getElementById("carName");
const rentPrice = document.getElementById("rentPrice");
const closeModalBtn = document.getElementsByClassName("btn-close")[0];
const onConfirmDeleteCar = document.getElementById("onConfirmDeleteCar");
const searchCarsInput = document.getElementById("searchCarsInput");
const searchCarsByNameFormSubmit = document.getElementById(
  "searchCarsByNameFormSubmit"
);

const addNewCar = async (e) => {
  e.preventDefault();
  try {
    const payload = new FormData();
    payload.append("carName", carName.value);
    payload.append("rentPrice", rentPrice.value);
    const files = imageFile.files;
    if (files && files.length > 0) {
      payload.append("imageUrl", files[0]);
    }
    const response = await fetch("/cars", {
      method: "post",
      body: payload
    });
    await response.json();
    closeModalBtn.click();
    loadCarsData(``);
  } catch (error) {
    throw new Error(error);
  }
};

function handleChangeImageFile(e) {
  const files = e.target.files;
  if (files && files.length > 0) {
    // render preview image
  }
}
function handleDeleteCar(id) {
  const confirmDeleteModal = new bootstrap.Modal(
    document.getElementById("deleteCarConfirm"),
    {
      keyboard: false
    }
  );

  onConfirmDeleteCar.addEventListener("click", async () => {
    try {
      const response = await fetch(`/cars/delete/${id}`, {
        method: "delete"
      });

      if (response.ok) {
        loadCarsData(``);
      } else {
        console.error("Error deleting car:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    } finally {
      confirmDeleteModal.hide();
    }
  });

  confirmDeleteModal.show();
}

const loadCarsData = async (name = ``) => {
  try {
    carEl.innerHTML = "";
    const response = await fetch(`/cars/list?name=${name}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const res = await response.json();
    res.data.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card mb-3 mb-lg-0  col-lg-3 m-2";
      card.style = `background: #dbdbdb; color: #FEF4F4; border-radius: 1rem; border: 1px solid #848484;`;
      card.innerHTML = `
        <div class="card-body">
        ${item.id}
          <img loading="lazy" width="100" src=${item.imageUrl} alt="carImg"/>
          <h6 class="mt-2 text-center" style="color: gray">${item.name}</h6>
          <h3 class="text-center" style="color: red">${item.rentPrice} <span style="color: gray; font-weight: lighter; font-size: 12px">/rent</span></h3>
          <div class="packages"> 
          </div>
          <div class="d-flex w-100 mx-auto">
            <button class="btn btn-primary mx-auto" type="button" data-bs-toggle="modal" onclick="handleDeleteCar(${item.id})" data-bs-target="#deleteCarConfirm">Delete Car</button>
            <button class="btn btn-primary mx-auto">Edit Car</button>
          </div>
        </div>
      `;
      carEl.appendChild(card);
    });
  } catch (error) {
    throw new Error(error);
  }
};

searchCarsByNameFormSubmit.addEventListener("submit", async (e) => {
  e.preventDefault();
  loadCarsData(encodeURIComponent(searchCarsInput.value));
});

imageFile.addEventListener("change", handleChangeImageFile);
formSubmit.addEventListener("submit", addNewCar);

loadCarsData(``);
