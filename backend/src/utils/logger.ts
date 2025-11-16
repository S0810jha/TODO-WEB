import mongoose, { Schema, Model, Document } from 'mongoose';

interface ILog extends Document {
  level: string;
  message: string;
  error?: string;
  stack?: string;
  timestamp: Date;
  userId?: string;
  endpoint?: string;
  method?: string;
}

const LogSchema = new Schema<ILog>(
  {
    level: { type: String, required: true },
    message: { type: String, required: true },
    error: { type: String },
    stack: { type: String },
    timestamp: { type: Date, default: Date.now },
    userId: { type: String },
    endpoint: { type: String },
    method: { type: String },
  },
  { timestamps: true }
);

export const LogModel: Model<ILog> = mongoose.models.Log || mongoose.model<ILog>('Log', LogSchema);

export const logError = async (
  level: string,
  message: string,
  error?: Error,
  userId?: string,
  endpoint?: string,
  method?: string
): Promise<void> => {
  try {
    await LogModel.create({
      level,
      message,
      error: error?.message,
      stack: error?.stack,
      userId,
      endpoint,
      method,
      timestamp: new Date(),
    });
  } catch (logErr) {
    console.error('Failed to log error to database:', logErr);
  }
};

