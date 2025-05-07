
import {Registration} from "./Registration";
import {ResetPassword} from "./ResetPassword";
import {UpdateProfile} from "./UpdateProfile";

export interface NotificationErrorDto {
    id: string,
    notification:  Registration | ResetPassword | UpdateProfile,
    errorMessage: string,
    occurredOn: Date
}