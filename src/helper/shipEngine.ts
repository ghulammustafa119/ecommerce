import ShipEngine from "shipengine";

if (!process.env.SHIPENGINE_API_KEY) {
  throw new Error("Missing environment variable: SHIPENGINE_API_KEY");
}

export const Shipengine = new ShipEngine({
  apiKey: process.env.SHIPENGINE_API_KEY,
});
