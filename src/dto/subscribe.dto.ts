import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";

export class SubscribeDto {
  @ApiProperty({ example: "user@gmail.com", description: "User email" })
  @IsString({ message: "Email must be a string" })
  @IsEmail({}, { message: "Incorrect email" })
  readonly email: string;
}
