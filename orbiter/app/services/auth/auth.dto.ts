export interface RegisterPayloadDTO {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface GetAuthUserResponseDTO {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface LoginPayloadDTO {
  email: string;
  password: string;
}
