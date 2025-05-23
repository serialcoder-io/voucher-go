import {Pressable, StyleSheet, View} from "react-native";
import {Icon} from "@rneui/themed"
import * as React from "react";
import {Theme} from "@/lib/definitions";
import {useTheme} from "@/hooks/useTheme";
import {commonColors} from "@/constants/Colors";
import HeaderTitle from "@/components/ui/(tabs)/transactions/HeaderTitle";
import SearchBar from "@/components/ui/(tabs)/transactions/searchbar";
import {useState} from "react";

// headet fof transation screen(redemptions)
function Header() {
    const [reference, setReference] = useState("");
    const {theme} = useTheme();

    const styles = getStyles(theme);
    return (
        <>
            <View style={styles.container}>
                <HeaderTitle />
                <View style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <SearchBar
                        value={reference}
                        onChangeText={(value) => setReference(value)}
                    />
                    <Pressable onPress={()=>console.log("Press")}>
                        <Icon
                            name="cancel" type='material' size={35}
                            style={{marginRight: 10}} color="white"
                        />
                    </Pressable>
                </View>
            </View>
        </>
    )
}

export default Header;

const getStyles = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: commonColors.primaryColor,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 15,
        paddingVertical: 8,
        position: "sticky",
        top: 0
    },
    title:{
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    }
});