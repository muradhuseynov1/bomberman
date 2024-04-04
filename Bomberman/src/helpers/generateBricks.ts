export const generateBricks = (gridRows: number, gridColumns: number) => {
  let bricks = new Set();
  for (let row = 2; row < gridRows; row++) {
    for (let col = 2; col < gridColumns; col++) {
      if ((row + col) % 2 === 0 && (row % 3 === 0 || col % 2 === 0)) {
        let key = `${row}-${col}`;
        if (!['2-2', '2-3', '3-2', '8-13', '9-14', '9-13', '2-4', '3-3', '4-2'].includes(key)) {
          bricks.add(key);
        }
      }
    }
  }

  return bricks;
};
