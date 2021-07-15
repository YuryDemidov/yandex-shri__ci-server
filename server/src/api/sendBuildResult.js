const dbBuildFinish = require('./db/buildFinish');

module.exports = async (id, duration, status, log) => {
  try {
    await dbBuildFinish(id, duration, status, log);
  } catch (error) {
    console.log(`Sending build ${id} result to database failed`);
  }
};
