import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Persona } from '../domain/persona';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PersonaService {
    
    constructor(private http: HttpClient) {}
    
    getPersSmall() {
        return this.http.get<any>('assets/data/pers-small.json')
            .toPromise()
            .then(res => <Persona[]> res.data)
            .then(data => data);
    }
}
