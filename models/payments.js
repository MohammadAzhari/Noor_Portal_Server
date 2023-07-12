import mongoose from 'mongoose';

const paymentsSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },
    type: {
      type: String,
      enum: ['debit', 'credit'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: { type: String }, // every section will be included
    method: {
      type: String,
      enum: ['visa', 'cash', 'transfer'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payments = mongoose.model('Payments', paymentsSchema);

export default Payments;
