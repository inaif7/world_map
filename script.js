document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("path").forEach((path) => {
    path.addEventListener("click", function () {
      displayCountryInfo(this.id);
    });
  });
});

let currentCard = null; 

function displayCountryInfo(countryId) {
  fetch("countries.json")
    .then((response) => response.json())
    .then((data) => {
      if (data[countryId]) {
        const countryData = data[countryId];
        const infoCard = createInfoCard(countryData);

        if (currentCard) {
          currentCard.remove();
        }

        document.body.appendChild(infoCard);

        currentCard = infoCard;
      } else {
        console.error("No data for country ID:", countryId);
      }
    })
    .catch((error) => console.error("Error fetching country data:", error));
}

function createInfoCard(data) {
  const card = document.createElement("div");
  const title = document.createElement("h2");
  const content = document.createElement("p");

  title.textContent = data.title;
  content.textContent = data.content;
  card.className = "country-card";

  card.appendChild(title);
  card.appendChild(content);

  const sourcesButton = document.createElement("button");
  sourcesButton.textContent = "Sources";
  sourcesButton.className = "sources-button";
  sourcesButton.onclick = function () {
    card.remove();

    const sourcesCard = createSourcesCard(data.sources);
    document.body.appendChild(sourcesCard);

    currentCard = sourcesCard;
  };

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.className = "close-button";
  closeButton.onclick = function () {
    card.remove();
    currentCard = null;
  };

  card.appendChild(sourcesButton);
  card.appendChild(closeButton);

  
  card.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  return card;
}

function createSourcesCard(sources) {
  const sourcesCard = document.createElement("div");
  sourcesCard.className = "sources-card";

  const urls = sources.split(/\s+/);
  urls.forEach((url) => {
    if (url) {
      const link = document.createElement("a");
      link.href = url;
      link.textContent = url;
      link.target = "_blank";
      sourcesCard.appendChild(link);
      sourcesCard.appendChild(document.createElement("br"));
    }
  });

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.className = "close-button";
  closeButton.onclick = function () {
    sourcesCard.remove();
    currentCard = null; 
  };
  sourcesCard.appendChild(closeButton);

  sourcesCard.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  return sourcesCard;
}

document.addEventListener("click", function (event) {
  if (currentCard && !currentCard.contains(event.target)) {
    currentCard.remove();
    currentCard = null; 
  }
});




