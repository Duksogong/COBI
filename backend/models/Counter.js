const mongoose = require('mongoose');

// mongoDB에서 counters 컬렉션에 기본값이 전부 int 0인 document 하나 생성해주어야 함
let CounterSchema = mongoose.Schema({
  id: {
    type: Number,
    default: 0,
  },
  userIdCounter: {
    type: Number,
    default: 0,
  },
  lectureIdCounter: {
    type: Number,
    default: 0,
  },
  contentIdCounter: {
    type: Number,
    default: 0,
  },
});

const Counter = mongoose.model("Counter", CounterSchema);
module.exports = { Counter };