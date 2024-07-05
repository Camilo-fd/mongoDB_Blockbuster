import { ObjectId } from "mongodb";
import { connect } from "../../helpers/db/connect.js"


export class movis extends connect{
    static instance;
    db
    constructor() {
        super();
        this.db = this.conexion.db(this.getDbName);
        if (typeof movis.instance === 'object') {
            return movis.instance;
        }
        movis.instance = this;
        return this;
    }

    // 1. Contar el número total de copias de DVD disponibles en todos los registros
    async getCountDvd(){
        const collection = this.db.collection('movis');
        const data = await collection.aggregate([
            {
                $unwind: "$format"
            },
            {
                $match: {
                "format.name": "dvd"
                }
            },
            {
                $group: {
                _id: null,
                totalCopies: {
                    $sum: "$format.copies"
                }
                }
            }
          ]).toArray();
        await this.conexion.close();
        return data;
    }

    // 6. Listar todos los géneros de películas distintos
    async getAllDistinctGenre(){
        const collection = this.db.collection('movis');
        const data = await collection.aggregate(  [
            { 
              $unwind: "$genre" 
            },
            { 
              $group: { 
                _id: null, 
                uniqueGenres: { 
                  $addToSet: "$genre" 
                } 
              } 
            },
            { 
              $project: { 
                _id: 0, 
                uniqueGenres: 1 
              } 
            }
          ]).toArray();
        await this.conexion.close();
        return data;
    }

    // 7. Encontrar películas donde el actor con id 1 haya participado
    async getAllDistinctGenre(){
        const collection = this.db.collection('movis');
        const data = await collection.aggregate([
            {
              $unwind: "$character"
            },
            {
              $match: {
                "character.id_actor": 1
              }
            },
            {
              $project: {
                _id: 0,
                apodo: "$character.apodo",
                id_actor: "$character.id_actor",
                pelicula: "$name"
              }
            }
        ]).toArray();
        await this.conexion.close();
        return data;
    }

    // 8. Calcular el valor total de todas las copias de DVD disponibles
    async getTotalCopiesDvd(){
        const collection = this.db.collection('movis');
        const data = await collection.aggregate([
            {
              $unwind: "$format"
            },
            {
              $match: {
                "format.name": "dvd"
              }
            },
            {
              $group: {
                _id: "$_id",
                total_value: {
                  $sum: {
                    $multiply: ["$format.copies", "$format.value"]
                  }
                },
                copias: {$first: "$format.copies"}
              }
            }
        ]).toArray();
        await this.conexion.close();
        return data;
    }

    // 9. Encontrar todas las películas en las que John Doe ha actuado
    async getAllmovisJohnDoe(){
        const collection = this.db.collection('movis');
        const data = await collection.aggregate([
            {
              $unwind: "$character"
            },
            {
              $match: {
                "character.id_actor": 1
              }
            },
            {
              $project: {
                pelicula: "$name",
                nombre: "$character.apodo"
              }
            }
        ]).toArray();
        await this.conexion.close();
        return data;
    }

    // 13. Encontrar todas las películas en las que participan actores principales
    async getAllmovisActorsPrincipal(){
        const collection = this.db.collection('movis');
        const data = await collection.aggregate([
            {
                $unwind: "$character"
            },
            {
                $match: {
                "character.rol": "principal"
                }
            }
        ]).toArray();
        await this.conexion.close();
        return data;
    }

    // 14. Encontrar el número total de premios que se han otorgado en todas las películas
    async getTotalAwardsmovis(){
        const collection = this.db.collection('movis');
        const data = await collection.aggregate([
            { $unwind: "$character" },
            {
              $lookup: {
                from: "autors",
                localField: "character.id_actor",
                foreignField: "id_actor",
                as: "pelicula_actor"
              }
            },
            { $unwind: "$pelicula_actor" },
            {
              $set: {
                premios: { $size: "$pelicula_actor.awards" }
              }
            },
            {
              $group: {
                _id: "$_id",
                nombre: { $first: "$name" },
                total: { $sum: "$premios" }
              }
            }
        ]).toArray();
        await this.conexion.close();
        return data;
    }

    // 15. Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray
    async getAllmovisJohnDoeBluRay(){
        const collection = this.db.collection('movis');
        const data = await collection.aggregate([
            {
              $unwind: "$character"
            },
            {
              $unwind: "$format"
            },
            {
              $match: {
                $and: [
                  {"character.id_actor": 1}, {"format.name": "Bluray"}
                ]
              }
            }
        ]).toArray();
        await this.conexion.close();
        return data;
    }

    // 16. Encontrar todas las películas de ciencia ficción que tengan al actor con id 3
    async getAllmovisScienceFictionIdActor3(){
        const collection = this.db.collection('movis');
        const data = await collection.aggregate([
            {
              $match: {
                $and: [
                  {"character.id_actor": 3}, {"genre": "Ciencia Ficción"}
                ]
              }
            }
        ]).toArray();
        await this.conexion.close();
        return data;
    }

    // 17. Encontrar la película con más copias disponibles en formato DVD
    async getMovieMaxCopiesDvd(){
        const collection = this.db.collection('movis');
        const data = await collection.aggregate([
            {
              $unwind: "$format"
            },
            {
              $match: {
                "format.name": "dvd"
              }
            },
            {
              $sort: {
                "format.copies": -1
              }
            },
            {
              $limit: 1
            }
        ]).toArray();
        await this.conexion.close();
        return data;
    }

    // 19. Calcular el valor total de todas las copias de Blu-ray disponibles
    async getTotalCopiesBluRay(){
        const collection = this.db.collection('movis');
        const data = await collection.aggregate([
            {
                $unwind: "$format"
            },
            {
                $match: {
                  "format.name":'Bluray'
                }
            },
            {
                $set: {
                  total_valor_copias: {$multiply: ["$format.value","$format.copies"]}
                }
            },
            {
                $group: {
                  _id: null,
                  count: {
                    $sum: "$total_valor_copias"
                    }
                }
            }
        ]).toArray();
        await this.conexion.close();
        return data;
    }

    // 20. Encontrar todas las películas en las que el actor con id 2 haya participado
    async getAllmovisActor2(){
        const collection = this.db.collection('movis');
        const data = await collection.aggregate([
            { 
              $match: {
                  'character.id_actor': 2
                }
            }
        ]).toArray();
        await this.conexion.close();
        return data;
    }
}