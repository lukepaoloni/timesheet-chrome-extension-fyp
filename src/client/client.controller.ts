import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';
import { Client } from '@client/client.model';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('Clients')
@Controller('api/rest/clients')
export class ClientController {
    constructor(private clientService: ClientService) {}

    @Get()
    async getAll() {
        return await this.clientService.getAll<Client>();
    }

    @Post('many')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async createMultiple(@Body() body: any) {
        let errors = [];
        let successes = [];
        for (const data of body) {
            try {
                const clientExists = await this.clientService.doesClientExist(data);
                if (!clientExists) {
                    const client = await this.clientService.create(data);
                    const save = await client.save();
                    const newClient = await save.get();
                    successes.push({
                        success: true,
                        message: `You've successfully created ${newClient.data().label}.`,
                        id: newClient.id,
                    });
                }
                const updatedClient = Object.assign(clientExists, data);
                const id = updatedClient.id;
                delete updatedClient.id;
                await this.clientService.update(id, updatedClient);
                successes.push({
                    success: true,
                    message: `You've successfully updated ${updatedClient.label}`,
                    id,
                });
            } catch (err) {
                if (err) {
                    errors.push(err);
                }
            }
        }
        return {
            errors,
            successes,
        };
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() data: ClientDto) {
        const clientExists = await this.clientService.doesClientExist(data);
        if (!clientExists) {
            const client = await this.clientService.create(data);
            const save = await client.save();
            const newClient = await save.get();
            return {
                success: true,
                message: `You've successfully created a client.`,
                id: newClient.id,
                client: newClient.data(),
            };
        }
        const updatedClient = Object.assign(clientExists, data);
        const id = updatedClient.id;
        delete updatedClient.id;
        await this.clientService.update(id, updatedClient);
        return {
            success: true,
            message: `You've successfully updated ${updatedClient.label}`,
            id,
            client: updatedClient,
        };
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: Partial<ClientDto>) {
        return await this.clientService.update(id, data);
    }

    @Delete(':id')
    async destroy(@Param('id') id: string) {
        return await this.clientService.delete(id);
    }
}
