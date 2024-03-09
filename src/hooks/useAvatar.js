export const useAvatar = (author) => {
  if (author) {
    const avatarUrl = author?.avatar;
    const firstLetter = author?.firstName[0];
    return { avatarUrl, firstLetter };
  }
};
