import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { DropDownModule } from "nativescript-drop-down/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from './login/login.component';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { RegisterComponent } from './register/register.component';
import { DiscoverComponent } from './discover/discover.component';
import { PostComponent } from './post/post.component';
import { ImageDetailsComponent } from './image-details/image-details.component';
import { CollectionViewModule } from "nativescript-collectionview/angular";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        AppRoutingModule,
        DropDownModule,
        CollectionViewModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DiscoverComponent,
        PostComponent,
        ImageDetailsComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
