import useEmailValidator from "./Validators/useEmailValidator";
import usePasswordValidator from "./Validators/usePasswordValidator";
import useFullNameValidator from "./Validators/useFullNameValidator";
import useDoctorProfValidator from "./Validators/useDoctorProfValidator";
import useDoctorBioValidator from "./Validators/useDoctorBioValidator";
function useConfigDoctorSignup() {
  return [
    {
      label: "Full name",
      stateName: "name",
      placeHolder: "Full name",
      validator: useFullNameValidator,
      type: "text",
    },
    {
      label: "Bio",
      stateName: "bio",
      placeHolder: "bio",
      validator: useDoctorBioValidator,
      type: "text",
    },
    {
      label: "Proficiency",
      stateName: "proficiency",
      placeHolder: "proficiency",
      validator: useDoctorProfValidator,
      type: "text",
    },
    {
      label: "Email",
      stateName: "email",
      placeHolder: "email@email.com",
      validator: useEmailValidator,
      type: "email",
    },

    {
      label: "Password",
      stateName: "password",
      placeHolder: "**********",
      validator: usePasswordValidator,
      type: "password",
    },
  ];
}
export default useConfigDoctorSignup;
