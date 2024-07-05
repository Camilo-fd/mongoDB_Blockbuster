import { authors } from "./js/model/authors.js";
import { movies } from "./js/model/movis.js";

let objMovis = new movies();
// console.log(await objMovis.getCountDvd());
// console.log(await objMovis.getAllDistinctGenre());
// console.log(await objMovis.getTotalCopiesDvd());
// console.log(await objMovis.getAllMoviesJohnDoe());
// console.log(await objMovis.getAllMoviesActorsPrincipal());
// console.log(await objMovis.getTotalAwardsMovies());
// console.log(await objMovis.getAllMoviesJohnDoeBluRay());
// console.log(await objMovis.getAllMoviesScienceFictionIdActor3());
console.log(await objMovis.getMovieMaxCopiesDvd());

// let objAuthors = new authors();
// console.log(await objAuthors.getAllActorsAwards());
// console.log(await objAuthors.getAllCantAwardsActor());
// console.log(await objAuthors.getAllActors1980());
// console.log(await objAuthors.getActorWithMostAwards());
// console.log(await objAuthors.getTotalAutors());
// console.log(await objAuthors.getAverageAgeActors());
// console.log(await objAuthors.getAllActorsInstagram());