export let preloadEntities = {};

function preloadImages(resolve) {
  try {
    const image = ["obstacle", "player"];
    let imgCounter = 0;

    image.forEach((img) => {
      preloadEntities[img] = new Image();
      preloadEntities[img].src = "../../assets/img/" + img + ".png";

      preloadEntities[img].onload = () => {
        imgCounter++;

        if (imgCounter == image.length) {
          resolve();
        }
      };
    });

    console.log(`Berhasil mengunduh img entity pada assets.js`);
  } catch (error) {
    console.error(`Gagal mengunduh img entity pada assets.js`);
  }
}

export function configGameData() {
  return new Promise((resolve) => {
    preloadImages(resolve);
  });
}
