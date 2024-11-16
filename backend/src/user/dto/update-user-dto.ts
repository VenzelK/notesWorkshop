import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsJWT, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsJWT()
  refreshToken?: string;

  @ApiPropertyOptional()
  @MaxLength(4)
  @IsString()
  emailCode?: string;
}
