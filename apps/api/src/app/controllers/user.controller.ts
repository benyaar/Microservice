import {Controller, Post, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../guards/jwt.guard";
import {UserId} from "../guards/user.decorator";

@Controller('user')
export class UserController {

  @UseGuards(JwtAuthGuard)
  @Post('info')
  async info(@UserId() userIdL:string){
    return
  }

}


