export interface AuthResponse {
    isSuccess: boolean,
    user: UserDetailResponse,
    token: string
}

export interface UserDetailResponse {
    id: number,
    username: string,
    password: string,
    role_id: number
}