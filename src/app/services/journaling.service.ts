import {Injectable} from '@angular/core';

@Injectable()
export class JournalingService{

    reportError<T>(err,returnedErrorVal:T){
        alert('Unkown Error Occured!');
        return returnedErrorVal;
    }

    toForm(sourceObject:any)
    {
        let formData = new FormData();
        Object.keys(sourceObject).forEach(prop=>{
            formData.append(prop,prop==="imageFile"?sourceObject[prop]:(typeof(sourceObject[prop])).toLowerCase()==="object"?JSON.stringify(sourceObject[prop]):sourceObject[prop]);
        });

        return formData
    }
}