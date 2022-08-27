import { Component, OnInit } from '@angular/core';
import { MeasurementSet } from './measurementSet';

@Component({
  selector: 'sp-ramp-builder',
  templateUrl: './ramp-builder.component.html',
  styleUrls: ['./ramp-builder.component.css']
})
export class RampBuilderComponent implements OnInit {
  private canvas: HTMLCanvasElement | undefined;
  private context: CanvasRenderingContext2D | undefined;
  private _units: string = "english";
  measurements: MeasurementSet = {
    height: 80 * 2.54,
    flatLength: 80 * 2.54,
    deckLength: 20 * 2.54,
    radius: 80 * 2.54
  }


  get units():string {
    return this._units;
  }

  set units(value: string) {
    this._units = value;
  }

  ngOnInit(): void {
    this.canvas = document.getElementById('canvas') as
  HTMLCanvasElement;
  // TODO: Error handling
    this.context = this.canvas.getContext("2d")!;

  }
  

  measurementsSet(measurements: MeasurementSet): void {
    this.measurements = measurements;
    let radius: number = measurements.radius;
    let height: number = measurements.height;
    let flatLength: number = measurements.flatLength;
    let deckLength: number = measurements.deckLength;
    let center: number = 299;
    let bottom: number = 350;
    let transitionAngle: number;
    let transitionLength: number;
    let vertHeight: number;
    let totalRampLength: number;
    let scale: number;

    // Is it vert or not?
    if (radius <= height) {
      transitionLength = radius;
      transitionAngle = 0;
    } else {
      // Get length of transition with l=√(r^2 - (r-h)^2)
      transitionLength = Math.sqrt(Math.pow(radius, 2) - Math.pow(radius - height, 2));
      transitionAngle = Math.acos(transitionLength / radius);
    }
    vertHeight = height - radius;

    // TODO: Change width to be adaptive, but we'll work with 500/600
    totalRampLength = flatLength + (deckLength + transitionLength) * 2;

    // Set scale based on tall or wide
    if (totalRampLength / height >= 1.5) {
      scale = 500 / totalRampLength;
    } else {
      scale = 300 / height;
    }
    

    
    if(typeof this.context === "object") {
      
      this.context.clearRect(0, 0, 600, 500);
      this.context.fillStyle = '#87d9de';
      this.context.fillRect(0, 0, 600, 500);
      this.context.fillStyle = '#deb887';
      // Both sides
      for(let i = -1; i <= 1; i += 2) {

        // Draw flat bottom
        this.context.beginPath();
        this.context.moveTo(center, bottom);
        this.context.lineTo(center + flatLength / 2 * i * scale, bottom);
        
        // Draw transitions
        // (x, y, radius, sAngle, eAngle, counterclock)
        if (i == -1) {
          // this.context.arc(this.center + this._flatLength * i / 2 * this.scale, (this.bottom - this._height + this.vertHeight) * this.scale, this._radius * this.scale, 0.5 * Math.PI, 1 * Math.PI - this.transitionAngle, false);
          console.log("Scale: ", scale);
          this.context.arc(center + flatLength * i / 2 * scale, bottom - radius * scale, radius * scale, 0.5 * Math.PI, Math.PI - transitionAngle, false);

        } else {
          this.context.arc(center + flatLength * i / 2 * scale, bottom - radius * scale, radius * scale, 0.5 * Math.PI, transitionAngle, true);
        }
        
        // Draw vert
        if(vertHeight > 0) {
          this.context.lineTo(center + (totalRampLength / 2 - deckLength) * i * scale, bottom - (radius + vertHeight) * scale);
        }
        

        // Draw deck
        this.context.lineTo(center + totalRampLength / 2 * i * scale, bottom - height * scale);
        //TODO: scale change
        this.context.lineTo(center + totalRampLength / 2 * i * scale, bottom + 20);
        this.context.lineTo(center, bottom + 20);

        

        this.context.moveTo(center + totalRampLength / 2 * i * scale, bottom + 30);
        this.context.lineTo(center + totalRampLength / 2 * i * scale, bottom + 50);
        this.context.moveTo(center + totalRampLength / 2 * i * scale, bottom + 40);
        this.context.lineTo(center + (totalRampLength / 2.2) * i * scale, bottom + 40);
        this.context.fill();
        this.context.stroke();

      }

      // Draw dimensions
      let totalString = "";
      if (this._units == "english") {
        let totalInches = Math.ceil(totalRampLength);
        if (totalInches % 12 == 0) {
          totalString = Math.floor(totalInches / 12).toString() + "'";
        } else {
          totalString = Math.floor(totalInches / 12).toString() + "' " + (totalInches % 12).toString() + '"';
        }
      } else {
        let totalCentimeters = Math.ceil(totalRampLength);
        if (totalCentimeters % 100 == 0) {
          totalString = Math.floor(totalCentimeters / 100).toString() + "m";
        } else {
          totalString = Math.floor(totalCentimeters / 100).toString() + "m " + (totalCentimeters % 100).toString() + 'cm';
        }
      }

      this.context.fillStyle = "#000000"
      this.context.font = "18px Arial";
      this.context.textAlign = "center";
      this.context.fillText(totalString, center, bottom + 49); 
      
      
    }
    

  }

}
