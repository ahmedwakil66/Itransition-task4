const getMysqlDate = () => {
  const isoDate = new Date().toISOString();
  const mysqlDate =
    isoDate.split("T")[0] + " " + isoDate.split("T")[1].split(".")[0];
  return mysqlDate;
};

module.exports = {
  getMysqlDate,
};
