for (let i = 0; i < imagesDataInitial.length; i++) {
  const url = concatenatePath(imagesDataInitial[i]);
  const img = document.createElement(`img`);
  img.src = url;
}
document.getElementById(`start-button`).classList.remove(`hidden`);