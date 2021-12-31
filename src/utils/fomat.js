//格式化当前日期
function formatDate(tome) {
  var myyear = time.getFullYear();
  var mymonth = time.getMonth() + 1;
  var myweekday = time.getDate();
  var myhours = time.getHours();
  var mygetMinutes = time.getMinutes();
  var mygetSeconds = time.getSeconds();

  if (mymonth < 10) {
    mymonth = "0" + mymonth;
  }
  if (myweekday < 10) {
    myweekday = "0" + myweekday;
  }
  if (myhours < 10) {
    myhours = "0" + myhours;
  }
  if (mygetMinutes < 10) {
    mygetMinutes = "0" + mygetMinutes;
  }
  if (mygetSeconds < 10) {
    mygetSeconds = "0" + mygetSeconds;
  }
  return myyear + "-" + mymonth + "-" + myweekday + " " + myhours + ":" + mygetMinutes + ":" + mygetSeconds;
}
formatDate
module.exports = {
  formatDate,
};
