import { Directive, Input, OnInit, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IConfig } from '../interfaces/config';
import { environment } from 'src/environments/environment';
import { ScreenService } from '../services/screen.service';

type Screen = 'mobile' | 'desktop' | 'tablet';

@Directive({
    selector: '[onlyForScreen]'
})
export class OnlyForScreenDirective implements OnInit, OnDestroy {

    @Input() onlyForScreen: Screen;

    private _config: IConfig;
    private _unsubscribe = new Subject();
    private _width = window.innerWidth;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private screenService: ScreenService
    ) { }

    ngOnInit() {
        this._config = {
            mobile: environment.mobile,
            tablet: environment.tablet,
        };
        this.watchScreenSizeChange();
        this.handleElementShow();
    }

    ngOnDestroy() {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }

    watchScreenSizeChange() {
        this.screenService.widthChanged
            .pipe(takeUntil(this._unsubscribe))
            .subscribe((width) => {
                this._width = width;
                this.handleElementShow();
            });
    }

    handleElementShow() {
        if (!this.onlyForScreen) {
            return;
        }
        const width = this._width;
        const config = this._config;

        this.viewContainer.clear();

        if (width < config.mobile && this.onlyForScreen === 'mobile') {
            this.viewContainer.createEmbeddedView(this.templateRef);            
        } else if (width > config.mobile && width < config.tablet && this.onlyForScreen === 'tablet') {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else if (width > config.tablet && this.onlyForScreen === 'desktop') {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}
