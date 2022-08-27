import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { MeasurementSet } from './measurementSet';

@Component({
  selector: 'sp-ramp-form-english',
  templateUrl: './ramp-form-english.component.html',
  styleUrls: ['./ramp-form-english.component.css']
})
export class RampFormEnglishComponent implements OnInit {
  @Input () measurements!: MeasurementSet;
  private _flatLengthInches: number = 0;
  private _deckLengthInches: number = 0;
  private _radiusInches: number = 0;
  private _heightInches: number = 0;
  private _flatLengthFeet: number = 0;
  private _deckLengthFeet: number = 0;
  private _radiusFeet: number = 0;
  private _heightFeet: number = 0;
  private canvas: HTMLCanvasElement | undefined;
  private context: CanvasRenderingContext2D | undefined;
  private center: number = 299;
  private bottom: number = 350;
  private vertHeight: number = 0;
  private canvasHeight: number = 400;
  private canvasWidth: number = 600;
  private measurements2: MeasurementSet = {
    height: 80,
    flatLength: 80,
    deckLength: 20,
    radius: 80
  };

  transitionLength: number = 0;
  transitionAngle: number = 0;
  scale: number = 0;
  totalRampLength: number = 0;

  @Output() messageEvent = new EventEmitter<MeasurementSet>();


  get flatLengthInches(): string {
    return this._flatLengthInches.toString();
  }
  set flatLengthInches(value: string) {
    this._flatLengthInches = parseInt(value);
    this.setFlatLength();
  }

  get deckLengthInches(): string {
    return this._deckLengthInches.toString();
  }
  set deckLengthInches(value: string) {
    this._deckLengthInches = parseInt(value);
    this.setDeckLength();
  }

  get radiusInches(): string {
    return this._radiusInches.toString();
  }
  set radiusInches(value: string) {
    this._radiusInches = parseInt(value);
    this.setRadius();
  }

  get heightInches(): string {
    return this._heightInches.toString();
  }
  set heightInches(value: string) {
    this._heightInches = parseInt(value);
    this.setHeight();
  }

  get flatLengthFeet(): string {
    return this._flatLengthFeet.toString();
  }
  set flatLengthFeet(value: string) {
    this._flatLengthFeet = parseInt(value);
    this.setFlatLength();
  }

  get deckLengthFeet(): string {
    return this._deckLengthFeet.toString();
  }
  set deckLengthFeet(value: string) {
    this._deckLengthFeet = parseInt(value);
    this.setDeckLength();
  }

  get radiusFeet(): string {
    return this._radiusFeet.toString();
  }
  set radiusFeet(value: string) {
    this._radiusFeet = parseInt(value);
    this.setRadius();
  }

  get heightFeet(): string {
    return this._heightFeet.toString();
  }
  set heightFeet(value: string) {
    this._heightFeet = parseInt(value);
    this.setHeight();
  }

  setFlatLength(): void {
    this.measurements.flatLength = Math.max(0, this._flatLengthInches + this._flatLengthFeet * 12);
    this._flatLengthFeet = Math.floor(this.measurements.flatLength / 12);
    this._flatLengthInches = this.measurements.flatLength % 12;
    this.sendMeasurements(this.measurements);
  }

  setDeckLength(): void {
    this.measurements.deckLength = Math.max(0, this._deckLengthInches + this._deckLengthFeet * 12);
    this._deckLengthFeet = Math.floor(this.measurements.deckLength / 12);
    this._deckLengthInches = this.measurements.deckLength % 12;
    this.sendMeasurements(this.measurements);
    console.log("Deck: ", this.deckLengthInches);
  }

  setRadius(): void {
    this.measurements.radius = Math.max(0, this._radiusInches + this._radiusFeet * 12);
    this._radiusFeet = Math.floor(this.measurements.radius / 12);
    this._radiusInches = this.measurements.radius % 12;
    this.sendMeasurements(this.measurements);
  }

  setHeight(): void {
    this.measurements.height = Math.max(0, this._heightInches + this._heightFeet * 12);
    this._heightFeet = Math.floor(this.measurements.height / 12);
    this._heightInches = this.measurements.height % 12;
    this.sendMeasurements(this.measurements);
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.measurements);
    this._deckLengthInches = Math.round(this.measurements.deckLength / 2.54);
    this._flatLengthInches = Math.round(this.measurements.flatLength / 2.54);
    this._heightInches = Math.round(this.measurements.height / 2.54);
    this._radiusInches = Math.round(this.measurements.radius / 2.54);

    this.setDeckLength();
    this.setFlatLength();
    this.setHeight();
    this.setRadius();

    this.canvas = document.getElementById('canvas') as
  HTMLCanvasElement;
  // TODO: Error handling
    this.context = this.canvas.getContext("2d")!;
    this.context.lineWidth = 2;
    this.sendMeasurements(this.measurements);
  }

  sendMeasurements(measurements: MeasurementSet): void {
    this.messageEvent.emit(measurements);
  }

}
