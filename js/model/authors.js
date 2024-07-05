import { ObjectId } from "mongodb";
import { connect } from "../../helpers/db/connect.js"


export class authors extends connect{
    static instance;
    db
    constructor() {
        super();
        this.db = this.conexion.db(this.getDbName);
        if (typeof authors.instance === 'object') {
            return authors.instance;
        }
        authors.instance = this;
        return this;
    }

    // 2. Encontrar todos los actores que han ganado premios Oscar
    async getAllActorsAwards(){
        const collection = this.db.collection('authors');
        const data = await collection.aggregate([
            {
              $unwind: "$awards"
            },
            {
              $match: {
                "awards.name": "Oscar Award"
              }
            }
        ]).toArray();
        await this.conexion.close();
        return data;
    }

    // 3. Encontrar la cantidad total de premios que ha ganado cada actor
    async getAllCantAwardsActor(){
        const collection = this.db.collection('authors');
        const data = await collection.aggregate([
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
        ]).toArray();
        await this.conexion.close();
        return data;
    }

    // 4. Obtener todos los actores nacidos después de 1980
    async getAllActors1980(){
        const collection = this.db.collection('authors');
        const data = await collection.aggregate([
            {
              $unwind: "$date_of_birth"
            },
            {
              $match: {
                "date_of_birth": {$gt: "1980-12-31"}
              }
            }
        ]).toArray();
        await this.conexion.close();
        return data;
    }

    // 5. Encontrar el actor con más premios
    async getActorWithMostAwards(){
        const collection = this.db.collection('authors');
        const data = await collection.aggregate([
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
        ]).toArray();
        await this.conexion.close();
        return data;
    }

    // 10. Encontrar el número total de actores en la base de datos
    async getTotalauthors(){
        const collection = this.db.collection('authors');
        const data = await collection.aggregate([
            {
              $count: "total_authors"
            }
        ]).toArray();
        await this.conexion.close();
        return data;
    }

    // 11. Encontrar la edad promedio de los actores en la base de datos
    async getAverageAgeActors(){
        const collection = this.db.collection('authors');
        const data = await collection.aggregate([
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
        ]).toArray();
        await this.conexion.close();
        return data;
    }

    // 12. Encontrar todos los actores que tienen una cuenta de Instagram
    async getAllActorsInstagram(){
        const collection = this.db.collection('authors');
        const data = await collection.aggregate([
            {
              $match: {
                "social_media.instagram": { $exists: true, $ne: "" }
              }
            }
        ]).toArray();
        await this.conexion.close();
        return data;
    }

    // 18. Encontrar todos los actores que han ganado premios después de 2015
    async getAllActorsAwardsAfter2015(){
        const collection = this.db.collection('authors');
        const data = await collection.aggregate([
            {
              "$unwind": "$awards"
            },
            {
              "$match": {
                "awards.year": { "$gt": 2015 }
              }
            }
        ]).toArray();
        await this.conexion.close();
        return data;
    }
}