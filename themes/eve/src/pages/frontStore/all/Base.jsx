import { CartProvider } from "@components/frontStore/cart/CartContext.js";
import { CustomerProvider } from "@components/frontStore/customer/CustomerContext.jsx";
import React from "react";

import Layout from "../../all/Layout";

export default function Base({
  myCart,
  customer,
  addMineCartItemApi,
  loginApi,
  logoutApi,
  registerApi,
}) {
  return (
    <CustomerProvider
      initialCustomer={customer}
      loginAPI={loginApi}
      logoutAPI={logoutApi}
      registerAPI={registerApi}
    >
      <CartProvider cart={myCart} query={`${query}\n${fragments}`} addMineCartItemApi={addMineCartItemApi}>
        <Layout />
      </CartProvider>
    </CustomerProvider>
  );
}

export const layout = {
  areaId: "body",
  sortOrder: 1,
};

export const query = `
  query Query {
    myCart {
      ...ShoppingCart
      addItemApi
      addPaymentMethodApi
      addShippingMethodApi
      addContactInfoApi
      addAddressApi
      addNoteApi
      checkoutApi
      applyCouponApi
      removeCouponApi
      availableShippingMethods {
        code
        name
        cost {
          value
          text
        }
      }
      availablePaymentMethods {
        code
        name
      }
      items {
        ...ShoppingCartItem
        cartItemId
        removeApi
        updateQtyApi
        errors
      }
    }
    customer: currentCustomer {
      customerId
      uuid
      email
      fullName
      groupId
      createdAt {
        value
        text
      }
      addAddressApi
      addresses {
        addressId
        uuid
        fullName
        telephone
        address1
        address2
        city
        province {
          code
          name
        }
        country {
          code
          name
        }
        postcode
        isDefault
        updateApi
        deleteApi
      }
      orders {
        ...ShoppingCart
        orderId
        status {
          name
          code
          badge
        }
        orderNumber
        shipmentStatus {
          name
          code
          badge
        }
        paymentStatus {
          name
          code
          badge
        }
        items {
          ...ShoppingCartItem
          orderItemId
        }
      }
    }
    addMineCartItemApi: url(routeId: "addMineCartItem")
    loginApi: url(routeId: "customerLoginJson")
    registerApi: url(routeId: "createCustomer")
    logoutApi: url(routeId: "customerLogoutJson")
  }
`;

export const fragments = `
  fragment ShoppingCart on ShoppingCart {
    uuid
    currency
    customerId
    customerGroupId
    customerEmail
    customerFullName
    coupon
    shippingMethod
    shippingMethodName
    paymentMethod
    paymentMethodName
    shippingNote
    taxAmount {
      value
      text
    }
    totalTaxAmount {
      value
      text
    }
    discountAmount {
      value
      text
    }
    shippingFeeExclTax {
      value
      text
    }
    shippingFeeInclTax {
      value
      text
    }
    shippingTaxAmount {
      value
      text
    }
    subTotal {
      value
      text
    }
    subTotalInclTax {
      value
      text
    }
    subTotalWithDiscount {
      value
      text
    }
    subTotalWithDiscountInclTax {
      value
      text
    }
    totalQty
    totalWeight {
      value
      unit
    }
    taxAmountBeforeDiscount {
      value
      text
    }
    grandTotal {
      value
      text
    }
    billingAddress {
      fullName
      telephone
      address1
      address2
      city
      province {
        name
        code
      }
      country {
        name
        code
      }
      postcode
    }
    shippingAddress {
      fullName
      telephone
      address1
      address2
      city
      province {
        name
        code
      }
      country {
        name
        code
      }
      postcode
    }
    createdAt {
      value
      text
    }
    updatedAt  {
      value
      text
    }
  }

  fragment ShoppingCartItem on ShoppingCartItem {
    uuid
    productId
    productSku
    productName
    thumbnail
    productWeight {
      value
      unit
    }
    productPrice {
      value
      text
    }
    productPriceInclTax {
      value
      text
    }
    qty
    finalPrice {
      value
      text
    }
    finalPriceInclTax {
      value
      text
    }
    taxPercent
    taxAmount {
      value
      text
    }
    taxAmountBeforeDiscount {
      value
      text
    }
    discountAmount {
      value
      text
    }
    lineTotal {
      value
      text
    }
    subTotal {
      value
      text
    }
    lineTotalWithDiscount {
      value
      text
    }
    lineTotalWithDiscountInclTax {
      value
      text
    }
    lineTotalInclTax {
      value
      text
    }
    total {
      value
      text
    }
    variantGroupId
    variantOptions {
      attributeCode
      attributeName
      attributeId
      optionId
      optionText
    }
    productUrl
  }
`;
