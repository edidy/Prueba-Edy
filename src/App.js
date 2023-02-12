import "./styles.css";
import { Kushki } from "@kushki/js";
import axios from "axios";

export default function App() {
  const PAGAR = () => {
    var kushki = new Kushki({
      merchantId: "5ec659471d65499ba32d680662755f78",
      inTestEnvironment: true,
      regional: false
    });

    var callback = function (response) {
      if (!response.code) {
        console.log(response);
        charge(response.token);
      } else {
        console.error(
          "Error: ",
          response.error,
          "Code: ",
          response.code,
          "Message: ",
          response.message
        );
      }
    };

    kushki.requestToken(
      {
        amount: "16.98",
        currency: "USD",
        card: {
          name: "Juan Guerra",
          number: "4544980425511225",
          cvc: "345",
          expiryMonth: "12",
          expiryYear: "28"
        }
      },
      callback
    ); // Also you can set the function directly
  };

  const charge = (token) => {
    axios
      .post(
        "https://api-uat.kushkipagos.com/card/v1/charges",
        {
          token: token,
          amount: {
            subtotalIva: 0,
            subtotalIva0: 16.98,
            ice: 0,
            iva: 0,
            currency: "USD"
          },
          contactDetails: {
            documentType: "CC",
            documentNumber: "1234567890",
            email: "user@example.com",
            firstName: "John",
            lastName: "Doe",
            phoneNumber: "+593912345678"
          },
          orderDetails: {
            siteDomain: "example.com",
            shippingDetails: {
              name: "John Doe",
              phone: "+593912345678",
              address1: "Eloy Alfaro 139 y Catalina Aldaz",
              address2: "centro 123",
              city: "Quito",
              region: "Pichincha",
              country: "Ecuador"
            },
            billingDetails: {
              name: "John Doe",
              phone: "+593912345678",
              address1: "Eloy Alfaro 139 y Catalina Aldaz",
              address2: "centro 123",
              city: "Quito",
              region: "Pichincha",
              country: "Ecuador"
            }
          },
          productDetails: {
            product: [
              {
                id: "198952AB",
                title: "eBook Digital Services",
                price: 10000,
                sku: "10101042",
                quantity: 1
              }
            ]
          },
          fullResponse: "v2"
        },
        {
          headers: {
            "Private-Merchant-Id": "040829bd8cba47d3aab6c8b64a3c2def"
          }
        }
      )
      .then((response) => {
        console.log(response.data);
        alert(response.data.details.responseText);
      })
      .catch((error) => {
        console.error(error);
        alert("Ha ocurrido un error");
      });
  };

  return (
    <div className="App">
      <h1>Transaccion Empresa Edison</h1>
      <button onClick={PAGAR}>PAGAR</button>
    </div>
  );
}
