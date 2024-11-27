import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Roles } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { FindManyNotesDto } from './dto/find-many-notes.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createNoteDto: CreateNoteDto,
    userId: number,
    userEmail: string,
  ) {
    try {
      return await this.prisma.note.create({
        data: {
          userId: userId,
          authorEmail: userEmail,
          ...createNoteDto,
          createdDate: new Date(),
          updatedDate: new Date(),
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Unique constraint violation');
      } else {
        throw new InternalServerErrorException('Internal server error');
      }
    }
  }

  async findMany(findManyNotesDto: FindManyNotesDto, userId: number) {
    try {
      var { page, limit, tags, sortBy } = findManyNotesDto;
      var skip = (page - 1) * limit;

      var where = {};
      var orderBy = {};

      switch (sortBy) {
        case 'createdDate':
          orderBy['createdDate'] = 'asc';
          break;
        case 'title':
          orderBy['name'] = 'asc';
          break;
        case 'author':
          orderBy['userId'] = 'asc';
          break;
        case 'my':
          where['userId'] = userId;
          break;
      }

      if (typeof tags === 'string') {
        tags = [tags];
      }
      if (tags?.length > 0) {
        where['tags'] = { hasEvery: tags };
      }

      var result = await this.prisma.note.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      });

      return { result, limit, page, tags, sortBy };
    } catch (error) {
      console.log(error);

      throw new BadRequestException(error);
    }
  }

  async update(
    noteId: number,
    updateNoteDto: UpdateNoteDto,
    userId: number,
    userRole: Roles,
  ) {
    try {
      const where = { id: noteId };

      if (userRole == 'User') {
        where['userId'] = userId;
      }

      const res = await this.prisma.note.update({
        where,
        data: { ...updateNoteDto, updatedDate: new Date() },
      });

      return res;
    } catch (error) {
      throw new BadRequestException('Failed to update');
    }
  }

  async remove(noteId: number, userId: number, userRole: Roles) {
    try {
      const where = { id: noteId };
      if (userRole == 'User') {
        where['userId'] = userId;
      }

      return await this.prisma.note.delete({ where });
    } catch (error) {
      throw new BadRequestException('Failed to delete');
    }
  }
}
