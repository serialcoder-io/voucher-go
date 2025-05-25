import {Theme} from "@/types";
import {showToast} from "@/utils/index";
import {ALERT_TYPE} from "react-native-alert-notification";

export const displayToast = (
    status_code: number,
    theme: Theme,
    updateUserStore: () => void
) =>{
    let toastTitle = ""
    let toastMessage = ""
    switch(status_code){
        case 200:
            toastTitle = "Profile Updated";
            toastMessage = "Your profile has been updated successfully";
            showToast(toastTitle, toastMessage, ALERT_TYPE.SUCCESS, theme)
            updateUserStore();
            break;
        case 400:
            toastTitle = "Required fields";
            toastMessage = "Username and email are required";
            showToast(toastTitle, toastMessage, ALERT_TYPE.DANGER, theme)
            break;
        case 401:
            toastTitle = "Unauthorized";
            toastMessage = "Your session has expired. Please log in to continue.";
            showToast(toastTitle, toastMessage, ALERT_TYPE.DANGER, theme)
            break;
        default:
            toastTitle = "Unauthorized";
            toastMessage = "An unexpected error occurred. Please try again, " +
                "or contact support if the problem persists.";
            showToast(toastTitle, toastMessage, ALERT_TYPE.DANGER, theme)
    }
}
