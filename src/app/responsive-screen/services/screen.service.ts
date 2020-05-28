import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class ScreenService {
  public readonly _windowSizeChanged = new BehaviorSubject<number>(window.innerWidth);

  constructor() {
    fromEvent(window, 'resize')
      .pipe(
        map((event: any) => event['currentTarget'].innerWidth)
      )
      .subscribe((windowSize) => {
        this._windowSizeChanged.next(windowSize);
      });
  };

  public get widthChanged() {
    return this._windowSizeChanged.asObservable();
  }
}
