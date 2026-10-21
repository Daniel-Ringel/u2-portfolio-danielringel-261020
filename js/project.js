const projectsList = document.querySelector("#projects-list");
const projectsStatus = document.querySelector("#projects-status");

const placeholderImages = [
  {
    mobile: "alexia-balaguer-UE1oS124SoY-unsplash.jpg",
    desktop: "8fdf1590e7872c6a2058b9625737f5b75b60be13.jpg",
  },
  {
    mobile: "hoang-dang-khoa-Of_Vjt9rcLE-unsplash.jpg",
    desktop: "c58f84a06b364f1d268c5f396af9f68e95fa8167.jpg",
  },
  {
    mobile: "kiryl-PVCxXEU2A30-unsplash.jpg",
    desktop: "61378a0032f30b561bea9168c23cb7e62e2faca6.jpg",
  },
  {
    mobile: "pawel-czerwinski-ahX1sknMGhg-unsplash.jpg",
    desktop: "bd0b1c40ea5b01bccbe2ee39d1608b7af2b84c96.jpg",
  },
  {
    mobile: "mustafi-numann-q1m8eWduMmg-unsplash.jpg",
    desktop: "1ca614c694dfa61c88bf91b57d4a2a529cb10144.jpg",
  },
  {
    mobile: "stefan-szankowski-cCip3XC4z8c-unsplash.jpg",
    desktop: "1f4932808d5857f6f0d9154cbce52348d32d1f0d.jpg",
  },
];

async function getLanguages(repo) {
    try {
        const response = await fetch(repo.languages_url);

        if (!response.ok) throw new Error("Languages not available");

        const languages = await response.json();
        const names = Object.keys(languages);

        return names.length > 0 ? names.join(", ") : repo.language ?? "Not specified";
    } catch {
        return repo.language ?? "Not specified";
    }
}

function createProjectCard(repo, index) {
  const image = placeholderImages[index % placeholderImages.length];

  return `
    <li>
      <article class="project-card">
        <img class="mobile-only" src="../assets/project-images-mobile/${image.mobile}" alt="">
        <img class="desktop-only" src="../assets/project-images-desktop/${image.desktop}" alt="">
        <div class="project-body">
          <h2>${repo.name}</h2>
          <p class="project-description">${repo.description ?? "No description yet."}</p>
          <p class="project-stack"><strong>Tech Stack:</strong> ${repo.allLanguages}</p>
          <div class="project-links">
          ${
            repo.homepage
              ? `
            <a href="${repo.homepage}">
                <img src="../assets/link-45deg.svg" alt="">Live Preview
            </a>
            `
              : ""
          }
            <a href="${repo.html_url}">
              <img src="../assets/github.svg" alt="">View Code
            </a>
          </div>
        </div>
      </article>
    </li>
  `;
}

async function loadProjects() {
  const response = await fetch(
    "https://api.github.com/users/Daniel-Ringel/repos?sort=pushed",
  );
  const repos = await response.json();
  const ownRepos = repos.filter((repo) => !repo.fork);

    const reposWithLanguages = await Promise.all(
      ownRepos.map(async (repo) => ({
        ...repo,
        allLanguages: await getLanguages(repo),
      })),
    );

  projectsList.innerHTML = reposWithLanguages.map(createProjectCard).join("");
  projectsStatus.textContent = "";
}

loadProjects();
