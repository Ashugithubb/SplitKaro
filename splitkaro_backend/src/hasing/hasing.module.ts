import { Module } from '@nestjs/common';
import { HasingService } from './hasing.service';
@Module({
  
  providers: [HasingService],
  exports:[HasingService]
})
export class HasingModule {

}