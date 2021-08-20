import mongoose from 'mongoose';

let appSchema = mongoose.Schema;

let ordersSchema = new appSchema(
    {
        date : String,
        order_data : [{tracking_number : String, shelf_number : String}],
        mailbox : String,
        member_id : String,
        pack_counter : Number,
        status : Number,
        payment : Number,
        member_notes : String,
        admin_notes: String

    }
)

export default mongoose.model('orders', ordersSchema)