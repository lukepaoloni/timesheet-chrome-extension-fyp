import { Provider } from '@auth/enum/provider.enum';
export interface JwtPayload {
    id: string;
    email: string;
    provider: Provider;
    thirdPartyId: string;
    iat: number;
    exp: number;
}
