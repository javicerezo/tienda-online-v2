import { useState } from "react";

export const useSeeker = () => {
    const [ showSeeker, setShowSeeker ] = useState<boolean>(false);

    const openSeeker = () => {
        setShowSeeker(true);
    }

    const closeSeeker = () => {
        setShowSeeker(false);
    }

    return { showSeeker, openSeeker, closeSeeker };
}