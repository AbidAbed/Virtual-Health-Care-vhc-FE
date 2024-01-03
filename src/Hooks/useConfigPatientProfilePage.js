import useEmailValidator from "./Validators/useEmailValidator";
import usePasswordValidator from "./Validators/usePasswordValidator";
import useFullNameValidator from "./Validators/useFullNameValidator";

function useConfigPatientProfilePage(patient) {
  return [
    {
      label: "Full name",
      stateName: "name",
      placeHolder: patient.name,
      validator: useFullNameValidator,
      type: "text",
    },
    {
      label: "Email",
      stateName: "email",
      placeHolder: patient.email,
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
export default useConfigPatientProfilePage;
