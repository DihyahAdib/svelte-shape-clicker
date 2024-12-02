
export const QUOTA = [50, 500, 10000, 300000];
  
export const SHAPES = {
  SQUARE: "SQUARE",
  PENTAGON: "PENTAGON",
  HEXAGON: "HEXAGON",
  HEPTAGON: "HEPTAGON",
  OCTAGON: "OCTAGON",
  NONAGON: "MEMO_MODE",
  DECAGON: "BTN_MODE",
};
  
export class GameState {
  data: {
    level: number;
    startingShape: string;
    shapesPerClicks: number;
    shapesClicked: number;
    achievements: any[];
    multiplier: number;
  };
  constructor() {
    this.data = {
      level: 0,
      startingShape: SHAPES.SQUARE,
      shapesPerClicks: 1,
      shapesClicked: 0,
      achievements: [],
      multiplier: 1.0,
    };
    this.load(this.data);
  }

  load(fallback: any) {
    this.data = JSON.parse(localStorage.getItem("currentState") || "null") ||  fallback;
    return this;
  }

  save() {
    localStorage.setItem("currentState", JSON.stringify(this.data));
    return this;
  }

  reset() {
    localStorage.removeItem("currentState");
    this.data = {
      level: 0,
      startingShape: SHAPES.SQUARE,
      shapesPerClicks: 1,
      shapesClicked: 0,
      achievements: [],
      multiplier: 1.0,
    };
    
    console.log("Starting State has been reset.");
    return this;
  }

  click() {
    this.data.shapesClicked++;
    this.save();
  }

  multiply() {
    this.data.shapesClicked *= this.data.multiplier;
    this.save();
  }

  trackLevel() {
    for (let i = this.data.level; i < QUOTA.length; i++) {
      if (this.data.shapesClicked >= QUOTA[i]) {
        this.data.level++;
        this.data.multiplier *= (i + 1.0) * 2.5;
        this.save();
      } else {
        break;
      }
    }
    return this;
  }
}
  