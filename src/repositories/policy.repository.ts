import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Policy } from '../entities/policy.entity';
import { CreatePolicyDto } from '../modules/policy/dto/createPolicy.dto';

@Injectable()
export class PolicyRepository {
  constructor(
    @InjectModel(Policy.name) private readonly policyModel: Model<Policy>,
  ) {}

  // Create a new policy
  async create(createPolicyDto: CreatePolicyDto): Promise<Policy> {
    const newPolicy = new this.policyModel(createPolicyDto);
    return newPolicy.save();
  }

  // Get all policies
  async findAll(): Promise<Policy[]> {
    return this.policyModel.find().exec();
  }

  // Get a single policy by ID
  async findById(id: string): Promise<Policy> {
    return this.policyModel.findById(id).exec();
  }

  // Update a policy by ID
  async update(id: string, updatePolicyDto: Partial<CreatePolicyDto>): Promise<Policy> {
    return this.policyModel.findByIdAndUpdate(id, updatePolicyDto, { new: true }).exec();
  }

  // Delete a policy by ID
  async delete(id: string): Promise<Policy> {
    return this.policyModel.findByIdAndDelete(id).exec();
  }
}
