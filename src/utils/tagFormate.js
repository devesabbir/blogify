export const stringToTagFormate = (str) => {
  if (str) {
    const strArray = str.split(/\s+/);
    const tags = strArray?.map((tag) => "#" + tag).join(" ");
    return tags;
  }
};
