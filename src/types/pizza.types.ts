export type PizzaKey =
  | "pepperoni"
  | "spinach"
  | "paneer-tikka"
  | "margherita"
  | "veggie"
  | "bbq-chicken"
  | "hawaiian"

  export type Pizza = {
    key: string;
    label: string;
    title: string;
    description: string;
    pizzaImage: string;
    ingredientsImage: string;
    pizzaScale?: number;
    pizzaRotate?: number;
    ingScale?: number;
    ingY?: number;
    ingRotate?: { left: number; right: number };
  };