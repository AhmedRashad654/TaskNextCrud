import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) throw new Error("MONGO_URL is not defined");

const connection: { isConnection?: number } = {};
async function dbConnect() {
  if (connection.isConnection) return;
  try {
    const db = await mongoose.connect(MONGO_URL!);
    connection.isConnection = db.connections[0].readyState;
  } catch (error) {
    console.log("error connection", error);
  }
}
export default dbConnect;
