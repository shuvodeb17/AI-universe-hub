let storeData;
// load data
const loadData = () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      storeData = data.data.tools.slice(0, 6);
      displayData(data.data.tools.slice(0, 6));
    });
};

// display UI
const displayData = (allData) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";
  allData.forEach((data) => {
    const { name, image, features, published_in, id } = data;

    const createElement = document.createElement("div");
    createElement.innerHTML = `
    <div class="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="rounded-t-lg p-5" src="${image}" alt="" />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Features</h5>
                </a>
                <ol class="list-decimal list-inside">
                    <li>${features[0] ? features[0] : "Not found"}</li>
                    <li>${features[1] ? features[1] : "Not found"}</li>
                    <li>${features[2] ? features[2] : "Not found"}</li>
                </ol>
                <hr class="mt-3 mb-3">
                <div id="card-footer" class="flex items-center justify-between">
                    <div class="left">
                        <h2 class="text-2xl font-bold">${name}</h2>
                        <i class="fa-regular fa-calendar-days mr-2 mt-2"></i>
                        <p class="inline">${published_in}</p>
                    </div>
                    <div class="right">
                        <label for="my-modal-5" class="bg-[#FEF7F7] h-10 w-10 flex items-center justify-center rounded-full cursor-pointer" onclick='details("${id}")'>
                            <i class="fa-solid fa-arrow-right text-[#F29393]"></i>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    `;
    cardContainer.appendChild(createElement);

    // spinner
    const spinner = document.getElementById("spinner");
    spinner.classList.add("hidden");
  });
};



// show more button
const seeMoreBtn = () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      storeData = data.data.tools;
      displayData(data.data.tools);
    });
    const showMoreButton = document.getElementById('show-more-buton');
    showMoreButton.classList.add('hidden');
};



// sort button
const sortByDateBtn = () => {
  const allData = storeData;
  allData.sort((a, b) =>
    a.published_in > b.published_in
      ? 1
      : b.published_in > a.published_in
      ? -1
      : 0
  );
  displayData(allData);
};



// card details
const details = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showDetails(data.data);
    });
};



// show details
const showDetails = (details) => {
  const {description,pricing,features,integrations,image_link,accuracy,input_output_examples,} = details;

  // display price
  if (pricing === null) {
    document.getElementById("modal-left-description").innerText = description;
    document.getElementById("pricing-one").innerText = "Free of Cost/Basic";
    document.getElementById("pricing-two").innerText = "Free of Cost/pro";
    document.getElementById("pricing-three").innerText =
      "Free of Cost/Enterprice";
  } else {
    document.getElementById("modal-left-description").innerText = description;
    document.getElementById(
      "pricing-one"
    ).innerText = `${pricing[0].price} ${pricing[0].plan}`;
    document.getElementById(
      "pricing-two"
    ).innerText = `${pricing[1].price} ${pricing[1].plan}`;
    document.getElementById(
      "pricing-three"
    ).innerText = `${pricing[2].price} ${pricing[2].plan}`;
  }

  // show all features
  const featuresContainer = document.getElementById("features-container");
  featuresContainer.innerHTML = "";
  for (const feature in features) {
    const featuresName = features[feature].feature_name;
    const createElement = document.createElement("li");
    createElement.innerHTML = `
        <li>${featuresName ? featuresName : "No data Found"}</li>
    `;
    featuresContainer.appendChild(createElement);
  }

  //   show all integrations
  const integrationsContainer = document.getElementById(
    "integrations-container"
  );
  integrationsContainer.innerHTML = "";
  if (integrations === null) {
    const createElement = document.createElement("li");
    createElement.innerHTML = `
            <li>No data found</li>
    
        `;
    integrationsContainer.appendChild(createElement);
  } else {
    integrations?.forEach((integration) => {
      const createElement = document.createElement("li");
      createElement.innerHTML = `
            <li>${integration}</li>
    
        `;
      integrationsContainer.appendChild(createElement);
    });
  }

  //   modal right side
  document.getElementById("modal-image").src = image_link[0];
  const accuracyWrapper = document.getElementById("accuracy-wrapper");
  if (accuracy.score === null) {
    accuracyWrapper.classList.add("hidden");
  } else {
    accuracyWrapper.classList.remove("hidden");
    document.getElementById("accuracy-score").innerText = accuracy.score;
  }

  // show input and output
  if (input_output_examples === null) {
    const modalInputOutputWrapper = document.getElementById(
      "modal-right-input-output-wrapper"
    );
    modalInputOutputWrapper.innerHTML = "No data found";
  } else {
    const modalInputOutputWrapper = document.getElementById(
      "modal-right-input-output-wrapper"
    );
    modalInputOutputWrapper.innerHTML = "";
    input_output_examples?.slice(0, 1).forEach((inputAndOutput) => {
      const { input, output } = inputAndOutput;
      const createDiv = document.createElement("div");
      createDiv.innerHTML += `
        <a href="#">
          <h5 id="modal-right-input" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${input}</h5>
        </a>
        <p id="modal-right-output" class="mb-3 font-normal text-gray-700 dark:text-gray-400">${output}</p>
      `;
      modalInputOutputWrapper.appendChild(createDiv);
    });
  }
};
loadData();
