import { Rule } from "@sanity/types";

const orderSchema = {
  name: "orders",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "shippingForm",
      title: "Shipping Form",
      type: "reference",
      to: [{ type: "contactForm" }],
      validation: (Rule: Rule) =>
        Rule.required().error("Shipping form reference is required"),
    },
    {
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "pending",
    },
    {
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
      validation: (Rule: Rule) =>
        Rule.positive().error("Total amount must be positive"),
    },
    {
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "TrackingId",
              title: "TrackingId",
              type: "string",
              readOnly: true,
            },
            {
              name: "name",
              title: "Product Name",
              type: "string",
              validation: (Rule: Rule) =>
                Rule.required().error("Product name is required"),
            },
            {
              name: "price",
              title: "Price",
              type: "number",
              validation: (Rule: Rule) =>
                Rule.required()
                  .positive()
                  .error("Valid product price is required"),
            },
            {
              name: "qty",
              title: "Quantity",
              type: "number",
              validation: (Rule: Rule) =>
                Rule.required()
                  .integer()
                  .positive()
                  .error("Quantity must be a positive integer"),
            },
          ],
        },
      ],
      validation: (Rule: Rule) =>
        Rule.min(1).error("At least one product must be added to the order"),
    },
  ],
};

export default orderSchema;
