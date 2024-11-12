import { Hono } from "hono";
import { signupRouter } from "./signup";
import { siginRouter } from "./sigin";
import { HotelRouter } from "./hotel";

export const Mainrouter = new Hono()

Mainrouter.route('/signup',signupRouter)
Mainrouter.route('/signin',siginRouter)
Mainrouter.route('/blog',HotelRouter)