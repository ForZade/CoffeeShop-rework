import { useEffect, useState } from "react";
import axios from "axios";
import { ProductProps, CardInterface} from  "./ProductCard"


  export default function PopUpProductInfo() {
    
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ProductProps[]>([]);
    async function getProduct() {
        try{
            setLoading(true);
            const response: any = await axios.get(`http://localhost:7000/api/v1/products/:6550}`);
            console.log(response.data.data);
            setData(response.data.data);
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }

  useEffect(() => {
    getProduct();
  }, [])
    
    return (
      <p>{product.name}</p>
    );
  }