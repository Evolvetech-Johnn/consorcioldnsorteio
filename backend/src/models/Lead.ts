import mongoose, { Document, Schema, model, Types } from 'mongoose'

export interface LeadDocument extends Document {
  fullName: string
  whatsapp: string
  instagram?: string
  email?: string
  consultantId: Types.ObjectId
  campaignId: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const LeadSchema = new Schema<LeadDocument>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    whatsapp: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    instagram: {
      type: String,
      trim: true,
      default: null,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
    },
    consultantId: {
      type: Schema.Types.ObjectId,
      ref: 'Consultant',
      required: true,
      index: true,
    },
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

LeadSchema.index({ consultantId: 1, campaignId: 1 })
LeadSchema.index({ whatsapp: 1 })

const LeadModel = model<LeadDocument>('Lead', LeadSchema)
export default LeadModel
