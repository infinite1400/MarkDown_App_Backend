import mongoose from "mongoose";

export type Tag = {
  id: string;
  label: string;
};

export type Notes = {
  id: string;
  title: string;
  markdown: string;
  tagIds: string[];
};

const tagSchema = new mongoose.Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
},{
    timestamps : true
});

const noteSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    markdown: { type: String, required: true },
    title: { type: String, required: true },
    tagIds: [{ type: String, required: false }]
  },
  {
    timestamps: true,
  }
);

export const tagModel=mongoose.model<Tag>("tag", tagSchema)
const noteModel = mongoose.model<Notes>("Notes", noteSchema);
export default noteModel;
