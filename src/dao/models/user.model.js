import mongoose from 'mongoose';

class UserModel {
  constructor() {
    const userCollection = 'user';

    const userSchema = new mongoose.Schema({
      first_name: String,
      last_name: String,
      email: {
        type: String,
        unique: true,
      },
      password: String,
      age: Number,
    });

    this.userModel = mongoose.model(userCollection, userSchema);
  }

  getModel() {
    return this.userModel;
  }
}

export default new UserModel();


