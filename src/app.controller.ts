import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private appService: AppService) {}

  @Get('')
  getHello(): string {
    return 'Hola Vitae';
    // return new Vitae().saludar();
    // return this.appService.getHello();
  }

  @Get('/test')
  getTest(): string {
    return 'Hola Test';
  }

  @Get('/param/:id')
  getParam(@Param('id') id: string): string {
    const type = typeof id;
    return `Param: ${id} of type ${type}`;
  }

  @Get('/square/:someParam')
  getSquare(@Param('someParam') someParam: number): string {
    const type = typeof someParam;
    const square = someParam * someParam;
    return `Square of ${someParam} of type ${type} is ${square}`;
  }

  @Get('/square/pipe/:someNumber')
  getSquarePipe(@Param('someNumber', ParseIntPipe) someNumber: number): string {
    const type = typeof someNumber;
    const square = someNumber * someNumber;
    return `Square of ${someNumber} of type ${type} is ${square}`;
  }

  @Get('/multiply/pipe/:oneNumber/:otherNumber')
  getMultiplyPipe(
    @Param('oneNumber', ParseIntPipe) oneNumber: number,
    @Param('otherNumber', ParseIntPipe) otherNumber: number,
  ): string {
    const typeOne = typeof oneNumber;
    const typeOther = typeof otherNumber;
    const multiply = oneNumber * otherNumber;
    // return multiply;
    return `Multiply of ${oneNumber} and ${otherNumber} of type ${typeOne} and ${typeOther} is ${multiply}`;
  }

  @Get('/multiply/query')
  getMultiplyQuery(
    @Query('a', ParseIntPipe) a: number,
    @Query('b', ParseIntPipe) b: number,
  ): string {
    const typeA = typeof a;
    const typeB = typeof b;
    const multiply = a * b;
    return `Multiply of ${a} and ${b} of type ${typeA} and ${typeB} is ${multiply}`;
  }

  @Get('/cube/:base')
  getCube(@Param('base', ParseIntPipe) base: number): number {
    const cube = base * base * base;
    return cube;
  }

  @Get('/squareRoot/:someNumber')
  getSquareRoot(@Param('someNumber', ParseIntPipe) someNumber: number): number {
    if (someNumber < 0) throw new HttpException('Negative number', HttpStatus.BAD_REQUEST);
    const root = Math.sqrt(someNumber);
    return root;
  }

  @Post('course')
  postCourse(@Body() course: unknown): string {
    const courseString = JSON.stringify(course);
    return 'Got course ' + courseString;
  }

  @Post('text')
  postText(@Body() text: string): string {
    const objectString = JSON.stringify(text);
    return 'Got an object !! ' + objectString;
  }
}

// class Vitae {
//   private nombre = 'Vitae';
//   //private numero: number;

//   constructor(private numero: number) {
//     //this.numero = numero;
//     console.log('Constructor Vitae', numero);
//   }

//   saludar() {
//     console.log('Saludando', this.numero);
//     return 'Hola ' + this.nombre;
//   }
//}
