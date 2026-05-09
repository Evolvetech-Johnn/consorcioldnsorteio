import mongoose, { Document, Schema, model } from 'mongoose'

export interface AdminDocument extends Document {
  name: string
  email: string
  passwordHash: string
  role: 'owner' | 'admin' | 'consultant'
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

const AdminSchema = new Schema<AdminDocument>(
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
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['owner', 'admin', 'consultant'],
      default: 'consultant',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

AdminSchema.index({ email: 1 }, { unique: true, background: true })

const AdminModel = model<AdminDocument>('Admin', AdminSchema)
export default AdminModel
