import * as dotenv from 'dotenv';

export class ConfigService{

    private readonly envConfig:Record<string,string>;

    constructor() {
        const result = dotenv.config();

        if (result.error) {
            this.envConfig = process.env;
        } else {
            this.envConfig = result.parsed;
        }
    }


    // private method to get env variables from the envConfig 
    private getEnvVar(key:string){
        return this.envConfig[key];
    }

    // from here downwards , you can implement public methods to get env variables using getEnvVar method 
    public async getPortConfig(){
        return this.getEnvVar('PORT');
    }

    public async getMongoConfig(){
        return {
            uri: `mongodb+srv://${this.getEnvVar('MONGO_USER')}:${this.getEnvVar('MONGO_PASSWORD')}@${this.getEnvVar('MONGO_HOST')}/${this.getEnvVar('MONGO_DATABASE')}?retryWrites=true&w=majority`,
        };
    }
}