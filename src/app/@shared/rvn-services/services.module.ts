import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
    ],
    exports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [

    ]
})
export class ServicesModule {

    public static forRoot(environment: Environment): ModuleWithProviders<ServicesModule> {
        return {
            ngModule: ServicesModule,
            providers: [
                {
                    provide: 'environment',
                    useValue: environment
                }
            ]
        }
    }
}

export interface Environment {
    restBaseUrl?: string
}
