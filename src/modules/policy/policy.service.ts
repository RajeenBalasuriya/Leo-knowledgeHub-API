import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePolicyDto } from './dto/createPolicy.dto';
import { Policy } from '../../entities/policy.entity';
import { MyGateway } from '../websocket/gateway';

@Injectable()
export class PolicyService {
  constructor(
    @InjectModel(Policy.name) private readonly policyModel: Model<Policy>,
    private readonly websocketGateway:MyGateway
  
  ) {}

  // Create a new policy
  async create(createPolicyDto: CreatePolicyDto): Promise<Policy> {
    const newPolicy = new this.policyModel(createPolicyDto);
    try{
      newPolicy.save();
      this.websocketGateway.broadcastMessage(`new policy has been created ${createPolicyDto.name} with ${createPolicyDto.rules}`);
      return newPolicy;

    }catch(error){

    }
  
  }

  // Get all policies
  async findAll(): Promise<Policy[]> {
    return this.policyModel.find().exec();
  }

  // Get a policy by ID
  async findById(id: string): Promise<Policy> {
    const policy = await this.policyModel.findById(id).exec();
    if (!policy) {
      throw new NotFoundException(`Policy with ID ${id} not found`);
    }
    return policy;
  }

  // Update a policy by ID
  async update(id: string, updatePolicyDto: Partial<CreatePolicyDto>): Promise<Policy> {
    const updatedPolicy = await this.policyModel.findByIdAndUpdate(id, updatePolicyDto, { new: true }).exec();
    if (!updatedPolicy) {
      throw new NotFoundException(`Policy with ID ${id} not found`);
    }
    return updatedPolicy;
  }

  // Delete a policy by ID
  async delete(id: string): Promise<void> {
    const result = await this.policyModel.findByIdAndDelete(id).exec();
    if (result === null) {
      throw new NotFoundException(`Policy with ID ${id} not found`);
    }
  }
}
