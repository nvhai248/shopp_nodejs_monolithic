const bs58 = require("bs58");

function maskId(id, dbType) {
  // Combine id and dbType into a string
  const combinedString = `${id}-${dbType}`;
  // Convert the combined string to bytes
  const bytes = Buffer.from(combinedString, "utf8");
  // Encode bytes using bs58
  const encoded = bs58.encode(bytes);
  return encoded;
}

function unmaskId(encoded, dbType) {
  // Decode bs58-encoded string
  const decoded = bs58.decode(encoded);
  // Convert bytes to string
  const decodedString = decoded.toString("utf8");
  // Split string to get id and dbType
  const [idString, dbTypeString] = decodedString.split("-");
  // Convert id and dbType back to numbers
  const id = parseInt(idString);
  const parsedDbType = parseInt(dbTypeString);

  // Check if dbType matches the provided dbType
  if (parsedDbType !== dbType) {
    throw new Error("Invalid dbType");
  }

  return id;
}

module.exports = { maskId, unmaskId };
