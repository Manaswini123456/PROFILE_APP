import mongoose from "mongoose";
import { Schema } from "mongoose";

export const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
//   createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model.ProductModel || mongoose.model('ProductModel',productSchema)
