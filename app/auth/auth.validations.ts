import {showDialog} from "@/lib/utils";
import {ALERT_TYPE} from "react-native-alert-notification";

const isEmailValid = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email.trim());
};

const isPasswordValid = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password.trim());
}

export const validateEmail = (email: string, resetMutation: ()=>void)=>{
    if (!isEmailValid(email.trim())) {
        const msg = "Please enter a valid email address"
        showDialog("Invalid email", msg, ALERT_TYPE.DANGER, resetMutation)
        return false;
    }
    return true;
}


export const validatePassword = (
    password: string,
    confirmPassword: string,
    resetMutation: ()=>void
)=>{
    if (!isPasswordValid(password.trim())) {
        const errorMsg = 'Minimum 8 characters with at least ' +
            '1 uppercase, 1 lowercase, 1 number, and 1 special character';
        showDialog("Invalid Password", errorMsg, ALERT_TYPE.DANGER, resetMutation)
        return false
    }
    if (password.trim() !== confirmPassword.trim()) {
        const errorMsg = "password and confirm password must match."
        showDialog("Invalid password", errorMsg, ALERT_TYPE.DANGER, resetMutation)
        return false
    }
    return true
}