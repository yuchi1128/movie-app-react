import { ReactNode } from "react";
import { Cookies } from "react-cookie";

export type CookieProps = {
    cookies: Cookies;
    children?: ReactNode; 
};