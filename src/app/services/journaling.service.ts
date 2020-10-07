import {Injectable} from '@angular/core';

@Injectable()
export class JournalingService{

    reportError<T>(err,returnedErrorVal:T){
        alert('Unkown Error Occured!');
        return returnedErrorVal;
    }
}