import * as fs from 'fs';

export enum GameItem {
  WALL = '#',
  BOX = 'B',
  BOMB = 'O'
}

class MapReader {
  static readMapFromFile(filePath: string): GameItem[][] {
    try {
      // Read the contents of the file
      const fileContent: string = fs.readFileSync(filePath, 'utf-8');

      // Split the file content into lines
      const lines: string[] = fileContent.trim().split('\n');

      // Parse each line into an array of game items
      const map: GameItem[][] = lines.map(line => {
        return line.trim().split('').map(char => {
          switch (char) {
            case '#':
              return GameItem.WALL;
            case 'B':
              return GameItem.BOX;
            case 'O':
              return GameItem.BOMB;
            // Add other cases for additional game items if needed
            default:
              return null; // Handle unknown characters
          }
        });
      });

      return map;
    } catch (error) {
      console.error('Error reading map file:', error);
      return [];
    }
  }
}

export { MapReader };
