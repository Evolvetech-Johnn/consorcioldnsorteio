import mongoose, { Document, Schema, model, Types } from 'mongoose'

export interface CampaignDocument extends Document {
  title: string
  eventName: string
  active: boolean
  startDate: Date
  endDate: Date
  consultantId: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const CampaignSchema = new Schema<CampaignDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    eventName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    active: {
      type: Boolean,
      default: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    consultantId: {
      type: Schema.Types.ObjectId,
      ref: 'Consultant',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

CampaignSchema.index({ consultantId: 1 })
CampaignSchema.index({ active: 1 })

const CampaignModel = model<CampaignDocument>('Campaign', CampaignSchema)
export default CampaignModel
