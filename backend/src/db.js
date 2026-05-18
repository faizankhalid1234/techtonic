import mongoose from "mongoose";

let connecting = false;

export function isDbReady() {
  return mongoose.connection.readyState === 1;
}

export async function connectDb(uri) {
  if (isDbReady()) return true;
  if (connecting) return false;
  connecting = true;
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log("MongoDB connected");
    return true;
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    console.error(
      "Atlas: whitelist your IP, verify password, or use a standard mongodb:// URI if SRV DNS is blocked.",
    );
    return false;
  } finally {
    connecting = false;
  }
}

export function scheduleDbReconnect(uri) {
  const attempt = async () => {
    if (isDbReady()) return;
    const ok = await connectDb(uri);
    if (!ok) setTimeout(attempt, 8000);
  };
  void attempt();
}
