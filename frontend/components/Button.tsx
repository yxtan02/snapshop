import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function Button({ title, onPress, containerStyle, isLoading } : any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={isLoading ? [styles.button, containerStyle, styles.buttonDisabled]
                       : [styles.button, containerStyle]}
      disabled={isLoading}
    >
      <Text style={styles.buttonText}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          size="small"
          style={styles.activityIndicator}
        />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#F7C5CC',
      borderRadius: 12,
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 8,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonText: {
      fontFamily: 'regular',
      fontSize: 18,
    },
    buttonLabel: {
      color: 'white',
      fontSize: 30,
    },
    activityIndicator: {
      marginLeft: 8,
    },
  });