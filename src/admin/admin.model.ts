import * as mongoose from 'mongoose';
const Schema = mongoose.Schema

export const AdminSchema = new mongoose.Schema({
    name: String,
    email: String,
    hash: String
})

export interface Admin {
    name: String,
    email: String,
    hash: String
}