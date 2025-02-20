import {useAuthStore} from "@/store/AuthStore";
import ParentContainer from "@/components/parent-container";
import {Button} from "@rneui/themed";
import {commonColors} from "@/constants/Colors";
import {View, Text, BackHandler} from "react-native";
import {useEffect} from "react";

function LoggedInSuccesRedirect() {
    const access_token = useAuthStore.use.tokens().access
    const refresh_token = useAuthStore.use.tokens().refresh

    {/*useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {return true}
        );
        return () => backHandler.remove();
    }, []);*/}
    return (
       <ParentContainer>
           <View><Text>access: {access_token}</Text></View>
           <View><Text>refresh: {refresh_token}</Text></View>
           <Button
               title="Solid"
               type="outline"
               loading
               buttonStyle={{
                   borderWidth: 0,
               }}
               loadingProps={{
                   size: 60,
                   color: commonColors.primaryColor,
               }}
           />
       </ParentContainer>
    )
}

export default LoggedInSuccesRedirect