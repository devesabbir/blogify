function formatDate(time) {
  if (time) {
    const date = new Date(time);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    return formatter.format(date);
  }

  return null;
}

export default formatDate;
