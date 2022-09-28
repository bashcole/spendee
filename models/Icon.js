import mongoose from "mongoose";

const IconSchema = new mongoose.Schema(
    {
        filepath: {type: String, required: true}
    }
);

export default mongoose.model("Icon", IconSchema);
