import { type SchemaTypeDefinition } from 'sanity'
import product from './products'
import orders from './order'
import shippingForm from './shipping_form'
import contactForm from "./contact"
import review from './review'
export const schema: { types: SchemaTypeDefinition[] } = {
types: [product,contactForm,orders,review,shippingForm],
}