import room from "../models/Room.js";
import Roomtype from "../models/Roomtype.js";

export async function roomtype(request, response) {
  try {
    const { name } = request.body;
    if (!name) {
      return response.status(400).send({
        message: "Please provide a name",
      });
    }
    const newRoomtype = new Roomtype({
      name,
    });
    const roomType = await newRoomtype.save();
    return response.status(201).send({
      message: "RoomType created successfully", roomType,
    });
  } catch (error) {
    console.log(error);
    return response.status(400).json({ message: error.message });
  }
}

export async function Rooms(request, response) {
  try {
    const { id, name, roomtype, description, price } = request.body;
    if (!id || !name || !roomtype || !description || !price) {
      return response.status(400).json({
        message: "Please complete the fields",
      });
    }
    const existingRoom = await room.findOne({ name: name });
    if (!existingRoom) {
      return response.status(400).json({
        message:
          "invalid room name, please enter a name that matches the room type",
      });
    }
    const newRoom = new room({
      id,
      name,
      roomtype: existingRoom.name,
      description,
      price,
    });
    await newRoom.save();
    response
      .status(201)
      .json({ message: "RoomType created successfully", room: newRoom });
  } catch (error) {
    response.status(400).json({ message: error.message });
    console.log(error);
  }
}

export async function updateRoom(request, response) {
  const { id } = request.params;
  const { name, roomtype, price } = request.body;
  if (!id || !name || !roomtype || !price) {
    return response.status(400).json({
      message: "Please provide all the fields",
    });
  }
  const room = await rooms.findOneAndUpdate(
    { id: id },
    { name, roomtype, price },
    { new: true }
  );
  if (!room) {
    return response.status(404).json({
      message: "Room not found",
    });
  }
  return response.status(200).json(room);
}

export async function getRooms(request, response) {
  try {
    const allRooms = await Roomtype.find();
    return response.status(200).json(allRooms);
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Internal server error",
    });
  }
}
export async function searchRooms(request, response) {
  try {
    let filters = {};
    if (request.query.search) {
      filters.name = { $regex: new RegExp(request.query.search, "i") };
    }
    if (request.query.roomtype) {
      filters.name = { $regex: new RegExp(request.query.roomtype, "i") };
    }
    if (request.query.minprice || request.query.maxprice) {
      filters.price = {};
      if (request.query.minprice) {
        filters.price.$gte = parseInt(request.query.minprice);
      }
      if (request.query.maxprice) {
        filters.price.$lte = parseInt(request.query.maxprice);
      }
    }
    const filteredRooms = await room.find(filters);
    return response.status(200).json(filteredRooms);
  } catch (error) {
    console.log("Error retrieving rooms", error);
    return response.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getRoomById(request, response) {
  try {
    const { id } = request.params.id;
    if (!id) {
      return response.status(400).json({
        message: "Please provide an id",
      });
    }

    const room = await room.findById({ _id: id });
    if (!room) {
      return response.status(404).json({
        message: "Room not found",
      });
    }
    return response.status(200).json(room);
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function deleteRoom(request, response) {
  try {
    const { id } = request.params;
    if (!id) {
      return response.status(400).json({ message: "Please provide an id" });
    }
    const deletedroom = await room.findByIdAndDelete(id);
    response.status(200).json(deletedroom);
  } catch (error) {
    console.log("error finding room", error);
    response.status(400).json({ message: error.message });
  }
}
