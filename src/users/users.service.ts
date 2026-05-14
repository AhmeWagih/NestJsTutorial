import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      role: 'USER',
    },
    {
      id: 3,
      name: 'Bob Doe',
      email: 'bob.doe@example.com',
      role: 'USER',
    },
  ];

  findAll(role?: 'ADMIN' | 'USER') {
    if (role) {
      const roles = this.users.filter((user) => user.role === role);
      if (roles.length === 0) {
        throw new NotFoundException(`No users found with role: ${role}`);
      }
      return roles;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID: ${id} not found`);
    }
    return user;
  }

  create(user: CreateUserDto) {
    const newUser = {
      id: this.users.length + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updateUser,
        };
      }
      return user;
    });
    return { message: 'User updated successfully', user: this.findOne(id) };
  }

  remove(id: number) {
    const removedUser = this.findOne(id);
    if (!removedUser) {
      throw new NotFoundException(`User with ID: ${id} not found`);
    }
    this.users = this.users.filter((user) => user.id !== id);
    return { message: 'User deleted successfully', status: 200 };
  }
}
