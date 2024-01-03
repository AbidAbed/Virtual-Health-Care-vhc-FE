function usePasswordValidator(value) {
    // Define the criteria for a valid password
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasDigit = /\d/.test(value);
  
    // Check if the password meets the criteria
    if (value &&  value.length >= minLength && hasUpperCase && hasLowerCase && hasDigit) {
      return null; // No error if the password is valid
    } else {
      return "Password must be at least 8 characters long and include uppercase, lowercase, and a digit."; // Return an error message if the password is invalid
    }
  }
  
  export default usePasswordValidator;
  