import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export default function CartButton() {
  const { auth } = useAuth();

  return auth && (
    <Link
      to="/krepselis" 
      className="
        w-10 h-10 flex items-center justify-center relative
      "
    >
      <Icon icon="tabler:shopping-cart" className="w-8 h-8 text-[#ccc5c3] dark:text-[#66564c]"/>
    </Link>
  )
}
