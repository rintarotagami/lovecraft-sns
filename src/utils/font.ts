import { Limelight, Kiwi_Maru } from "next/font/google"
import localFont from 'next/font/local'


export const limelight = Limelight({
    weight: "400",
    subsets: ["latin"]
});

export const kiwi_Maru = Kiwi_Maru({
    weight: "400",
    subsets: ["latin"]
});

export const naishoMoji = localFont({ src: './fonts/NaishoMoji-regular.otf' })
export const retorogo = localFont({ src: './fonts/851retrogo_007.ttf' })
