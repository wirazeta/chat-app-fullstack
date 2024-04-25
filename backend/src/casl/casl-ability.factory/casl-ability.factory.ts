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
        
        // Admin ability
        if(user.isAdmin === true){
            can(Action.Manage, 'all'); // read-write access to everything
        }else{
            can(Action.Read, 'all'); // read-only access to everything
        }

        // User Ability
        can(Action.Update, User, {_id : user._id});
        can(Action.Delete, User, {_id: user._id});

        return build({
            detectSubjectType: (item) => 
                item.constructor as ExtractSubjectType<Subject> 
        });
    }
}
