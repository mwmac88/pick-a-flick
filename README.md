[![Netlify Status](https://api.netlify.com/api/v1/badges/3a958d18-f15a-448f-be36-0b6413ee11eb/deploy-status)](https://app.netlify.com/sites/jolly-spence-e7d8d7/deploys)

<div id="top"></div>

<h3 align="center">Pick-A-Flick</h3>

  <p align="center">
    The simpler way to pick a film
    <br />
    <a href="https://pickaflick.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/mwmac88/pick-a-flick/issues">Report Bug</a>
    ·
    <a href="https://github.com/mwmac88/pick-a-flick/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project was created to gain more familiarity with TypeScript and React (along with hooks).

The aim of this project was to retrieve information from the TMDB API and display to the user with filtering and sorting.

The application consists of an infinite scrolling list of movies and the ability to filter and sort. There is also a random movie selector based on user-defined criteria.


<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

* [React.js](https://reactjs.org/)
* [Create React App](https://github.com/facebook/create-react-app)
* [TailwindCSS](https://tailwindcss.com)
* [Material-UI](https://mui.com)
* [TMDB Api](https://www.themoviedb.org)
* [Axios](https://axios-http.com)
* [reach-router](https://reach.tech/router/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install --global yarn
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/mwmac88/pick-a-flick.git
   ```
3. Install yarn packages
   ```sh
   yarn install
   ```
4. Run the dev experience
   ```sh
   yarn dev
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Things to enjoy

* Infinite scrolling movies
* Filtering by:
    * Genre
    * Rating
    * Year From
* Random movie picker with selection by:
    * Year From
    * Genre
    * Only popular
* Lazy loaded images
* Lazy rendered cards (React Suspense)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Auth
    - [ ] User lists
- [ ] Search
- [ ] UI v2


<p align="right">(<a href="#top">back to top</a>)</p>
