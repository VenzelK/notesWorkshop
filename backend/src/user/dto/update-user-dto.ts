import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional()
  refreshToken?: string | null;

  @ApiPropertyOptional()
  emailVerificationCode?: string | null;

  @ApiPropertyOptional()
  emailVerification?: boolean;
}
