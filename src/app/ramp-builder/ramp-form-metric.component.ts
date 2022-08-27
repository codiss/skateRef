import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MeasurementSet } from './measurementSet';

@Component({
  selector: 'sp-ramp-form-metric',
  templateUrl: './ramp-form-metric.component.html',
  styleUrls: ['./ramp-form-metric.component.css']
})
export class RampFormMetricComponent implements OnInit {
  @Input () measurements!: MeasurementSet;
  private _flatLengthCentimeters: number = 0;
  private _deckLengthCentimeters: number = 0;
  private _radiusCentimeters: number = 0;
  private _heightCentimeters: number = 0;
  private _flatLengthMeters: number = 0;
  private _deckLengthMeters: number = 0;
  private _radiusMeters: number = 0;
  private _heightMeters: number = 0;
  private canvas: HTMLCanvasElement | undefined;
  private context: CanvasRenderingContext2D | undefined;

  get flatLengthCentimeters(): string {
    return this._flatLengthCentimeters.toString();
  }
  set flatLengthCentimeters(value: string) {
    if (parseInt(value) % 4 == 0) {
      this._flatLengthCentimeters = parseInt(value) - 4;
    }
    this._flatLengthCentimeters = Math.ceil(parseInt(value) / 5) * 5;
    this.setFlatLength();
  }

  get deckLengthCentimeters(): string {
    return this._deckLengthCentimeters.toString();
  }
  set deckLengthCentimeters(value: string) {
    if (parseInt(value) % 4 == 0) {
      this._deckLengthCentimeters = parseInt(value) - 4;
    }
    this._deckLengthCentimeters = Math.ceil(parseInt(value) / 5) * 5;
    this.setDeckLength();
  }

  get radiusCentimeters(): string {
    return this._radiusCentimeters.toString();
  }
  set radiusCentimeters(value: string) {
    if (parseInt(value) % 4 == 0) {
      this._radiusCentimeters = parseInt(value) - 4;
    }
    this._radiusCentimeters = Math.ceil(parseInt(value) / 5) * 5;
    this.setRadius();
  }

  get heightCentimeters(): string {
    return this._heightCentimeters.toString();
  }
  set heightCentimeters(value: string) {
    if (parseInt(value) % 4 == 0) {
      this._heightCentimeters = parseInt(value) - 4;
    }
    this._heightCentimeters = Math.ceil(parseInt(value) / 5) * 5;
    this.setHeight();
  }

  get flatLengthMeters(): string {
    return this._flatLengthMeters.toString();
  }
  set flatLengthMeters(value: string) {
    this._flatLengthMeters = parseInt(value);
    this.setFlatLength();
  }

  get deckLengthMeters(): string {
    return this._deckLengthMeters.toString();
  }
  set deckLengthMeters(value: string) {
    this._deckLengthMeters = parseInt(value);
    this.setDeckLength();
  }

  get radiusMeters(): string {
    return this._radiusMeters.toString();
  }
  set radiusMeters(value: string) {
    this._radiusMeters = parseInt(value);
    this.setRadius();
  }

  get heightMeters(): string {
    return this._heightMeters.toString();
  }
  set heightMeters(value: string) {
    this._heightMeters = parseInt(value);
    this.setHeight();
  }

  setFlatLength(): void {
    this.measurements.flatLength = Math.max(0, this._flatLengthCentimeters + this._flatLengthMeters * 100);
    this._flatLengthMeters = Math.floor(this.measurements.flatLength / 100);
    this._flatLengthCentimeters = this.measurements.flatLength % 100;
    this.sendMeasurements(this.measurements);
  }

  setDeckLength(): void {
    this.measurements.deckLength = Math.max(0, this._deckLengthCentimeters + this._deckLengthMeters * 100);
    this._deckLengthMeters = Math.floor(this.measurements.deckLength / 100);
    this._deckLengthCentimeters = this.measurements.deckLength % 100;
    this.sendMeasurements(this.measurements);
  }

  setRadius(): void {
    this.measurements.radius = Math.max(0, this._radiusCentimeters + this._radiusMeters * 100);
    this._radiusMeters = Math.floor(this.measurements.radius / 100);
    this._radiusCentimeters = this.measurements.radius % 100;
    this.sendMeasurements(this.measurements);
  }

  setHeight(): void {
    this.measurements.height = Math.max(0, this._heightCentimeters + this._heightMeters * 100);
    this._heightMeters = Math.floor(this.measurements.height / 100);
    this._heightCentimeters = this.measurements.height % 100;
    this.sendMeasurements(this.measurements);
  }

  @Output() messageEvent = new EventEmitter<MeasurementSet>();

  constructor() {
   }

  ngOnInit(): void {
    console.log(this.measurements);
    this._deckLengthCentimeters = Math.round(this.measurements.deckLength * 2.54);
    this._flatLengthCentimeters = Math.round(this.measurements.flatLength * 2.54);
    this._heightCentimeters = Math.round(this.measurements.height * 2.54);
    this._radiusCentimeters = Math.round(this.measurements.radius * 2.54);
    this.setDeckLength();
    this.setFlatLength();
    this.setHeight();
    this.setRadius();
    console.log(this.measurements);
  }



  sendMeasurements(measurements: MeasurementSet): void {
    this.messageEvent.emit(measurements);
  }

}
