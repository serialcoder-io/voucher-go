import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
	},
	innerContainer: {
		width: "85%",
		alignItems: "center",
	},
	primaryButtonStyle: {
		backgroundColor: '#4c8bf5',
		width: '100%',
		paddingVertical: 10,
		borderRadius: 10,
	},
	buttonContainer: {
		marginHorizontal: 50,
		height: 50,
		width: '100%',
		marginVertical: 0,
	},
	title: {
		color: '#4c8bf5',
		marginBottom: 8,
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 15,
		color: '#4c8bf5',
		marginBottom: 20,
		textAlign: 'center',
		fontStyle: 'italic',
	},
})