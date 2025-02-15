import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _PLATFORM_ID = inject(PLATFORM_ID);
  if(isPlatformBrowser(_PLATFORM_ID)){
    const _Router = inject(Router);
    if(sessionStorage.getItem('token')){
      return true;
    }
    else{
      _Router.navigate(['/auth/login']);
      return false;
    }
  }
  else {  //Server
    return true;
  }
};
