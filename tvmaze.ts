import axios from "axios";
import * as $ from 'jquery';

const $showsList = $("#showsList");
// const showsList = document.querySelector("#showsList") as HTMLElement
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");
const BASE_URL_API:string = "https://api.tvmaze.com" 
const ALTIMAGE:string = "https://tinyurl.com/tv-missing"
interface ShowInterface {
  id:string;
  name:string;
  summary:string;
  image:string | null;
}



/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term:string): Promise<string>{
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  const resp = await axios.get(`${BASE_URL_API}/search/shows?q=${term}`)
  return resp.data.map((result:{show:ShowInterface}) =>  {
    return {
      id: result.show.id, 
      name: result.show.name,
      summary: result.show.summary,
      image: result.show.image
    } 
  })
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows:ShowInterface[]): void{
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
        `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src=${show.image}
              alt=${ALTIMAGE}
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($show);  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }