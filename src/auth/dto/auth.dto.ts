export interface AuthDto {
    email: string;
    password: string;
    authType?: 'CUSTOM' | 'GOOGLE';
}
