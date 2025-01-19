import * as dotenv from 'dotenv';

export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor() {
    const result = dotenv.config();

    if (result.error) {
      this.envConfig = process.env;
    } else {
      this.envConfig = result.parsed;
    }
  }

  // private method to get env variables from the envConfig 
  private getEnvVar(key: string): string {
    return this.envConfig[key];
  }

  // method to get port config
  public getPortConfig(): string {
    return this.getEnvVar('PORT');
  }

  // method to get configurations of mongo server
  public getMongoConfig() {
    return {
      uri: `mongodb+srv://${this.getEnvVar('MONGO_USER')}:${this.getEnvVar('MONGO_PASSWORD')}@${this.getEnvVar('MONGO_HOST')}/${this.getEnvVar('MONGO_DATABASE')}?retryWrites=true&w=majority`,
    };
  }

  // method to get JWT secret
  public getJwtSecret(): string {
    return this.getEnvVar('JWT_Secret');  // Removed async, return the value synchronously
  }
}
