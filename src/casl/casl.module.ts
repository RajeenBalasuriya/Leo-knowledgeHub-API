
import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory/casl-ability.factory';
import { PolicyRepository } from 'src/repositories/policy.repository';
import { PolicyModule } from 'src/modules/policy/policy.module';


@Module({
  imports: [PolicyModule],
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
