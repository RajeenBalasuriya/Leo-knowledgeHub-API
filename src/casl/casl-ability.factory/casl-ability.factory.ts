import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  subject,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Action } from 'src/enums/action.enum';
import { PolicyService } from 'src/modules/policy/policy.service';

//this is only for demo purpose of the CASL authorization
class Course {
  id: number;
  authorId: number;
  title:string;
  content: string;
  courseMaterial:string;
  rating:number

}




let permissionConfig = {
 }

  interface PermissionRule {
    action: Action;
    subject: string;
    fields?: string[];
  }
  
  type Subjects = InferSubjects<typeof Course | typeof User>;
  
  @Injectable()
  export class CaslAbilityFactory {
    constructor(private readonly policyService: PolicyService) {}
  
    async createForUser(user: User) {
      const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
  
      // Fetch the user's policy from the database
      const policy = await this.policyService.findById(user.policy);
  
      if (policy && policy.rules) {
        // Apply the rules from the policy
        policy.rules.forEach((rule: PermissionRule) => {
          console.log(rule +"rule");
          const { action, subject, fields } = rule;
  
          // Check if fields is an array and not empty
          if (Array.isArray(fields) && fields.length > 0) {
            can(action, subject, fields);  // Apply action, subject, and fields permissions if fields are not empty
          } else {
            can(action, subject);  // Apply action and subject permissions if fields are empty or not provided
          }
        });
      }
  
      return build({
        detectSubjectType: (item) =>
          item.constructor as ExtractSubjectType<Subjects>,
      });
    }
  }
  

