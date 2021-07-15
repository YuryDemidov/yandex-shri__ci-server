const axios = require('../../utils/axiosInstance');

module.exports = async () => {
  let allBuilds = [];
  const partAmount = 25;
  let offset = 0;
  let buildsPart;
  do {
    const { data } = await axios.get(`/build/list`, { params: { offset, limit: partAmount } });
    buildsPart = data.data;
    allBuilds = allBuilds.concat(buildsPart);
    offset += partAmount;
  } while (buildsPart.length);
  return allBuilds.filter((build) => build.status === 'Waiting');
};
