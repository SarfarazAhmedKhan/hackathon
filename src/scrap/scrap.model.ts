import * as mongoose from 'mongoose';
const Schema = mongoose.Schema

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    hash: { type: String, required: true },
    code: Number,
    about: String,
    account_Type: String,
    address: String,
    portfolioImg: [],
    displayName: String,
    approved: Boolean,
    contact: String,
    img: String,
    rating: Number,
    rates: Number,
    avgRating: Number,
    completedOrders: Number,
    reviews: [],
    language: [],
    skills: [],
    description: String,
    token: String,
    equity: [{
        type: Schema.Types.ObjectId,
        ref: 'Reserves',
        require: false
    }],
    countryCode: String
})

export interface User {
    name: string;
    email: string;
    hash: string;
    code: Number;
    rates: Number,
    about: String;
    account_Type: String;
    address: String;
    displayName: String;
    equity: [{
        type: Object
    }]
    portfolioImg: [],
    approved: Boolean;
    contact: String;
    img: String;
    language: [],
    rating: Number;
    avgRating: Number;
    reviews: [],
    completedOrders: Number;
    skills: [],
    token: String;
    description: String,
    countryCode: String
}