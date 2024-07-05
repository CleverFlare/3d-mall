import { areas } from "./areas";
import { pathfinding } from "./main";

const sectionsList = document.querySelectorAll("#sections");

const searchForm = document.querySelector("#search-form") as HTMLFormElement;

const locationInput = document.querySelector(
  "#location-input",
) as HTMLInputElement;

const destinationInput = document.querySelector(
  "#destination-input",
) as HTMLInputElement;

function createSectionButton(content: string) {
  const button = document.createElement("button");
  button.className =
    "w-full text-start text-md bg-transparent hover:bg-black/5 py-1 px-4";
  button.type = "button";
  button.id = "section-button";
  button.innerText = content;

  return button;
}

for (const section of sectionsList) {
  for (const area of areas) {
    if (area.type === "crossroad") continue;

    const sectionButton = createSectionButton(area.name);

    section.appendChild(sectionButton);
  }

  (section as Element & { style: { display: string } }).style.display = "none";

  const searchInput = section.previousElementSibling as HTMLInputElement;

  searchInput.addEventListener("focus", () => {
    (section as Element & { style: { display: string } }).style.display =
      "block";
  });

  section.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).id === "section-button")
      (section.previousElementSibling as HTMLInputElement).value = (
        e.target as HTMLElement
      ).innerText;
  });

  searchInput.addEventListener("blur", (inputEvent: FocusEvent) => {
    const filteredAreaNames = areas
      .filter((area) => area.type === "destination")
      .map((area) => area.name);

    if (
      !filteredAreaNames.includes(
        (inputEvent.currentTarget as HTMLInputElement).value,
      )
    )
      (inputEvent.currentTarget as HTMLInputElement).value = "";
  });

  searchInput.addEventListener("input", (e) => {
    const inputTarget = e.currentTarget as HTMLInputElement;
    for (const sectionButton of section.children) {
      if (sectionButton.textContent?.includes(inputTarget.value))
        (
          sectionButton as typeof sectionButton & { style: { display: string } }
        ).style.display = "block";
      else
        (
          sectionButton as typeof sectionButton & { style: { display: string } }
        ).style.display = "none";
    }
  });
}

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  for (const section of sectionsList) {
    if (!target.contains(section) && target !== section.previousElementSibling)
      (
        section as HTMLDivElement & { style: { display: string } }
      ).style.display = "none";
  }
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    !locationInput.value ||
    !destinationInput.value ||
    locationInput.value === destinationInput.value
  ) {
    pathfinding.clear();
    return;
  }

  const startIndex = areas.findIndex(
    (area) => area.type === "destination" && area.name === locationInput.value,
  );

  const goalIndex = areas.findIndex(
    (area) =>
      area.type === "destination" && area.name === destinationInput.value,
  );

  pathfinding.update(startIndex, goalIndex);
});
