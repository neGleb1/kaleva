import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChannelCard from './ChannelCard.jsx';

export default function ChannelList(){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setIsLoading(true);
    //             const response = await axios.get('https://www.finnkino.fi/xml/Schedule/');

    //             setData(response);
    //         } catch (error) {
    //             console.error('Error fetching movies:', error);
    //             setIsError(true);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    if (isLoading) return (<div>Loading ...</div>);
    if (isError) return (<div>Error</div>);

    return (
        <div className='movie-list'>
            {data?.map((data, index) => (
                <ChannelCard key={index} data={data} />
            ))}
        </div>
    );
}