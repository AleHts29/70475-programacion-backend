import moongose from 'mongoose';


const schema = new moongose.Schema({
    name: {
        type: String,
        unique: true
    },
    category: String,
    products: []
})

const businessModel = moongose.model('businesses', schema);
export default businessModel;