import moongose from 'mongoose';


const schema = moongose.Schema({
    name: String,
    role: String,
    email: {
        type: String,
        unique: true
    },
    orders: [
        {
            type: moongose.SchemaTypes.ObjectId,
            ref: 'orders'
        }
    ]
})

const userModel = moongose.model('users', schema);
export default userModel;