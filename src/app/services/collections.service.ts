import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {auth} from 'firebase';
import {rejects} from 'assert';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface INotes {
  id?: string;
  title: string;
  note: string;
  userId?: string;
  key?: string;
  createAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  constructor(
    private afs: AngularFirestore,
    private db: AngularFireDatabase
  ) { }
  async addNotes(note: INotes) {
    return new Promise(async (resolve, reject) => {
      const userIdFirebase = auth().currentUser;
      const uuid = this.afs.createId();
      try {
        const addNotes = await this.db.list(`notes/${userIdFirebase.uid}`).push({id: uuid, title: note.title, note: note.note, userId: userIdFirebase.uid, createAt: note.createAt});
        resolve(addNotes);
      }catch (e) {
        reject(e);
      }
    });
  }

  async getNoteById(note: INotes) {
    return new Promise((resolve, reject) => {
      const userIdFirebase = auth().currentUser;
      this.db.list(`notes/${userIdFirebase.uid}/${note.key}`).snapshotChanges().pipe(
        map((note) => {
          return note.map((n) => n.payload.val());
        })
      ).subscribe(r => resolve(r));
    });
  }
  updateNote(title: string , note: string, key: string) {
    return new Promise(async (resolve, reject) => {
      const userIdFirebase = auth().currentUser;
      try {
        const updateNote = await this.db.list(`notes/${userIdFirebase.uid}`).update( key, {title: title, note: note});
        resolve(updateNote);
      }catch (e) {
        reject(e);
      }
    });
  }
   removeNote(key: string) {
     return new Promise(async (resolve, reject) => {
       const userIdFirebase = auth().currentUser;
       try {
         const removeNote = await this.db.list(`notes/${userIdFirebase.uid}`).remove(key);
         resolve(removeNote);
       }catch (e) {
         reject(e);
       }
     });
   }

   getNotesOfUser(): Observable<any> {
    try {
      const userIdFirebase = auth().currentUser;
      return this.db.list(`notes/${userIdFirebase.uid}`).snapshotChanges().pipe(
        map((notes) => {
          console.log(notes);
          return notes.map((n) => {
            const value = n.payload.val();
            // @ts-ignore
            return  { ...value, key: n.payload.key};
          });
        })
      );
    } catch (e) {
      console.log(e);
    }
  }
}
