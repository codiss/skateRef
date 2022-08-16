import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sp-ramp-builder',
  templateUrl: './ramp-builder.component.html',
  styleUrls: ['./ramp-builder.component.css']
})
export class RampBuilderComponent implements OnInit {
  private _flatLength: number = 80;
  private _deckLength: number = 20;
  private _radius: number = 80;
  private _height: number = 80;
  private canvas: HTMLCanvasElement | undefined;
  private context: CanvasRenderingContext2D | undefined;
  private center: number = 299;
  private bottom: number = 350;
  private vertHeight: number = 0;
  private canvasHeight: number = 400;
  private canvasWidth: number = 600;
  transitionLength: number = 0;
  transitionAngle: number = 0;
  scale: number = 0;
  totalRampLength: number = 0;

  get flatLength(): string {
    return this._flatLength.toString();
  }
  set flatLength(value: string) {
    this._flatLength = Math.max(0,parseInt(value));
    this.drawRamp();
  }

  get deckLength(): string {
    return this._deckLength.toString();
  }
  set deckLength(value: string) {
    this._deckLength = Math.max(0,parseInt(value));
    this.drawRamp();
  }

  get radius(): string {
    return this._radius.toString();
  }
  set radius(value: string) {
    this._radius = Math.max(0,parseInt(value));
    this.drawRamp();
  }

  get height(): string {
    return this._height.toString();
  }
  set height(value: string) {
    this._height = Math.max(0,parseInt(value));
    this.drawRamp();
  }

  constructor() { }

  ngOnInit(): void {

    this.canvas = document.getElementById('canvas') as
  HTMLCanvasElement;
  // TODO: Error handling
    this.context = this.canvas.getContext("2d")!;
    this.context.lineWidth = 2;
    this.drawRamp();
  }

  drawRamp(): void {
    console.log("Deck Length = ", this._deckLength);
    console.log("Flat Length = ", this._flatLength);
    console.log("Radius: ", this._radius);
    console.log("Height: ", this._height);

    // Is it vert or not?
    if (this._radius <= this._height) {
      this.transitionLength = this._radius;
      this.transitionAngle = 0;
    } else {
      // Get length of transition with l=√(r^2 - (r-h)^2)
      this.transitionLength = Math.sqrt(Math.pow(this._radius, 2) - Math.pow(this._radius - this._height, 2));
      this.transitionAngle = Math.acos(this.transitionLength / this._radius);
    }
    this.vertHeight = this._height - this._radius;

    // TODO: Change width to be adaptive, but we'll work with 500/600
    console.log("Tranny length: ", this.transitionLength);
    this.totalRampLength = this._flatLength + (this._deckLength + this.transitionLength) * 2;

    // Set scale based on tall or wide
    if (this.totalRampLength / this._height >= 1.5) {
      this.scale = 500 / this.totalRampLength;
    } else {
      this.scale = 300 / this._height;
    }
    

    
    if(typeof this.context === "object") {
      this.context.clearRect(0, 0, 600, 500);
      
      this.context.beginPath();

      // Both sides
      for(let i = -1; i <= 1; i += 2) {

        // Draw flat bottom
        this.context.beginPath();
        this.context.moveTo(this.center, this.bottom);
        this.context.lineTo(this.center + this._flatLength / 2 * i * this.scale, this.bottom);
        // Checking drawing
        // this.context.moveTo(this.center + this._flatLength / 2 * i * this.scale, this.bottom);
        // this.context.lineTo(this.center + this._flatLength / 2 * i * this.scale, this.bottom + 30);
        // this.context.moveTo(this.center + this._flatLength / 2 * i * this.scale, this.bottom);
        
        // Draw transitions
        // (x, y, radius, sAngle, eAngle, counterclock)
        if (i == -1) {
          // this.context.arc(this.center + this._flatLength * i / 2 * this.scale, (this.bottom - this._height + this.vertHeight) * this.scale, this._radius * this.scale, 0.5 * Math.PI, 1 * Math.PI - this.transitionAngle, false);
          console.log("Scale: ", this.scale);
          this.context.arc(this.center + this._flatLength * i / 2 * this.scale, this.bottom - this._radius * this.scale, this._radius * this.scale, 0.5 * Math.PI, Math.PI - this.transitionAngle, false);

        } else {
          this.context.arc(this.center + this._flatLength * i / 2 * this.scale, this.bottom - this._radius * this.scale, this._radius * this.scale, 0.5 * Math.PI, this.transitionAngle, true);
        }
        this.context.stroke();


        this.context.beginPath();
        // Draw vert
        if(this.vertHeight > 0) {
          this.context.moveTo(this.center + (this.totalRampLength / 2 - this._deckLength) * i * this.scale, this.bottom - this._radius * this.scale);
          this.context.lineTo(this.center + (this.totalRampLength / 2 - this._deckLength) * i * this.scale, this.bottom - (this._radius + this.vertHeight) * this.scale);
        }
        

        // Draw deck
        this.context.moveTo(this.center + (this.totalRampLength / 2 - this._deckLength) * i * this.scale, this.bottom - this._height * this.scale);
        this.context.lineTo(this.center + this.totalRampLength / 2 * i * this.scale, this.bottom - this._height * this.scale);
        //TODO: scale change
        this.context.lineTo(this.center + this.totalRampLength / 2 * i * this.scale, this.bottom + 20 * this.scale);
        this.context.lineTo(this.center, this.bottom + 20 * this.scale);

        
        
        this.context.stroke();
      }
      
      
    }
    

  }

}
