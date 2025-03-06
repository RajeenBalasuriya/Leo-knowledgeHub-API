// create-policy.dto.ts
import { IsString, IsArray, IsOptional } from 'class-validator';
import { Action } from 'src/enums/action.enum';

export class CreatePolicyDto {
  @IsString()
  readonly name: string;

  @IsArray()
  readonly rules: Array<{
    action: Action;
    subject: string;

    fields?: string[];
  }>;
}
