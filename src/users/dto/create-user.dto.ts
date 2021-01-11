import {
  Length,
  IsString,
  IsBoolean,
  IsEmail,
  IsOptional,
} from 'class-validator';

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
  @IsOptional()
  readonly is_admin?: boolean;
}
