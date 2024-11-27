import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { CreateNoteDto } from './dto/create-note.dto';
import { FindManyNotesDto } from './dto/find-many-notes.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';

@Controller('notes')
@ApiBearerAuth('JWT')
@UseGuards(AccessTokenGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  create(@Request() req, @Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(
      createNoteDto,
      +req.user['sub'],
      req.user['email'],
    );
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  findAll(@Request() req, @Query() findManyNotesDto: FindManyNotesDto) {
    console.log({ findManyNotesDto });

    return this.notesService.findMany(findManyNotesDto, req.user['sub']);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.update(
      +id,
      updateNoteDto,
      +req.user['sub'],
      req.user['role'],
    );
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.notesService.remove(+id, +req.user['sub'], req.user['role']);
  }
}
