import React from "react";

export type HandleScrollParams = {
    event: any;
    nextUrl: string | null;
    setIsBottom: (value: boolean) => void;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};