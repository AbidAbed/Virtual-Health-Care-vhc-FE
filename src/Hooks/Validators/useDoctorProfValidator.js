function useDoctorProfValidator(value) {
    if (!value ||  !value.trim()) {
      return "Doctor's profession is required";
    }
  
    // Add additional validation criteria if needed
  
    return null;
  }
  
  export default useDoctorProfValidator;
  