import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private appService: AppService) {}

  @Get('')
  getHello(): string {
    // return 'Hola Vitae';
    // return new Vitae().saludar();
    return this.appService.getHello();
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
