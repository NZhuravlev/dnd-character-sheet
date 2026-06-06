const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const jsonPath = path.join(rootDir, "data", "character.json");
const modulePath = path.join(rootDir, "data", "character-data.js");

const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const output = `// Generated from character.json for file:// compatibility.\nexport default ${JSON.stringify(data, null, 2)};\n`;

fs.writeFileSync(modulePath, output);
console.log(`Updated ${modulePath}`);

