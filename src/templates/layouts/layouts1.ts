import { TLayout } from "../../types";
import img from "../../assets/images/placeholder.png"
const layout1: TLayout = {
    style: "bg-red-500 w-full h-full grid grid-cols-2",
    blocks: [
        {
            style: "bg-white border-blue-500 border  ",
            image: {
                style: "border border-red-500 w-full",
                src: img.src,
            },
            text: [
                {
                    content: "content homie", style: "text-2xl font-bold"
                }
            ]
        },
        {
            style: "bg-white border-blue-500 border  ",
            image: {
                style: "border border-red-500 w-full",
                src: img.src,
            },
            text: [
                {
                    content: "content homie", style: "text-2xl font-bold"
                }
            ]
        },
        {
            style: "bg-white border-blue-500 border  ",
            image: {
                style: "border border-red-500 w-full",
                src: img.src,
            },
            text: [
                {
                    content: "content homie", style: "text-2xl font-bold"
                }
            ]
        },
        {
            style: "bg-white border-blue-500 border  ",
            image: {
                style: "border border-red-500 w-full",
                src: img.src,
            },
            text: [
                {
                    content: "content homie", style: "text-2xl font-bold"
                }
            ]
        },


    ]
}


export default layout1;