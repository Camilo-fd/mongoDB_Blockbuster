import { authors } from "./js/model/authors.js";
import { movies } from "./js/model/movis.js";

// let objMovis = new movies();
// console.log(await objMovis.getCountDvd());

let objAuthors = new authors();
// console.log(await objAuthors.getAllActorsAwards());
// console.log(await objAuthors.getAllCantAwardsActor());
// console.log(await objAuthors.getAllActors1980());
console.log(await objAuthors.getActorWithMostAwards());