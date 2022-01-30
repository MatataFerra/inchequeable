export const getRandomColor = (cicles: number): string[] => {
  /**
   * When cicles is 0, return an empty array. Number of cicles return number of colors.
   * @param cicles
   * @returns {string[]}
   */

  const colors: string[] = [];

  for (let i = 0; i < cicles; i++) {
    const randomColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255,
    )}, ${Math.floor(Math.random() * 255)}, 0.6)`;

    colors.push(randomColor);
  }

  return colors;
};
