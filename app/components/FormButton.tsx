import { FormButtonType } from "../../types";

function FormButton({ loading, onClick = null, text }: FormButtonType) {

  return onClick ? (
    <button
      onClick={onClick}
      className={`w-full  ${
        loading ? "bg-primaryColor/20" : "bg-primaryColor "
      }  text-center rounded-[10px] border py-[10px]`}
    >
      {loading ? "loading..." : text}
    </button>
  ) : (
    <button
      type="submit"
      className={`w-full  ${
        loading ? "bg-primaryColor/20" : "bg-primaryColor "
      }  text-center rounded-[10px] border py-[10px]`}
    >
      {loading ? "loading..." : text}
    </button>
  );
}

export default FormButton;
