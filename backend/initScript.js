import ytData from './100-yt-trends-FI.json';
import ttData from './tiktok.json';


const parseYt = async () => {
    try {
        const data = JSON.parse(ytData);
        // data.forEach(v => {

        // });
    } catch (error) {
        console.error(error);
    }
}

const parseTikTok = async () => {
    try {
        const data = JSON.parse(ttData);
        // data.forEach(v => {

        // });
    } catch (error) {
        console.error(error);
    }
}