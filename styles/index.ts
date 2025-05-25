import {StyleSheet, ViewStyle} from 'react-native';
import {commonColors} from '@/constants/Colors'
import {useTheme} from "@/hooks/useTheme";
import {Theme} from "@/types";

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
			color: theme.textPrimary,
			marginBottom: 8,
			textAlign: 'center',
			paddingVertical: 5
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

export const getHomeScreenStyles = (theme: Theme) => StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: theme.background,
		padding: 16,
	},
	logo: {
		width: 100,
		height: 100,
		marginBottom: 40,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: theme.textPrimary,
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: theme.textSecondary,
		marginBottom: 20,
	},
	pinContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '80%',
		marginBottom: 20,
	},
	textInput:{
		fontSize: 25,
		color: theme.textPrimary,
		letterSpacing: 8,
		paddingLeft: 60
	},
	forgotPin: {
		fontSize: 14,
		color: theme.textPrimary,
		marginTop: 10,
	},
});