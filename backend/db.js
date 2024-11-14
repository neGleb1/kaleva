import ytData from './100-yt-trends-FI.json';
import ttData from './tiktok.json';

import {insert} from './models/channel.js';
// import pg from 'pg';

// const { Pool } = pg;
// const pool = new Pool({
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD
// });


const initYtData = async () => {
  
    try {
      for (const { name, email } of data) {
        await pool.query(query, [name, email]);
        console.log(`Inserted or skipped YT channel: ${name}`);
      }
    } catch (error) {
      console.error('Error inserting initial data:', error);
    }
}

const initTikTokData = async () => {
  
    try {
      for (const { name, email } of data) {
        const query = `
          INSERT INTO users (name, email)
          VALUES ($1, $2)
          ON CONFLICT (email) DO NOTHING;
        `;
        await pool.query(query, [name, email]);
        console.log(`Inserted or skipped TikTok channel: ${name}`);
      }
    } catch (error) {
      console.error('Error inserting initial data:', error);
    }
}
  
export {
    initYtData,
    initTikTokData
}