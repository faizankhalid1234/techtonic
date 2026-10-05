import { MongoClient, type Db } from "mongodb";

const globalForMongo = globalThis as unknown as {
  __techtonicMongo?: { client: MongoClient; promise: Promise<MongoClient> };
};

function mongoUri() {
  return process.env.MONGODB_URI?.trim() || "";
}

export function hasMongoUri() {
  return Boolean(mongoUri());
}

export async function getDb(): Promise<Db | null> {
  const uri = mongoUri();
  if (!uri) return null;

  if (!globalForMongo.__techtonicMongo) {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 12_000,
    });
    globalForMongo.__techtonicMongo = {
      client,
      promise: client.connect(),
    };
  }

  try {
    const client = await globalForMongo.__techtonicMongo.promise;
    return client.db();
  } catch (err) {
    console.error("MongoDB connect failed:", err);
    globalForMongo.__techtonicMongo = undefined;
    return null;
  }
}
