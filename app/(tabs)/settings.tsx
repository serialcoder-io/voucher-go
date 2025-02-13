import React, { useState } from 'react';
import { ScrollView, View, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Icon, Card, Divider } from '@rneui/themed';

function Settings() {
    const [theme, setTheme] = useState('auto');
    const [language, setLanguage] = useState('FR');

    const ThemeOption = ({
         label, value, icon, type='feather'
        }: {
        label: string,
        value: string,
        icon: string,
        type: string
    }) => (
        <TouchableOpacity onPress={() => setTheme(value)} style={styles.optionRow}>
            <View style={styles.optionLabel}>
                <Icon name={icon} type={type} size={20} style={styles.icon} />
                <Text>{label}</Text>
            </View>
            <Icon name={theme === value ? 'check-circle' : 'circle'} type='feather' color={theme === value ? '#6200EE' : '#CCC'} />
        </TouchableOpacity>
    );

    const LanguageOption = ({ label, value }: {label: string, value: string}) => (
        <TouchableOpacity onPress={() => setLanguage(value)} style={styles.optionRow}>
            <Text>{label}</Text>
            <Icon name={language === value ? 'check-circle' : 'circle'} type='feather' color={language === value ? '#6200EE' : '#CCC'} />
        </TouchableOpacity>
    );

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor='white' />
                <Card containerStyle={styles.card}>
                    <TouchableOpacity style={styles.securityOptionRow}>
                        <Icon name='user' type='feather' size={20} style={styles.icon} />
                        <Text>Compte</Text>
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity style={styles.securityOptionRow}>
                        <Icon name='lock' type='feather' size={20} style={styles.icon} />
                        <Text>Code d'accès</Text>
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity style={styles.securityOptionRow}>
                        <Icon name='info' type='feather' size={20} style={styles.icon} />
                        <Text>About shop</Text>
                    </TouchableOpacity>
                </Card>

                <View style={styles.sectionTitle}>
                    <Icon name='contrast' type='material' size={20} style={styles.icon} />
                    <Text style={styles.sectionTitleText}>Theme</Text>
                </View>

                <Card containerStyle={styles.card}>
                    <ThemeOption label='Automatique' value='auto' icon='contrast' type='material' />
                    <Divider />
                    <ThemeOption label='Light' value='light' icon='sun' type='feather' />
                    <Divider />
                    <ThemeOption label='Dark' value='dark' icon='moon' type='feather' />
                </Card>

                <View style={styles.sectionTitle}>
                    <Icon name='translate' type='material' size={20} style={styles.icon} />
                    <Text style={styles.sectionTitleText}>Langues</Text>
                </View>

                <Card containerStyle={styles.card}>
                    <LanguageOption label='FR      French' value='FR' />
                    <Divider />
                    <LanguageOption label='EN      English' value='EN' />
                </Card>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
        padding: 20,
        width: '100%',
    },
    card: {
        borderRadius: 10,
        width: '100%',
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    securityOptionRow:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 15,
    },
    optionLabel: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    sectionTitle: {
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingTop: 25,
        paddingLeft: 10
    },
    sectionTitleText:{
        fontSize: 16,
        fontWeight: '100',
    }
});

export default Settings;