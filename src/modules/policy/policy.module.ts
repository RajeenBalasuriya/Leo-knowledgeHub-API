import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PolicyController } from './policy.controller';
import { PolicyService } from './policy.service';
import { PolicyRepository } from '../../repositories/policy.repository';
import { Policy, PolicySchema } from '../../entities/policy.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Policy.name, schema: PolicySchema }])],
  controllers: [PolicyController],
  providers: [PolicyService, PolicyRepository],
  exports: [PolicyService, PolicyRepository],
  
})
export class PolicyModule {}
