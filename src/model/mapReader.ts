/* eslint-disable no-unused-vars */
import * as fs from 'fs';

// eslint-disable-next-line no-shadow
export enum GameItem {
  WALL = '#',
  BOX = 'B',
  BOMB = 'O',
  EMPTY = ' ' // Assuming you want to use a space to represent an empty square
}

class MapReader {
  static readMapFromFile(filePath: string): GameItem[][] {
    try {
      const fileContent: string = fs.readFileSync(filePath, 'utf-8');
      const lines: string[] = fileContent.trim().split('\n');

      const map: GameItem[][] = lines.map((line) => line.trim().split('').map((char) => {
        switch (char) {
          case '#': return GameItem.WALL;
          case 'B': return GameItem.BOX;
          case 'O': return GameItem.BOMB;
          default: return GameItem.EMPTY; // Use EMPTY for unknown characters
        }
      }));

      return map;
    } catch (error) {
      console.error('Error reading map file:', error);
      return [];
    }
  }
}

export { MapReader };
