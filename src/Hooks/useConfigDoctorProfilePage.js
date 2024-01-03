import useEmailValidator from "./Validators/useEmailValidator";
import usePasswordValidator from "./Validators/usePasswordValidator";
import useFullNameValidator from "./Validators/useFullNameValidator";
import useDoctorProfValidator from "./Validators/useDoctorProfValidator";
import useDoctorBioValidator from "./Validators/useDoctorBioValidator";

function useConfigDoctorProfilePage(doctor) {
  return [
    {
      label: "Full name",
      stateName: "name",
      placeHolder: doctor.name,
      validator: useFullNameValidator,
      type: "text",
    },
    {
      label: "Bio",
      stateName: "bio",
      placeHolder: doctor.bio,
      validator: useDoctorBioValidator,
      type: "text",
    },
    {
      label: "Proficiency",
      stateName: "proficiency",
      placeHolder: doctor.proficiency,
      validator: useDoctorProfValidator,
      type: "text",
    },
    {
      label: "Rating",
      disabled: true,
      value: doctor.rate,
    },
    {
      label: "Email",
      stateName: "email",
      placeHolder: doctor.email,
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
export default useConfigDoctorProfilePage;
