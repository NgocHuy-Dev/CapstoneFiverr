import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({
    description: 'name',
    type: String,
  })
  name: string;



  @ApiProperty({
    description: 'pass_word',
    type: String,
  })
  pass_word: string;

  @ApiProperty({
    description: 'phone',
    type: String,
  })
  phone: string;

  @ApiProperty({
    description: 'birth_day',
    type: String,
  })
  birth_day: string;

  @ApiProperty({
    description: 'gender',
    type: String,
  })
  gender: string;

  @ApiProperty({
    description: 'role',
    type: String,
  })
  role: string;

  @ApiProperty({
    description: 'skill',
    type: String,
  })
  skill: string;

  @ApiProperty({
    description: 'certification',
    type: String,
  })
  certification: string;
}

export class CreateUserDto extends UpdateUserDto {
  @ApiProperty({
    description: 'email',
    type: String,
  })
  email: string;
}