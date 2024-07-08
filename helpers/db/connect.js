import { MongoClient } from 'mongodb';

export class connect {
    static instanceConnect;
    user;
    port;
    cluster;
    #host;
    #pass
    #dbName
    // mongodb+srv://camiloandresfrancoduran:1095791057@atlascluster.awgtpav.mongodb.net/
    constructor({host, user, pass, port,cluster, dbName}=
        {
            host: "mongodb+srv://", 
            user: "camiloandresfrancoduran", 
            pass: "1095791057", 
            port: 27017, 
            cluster: "atlascluster.awgtpav.mongodb.net/", 
            dbName: "blockbuster"
        }) {
        if (typeof connect.instanceConnect === 'object') {
            return connect.instanceConnect;
        }
        this.setHost = host;
        this.user = user;
        this.setPass = pass;
        this.port = port;
        this.cluster = cluster;
        this.setDbName = dbName;
        this.#open()
        connect.instanceConnect = this;
        return this;
    }
    set setHost(host){
        this.#host = host;
    }
    set setPass(pass){
        this.#pass = pass;
    }
    set setDbName(dbName){
        this.#dbName = dbName;
    }
    get getDbName(){
        return this.#dbName;
    }
    async #open(){
        // console.log("Entre");
        // mongodb://mongo:PNSmQbwecKrbuFTCqXmYoaqicgEZpFeF@monorail.proxy.rlwy.net:47797/
        let url = `${this.#host}${this.user}:${this.#pass}@${this.cluster}:${this.port}`;
        this.conexion = new MongoClient(url);
        // console.log("Mensaje de la conexion ");
    }
}