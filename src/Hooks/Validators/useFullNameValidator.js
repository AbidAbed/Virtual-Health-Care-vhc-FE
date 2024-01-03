function useFullNameValidator(value) {
    const fullNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
  
    if (!value || !value.trim()) {
      return "Full name is required";
    }
  
    if (!fullNameRegex.test(value)) {
      return "Please enter a valid full name";
    }
  
    return null;
  }
  
  export default useFullNameValidator;
  