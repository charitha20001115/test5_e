using task as db from '../db/schema';

service MyService {
    
    @odata.draft.enabled
    entity stud as projection on db.student;
}