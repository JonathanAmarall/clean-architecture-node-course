import { Collection, MongoClient } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient,
  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL);
  },

  async disconnect(): Promise<void> {
    await this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  map: <T>(data: any): T => {
    const { _id, ...dataWithId } = data;
    return Object.assign({}, dataWithId, { id: _id });
  },
};
