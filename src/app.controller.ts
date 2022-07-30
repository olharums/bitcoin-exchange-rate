import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AppService } from "./app.service";
import { SubscribeDto } from "./dto/subscribe.dto";
import { ValidationPipe } from "./pipes/validation.pipes";

@ApiTags("Rates")
@Controller("/api")
export class AppController {
  constructor(private appService: AppService) {}

  @ApiOperation({ summary: "Get exchange rate" })
  @ApiResponse({ status: 200, type: Number })
  @Get("/rate")
  async getRate() {
    try {
      const res = await this.appService.getRate();
      return res;
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Invalid status value",
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @ApiOperation({ summary: "Subscribe" })
  @ApiResponse({ status: 200, type: String })
  @UsePipes(ValidationPipe)
  @HttpCode(200)
  @Post("/subscribe")
  async subscribe(@Body() dto: SubscribeDto) {
    const response = await this.appService.subscribe(dto);
    if (response?.error === "error") {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: "You are already subscribed",
        },
        HttpStatus.CONFLICT
      );
    }
    return response;
  }

  @ApiOperation({ summary: "Send emails" })
  @HttpCode(200)
  @ApiResponse({ status: 200, type: String })
  @Post("/sendEmails")
  async sendEmails() {
    try {
      const res = await this.appService.sendEmails();
      return res;
    } catch {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Invalid status value",
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
