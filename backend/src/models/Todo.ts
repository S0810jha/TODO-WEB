import mongoose, { Schema, Model, Document } from 'mongoose';

export interface ITodo extends Document {
  text: string;
  completed: boolean;
  userId: mongoose.Types.ObjectId;
}

const TodoSchema = new Schema<ITodo>(
  {
    text: {
      type: String,
      required: [true, 'Todo text is required'],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const TodoModel: Model<ITodo> = mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);

