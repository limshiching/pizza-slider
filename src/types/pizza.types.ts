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

  /**
   * Optional art-direction knobs (only use if a specific image needs tweaking)
   */
  pizzaScale?: number; // default 1
  pizzaY?: number; // px offset relative to ring center (positive goes down)
  pizzaRotate?: number; // deg, default 0

  ingScale?: number; // default 1
  ingY?: number; // px offset (positive down)
  ingLeftX?: number; // px offset (positive right)
  ingRightX?: number; // px offset (positive right)
  ingLeftRotate?: number; // deg
  ingRightRotate?: number; // deg
  ingRotate?: number; // deg
};