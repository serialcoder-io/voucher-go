import {Pressable} from "react-native";
import {Avatar} from "@rneui/base";
import * as React from "react";
import {commonColors} from "@/constants/Colors";
import {useAuthStore} from "@/store/AuthStore";
import {useRouter} from "expo-router";

function HeaderRightAvatar(){
    const user = useAuthStore.use.user()
    const router = useRouter();
    return (
        <Pressable style={{ paddingRight: 20 }} onPress={()=>router.push('/account')}>

            {/* Avatar à droite */}
            <Avatar
                size={40}
                rounded
                title={user ? user.username[0].toUpperCase() : ""}
                containerStyle={{ backgroundColor: commonColors.primaryColor }}
            />

        </Pressable>
    )
}

export default HeaderRightAvatar;