export const getDateDifferenceFromNow = (fromDate) => {
  let difference = new Date().getTime() - new Date(fromDate).getTime();

  difference = difference / 1000;

  const daysDifference = Math.floor(difference / 86400);
  difference -= daysDifference * 86400;

  let hourDifference = Math.floor(difference / 3600);
  difference -= hourDifference * 3600;
  let minuteDifference = Math.floor(difference / 60);
  difference -= minuteDifference * 60;

  let message;

  if (daysDifference > 0) {
    message = `${daysDifference} days`;
  }

  if (hourDifference > 0) {
    message = message
      ? `${message} ${hourDifference} hours`
      : `${hourDifference} hours`;
  }

  if (minuteDifference > 0) {
    message = message
      ? `${message} ${minuteDifference} minutes`
      : `${minuteDifference} minutes`;
  }

  //   if (difference) {
  //     message = message
  //       ? `${message} ${Math.round(difference)} seconds`
  //       : `${Math.round(difference)} seconds`;
  //   }

  return message;
};
