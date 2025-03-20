export class SignInResponseDto {
    /**
     * The JWT access token to be passed in API requests
     * @example eyJ...
     */
    accessToken: string;

    /**
     * The JWT refresh token to maintain user sessions by requesting new access tokens
     * @example eyJ...
     */
    refreshToken: string;

    /**
     * The JWT ID token that carries the user's information
     * @example eyJ...
     */
    idToken: string;
}
