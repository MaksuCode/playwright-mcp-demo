const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'db.seed.json');
const dst = path.join(__dirname, '..', 'db.json');

fs.copyFileSync(src, dst);
console.log(`Seeded db.json from db.seed.json (${new Date().toISOString()})`);
