import dotenv from 'dotenv';
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../../../..', '.env');

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}