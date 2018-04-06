import {Component, OnInit} from '@angular/core';
import { Persona } from './domain/persona';
import { PersonaService} from './services/personaservice';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [PersonaService]
})
export class AppComponent implements OnInit{
    
    displayDialog: boolean;
    
    persona: Persona = new PrimePersona();
    
    selectedPers: Persona;
    
    newPers: boolean;
    
    personas: Persona[];

    cols: any[];

    selectedColumns : any[];
    
    constructor(private PersService: PersonaService) { }
    
    ngOnInit() {
        this.PersService.getPersSmall().then(personas => this.personas = personas);

        this.cols = [
            { field: 'numEmp', header: 'Nº Empleado' },
            { field: 'centro', header: 'Centro' },
            { field: 'categoria', header: 'Categoría' },
            { field: 'perfil', header: 'Perfil' },
            { field: 'nombre', header: 'Nombre' },
            { field: 'resp', header: 'Responsable' },
            { field: 'dia', header: '01/04/2018' },
            { field: 'dia1', header: '02/04/2018' },
            { field: 'dia2', header: '03/04/2018' },
            { field: 'dia3', header: '04/04/2018' },
            { field: 'dia4', header: '05/04/2018' }
        ];

        this.selectedColumns = this.cols;
    }
    
    showDialogToAdd() {
        this.newPers = true;
        this.persona = new PrimePersona();
        this.displayDialog = true;
    }
    
    save() {
        const personas = [...this.personas];
        if (this.personas) {
            personas.push(this.persona);
        } else {
            personas[this.findSelectedPersIndex()] = this.persona;
        }
        this.personas = personas;
        this.persona = null;
        this.displayDialog = false;
    }
    
    delete() {
        const index = this.findSelectedPersIndex();
        this.personas = this.personas.filter((val, i) => i != index);
        this.persona = null;
        this.displayDialog = false;
    }
    
    onRowSelect(event) {
        this.newPers = false;
        this.persona = this.cloneCar(event.data);
        this.displayDialog = true;
    }
    
    cloneCar(c: Persona): Persona {
        const pers = new PrimePersona();
        for (const prop in c) {
            pers[prop] = c[prop];
        }
        return pers;
    }
    
    findSelectedPersIndex(): number {
        return this.personas.indexOf(this.selectedPers);
    }
}

export class PrimePersona implements Persona {
    
    constructor(public numEmp?, public centro?, public categoria?, public perfil?, public nombre?, public resp?, public dia?, public dia1?, public dia2?, public dia3?, public dia4?) {}
    
}
