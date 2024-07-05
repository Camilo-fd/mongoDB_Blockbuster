Consultas Blockbuster

1. **Contar el número total de copias de DVD disponibles en todos los registros:**
  
      db.movis.aggregate([
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
            _id: "$format.name",
            cantidad: {$sum: "$format.copies"}
          }
        }
      ])
  
2. **Encontrar todos los actores que han ganado premios Oscar:**
  
      db.authors.aggregate([
        {
          $unwind: "$awards"
        },
        {
          $match: {
            "awards.name": "Oscar Award"
          }
        }
      ])
  
3. **Encontrar la cantidad total de premios que ha ganado cada actor:**
  
      db.authors.aggregate([
        { 
          $unwind: "$awards" 
        },
        { 
          $group: {
            _id: "$_id",
            nombre: {$first: "$full_name"},
            total_awards: { $sum: 1 }
          }
        }
      ])
  
4. **Obtener todos los actores nacidos después de 1980:**
  
      db.authors.aggregate([
        {
          $unwind: "$date_of_birth"
        },
        {
          $match: {
            "date_of_birth": {$gt: "1980-12-31"}
          }
        }
      ])
  
5. **Encontrar el actor con más premios:**
  
      db.authors.aggregate([
        { 
          $unwind: "$awards" 
        },
        { 
          $group: {
            _id: "$full_name",
            total_awards: { $sum: 1 }
          }
        },
        {
          $sort: {
            "total_awards": -1
          }
        },
        {
          $limit: 1
        }
      ])
  
6. **Listar todos los géneros de películas distintos:**
  
      db.movis.aggregate([
          { 
            "$unwind": "$genre" 
          },
          { 
            "$group": { 
              "_id": null, 
              "uniqueGenres": { 
                "$addToSet": "$genre" 
              } 
            } 
          },
          { 
            "$project": { 
              "_id": 0, 
              "uniqueGenres": 1 
            } 
          }
      ])
  
7. **Encontrar películas donde el actor con id 1 haya participado:**
  
      db.movis.aggregate([
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
      ])
  
8. **Calcular el valor total de todas las copias de DVD disponibles:**
  
      db.movis.aggregate([
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
      ])
  
9. **Encontrar todas las películas en las que John Doe ha actuado:**
  
      db.movis.aggregate([
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
      ])
  
10. **Encontrar el número total de actores en la base de datos:**
  
      db.authors.aggregate([
         { $count: "total_autors" }
      ])
  
11. **Encontrar la edad promedio de los actores en la base de datos:**
  
      db.authors.aggregate([
              {
                $project: {
                  age: {
                    $subtract: [
                      { $year: new Date() },
                      { $year: { $dateFromString: { dateString: "$date_of_birth" } } }
                    ]
                  }
                }
              },
              {
                $group: {
                  _id: null,
                  promedio_edad: { $avg: "$age" }
                }
              }
      ])
  
12. **Encontrar todos los actores que tienen una cuenta de Instagram:**
  
      db.authors.aggregate([
        {
          $match: {
            "social_media.instagram": { $exists: true, $ne: "" }
          }
        }
      ])
  
13. **Encontrar todas las películas en las que participan actores principales:**
  
      db.movis.aggregate([
        {
          $unwind: "$character"
        },
        {
          $match: {
            "character.rol": "principal"
          }
        }
      ])
  
14. **Encontrar el número total de premios que se han otorgado en todas las películas:**
  
      db.movis.aggregate([
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
      ])
  
15. **Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray:**
  
      db.movis.aggregate([
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
      ])
  
16. **Encontrar todas las películas de ciencia ficción que tengan al actor con id 3:**
  
      db.movis.aggregate([
        {
          $match: {
            $and: [
              {"character.id_actor": 3}, {"genre": "Ciencia Ficción"}
            ]
          }
        }
      ])
  
17. **Encontrar la película con más copias disponibles en formato DVD:**
  
      db.movies.aggregate([
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
      ])
  
18. **Encontrar todos los actores que han ganado premios después de 2015:**
  
      db.actor.aggregate([
        {
          "$unwind": "$awards"
        },
        {
          "$match": {
            "awards.year": { "$gt": 2015 }
          }
        }
      ])
  
19. **Calcular el valor total de todas las copias de Blu-ray disponibles:**
  
      db.movis.aggregate([
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
      ])
  
20. **Encontrar todas las películas en las que el actor con id 2 haya participado:**
  
      db.movis.aggregate([
        { 
          $match: {
              'character.id_actor': 2
            }
        }
      ])