import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { signupValidation } from "@kvarma/medium-common";
import { sign } from "hono/jwt";
import { cors } from "hono/cors";
import { siginRouter } from "./sigin";
import { AuthMiddleware } from "../authentication";


export const signupRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string
        JWT_SECRET:string
    }
}>()

signupRouter.use(cors())

signupRouter.post('/',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const createpayload = await c.req.json()
    const parsepayload = signupValidation.safeParse(createpayload)
    if(!parsepayload.success) {
        c.status(204)
        return c.json({
            msg:"Invalid email"
        })
    }
    else{

        try {
            const response = await prisma.user.create({
                data:parsepayload.data
            })
            if(response) {
                const payload = {
                    userID:response.id,
                    password:response.password,
                    email:response.email
                }
                const secret = c.env.JWT_SECRET
                const token = await sign(payload,secret)
                c.status(200)
                return c.json({
                    msg:"User Successfully created",
                    token:token,
                    username:response.username
            })
            }
            else {
                c.status(204)
                return c.json({
                    msg:"Internal error occured while creating the user"
                })
            }
        }catch(err) {
            c.status(403)
            return c.json({
                msg:"given email already exist"
            })
        }
        
    }

})


signupRouter.get('/userdetails',AuthMiddleware,async(c)=>{
    const response = {
        // @ts-ignore
        password:c.get("password"),
        // @ts-ignore
        email:c.get("email")
    }
    return c.json(response)
})

signupRouter.post('/updateuserdetails',AuthMiddleware,async(c)=>{
    // @ts-ignore
    const userID = c.get("userID") as string 
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const createpayload = await c.req.json()
    const parsepayload = signupValidation.safeParse(createpayload)
    if(!parsepayload.success) {
        c.status(204)
        return c.json({
            msg:"Invalid email"
        })
    }
    else{

        try {
            const response = await prisma.user.update({
                where:{
                    id:userID
                },
                data:{
                    username:parsepayload.data.username,
                    email:parsepayload.data.email,
                    password:parsepayload.data.password
                }
            })
            if(response) {
                const payload = {
                    userID:response.id,
                    password:response.password,
                    email:response.email
                }
                const secret = c.env.JWT_SECRET
                const token = await sign(payload,secret)
                c.status(200)
                return c.json({
                    msg:"User Successfully updated",
                    token:token,
                    username:response.username
            })
            }
            else {
                c.status(204)
                return c.json({
                    msg:"Internal error occured while creating the user"
                })
            }
        }catch(err) {
            c.status(403)
            return c.json({
                msg:"given email already exist"
            })
        }
        
    }

    }catch(err) {
        c.status(401)
        return c.json({
            msg:"no body found"
        })
        
    }
    
})