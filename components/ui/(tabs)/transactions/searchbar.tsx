import React from "react";
import { Theme } from "@/lib/definitions";
import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';  // Assure-toi que cette bibliothèque est installée

type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;
};

function SearchBar({
   value,
   onChangeText,
}: SearchBarProps) {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    return (
        <View style={styles.inputContainer}>
            <Ionicons name="search" size={20} color={theme.textPrimary} style={styles.icon} />
            <TextInput
                placeholder="Search..."
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholderTextColor={theme.textSecondary}
            />
        </View>
    );
}

export default SearchBar;

const getStyles = (theme: Theme) => StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        margin: 12,
        borderWidth: 0,
        borderRadius: 12,
        paddingHorizontal: 10,
        backgroundColor: theme.backgroundSecondary,
        width: "85%",
    },
    icon: {
        marginRight: 8,  // Espace entre l'icône et le champ de texte
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: theme.textPrimary,
    },
});
