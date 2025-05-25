import {Alert} from "react-native";
import {showToast} from "@/utils";
import {ALERT_TYPE} from "react-native-alert-notification";
import {Theme} from "@/types";
const allDigitsSame = (accessCode: string) => {
    return accessCode.split('').every(digit => digit === accessCode[0]);
};

export function validateAccessCode(
    accessCode: string,
    confirmAccessCode: string,
    theme: Theme
) {
    let toastTitle = ""
    let toastMsg = ""
    if (accessCode.length !== 4 || confirmAccessCode.length !== 4) {
        Alert.alert("Invalid Access Code", "Access code must be exactly 4 digits long.");
        toastMsg = "Sorry"
        toastMsg = "Something went wrong, please try again later"
        showToast(toastTitle, toastMsg, ALERT_TYPE.DANGER, theme)
        return false;
    }
    if (accessCode !== confirmAccessCode) {
        toastMsg = "Invalid Access Code"
        toastMsg = "The access codes do not match."
        showToast(toastTitle, toastMsg, ALERT_TYPE.DANGER, theme)
        return false;
    }
    if (allDigitsSame(accessCode) || allDigitsSame(confirmAccessCode)) {
        toastMsg = "Invalid Access Code"
        toastMsg = "The access code cannot be four identical digits."
        showToast(toastTitle, toastMsg, ALERT_TYPE.DANGER, theme)
        return false;
    }
    return true;
}