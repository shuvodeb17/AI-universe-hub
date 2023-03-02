// load data
const loadData = () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools.slice(0, 6)));
};

// display UI
const displayData = (allData) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";
  allData.forEach((data) => {
    const { name, image, features, published_in } = data;

    const createElement = document.createElement("div");
    createElement.innerHTML = `
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
                        <div class="bg-[#FEF7F7] h-10 w-10 flex items-center justify-center rounded-full cursor-pointer">
                            <i class="fa-solid fa-arrow-right text-[#F29393]"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    cardContainer.appendChild(createElement);
    console.log(data);
  });
};

// show more button
const seeMoreBtn = () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools));
};
loadData();
