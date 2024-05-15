import grawitacja from "../assets/svg/pictures/grawitacja.svg";
import ladunki from "../assets/svg/pictures/ladunki.svg";

export const allSciences = [
    {
        id: "fizyka-0f8jr23r",
        name: "Fizyka",
        picture: grawitacja
    },
    {
        id: "matematyka-f8093j",
        name: "Matematyka",
        picture: ladunki
    }
];

export const allCourses = [
    {
        id: "uirefnbuiofe",
        science: {
            id: "fizyka-0f8jr23r",
            name: "Fizyka"
        },
        name: "Grawitacja",
        description: "Tajemnicza siła która sprawia że masa przyciąga się nawzajem."
    },
    {
        id: "4hrtf943ffff",
        science: {
            id: "fizyka-0f8jr23r",
            name: "Fizyka"
        },
        name: "Termodynamika",
        description: "Zasady działania ciepła, ruchu, ciśnienia i cząstek które za nimi stoją."
    },
    {
        id: "f934jhf439ufn",
        science: {
            id: "matematyka-f8093j",
            name: "Matematyka"
        },
        name: "Trygonometria",
        description: "Kąty i funkcje określające zależności między nimi, które mają wiele zastosowań i tajemnic"
    },
    {
        id: "9j8fg3uj89n34f",
        science: {
            id: "matematyka-f8093j",
            name: "Matematyka"
        },
        name: "Planimetria",
        description: "Figury na płaszczyźnie kryją nieoczywiste tajemnice i zależności."
    }
];