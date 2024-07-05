import { ObjectId } from "mongodb";
import { connect } from "../../helpers/db/connect.js"


export class movies extends connect{
    static instance;
    db
    constructor() {
        super();
        this.db = this.conexion.db(this.getDbName);
        if (typeof movies.instance === 'object') {
            return movies.instance;
        }
        movies.instance = this;
        return this;
    }

    // 1. Contar el número total de copias de DVD disponibles en todos los registros
    async getCountDvd(){
        const collection = this.db.collection('movies');
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
}