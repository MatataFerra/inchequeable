export const parseDate = (date: number): string | number | Date => {
  const dateParsed = new Date(date).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return dateParsed;
};
