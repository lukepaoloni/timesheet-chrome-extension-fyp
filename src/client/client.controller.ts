import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';

@ApiUseTags('Clients')
@Controller('api/rest/clients')
export class ClientController {
    constructor(private clientService: ClientService) { }

    @Get()
    async getAll() {
        return await this.clientService.getAll();
    }

    @Post()
    async create(@Body() data: ClientDto) {
        const client = await this.clientService.create(data);
        const save = await client.save();
        const newClient = await save.get();
        return newClient.data();
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
