import { Provider } from '../enum/provider.enum';
export interface JwtPayload {
    id: string;
    email: string;
    provider: Provider;
    thirdPartyId: string;
    iat: number;
    exp: number;
}
