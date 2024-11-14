import {pool} from '../index.js';

const selectAll = async () => {
    return await pool.query('select * from channel');
}

const insert = async (channel) => {
    return await pool.query('insert into channel (description) values ($1) returning *', [channel]);
}

const update = async (channel) => {
    return await pool.query('insert into channel (description) values ($1) returning *', [description]);
}

const deleteOne = async (id) => {
    return await pool.query('delete from channel where id = $1', [id]);
}

export {selectAll, insert, update, deleteOne};