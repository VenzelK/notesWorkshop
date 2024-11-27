import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty()
  @MinLength(2)
  @MaxLength(16)
  name: string;

  @ApiProperty()
  @MinLength(2)
  @MaxLength(1200)
  text: string;

  @ApiProperty()
  tags: string[];
}
