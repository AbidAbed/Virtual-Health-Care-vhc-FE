function useEmailValidator(value) {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Check if the value matches the email regex
    if (value && value.match(emailRegex)) {
      return null; // No error if the email is valid
    } else {
      return "Invalid email address"; // Return an error message if the email is invalid
    }
  }
  
  export default useEmailValidator;
  