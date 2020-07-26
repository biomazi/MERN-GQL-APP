import mongoose from '../../server/mongoose';
// import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    username: String,
    firstname: String,
    password: String,
  },
  {
    timestamps: true
  }
);

userSchema.statics.methods = () => {
  const userSchema = `${this.email} ${this.password} ${this.username}`
}

const User = mongoose.model('User', userSchema);

export default User;