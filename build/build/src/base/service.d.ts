import { DatabaseService } from '@db/database.service';
import { firestore } from 'firebase';
export declare abstract class AbstractService {
    protected db: DatabaseService;
    protected awaitCollection: Promise<firestore.QuerySnapshot>;
    protected collection: firestore.CollectionReference;
    protected document: firestore.DocumentReference;
    protected data: any;
    constructor(db: DatabaseService, collection: string);
    getAll(): Promise<any[]>;
    create(data: any): void;
    getData(): Promise<firestore.DocumentData>;
    getOne(id: any): Promise<firestore.DocumentReference>;
    update(id: any, data: Partial<any>): Promise<void>;
    delete(id: any): Promise<void>;
    save(): Promise<firestore.DocumentReference>;
}
