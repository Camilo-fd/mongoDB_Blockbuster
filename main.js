import { authors } from "./js/model/authors.js";
import { movis } from "./js/model/movis.js";

let objMovis = new movis();
console.log("---- CONSULTAS MOVIS ----");
console.log(`1. Contar el número total de copias de DVD disponibles en todos los registros`, await objMovis.getCountDvd());
console.log(`6. Listar todos los géneros de películas distintos`, await objMovis.getAllDistinctGenre());
console.log(`7. Encontrar películas donde el actor con id 1 haya participado`, await objMovis.getAllMoviesActor1());
console.log(`8. Calcular el valor total de todas las copias de DVD disponibles`, await objMovis.getTotalCopiesDvd());
console.log(`9. Encontrar todas las películas en las que John Doe ha actuado`, await objMovis.getAllmovisJohnDoe());
console.log(`13. Encontrar todas las películas en las que participan actores principales`, await objMovis.getAllmovisActorsPrincipal());
console.log(`14. Encontrar el número total de premios que se han otorgado en todas las películas`, await objMovis.getTotalAwardsmovis());
console.log(`15. Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray`, await objMovis.getAllmovisJohnDoeBluRay());
console.log(`16. Encontrar todas las películas de ciencia ficción que tengan al actor con id 3`, await objMovis.getAllmovisScienceFictionIdActor3());
console.log(`17. Encontrar la película con más copias disponibles en formato DVD`, await objMovis.getMovieMaxCopiesDvd());
console.log(`19. Calcular el valor total de todas las copias de Blu-ray disponibles`, await objMovis.getTotalCopiesBluRay());
console.log(`20. Encontrar todas las películas en las que el actor con id 2 haya participado`, await objMovis.getAllmovisActor2());
console.log("---- FIN CONSULTAS MOVIS ----");
objMovis.destructor()

let objAuthors = new authors();
console.log("----CONSULTAS AUTHORS ----");
console.log(`2. Encontrar todos los actores que han ganado premios Oscar`, await objAuthors.getAllActorsAwards());
console.log(`3. Encontrar la cantidad total de premios que ha ganado cada actor`, await objAuthors.getAllCantAwardsActor());
console.log(`4. Obtener todos los actores nacidos después de 1980`, await objAuthors.getAllActors1980());
console.log(`5. Encontrar el actor con más premios`, await objAuthors.getActorWithMostAwards());
console.log(`10. Encontrar el número total de actores en la base de datos`, await objAuthors.getTotalauthors());
console.log(`11. Encontrar la edad promedio de los actores en la base de datos`, await objAuthors.getAverageAgeActors());
console.log(`12. Encontrar todos los actores que tienen una cuenta de Instagram`, await objAuthors.getAllActorsInstagram());
console.log(`18. Encontrar todos los actores que han ganado premios después de 2015`, await objAuthors.getAllActorsAwardsAfter2015());
console.log("---- FIN CONSULTAS AUTHORS ----");
objAuthors.destructor()