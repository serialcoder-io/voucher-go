import {Modal, View, Text, StyleSheet, Pressable} from "react-native";
import {Button, Icon} from "@rneui/themed";
import React from "react";
import {Theme} from "@/lib/definitions";
import {commonColors} from "@/constants/Colors";
import {withDecay} from "react-native-reanimated";

type CustomModalProps = {
    theme: Theme;
    isVisible: boolean;
    closeModal: () => void;
    title?: string;
    message?: string;
    redeem: () => void;
    loading: boolean;
}

function CustomConfirmationModal({ theme, isVisible, closeModal, title, message, redeem, loading }: CustomModalProps){

    const styles = getStyles(theme);
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => closeModal()}
      >
          <View style={styles.overlay}>
              <View style={styles.alertView}>
                  <View style={styles.alertHeader}>
                      <Text style={{fontSize: 18}}>{title}</Text>
                  </View>
                  <Text style={styles.alertText}>{message}</Text>
                  <View style={{width:'100%'}}>
                      <Button
                          title='Redeem'
                          buttonStyle={styles.redeemButton}
                          loading={loading}
                          onPress={()=>redeem()}
                      />
                      <Button
                          title='Cancel'
                          type='outline'
                          buttonStyle={styles.cancelButton}
                          titleStyle={{color: commonColors.dangercolor}}
                          onPress={() => closeModal()}
                      />
                  </View>
              </View>
          </View>
      </Modal>
    );
}


export default CustomConfirmationModal

const getStyles = (theme: Theme)=> StyleSheet.create({
    closeButtonContainer:{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 10

    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(70,70,70,0.5)',
    },
    alertHeader: {
        paddingBottom: 15,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    alertView: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    alertText: {
        marginBottom: 15,
        fontSize: 16,
    },
    redeemButton: {
        backgroundColor: commonColors.primaryColor,
        borderRadius: 5,
    },
    cancelButton: {
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 15,
        borderColor: commonColors.dangercolor,
    },
});
