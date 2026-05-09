import mongoose, { Document, Schema, model, Types } from 'mongoose'

export interface RaffleDocument extends Document {
  title: string
  campaignId: Types.ObjectId
  winnerLeadId?: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const RaffleSchema = new Schema<RaffleDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: 'Campaign',
      required: true,
      index: true,
    },
    winnerLeadId: {
      type: Schema.Types.ObjectId,
      ref: 'Lead',
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

RaffleSchema.index({ campaignId: 1 })
RaffleSchema.index({ winnerLeadId: 1 })

const RaffleModel = model<RaffleDocument>('Raffle', RaffleSchema)
export default RaffleModel
