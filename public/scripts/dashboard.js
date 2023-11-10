const tBody = document.getElementById("tbody");
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${day} / ${month} / ${year} `;
};
const loadCarsData = async () => {
  try {
    const response = await fetch("/cars/list");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const res = await response.json();
    res.data.forEach((item, idx) => {
      const tRow = document.createElement("tr");
      tRow.innerHTML = `
            <th scope="row">${idx + 1}</th>
            <td>${item.name}</td>
            <td>Cars</td>
            <td>${item.rentPrice}</td>
            <td>${formatDate(item.startRent)}</td>
            <td>${formatDate(item.finishRent)}</td>
            <td>${formatDate(item.createdAt)}</td>
            <td>${formatDate(item.updatedAt)}</td>
      `;
      tBody.appendChild(tRow);
    });
  } catch (error) {
    throw new Error(error);
  }
};
loadCarsData();
