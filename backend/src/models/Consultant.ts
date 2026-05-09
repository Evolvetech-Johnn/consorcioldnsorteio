import mongoose, { Document, Schema, model } from 'mongoose'

export interface ConsultantDocument extends Document {
  name: string
  email: string
  phone: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

const ConsultantSchema = new Schema<ConsultantDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

ConsultantSchema.index({ email: 1 }, { unique: true, background: true })

const ConsultantModel = model<ConsultantDocument>('Consultant', ConsultantSchema)
export default ConsultantModel
