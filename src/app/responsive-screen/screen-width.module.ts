import { NgModule } from '@angular/core';

import { OnlyForScreenDirective } from './directives/only-for-screen.directive';
import { ScreenService } from './services/screen.service';

@NgModule({
    declarations: [
        OnlyForScreenDirective
    ],
    providers: [
        ScreenService
    ],
    exports: [
        OnlyForScreenDirective
    ]
})
export class ScreenWidthModule { }
