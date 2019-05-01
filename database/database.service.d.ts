import firebase from 'firebase';
export declare class DatabaseService {
    firestore: firebase.firestore.Firestore;
    constructor();
    getCollection(collection: string): Promise<firebase.firestore.QuerySnapshot>;
    write(collection: any, data: any): Promise<firebase.firestore.DocumentReference>;
    read(collection: any): Promise<firebase.firestore.QuerySnapshot>;
}
