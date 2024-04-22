/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-constant-condition */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import { Monster } from './monster';
import { Player } from './player';
import monsterImg from '../assets/smartmonster.png';

interface Point {
    x: number;
    y: number;
}

class SmartMonster extends Monster {
  constructor(id: string, name: string, x: number = 0, y: number = 0) {
    super(id, name, x, y);
  }

  getImg(): string {
    return monsterImg;
  }

  move(bricks: Set<string>, players: Player[]): Monster {
    let newX = this.x;
    let newY = this.y;
    const possibleDirections = [];

    const up = { x: this.x, y: this.y - 1 };
    const right = { x: this.x + 1, y: this.y };
    const down = { x: this.x, y: this.y + 1 };
    const left = { x: this.x - 1, y: this.y };

    if (this.y > 2 && !bricks.has(`${up.y}-${up.x}`) && !(up.x === 1 || up.x === 15)) {
      possibleDirections.push(up);
    }
    if (this.x < 14 && !bricks.has(`${right.y}-${right.x}`) && !(right.y === 1 || right.y === 10)) {
      possibleDirections.push(right);
    }
    if (this.y < 9 && !bricks.has(`${down.y}-${down.x}`) && !(down.x === 1 || down.x === 15)) {
      possibleDirections.push(down);
    }
    if (this.x > 2 && !bricks.has(`${left.y}-${left.x}`) && !(left.y === 1 || left.y === 10)) {
      possibleDirections.push(left);
    }
    if (possibleDirections.length === 4) {
      const randomDirection = possibleDirections[Math.floor(Math.random()
        * possibleDirections.length)];
      newX = randomDirection.x;
      newY = randomDirection.y;
    } else {
      const path = this.findPathToNearestPlayer(players, bricks);
      if (path.length > 1) {
        newX = path[1].x;
        newY = path[1].y;
      } else {
        return new SmartMonster(this.id, this.name, newX, newY);
      }
    }
    return new SmartMonster(this.id, this.name, newX, newY);
  }

  private findPathToNearestPlayer(players: Player[], bricks: Set<string>): Point[] {
    const closestPlayer = players.reduce((closest, player) => {
      const closestDistance = (closest.getX() - this.x) ** 2 + (closest.getY() - this.y) ** 2;
      const playerDistance = (player.getX() - this.x) ** 2 + (player.getY() - this.y) ** 2;
      return playerDistance < closestDistance ? player : closest;
    });
    return this.aStarSearch(
      bricks,
      { x: this.x, y: this.y },
      { x: closestPlayer.getX(), y: closestPlayer.getY() }
    );
  }

  private aStarSearch(bricks: Set<string>, start: Point, goal: Point): Point[] {
    let openSet: Point[] = [start];
    const cameFrom: Map<string, Point> = new Map();

    const gScore: Map<string, number> = new Map();
    gScore.set(`${start.x},${start.y}`, 0);

    const fScore: Map<string, number> = new Map();
    fScore.set(`${start.x},${start.y}`, this.heuristic(start, goal));

    while (openSet.length > 0) {
      const current = openSet.reduce((a, b) => ((fScore.get(`${a.x},${a.y}`) ?? Infinity) < (fScore.get(`${b.x},${b.y}`) ?? Infinity) ? a : b));

      if (current.x === goal.x && current.y === goal.y) {
        return this.reconstructPath(cameFrom, current);
      }

      openSet = openSet.filter((pt) => pt.x !== current.x || pt.y !== current.y);
      for (const neighbor of this.getNeighbors(current, bricks)) {
        const tentativeGScore = (gScore.get(`${current.x},${current.y}`) ?? Infinity) + 1;
        if (tentativeGScore < (gScore.get(`${neighbor.x},${neighbor.y}`) ?? Infinity)) {
          cameFrom.set(`${neighbor.x},${neighbor.y}`, current);
          gScore.set(`${neighbor.x},${neighbor.y}`, tentativeGScore);
          fScore.set(`${neighbor.x},${neighbor.y}`, tentativeGScore + this.heuristic(neighbor, goal));
          if (!openSet.some((pt) => pt.x === neighbor.x && pt.y === neighbor.y)) {
            openSet.push(neighbor);
          }
        }
      }
    }

    return [];
  }

  private getNeighbors(point: Point, bricks: Set<string>): Point[] {
    const neighbors: Point[] = [];
    const directions = [
      [0, 1], // Down
      [1, 0], // Right
      [0, -1], // Up
      [-1, 0] // Left
    ];
    for (const [dx, dy] of directions) {
      const x = point.x + dx;
      const y = point.y + dy;
      const positionKey = `${y}-${x}`;
      if (!bricks.has(positionKey)) {
        neighbors.push({ x, y });
      }
    }
    return neighbors;
  }

  private heuristic(a: Point, b: Point): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  private reconstructPath(cameFrom: Map<string, Point>, current: Point): Point[] {
    const path: Point[] = [current];
    while (true) {
      const next = cameFrom.get(`${current.x},${current.y}`);
      if (!next) break;
      path.unshift(next);
      current = next;
    }
    return path;
  }
}

export { SmartMonster };
