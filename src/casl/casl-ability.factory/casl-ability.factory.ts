import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Action } from 'src/enums/action.enum';

//this is only for demo purpose of the CASL authorization
class Article {
  id: number;
  isPublished: boolean;
  authorId: number;
}

/*
   This ability factory cant dynamically handle permisions

   THIS SHOULD BE CHANGED ACCORDING TO THE FOLLOWING REQUIREMENT

    Admin should be able to attach a set of rules to the user 
-------------------------------------------------------------------------------
const permissionConfig = {
  policy1: [
    { action: Action.Manage, subject: 'all' },  // admin can manage everything
  ],
  policy2: [
    { action: Action.Read, subject: 'Article' },  // user can read articles
    { action: Action.Read, subject: 'User' },     // user can read user details
  ],
  policy3: [
    { action: Action.Read, subject: 'Article' },  // guests can read articles
  ],
--------------------------------------------------------------------------------

instead of role  make it as policy 1 or custom name 

after user object is passed for createForUser
get user.policyNO(this attribute should be created in user when creating the user by admin)
make permissionConfig to be saved in mongo db in a policy entity which can only managed by admin


BELOW OF THE CODE I HAVE PROVIDED AN EXAMPLE OF THE ABOVE CHANGE WHICH COULD BE USED AS AN EXAMPLE.


  */

type Subjects = InferSubjects<typeof Article | typeof User>;
@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    if (user.role == 'admin') {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

/*
  import { AbilityBuilder, createMongoAbility, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Action } from "src/enums/action.enum";

// Example dynamic permission structure (this could come from a database or a configuration file)
const permissionConfig = {
  admin: [
    { action: Action.Manage, subject: 'all' },  // admin can manage everything
  ],
  user: [
    { action: Action.Read, subject: 'Article' },  // user can read articles
    { action: Action.Read, subject: 'User' },     // user can read user details
  ],
  guest: [
    { action: Action.Read, subject: 'Article' },  // guests can read articles
  ],
};

// Use JSON-like objects for defining the subjects (Article and User)
const Article = {
  id: 'number',
  isPublished: 'boolean',
  authorId: 'number',
};

const User = {
  id: 'number',
  email: 'string',
  role: 'string', // 'admin' or other roles
};

type Subjects = InferSubjects<typeof Article | typeof User>;

@Injectable()
export class CaslAbilityFactory {

  // Create abilities for the given user based on dynamic permissions
  createForUser(user: any) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    // Get the permission list based on the user's role
    const userPermissions = permissionConfig[user.role] || [];

    // Dynamically set permissions based on user role
    userPermissions.forEach(permission => {
      if (permission.action && permission.subject) {
        can(permission.action, permission.subject);  // Allow action on subject
      }
    });

    // Build the ability and return it
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

  
  
  */



/*
THIS IS TO BE CONNECT WITH THE DB FOR POLICY 




async getPermissionsFromDatabase(role: string): Promise<any[]> {
  // Example: Fetch from a database or external source
  const permissions = await this.permissionService.getPermissionsByRole(role);
  return permissions;
}

async createForUser(user: any) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
  
  // Dynamically fetch permissions for the user
  const userPermissions = await this.getPermissionsFromDatabase(user.role);

  userPermissions.forEach(permission => {
    if (permission.action && permission.subject) {
      can(permission.action, permission.subject);  // Allow action on subject
    }
  });

  return build({
    detectSubjectType: (item) =>
      item.constructor as ExtractSubjectType<Subjects>,
  });
}

TESTING 2
*/
