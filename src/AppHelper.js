//HELPER FUNCTIONS
const calculateArray = (row, revert) => {
  let tempRow = [...row];
  if (revert) {
    tempRow = tempRow.reverse();
  }
  row.forEach((e, i) => {
    if (i > 0) {
      let curIndex = i;
      while (true) {
        if (tempRow[curIndex] === tempRow[curIndex - 1]) {
          tempRow[curIndex - 1] = tempRow[curIndex] * 2;
          tempRow[curIndex] = 0;
          curIndex--;
        } else if (tempRow[curIndex - 1] === 0) {
          tempRow[curIndex - 1] = tempRow[curIndex];
          tempRow[curIndex] = 0;
          curIndex--;
        } else {
          break;
        }
      }
    }
  });
  if (revert) {
    return tempRow.reverse();
  }
  return tempRow;
};

const rotateGrid = (grid) => {
  return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
};

const getAllFreeLocation = (grid) => {
  let output = [];
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (grid[rowIndex][cellIndex] === 0) {
        output.push([rowIndex, cellIndex]);
      }
    });
  });
  return output;
};

//EXPORTS

export const genereateGrid = (length, height) => {
  let output = [];
  for (let i = 0; i < height; i++) {
    output.push(new Array(4).fill(0));
  }
  return output;
};

export const moveGrid = (grid, direction) => {
  if (direction === 'ArrowRight') {
    grid.forEach((row, index) => {
      grid[index] = calculateArray(row, true);
    });
  }
  if (direction === 'ArrowLeft') {
    grid.forEach((row, index) => {
      grid[index] = calculateArray(row);
    });
  }
  if (direction === 'ArrowUp') {
    grid = rotateGrid(grid);
    grid.forEach((row, index) => {
      grid[index] = calculateArray(row);
    });
    grid = rotateGrid(grid);
  }
  if (direction === 'ArrowDown') {
    grid = rotateGrid(grid);
    grid.forEach((row, index) => {
      grid[index] = calculateArray(row, true);
    });
    grid = rotateGrid(grid);
  }

  return grid;
};

export const generateNewEntry = (grid) => {
  let r = Math.random();
  let num;
  if (r < 0.9) {
    num = 2;
  } else {
    num = 4;
  }
  let selectionArray = getAllFreeLocation(grid);
  if (selectionArray.length === 0) {
    return false;
  }

  let eP = selectionArray[Math.floor(Math.random() * selectionArray.length)];

  grid[eP[0]][eP[1]] = num;
  return grid;
};

export const getColor = (value) => {
  switch (value) {
    case 2:
      return '#EEE4DA';
    case 4:
      return '#EDE0C8';
    case 8:
      return '#F2B179';
    case 16:
      return '#F59563';
    case 32:
      return '#F67C5F';
    case 64:
      return '#F65E3B';
    case 128:
      return '#EDCF72';
    case 256:
      return '#EDCC61';
    case 512:
      return '#EDC850';
    case 1024:
      return '#EDC53F';
    case 2048:
      return '#EDC22E';
    case 4069:
      return '#3C3A32';
    case 8192:
      return '#3C3A32';
    default:
      return '#CDBFB2';
  }
};
