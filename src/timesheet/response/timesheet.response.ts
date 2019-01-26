import { User } from '@user/user.model';
import { Project } from '@project/project.model';
import { Client } from '@client/client.model';
export interface TimesheetRO {
    id: string;
    user: User;
    task: string;
    project?: Project;
    client: Client;
    date: Date;
    duration: number;
}