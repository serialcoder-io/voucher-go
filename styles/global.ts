import {StyleSheet, ViewStyle} from 'react-native';
import {commonColors} from '@/constants/Colors'
import {useTheme} from "@/hooks/useTheme";

export const useGlobalStyles = () => {
	const { theme } = useTheme();
	return StyleSheet.create({
		center:{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		},
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.background,
		} as ViewStyle,
		innerContainer: {
			alignItems: 'center',
		} as ViewStyle,
		primaryButtonStyle: {
			backgroundColor: commonColors.primaryColor,
			width: '100%',
			paddingVertical: 8,
			borderRadius: 10,
		},
		buttonContainer: {
			marginHorizontal: 50,
			height: 50,
			width: '95%',
			marginVertical: 0,
		},
		title: {
			color: commonColors.primaryColor,
			marginBottom: 8,
			textAlign: 'center',
		},
		subtitle: {
			fontSize: 15,
			color: commonColors.primaryColor,
			marginBottom: 20,
			textAlign: 'center',
			fontStyle: 'italic',
		},
		inputContainer: {
			borderWidth: 0.5,
			borderColor: theme.backgroundSecondary,
			backgroundColor: theme.backgroundSecondary,
			paddingHorizontal: 8,
			borderRadius: 8,
			width: '100%',
		},
		icon: {
			marginRight: 10,
			color: "#ffffff",
		},
		textPrimary:{
			color: theme.textPrimary,
			fontSize: 15,
		},
		textSecondary:{
			color: theme.textSecondary,
		},
		textInput:{
			fontSize: 17,
			color: theme.textPrimary
		}
	});
};