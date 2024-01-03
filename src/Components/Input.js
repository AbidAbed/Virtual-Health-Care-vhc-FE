function Input({ onChange, value, placeHolder, className, type }) {
  return (
    <input
      onChange={onChange}
      value={value}
      placeholder={placeHolder}
      className={className + " placeholder:italic placeholder:text-slate-400 "}
      type={type}
    />
  );
}
export default Input;
