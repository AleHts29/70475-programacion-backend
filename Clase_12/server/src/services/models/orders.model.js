import moongose from 'mongoose';



const schema = moongose.Schema({
    number: Number,
    business: [
        {
            type: moongose.SchemaTypes.ObjectId,
            ref: 'businesses'
        }
    ],
    user: [
        {
            type: moongose.SchemaTypes.ObjectId,
            ref: 'users'
        }
    ],
    products: [],
    totalPrice: Number
})

const orderModel = moongose.model('orders', schema);
export default orderModel;