import { DatabaseService } from '@db/database.service';
import { firestore } from 'firebase';
export declare abstract class AbstractService {
    protected db: DatabaseService;
    protected awaitCollection: Promise<firestore.QuerySnapshot>;
    protected collection: firestore.CollectionReference;
    protected document: firestore.DocumentReference;
    protected data: any;
    protected includeCreatedUpdatedDate: boolean;
    constructor(db: DatabaseService, collection: string);
    getAll<T>(): Promise<T[]>;
    create(data: any): void;
    getData(): Promise<firestore.DocumentData>;
    getOne(id: any): Promise<firestore.DocumentReference>;
    update<T>(id: any, data: Partial<T>): Promise<firestore.DocumentData>;
    delete(id: any): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    }>;
    save(): Promise<firestore.DocumentReference>;
}
