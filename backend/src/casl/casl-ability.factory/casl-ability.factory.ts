import { AbilityBuilder, createMongoAbility, ExtractSubjectType, InferSubjects, MongoAbility, MongoQuery } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "src/users/schemas/users.schema";

enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

type Subject = InferSubjects<typeof User> | "all";
type PossibilityAbility = [Action, Subject]
type Conditions = MongoQuery;

export type AppAbility = MongoAbility<PossibilityAbility, Conditions>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: User) {
        const {can, cannot, build} = new AbilityBuilder(createMongoAbility<PossibilityAbility, Conditions>);
        
        if(user.isAdmin){
            can(Action.Manage, 'all');
        }else{
            can(Action.Read, 'all');
        }

        // User Ability
        can(Action.Update, User, {_id : user._id});

        return build({
            detectSubjectType: (item) => 
                item.constructor as ExtractSubjectType<Subject> 
        });
    }
}
