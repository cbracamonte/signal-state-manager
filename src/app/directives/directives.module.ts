import { NgModule } from "@angular/core";
import { ValidateFileDirective } from "./validate-file.directive";

@NgModule({
    declarations: [ValidateFileDirective],
    exports: [ValidateFileDirective]
})
export class DirectivesModule { }