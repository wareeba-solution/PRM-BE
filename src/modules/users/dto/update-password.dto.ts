import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message: 'Password too weak - must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }
  )
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}