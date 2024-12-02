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
    shapesClicked: number;
    achievements: any[];
    multiplier: number,
    quota: number;
  };
  constructor() {
    this.data = {
      level: 0,
      startingShape: SHAPES.SQUARE,
      shapesClicked: 0,
      achievements: [],
      multiplier: 0.0,
      quota: 15,
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
      shapesClicked: 0,
      achievements: [],
      multiplier: 0.0,
      quota: 15,
    };
    return this;
  }

  click() {
    Math.round(this.data.shapesClicked++);
    
    if (this.data.shapesClicked >= this.data.quota) {
      this.data.quota *= 3;
      this.data.level++;
      this.data.multiplier += 0.5;
      console.log("New Quota:", this.data.quota);
      console.log("REAL multiplier", this.data.multiplier)
    }
    Math.round(this.data.shapesClicked += this.data.multiplier);
    this.save();
    return this;
  }
}
  