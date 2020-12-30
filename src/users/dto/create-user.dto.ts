import { Length, IsString, IsBoolean, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(4)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(6)
  readonly password: string;

  @IsBoolean()
  readonly is_admin: boolean;
}
