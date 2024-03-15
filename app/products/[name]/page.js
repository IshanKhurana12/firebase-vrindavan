
import Cheker from "../../Components/Cheker";
import Productinfo from "../../Components/Productinfo";
export default function page(params) {
    console.log(params.params.name);
  return (
    <div>
        <Cheker/>
        <Productinfo productName={params.params.name}/>
    </div>
  )
}
