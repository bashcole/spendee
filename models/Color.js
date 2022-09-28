import mongoose from "mongoose";

const ColorSchema = new mongoose.Schema(
    {
        hex: {type: String, required: true}
    }
);

export default mongoose.model("Color", ColorSchema);
