import {Pressable} from "react-native";
import {Avatar} from "@rneui/base";
import * as React from "react";

function HeaderRightAvatar(){
    return (
        <Pressable style={{ paddingRight: 20 }}>

            {/* Avatar à droite */}
            <Avatar
                size={40}
                rounded
                title="A"
                containerStyle={{ backgroundColor: "#4c8bf5" }}
            />

        </Pressable>
    )
}

export default HeaderRightAvatar;