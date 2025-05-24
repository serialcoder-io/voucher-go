import { View, Text, StyleSheet} from "react-native";
import { useAuthStore } from "@/store/AuthStore";
import { useState } from "react";
import { useGlobalStyles } from "@/styles/global";

// components
import PrimaryButton from "@/components/ui/primary-button";
import ParentContainer from "@/components/parent-container";
import CustomInputText from "@/components/ui/custom-inputText";
import {Image} from "react-native";

function Index() {
    const user = useAuthStore((state) => state.user); // Assure-toi que 'user' contient bien les bons champs

    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [firstName, setFirstName] = useState(user?.first_name || "");
    const [lastName, setLastName] = useState(user?.last_name || "");
    const requiredFields = [username, email];

    const handleSubmit = ()=>{
        console.log("hello les gens")
    }

    return (
        <ParentContainer width='90%'>
            {/* user icon */}
            <View style={styles.iconContainer}>
                <Image source={require('@/assets/icons/user-icon.png')} style={styles.userIcon} />
            </View>

            <Text style={useGlobalStyles().title}>Profile</Text>

            {/* Username */}
            <CustomInputText
                value={username}
                onChangeText={setUsername}
                iconName="user"
                placeholder="Username"
            />

            {/* Email */}
            <CustomInputText
                value={email}
                onChangeText={setEmail}
                iconName="mail"
                placeholder="Email"
            />

            {/* firstname */}
            <CustomInputText
                value={firstName}
                onChangeText={setFirstName}
                iconName="user"
                placeholder="Firstname"
            />

            {/* lastname */}
            <CustomInputText
                value={lastName}
                onChangeText={setLastName}
                iconName="user"
                placeholder="lastname"
            />

            <PrimaryButton
                disabled={!allFieldsFilled(requiredFields)}
                title="Save"
                loading={false}
                actionOnPress={handleSubmit}
                width='95%'
            />
        </ParentContainer>
    );
}

export default Index;

const allFieldsFilled = (fields: string[]) => {
    return fields.every((field) => {
        return field.length > 0;
    });
};


const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    gap: 15,
  },
  userIcon: {
      width: "60%",
      height: "60%",
      resizeMode: "contain",
      alignSelf: "center",
  },
  iconContainer:{
      width: 90,
      height: 90,
      borderRadius: "100%",
      borderWidth: 1,
      borderColor: "#ccc",
      alignItems: "center",
      justifyContent: "center",
  }
});
