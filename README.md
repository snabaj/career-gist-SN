# <span style="color:#FF6F61;">CareerGist</span>

![JSearch API](https://img.shields.io/badge/JSearch-API-blue.svg)
![OpenAI API](https://img.shields.io/badge/OpenAI-API-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-blue.svg)
![React Router](https://img.shields.io/badge/React_Router-6.14.1-blue.svg)
![React Query](https://img.shields.io/badge/React_Query-3.39.3-blue.svg)
![React_Router_Dom](https://img.shields.io/badge/React_Router_Dom-6.14.1-blue.svg)
![Express.js](https://img.shields.io/badge/Express.js-4.18.2-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.2-blue.svg)
![Redis](https://img.shields.io/badge/Redis-4.6.7-blue.svg)
![Sequelize](https://img.shields.io/badge/Sequelize-6.32.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6.0.11-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-22.11.0-blue.svg)

![Build_Status](https://cdn.prod.website-files.com/5e0f1144930a8bc8aace526c/65dd9eb5aaca434fac4f1c7c_Build-Passing-brightgreen.svg)
[![Deps](https://cdn.prod.website-files.com/5e0f1144930a8bc8aace526c/65dd9eb5aaca434fac4f1c9e_Deps-Up--to--date-brightgreen.svg)]()
___

### Table of Contents
<details>
  <summary>Click to expand</summary>

- [CareerGist](#careergist)
    - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [How the System Works](#how-the-system-works)
    - [**1. User Requests a Job Search**](#1-user-requests-a-job-search)
    - [**2. AI-Generated Job Summaries**](#2-ai-generated-job-summaries)
    - [**3. User Preferences \& Saved Jobs**](#3-user-preferences--saved-jobs)
  - [Error Handling](#error-handling)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
      - [1. Install Node.js and npm](#1-install-nodejs-and-npm)
      - [2. Set up PostgreSQL Database](#2-set-up-postgresql-database)
      - [3. Install Redis for Caching](#3-install-redis-for-caching)
    - [Clone the Repository](#clone-the-repository)
    - [Install Dependencies](#install-dependencies)
    - [Set up Environment Variables](#set-up-environment-variables)
    - [Start the Development Server](#start-the-development-server)
  - [Usage](#usage)
    - [Opening the Application](#opening-the-application)
    - [Browsing Pages](#browsing-pages)
    - [Logging in](#logging-in)
    - [Searching for Jobs](#searching-for-jobs)
  - [Supplemental Docs](#supplemental-docs)
  - [ Contributing ](#-contributing-)
    - [**Contributing Workflow:**](#contributing-workflow)
    - [**Contribution Guidelines:**](#contribution-guidelines)
- [🎉 Thank you for contributing to the CareerGist project! 🎉](#-thank-you-for-contributing-to-the-careergist-project-)
  - [Contributors](#contributors)
  - [License](#license)
  - [Contact](#contact)

</details>

---
<strong><span id="career-gist" style="color:coral">CareerGist</span><Strong> is an advanced job board aggregator designed to streamline the job search process by fetching listings from the JSearch API. By integrating artificial intelligence, CareerGist enhances job descriptions, providing users with more concise, readable, and enriched job summaries. Additionally, a robust caching system powered by Redis ensures efficient performance by storing frequently searched job queries and details for quick retrieval.

The backend is built using TypeScript, Express.js, and Sequelize (PostgreSQL ORM), ensuring type safety, a structured API, and a well-optimized relational database. The use of Express.js allows for the creation of a scalable RESTful API, while Sequelize provides seamless interaction with PostgreSQL for managing job postings, user data, and other essential information.

The frontend leverages React.js, a highly responsive framework that offers a dynamic and intuitive user experience. By utilizing React’s component-based architecture, CareerGist ensures that users can interact with job listings, apply filters, and save their favorite jobs in real-time with minimal latency. The integration of global state management using React Context API enables efficient data flow between components, ensuring an optimal and seamless user experience.

With CareerGist, job-seekers gain access to an AI-assisted, high-performance platform that simplifies job discovery, enhances job descriptions, and improves search efficiency.

<div style="text-align: right;">
  <a href="#top">
    <img src="https://img.shields.io/badge/Back%20to%20Top-%E2%86%91-royalblue" alt="Back to Top">
  </a>
</div>

---

## <span id="features" style="color:#FF6F61;">Features</span>

- **Job Search Aggregation** – Retrieves job listings from **JSearch API** in real time.
- **AI-Powered Summaries** – Uses **OpenAI API** to generate **concise job descriptions** for better readability.
- **Caching with Redis** – Reduces **API calls**, improving response speed and efficiency.
- **User Preferences & Favorites** – Users can **save job postings** and store preferences in **PostgreSQL**.
- **Frontend in React** – Offers a **clean, interactive, and responsive user interface**.
- **Backend in Express.js** – Handles **API requests, caching, and data processing**.
- **Error Handling & Logging** – Middleware ensures a **smooth user experience** and **effective debugging**.
- **Resilient API Design** – If **Redis fails**, cached jobs are **automatically transferred** to **PostgreSQL**.
- **Graceful API Degradation** – If **JSearch API is unavailable**, cached job data remains accessible for **1 hour**.

<div style="text-align: right;">
  <a href="#top">
    <img src="https://img.shields.io/badge/Back%20to%20Top-%E2%86%91-royalblue" alt="Back to Top">
  </a>
</div>

---

## <span id="technologies-used" style="color:#FF6F61;">Technologies Used</span>

<br>&nbsp; <span id="html5"> [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.com/html5)</span>
<br>&nbsp; <span id="css-3">[![CSS 3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3schools.com/css/css_intro.asp)</span>
<br>&nbsp; <span id="node.js">[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)</span>
<br>&nbsp; <span id="typescript">[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)</span>
<br>&nbsp; <span id="react">[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)</span>
<br>&nbsp; <span id="react-router">[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)</span>
<br>&nbsp; <span id="vite">[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vite.dev/)</span>
<br>&nbsp; <span id="npm">[![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com)</span>
<br>&nbsp; <span id="postman">[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com)</span>
<br>&nbsp; <span id="redis">[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io)</span>
<br>&nbsp; <span id="postgresql">[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)</span>
<br>&nbsp; <span id="sequelize">[![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org)</span>
<br>&nbsp; <span id="express.js">[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)</span>
<br>&nbsp; <span id="openai">[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com)</span>
<br>&nbsp; <span id="Render">[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com)</span>

<div style="text-align: right;">
  <a href="#top">
    <img src="https://img.shields.io/badge/Back%20to%20Top-%E2%86%91-royalblue" alt="Back to Top">
  </a>
</div>

### <span id="frontend" style="color:#40E0D0;">Frontend</span>

| Technology       | Purpose |
|------------------|---------|
| **React.js**     | **Main frontend framework** for an interactive UI |
| **Vite**         | A **lightweight build tool** that speeds up development |
| **Tailwind CSS** | Provides a **modern, responsive design** |
| **React Query**  | Manages **data fetching and caching** for API requests |
| **React Router** | Handles **client-side navigation** |
| **Render.com**   | Hosts the **frontend application** |

<div style="text-align: right;">
  <a href="#top">
    <img src="https://img.shields.io/badge/Back%20to%20Top-%E2%86%91-royalblue" alt="Back to Top">
  </a>
</div>

### <span id="backend" style="color:#40E0D0;">Backend</span>

| Technology | Purpose |
|-------------|---------|
| **TypeScript** | Ensures **strong typing** and reliability |
| **Node.js & Express.js** | Backend **server framework** for handling API requests |
| **Redis** | **Caches job searches** for **faster retrieval** |
| **PostgreSQL (via Sequelize ORM)** | Stores **user data, job preferences, and cached jobs** |
| **JSearch API** | Fetches **real-time job listings** from multiple sources |
| **OpenAI API** | **Generates summarized job descriptions** using AI |
| **Render.com** | Hosts the **backend server** |
| **Postman** | Used for **API testing** and debugging |

<div style="text-align: right;">
  <a href="#top">
    <img src="https://img.shields.io/badge/Back%20to%20Top-%E2%86%91-royalblue" alt="Back to Top">
  </a>
</div>

---

## <span id="how-the-system-works" style="color:#FF6F61;">How the System Works</span>

### **1. User Requests a Job Search**
- The **frontend (React)** sends a request to the backend API.
- The backend **checks Redis** for cached job listings.
    - If **cached results exist**, they are returned immediately.
    - If **no cached data is found**, the backend fetches data from **JSearch API**, caches it, and returns the results.

### **2. AI-Generated Job Summaries**
- The backend **sends job descriptions** to the **OpenAI API**.
- The AI **generates concise summaries** of job descriptions.

### **3. User Preferences & Saved Jobs**
- Users **save jobs** to their **favorites list**.
- User preferences and saved jobs are **stored in PostgreSQL** via **Sequelize ORM**.

<div style="text-align: right;">
  <a href="#top">
    <img src="https://img.shields.io/badge/Back%20to%20Top-%E2%86%91-royalblue" alt="Back to Top">
  </a>
</div>

---

## <span id="error-handling" style="color:#FF6F61;">Error Handling</span>

| Error | Possible Cause | Solution |
|-------|--------------|----------|
| **<span style="color:#FF0000;">500 Internal Server Error</span>** | API key missing or incorrect | Check `.env` file |
| **<span style="color:#FF0000;">502 Bad Gateway</span>** | JSearch API is down | Cached jobs (if available) will still be served |
| **<span style="color:#FF0000;">504 Gateway Timeout</span>** | Redis connection failure | Data is automatically stored in PostgreSQL |
| **<span style="color:#FF0000;">404 Not Found</span>** | Invalid job ID | Ensure job exists before requesting |

<div style="text-align: right;">
  <a href="#top">
    <img src="https://img.shields.io/badge/Back%20to%20Top-%E2%86%91-royalblue" alt="Back to Top">
  </a>
</div>

---

## <span id="installation" style="color:#FF6F61;">Installation</span>

### <span style="color:#FF6F61;">Prerequisites</span>

Before setting up the career-gist project, ensure you have the following dependencies installed:

#### 1. Install Node.js and npm
- Download and install the latest **[Node.js](https://nodejs.org/en/)** (which includes npm) from the official site.
- Verify installation:
  ```sh
  node -v
  npm -v
  ```

#### 2. Set up PostgreSQL Database
- Install **PostgreSQL** from the official [PostgreSQL site](https://www.postgresql.org/download/).
- Ensure the PostgreSQL service is running:
  ```sh
  psql --version
  ```
- Create a database for the project:
  ```sh
  createdb career_serach
  ```

#### 3. Install Redis for Caching
- Install Redis via Homebrew (Mac):
  ```sh
  brew install redis
  ```
- Install Redis for Windows:
  - Download the latest version from the [Redis website](https://redis.io/download).
  - Follow the installation instructions.


- Start Redis:
  ```sh
  redis-server
  ```
- Verify Redis is running:
  ```sh
  redis-cli ping
  ```
- You should see the response `PONG`.

Once these dependencies are installed, proceed to clone and set up the project.

<div style="text-align: right;">
  <a href="#top">
    <img src="https://img.shields.io/badge/Back%20to%20Top-%E2%86%91-royalblue" alt="Back to Top">
  </a>
</div>

___

### <span id="clone-the-repository" style="color:#40E0D0;">Clone the Repository</span>
```sh
git clone https://github.com/nathangreen1632/career-gist.git
cd career-gist
```

### <span id="install-dependencies" style="color:#40E0D0;">Install Dependencies</span>
```sh
npm install
```

### <span id="set-up-environment-variables" style="color:#40E0D0;">Set up Environment Variables</span>
Create a `.env` file and add:
```
DB_NAME=career_search
DB_USER=
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432
PORT=3000
JWT_SECRET_KEY=
REDIS_HOST=
REDIS_PORT=
REDIS_USERNAME=default
REDIS_PASSWORD=
CAREER_GIST_API=OpenAI_API_KEY
CAREER_GIST_URL=OpenAI_API_URL
JSEARCH_API_URL=
RAPIDAPI_HOST=
RAPIDAPI_KEY=
```

### <span id="start-the-development-server" style="color:#40E0D0;">Start the Development Server</span>
```sh
npm run dev
```

<div style="text-align: right;">
  <a href="#top">
    <img src="https://img.shields.io/badge/Back%20to%20Top-%E2%86%91-royalblue" alt="Back to Top">
  </a>
</div>

---

## <span id="usage" style="color:#FF6F61;">Usage</span>

### <span id="opening-the-application" style="color:#40E0D0;">Opening the Application</span>
1. Navigate to `http://localhost:3000`.
2. Ensure backend is running.

### <span id="browsing-pages" style="color:#40E0D0;">Browsing Pages</span>
- Home page shows latest job postings.
- Navigation bar allows filtering jobs.

### <span id="logging-in" style="color:#40E0D0;">Logging in</span>
1. Click `Sign In` on the top right.
2. Enter credentials.

### <span id="searching-for-jobs" style="color:#40E0D0;">Searching for Jobs</span>
1. Use the search bar.
2. Filter results using dropdowns.

<div style="text-align: right;">
  <a href="#top">
    <img src="https://img.shields.io/badge/Back%20to%20Top-%E2%86%91-royalblue" alt="Back to Top">
  </a>
</div>

---
## <span id="supplemental-docs" style="color:#FF6F61;">Supplemental Docs</span>

## <span id="contributing" style="color:lightseagreen;"> Contributing </span>
Contributions to this project are highly encouraged and appreciated. If you want to improve the project or introduce new features, follow the structured workflow below to ensure a smooth collaboration process.

### **<span id="contributing-workflow" style="color:coral;">Contributing Workflow:</span>**
1. **<span style="color:cornflowerblue;"> Fork the Repository </span>**:
   Navigate to the original GitHub repository page and click on the 'Fork' button at the top-right corner. This creates a personal copy of the project under your GitHub account.


2. **<span style="color:cornflowerblue;"> Clone Your Fork </span>**:
   Clone the repository to your local machine using the following command:
    ```bash
    git clone https://github.com/YOUR_USERNAME/career-gist.git
    cd career-gist
    ```

3. **<span style="color:cornflowerblue;"> Create a New Branch </span>**:
   Create a new branch to work on your changes. naming your branch appropriately helps in identifying its purpose.
    ```bash
    git checkout -b feature-branch
    ```

4. **<span style="color:cornflowerblue;"> Make Your Changes </span>**:
   Implement your desired improvements, whether it's fixing bugs, enhancing features, or improving documentation. Ensure you follow the project's coding standards and guidelines.


5. **<span style="color:cornflowerblue;"> Commit Your Changes </span>**:
   Stage and commit your modifications with a meaningful message:
    ```bash
    git add -A
    git commit -m "Add feature: Detailed description of your changes made"
    ```

6. **<span style="color:cornflowerblue;"> Push Your Fork </span>**:
   Push your changes to your forked repository on GitHub:
    ```bash
    git push origin feature-branch
    ```

7. **<span style="color:cornflowerblue;"> Submit a Pull Request </span>**:
   Go to the original repository and click on `Pull Requests`. Click `New Pull Request`, select your feature branch, and provide a comprehensive description of your changes, including the purpose and impact.


8. **<span style="color:cornflowerblue;"> Review and Collaborate </span>**:
   Your pull request will be reviewed by project maintainers to ensure it meets quality standards and aligns with project goals. Constructive feedback will be provided if necessary. Once approved, it will be merged into the main branch.

### **<span id="contribution-guidelines" style="color:coral;">Contribution Guidelines:</span>**
- Ensure your changes are well-tested and do not introduce any breaking changes.
- Follow the project's coding standards and guidelines.
- Make sure your commits are descriptive and provide context.
- Document any new features, changes, or improvements made.
- Keep your branch up to date with the latest changes from the main branch to avoid conflicts.

#  🎉 Thank you for contributing to the CareerGist project! 🎉

<div style="text-align: right;">
  <a href="#top">
    <img src="https://img.shields.io/badge/Back%20to%20Top-%E2%86%91-royalblue" alt="Back to Top">
  </a>
</div>

___
## <span id="contributors" style="color:#FF6F61;">Contributors</span>
<a href="https://github.com/nathangreen1632/career-gist/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nathangreen1632/career-gist" />
</a>

<div style="text-align: right;">
  <a href="#top">
    <img src="https://img.shields.io/badge/Back%20to%20Top-%E2%86%91-royalblue" alt="Back to Top">
  </a>
</div>

---

## <span id="license" style="color:#FF6F61;">License</span>

**Career-Gist is not licensed and therefore falls under Copyright Law as stipulated by the Berne Convention, which grants the author exclusive rights to their work upon creation, without the need for formal registration. Unauthorized use, reproduction, or distribution of this software without explicit permission is prohibited.**

<div style="text-align: right;">
  <a href="#top">
    <img src="https://img.shields.io/badge/Back%20to%20Top-%E2%86%91-royalblue" alt="Back to Top">
  </a>
</div>

---

## <span id="contact" style="color:#FF6F61;">Contact</span>

Reach out to **Nathan Green (Server)**:
- **GitHub**: [@nathangreen1632](https://github.com/nathangreen1632)
- **LinkedIn**: [Nathan Green](https://www.linkedin.com/in/nathangreen1632/)

Reach out to **Stella Nabajja (Database)**:
- **GitHub**: [@snabaj](https://github.com/snabaj)
- **LinkedIn**: [Stella Nabajja]()

Reach out to **Cyrl Casalme (Client)**:
- **GitHub**: [@ccasalme](https://github.com/ccasalme)
- **LinkedIn**: [Cy Casalme]()

<div style="text-align: right;">
  <a href="#top">
    <img src="https://img.shields.io/badge/Back%20to%20Top-%E2%86%91-royalblue" alt="Back to Top">
  </a>
</div>

---

CareerGist enhances job searching using **AI, caching, and a modern UI**, ensuring users get the best experience. 🚀

<div style="text-align: right;">
  <a href="#top">
    <img src="https://img.shields.io/badge/Back%20to%20Top-%E2%86%91-royalblue" alt="Back to Top">
  </a>
</div>
