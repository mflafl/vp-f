import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';
import { Video } from './video';

@Injectable()
export class VideoService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private apiBase = environment.apiBase;

  constructor(private http: Http) { }

  loadList(): Promise<Video[]> {
    return this.http.get(`${this.apiBase}/video`)
      .toPromise()
      .then(response => response.json() as Video[])
      .catch(this.handleError);
  }

  loadItem(id: number): Promise<Video> {
    const url = `${this.apiBase}/video/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Video)
      .catch(this.handleError);
  }

  deleteItem(id: number): Promise<void> {
    const url = `${this.apiBase}/video/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  createItem(item: Video): Promise<Video> {
    return this.http
      .post(`${this.apiBase}/video/url`, JSON.stringify(item), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  upload(files: any): Promise<Video> {
    // let headers = new Headers({'Content-Type': undefined});
    return this.http
      .post(`${this.apiBase}/video`, files)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
