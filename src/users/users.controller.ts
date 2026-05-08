import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get() // GET /users
  findAll(@Query('role') role?: 'ADMIN' | 'USER') {
    return `This action returns all users ${role ? `with role ${role}` : ''}`;
  }

  @Post() // POST /users
  create(@Body() user: { name: string }) {
    return user;
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return `This action returns a user with id: ${id}`;
  }

  @Patch(':id') // PATCH /users/:id
  update(@Param('id') id: string, @Body() user: { name: string }) {
    return user;
  }

  @Delete(':id') // DELETE /users/:id
  remove(@Param('id') id: string) {
    return `This action removes a user with id: ${id}`;
  }
}
