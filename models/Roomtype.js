import mongoose from "mongoose";

const roomtype = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const Roomtype = mongoose.model("RoomType", roomtype);

export default Roomtype;
