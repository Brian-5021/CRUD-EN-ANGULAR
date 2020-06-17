import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://loginapp-12522.firebaseio.com';

  constructor(private http: HttpClient) { }


  crearHeroe(heroe: HeroeModel) {
  return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
    map((resp: any) => {
      heroe.id = resp.name;
      return heroe;
    })
  );
  }

  actualizarHeroe( heroe: HeroeModel) {

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroe);
  }

  borrarHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroe( id: any) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }


  getHeores() {
    // return this.http.get(`${this.url}/heroes.json`).pipe(map( resp => this.crearArreglo(resp)));
    return this.http.get(`${this.url}/heroes/.json`).pipe(map( this.crearArreglo)
    );
  }

  // podemos dejarlo .pipe(map( this.crearArreglo); si así queremos


  private crearArreglo(heroesObj: object) {
    const heroes: HeroeModel[] = [];

    console.log(heroesObj);
    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);

      if (heroesObj === null ) { return []; }
    });

    return heroes;
  }

}


