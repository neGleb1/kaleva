import React from 'react';

export default function ChannelCard({ data }){

    return (
        <div className='movie-card'>
            <h3>{data.title}</h3>
            <p>{data.theater}</p>
            <p>{data.showStart}</p>
            <p>{data.lengthInMinutes} mins</p>
        </div>
    )
}