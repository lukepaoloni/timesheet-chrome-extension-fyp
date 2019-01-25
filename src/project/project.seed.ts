import { Project } from './project.model';
import * as faker from 'faker';
import { EStatus } from '../shared/enum';
import axios from 'axios';

export const generateProject = async (project) => {
    const { data } = await axios.post('http://localhost:4000/api/rest/projects/', project);
    console.log(data);
}

export async function Seed(collection: string = 'projects') {
    const name = `${faker.company.companyName()} ${faker.random.word()}`;
    const client = faker.company.companyName();
    const status = EStatus.Active;

    const project = new Project();
    project.name = name;
    project.client = client;
    project.status = status;
    await generateProject(project);
}