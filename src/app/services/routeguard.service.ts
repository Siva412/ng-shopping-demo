import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '../services/common.service'

@Injectable({ providedIn: 'root' })
export class RouteGuard implements CanActivate {
    constructor(private commonService: CommonService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.commonService.getLoginFlag();
    }
}