import {Alert} from "react-native";

export const confirmLogout = (logout: () => void) => {
    Alert.alert('Log Out', 'Do you really want to log out ?', [
        {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
        },
        {
            text: 'YES',
            onPress: logout,
        },
    ]);
};
