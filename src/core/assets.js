export let preloadEntities = {};

function preloadImages() {
  try {
    const image = ["obstacle", "player"];

    image.forEach((img) => {
      preloadEntities[img] = new Image();
      preloadEntities[img].src = "../../assets/img/" + img + ".png";
    });
  } catch (error) {
    console.error(`Gagal mengunduh data towers.json pada assets.js`);
  }
}

export function configGameData() {
  preloadImages();
}
