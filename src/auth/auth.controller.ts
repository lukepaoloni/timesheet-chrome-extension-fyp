import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';



@Controller('api/rest/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('token')
    async createToken(@Body() data: AuthDto): Promise<any> {
        return await this.authService.createToken(data);
    }
}
