import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { DiscoverComponent } from "./discover/discover.component";
import { PostComponent } from "./post/post.component";
import { ImageDetailsComponent } from "./image-details/image-details.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "discover", component: DiscoverComponent },
    { path: "post", component: PostComponent },
    { path: "image/:id", component: ImageDetailsComponent },
];
@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
