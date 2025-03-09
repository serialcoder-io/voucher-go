import {Pressable} from "react-native";
import {Avatar} from "@rneui/base";
import * as React from "react";
import {commonColors} from "@/constants/Colors";
import {useAuthStore} from "@/store/AuthStore";
import {useRouter} from "expo-router";
import {useEffect, useState} from "react";

function HeaderRightAvatar(){
    const user = useAuthStore.use.user();  // Récupération du user du store
    const [initials, setInitials] = useState("");  // Stocke les initiales pour l'avatar
    const router = useRouter();

    useEffect(() => {
        // Met à jour les initiales chaque fois que `user` change
        if (user && user.username) {
            setInitials(user.username[0].toUpperCase());
        } else {
            setInitials("");  // Remet les initiales à vide si pas d'utilisateur
        }
    }, [user]);  // Dépend de `user`, donc quand `user` change, on met à jour l'avatar

    return (
        <Pressable style={{ paddingRight: 20 }} onPress={() => router.push('/account')}>
            {/* Avatar à droite */}
            <Avatar
                size={40}
                rounded
                title={initials}  // Utilisation des initiales mises à jour
                containerStyle={{ backgroundColor: commonColors.primaryColor }}
            />
        </Pressable>
    );
}

export default HeaderRightAvatar;
