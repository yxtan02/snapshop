import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native'

export default function Button({ title, onPress, containerStyle, textStyle, isLoading } : any) {
  return (
    <Pressable
      onPress={onPress}
      style={isLoading ? [styles.button, containerStyle, styles.buttonDisabled]
                       : [styles.button, containerStyle]}
      disabled={isLoading}
    >
      <Text style={[styles.buttonText, textStyle]}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          size="small"
          style={styles.activityIndicator}
        />
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#2F3C7E',
      borderRadius: 25,
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonText: {
      fontFamily: 'medium',
      fontSize: 18,
      color: 'white',
    },
    buttonLabel: {
      color: 'white',
      fontSize: 30,
    },
    activityIndicator: {
      marginLeft: 8,
    },
  });