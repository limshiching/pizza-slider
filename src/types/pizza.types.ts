export type PizzaKey =
  | "pepperoni"
  | "spinach"
  | "paneer-tikka"
  | "margherita"
  | "veggie"
  | "bbq-chicken"
  | "hawaiian"

export interface Pizza {
  key: PizzaKey;
  label: string;
  title: string;
  description: string;
  pizzaImage: string;
  ingredientsImage: string;
}