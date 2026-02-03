import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb://rajasiddharthrajasiddharth_db_user:rajasiddharth2006@" +
  "cluster0-shard-00-00.jajcrhl.mongodb.net:27017," +
  "cluster0-shard-00-01.jajcrhl.mongodb.net:27017," +
  "cluster0-shard-00-02.jajcrhl.mongodb.net:27017/" +
  "admin?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin&retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Pinged your deployment. MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  } finally {
    await client.close();
  }
}

run();
