import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        userID: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        type: {type: String, required: true},
        name: {type: String, required: true},
        hex: {type: String, required: true},
        icon: {type: String, required: true},
        sort: {type: Number, default: 1}
    }
);

export default mongoose.model("Category", CategorySchema);
