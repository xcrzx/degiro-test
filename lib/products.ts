import { round } from "./round";
import { EventEmitter } from "eventemitter3";

export type ProductUpdate = {
  id: number;
  field: ProductFields;
  value: number;
};

export type Product = {
  id: number;
} & typeof defaultFields;

export type ProductFields = keyof typeof defaultFields;

export const productsEmitter = new EventEmitter<{ update: [ProductUpdate] }>();

type Options = {
  products: Product[];
  fields: ProductFields[];
};

const emitUpdate = (options: Options) => {
  productsEmitter.emit("update", {
    id: Math.floor(Math.random() * options.products.length),
    field:
      options.fields[Math.floor(Math.random() * options.fields.length) + 1],
    value: round(Math.random() * 10 - 5),
  });
};

export const defaultFields = {
  field1: 0,
  field2: 0,
  field3: 0,
  field4: 0,
  field5: 0,
  field6: 0,
  field7: 0,
  field8: 0,
  field9: 0,
  field10: 0,
};

export const getInitialProducts = () =>
  Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    ...defaultFields,
  }));

export const subscribeToProductUpdates = (
  options: Options,
  callback: (e: ProductUpdate) => void
) => {
  const runUpdates = () => {
    emitUpdate(options);
    setTimeout(runUpdates, 1000);
  };

  runUpdates();

  productsEmitter.on("update", callback);
  return () => {
    productsEmitter.off("update", callback);
  };
};
