import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { CreatePolicyDto } from '../policy/dto/createPolicy.dto';

@Controller('policies')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Post()
  async create(@Body() createPolicyDto: CreatePolicyDto) {
    return this.policyService.create(createPolicyDto);
  }

  @Get()
  async findAll() {
    return this.policyService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.policyService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePolicyDto: Partial<CreatePolicyDto>) {
    return this.policyService.update(id, updatePolicyDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.policyService.delete(id);
  }
}
