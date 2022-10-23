package utils

import "fmt"

// PrintInvalidMessage prints the invalid message
func PrintInvalidMessage() {
	fmt.Println("❌ invalid package manager or lock files found:")
}

// PrintValidMessage prints the invalid message
func PrintValidMessage() {
	fmt.Println("✅ package manager and lock files are looking good")
}

// GetMissingLockFileMessage returns the error message for missing lock file for the chosen packet
// manager
func GetMissingLockFileMessage(lockFile string) string {
	message := fmt.Sprintf("- The \"%s\" does not exist or cannot be read.", lockFile)
	message += " Please run the installer of your package manager."
	return message
}

// GetInvalidFileMessage returns the error message for having an invalid lock file
func GetInvalidFileMessage(lockFile, lockFileSelected string) string {
	message := fmt.Sprintf("- Invalid occurrence of \"%s\" file.", lockFile)
	message += fmt.Sprintf(" Please remove it and use only \"%s\".", lockFileSelected)
	return message
}
