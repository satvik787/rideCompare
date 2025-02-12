import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { FetchService } from '../service/FetchService';

export const historyResolver: ResolveFn<any> = (route, state) => {
    return inject(FetchService).getUserHistory();
};
