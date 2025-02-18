import {Pressable} from "react-native";
import {Avatar} from "@rneui/base";
import * as React from "react";
import {commonColors} from "@/constants/Colors";

function HeaderRightAvatar(){
    return (
        <Pressable style={{ paddingRight: 20 }}>

            {/* Avatar à droite */}
            <Avatar
                size={40}
                rounded
                title="A"
                containerStyle={{ backgroundColor: commonColors.primaryColor }}
            />

        </Pressable>
    )
}

export default HeaderRightAvatar;