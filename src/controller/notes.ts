import express from "express";
import noteModel, {
  deleteNoteById,
  findNoteById,
  findTagByLabel,
  tagModel,
} from "../db/notes";
import { v4 as uuidv4 } from "uuid";
export const addNote = async (req: express.Request, res: express.Response) => {
  try {
    const { title, markdown, labels } = req.body;
    console.log(title, markdown, labels);
    if (!title || !markdown || !labels) {
      return res.status(403).json("All fields are Mandatory !");
    }

    console.log(title, markdown, labels);
    const tagsPromises = labels.map(async (label: string) => {
      const exist_tag = await findTagByLabel(label);
      if (!exist_tag) {
        const newTag = new tagModel({
          id: uuidv4(),
          label: label,
        });
        await newTag.save();
        return newTag.id;
      } else {
        return exist_tag.id;
      }
    });
    // this is used as async map returns promises array so we have to use await before mapping it.
    // this is the syntax for getting values out of promises array !
    const tagIds = await Promise.all(tagsPromises);
    console.log(tagIds);
    const note = new noteModel({
      title: title,
      markdown: markdown,
      id: uuidv4(),
      tagIds: tagIds,
    });

    await note.save();
    return res.status(200).json(note).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};

export const listNotes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const notes = await noteModel.find();
    return res.status(200).json(notes).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};

export const updateNote = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { title, markdown, labels } = req.body;
    const note = await findNoteById(id);
    console.log(note);
    if (!note) {
      return res.status(403).json("The Note Doesn't Exist!");
    }

    const tagsPromises = labels?.map(async (label: string) => {
      const tag = await findTagByLabel(label);
      if (!tag) {
        const newTag = new tagModel({
          id: uuidv4(),
          label: label,
        });
        await newTag.save();
        return newTag.id;
      } else {
        return tag.id;
      }
    });
    let tagIds=note.tagIds;
    if (tagsPromises) {
      tagIds = await Promise.all(tagsPromises);
    }
    console.log(tagIds);
    if (title) note.title = title;
    if (markdown) note.markdown = markdown;
    if (tagIds) note.tagIds = tagIds;
    await note.save();
    return res.status(200).json(note).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};

export const deleteNote = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const note = await deleteNoteById(id);
    return res.status(200).json(note).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};
