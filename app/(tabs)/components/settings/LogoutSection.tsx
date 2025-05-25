import SectionTitle from "@/app/(tabs)/components/settings/SectionTitle";
import {Button} from "@rneui/themed";
import {commonColors} from "@/constants/Colors";
import React from "react";
import {LogoutSectionProps} from "@/app/(tabs)/types";

function LogoutSection({ confirmLogout }: LogoutSectionProps) {
    return (
        <>
            <SectionTitle title='Log Out' iconName='logout' />
            <Button
                type="solid"
                style={{width: '100%'}}
                containerStyle={{width:'100%', paddingVertical: 10}}
                buttonStyle={{borderWidth: 0, borderRadius: 10, backgroundColor: commonColors.dangercolor}}
                loadingProps={{size: 60, color: 'white'}}
                onPress={confirmLogout}
            >
                Log Out
            </Button>
        </>
    )
}

export default LogoutSection;