import mongoose from "mongoose";

const roomDb = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    roomtype: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const room = mongoose.model("Room", roomDb);

export default room;
