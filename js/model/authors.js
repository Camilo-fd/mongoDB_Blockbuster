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
        const collection = this.db.collection('autors');
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
        const collection = this.db.collection('autors');
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
}