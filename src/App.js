import React from 'react';
import GooglePay from './components/GooglePay';
class App extends React.Component {
  render() {
    const cart = {
      items:[{
        id:'123456',
        changeShippingAddress() {
          console.log('changeShippingAddress');
        },
        changeDeliveryDate() {
          console.log('changeDeliveryDate');
        },
        toLineItem() {
          console.log('toLineItem');
        },
      }],
      removeProduct() {
        console.log('removeProduct');
      },
    };
    const product = {
      selectedSku: {
        skuListPrice: '49.99',
        skuOfferPrice: '49.99',
        productSku: '10029M',
        skuCode:'1001-P-100299'
      }
    };
    const checkout = {};
    const isCheckout = false;
    return (
      <div>
        My App Component
        <GooglePay
          cart={cart}
          product={product}
          isCheckout={isCheckout}
          checkout={checkout}
        />
      </div>
    );
  }
}
export default App