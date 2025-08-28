export const isPastEvent = (dateString) => {
  if (!dateString) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(dateString);
  return eventDate < today;
};
