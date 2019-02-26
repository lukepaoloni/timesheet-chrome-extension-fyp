import * as faker from 'faker';
import { EStatus } from '../shared/enum';
import axios from 'axios';
import { Client } from './client.model';

export const generateClient = async (client) => {
    const { data } = await axios.post('http://localhost:4000/api/rest/clients/', client);
    console.log(data);
}

export async function Seed(collection: string = 'clients') {
    const label = faker.company.companyName();
    const status = EStatus.Active;

    const client = new Client();
    client.label = label;
    client.value = label.toLowerCase().replace(/\W/g, '_')
    client.status = status;
    await generateClient(client);
}