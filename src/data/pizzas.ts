import pepperoniPizza from "../assets/images/pizza/pepperoni.png";
import spinachPizza from "../assets/images/pizza/spinach.png";
import paneerTikkaPizza from "../assets/images/pizza/paneer-tikka.png";
import margheritaPizza from "../assets/images/pizza/margherita.png";
import veggiePizza from "../assets/images/pizza/veggie.png";
import bbqChickenPizza from "../assets/images/pizza/bbq-chicken.png";
import hawaiianPizza from "../assets/images/pizza/hawaiian.png";

import pepperoniIng from "../assets/images/ingredients/pepperoni.png";
import spinachIng from "../assets/images/ingredients/spinach.png";
import paneerTikkaIng from "../assets/images/ingredients/paneer-tikka.png";
import margheritaIng from "../assets/images/ingredients/margherita.png";
import veggieIng from "../assets/images/ingredients/veggie.png";
import bbqChickenIng from "../assets/images/ingredients/bbq-chicken.png";
import hawaiianIng from "../assets/images/ingredients/hawaiian.png";

import type { Pizza } from "../types/pizza.types";

export const PIZZAS: Pizza[] = [
  {
    key: "pepperoni",
    label: "PEPPERONI",
    title: "Classic Pepperoni Pizza",
    description:
      "A classic pepperoni pizza layered with melted mozzarella over a rich tomato base, baked until golden and full of bold flavour.",
    pizzaImage: pepperoniPizza,
    ingredientsImage: pepperoniIng,
  },
  {
    key: "spinach",
    label: "SPINACH",
    title: "Savory Spinach Pizza",
    description:
      "Fresh spinach layered with creamy mozzarella and herbs over a tangy tomato base, delivering a light and earthy flavour in every slice.",
    pizzaImage: spinachPizza,
    ingredientsImage: spinachIng,
  },
  {
    key: "paneer-tikka",
    label: "PANEER",
    title: "Paneer Tikka Pizza",
    description: 
      "Smoky marinated paneer with peppers and onions baked over a spiced tomato base, finished with melted cheese for a bold fusion of flavour.",
    pizzaImage: paneerTikkaPizza,
    ingredientsImage: paneerTikkaIng,
    
  },
  {
    key: "margherita",
    label: "MARGHERITA",
    title: "Margherita Pizza",
    description:
      "Fresh mozzarella, vibrant tomato sauce, and fragrant basil on a perfectly baked crust, celebrating the simplicity of a classic Italian pizza.",
    pizzaImage: margheritaPizza,
    ingredientsImage: margheritaIng,
  },
  {
    key: "veggie",
    label: "VEGGIE",
    title: "Veggie Delight Pizza",
    description:
      "A colourful mix of vegetables layered with melted cheese and herbs over a tomato base for a fresh, hearty, and wholesome bite.",
    pizzaImage: veggiePizza,
    ingredientsImage: veggieIng,
  },
  {
    key: "bbq-chicken",
    label: "BBQ CHICKEN",
    title: "Smoky BBQ Chicken Pizza",
    description:
      "Tender BBQ chicken with caramelised onions and melted cheese on a crisp crust, balanced with a smoky and savoury finish",
    pizzaImage: bbqChickenPizza,
    ingredientsImage: bbqChickenIng,
    ingRotate: { left: -70, right: 350 },
  },
  {
    key: "hawaiian",
    label: "HAWAIIAN",
    title: "Hawaiian Pineapple Pizza",
    description:
      "Sweet pineapple paired with savoury ham and melted cheese over a rich tomato base, creating a perfect balance of sweet and savoury flavours.",
    pizzaImage: hawaiianPizza,
    ingredientsImage: hawaiianIng,
  }
];
