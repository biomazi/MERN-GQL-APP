import mongoose from 'mongoose';

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => console.log('mongoose connected'));

export default mongoose;