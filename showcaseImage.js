function showcaseImageStart() {
  // show showcase at the top of the page
  if (window.location.hash) {
    const showCaseArtTile = [
      ...document.getElementsByTagName("art-tile"),
    ].filter((artTile) => {
      return (
        window.location.hash ===
        `#${artTile.getAttribute("data-title").replace(/\W/g, "")}`
      );
    });
    showcaseImage(showCaseArtTile[0]);
    setTimeout(() => scrollTo({ top: 0, behavior: "auto" }), 0);
  }

  // do not show showcase at the top of the page
  if (!window.location.hash) {
    const showcaseTile = document.querySelector("showcase-tile");
    showcaseTile.style.display = "none";
    showcaseTile.innerHTML = `
      <showcase-image></showcase-image>
      <showcase-description>
        <showcase-description-slider>
        </showcase-description-slider>
      </showcase-description>
    `;

    processArtTiles();
  }
}

function goBack() {
  history.back();
}

function getExtraMedia(artTile) {
  const extraMediaArray = artTileItems.find(
    (item) => item.fields.title === artTile.getAttribute("data-title"),
  ).fields.extraMedia;
  if (extraMediaArray) {
    return extraMediaArray.map((media) => generateMediaElement(media, true));
  }
  return [];
}

function showcaseImage(artTile) {
  // set hash
  window.location.hash = artTile.getAttribute("data-title").replace(/\W/g, "");

  // re-process all the tiles to put everything in the column it was in
  processArtTiles();

  // append this art tile to the top showcase tile (moving it from where it was in the grid)
  const showcaseTile = document.querySelector("showcase-tile");
  showcaseTile.style.display = "";
  showcaseTile.querySelector("showcase-image").innerHTML = "";
  showcaseTile.querySelector("showcase-image").appendChild(artTile);
  // append the other images
  getExtraMedia(artTile).forEach((img) =>
    showcaseTile.querySelector("showcase-image").appendChild(img),
  );

  const showcaseDescription = showcaseTile.querySelector(
    "showcase-description",
  );
  showcaseDescription.innerHTML = `
    <showcase-description-slider>
      <h2>${artTile.getAttribute("data-title")}</h2>
      <p style="margin-top: 2em; line-height: 1.3em;">${artTile.getAttribute(
        "data-description",
      )}</p>
      <p style="margin-top: 2em;">${artTile.getAttribute(
        "data-publication",
      )}</p>
    </showcase-description-slider>
  `;

  // scrollTo({ top: 0, behavior: "smooth" });
}

window.onpopstate = (event) => {
  showcaseImageStart();
};
