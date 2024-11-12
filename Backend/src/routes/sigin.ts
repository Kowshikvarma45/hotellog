import { Hono } from "hono";
import { signinValidation } from "@kvarma/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { cors } from "hono/cors";
import { AuthMiddleware } from "../authentication";


export const siginRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
}>();

siginRouter.use(cors())
siginRouter.post('/',async(c)=>{
    const createpayload = await c.req.json()
    const parsepayload = signinValidation.safeParse(createpayload)
    if(!parsepayload.success) {
        c.status(204)
        return c.json({
            msg:"incorrect inputs schema,give them properly"
        })
    }
    else{
        const prisma = new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL
        }).$extends(withAccelerate())

        try {
            const response = await prisma.user.findUnique({
                where:{
                    email:parsepayload.data.email,
                    password:parsepayload.data.password
                }
            })
            if(response) {
                const payload = {
                    userID:response?.id,
                    password:response.password,
                    email:response.email
                }
                const secret = c.env.JWT_SECRET
                const token = await sign(payload,secret)
                c.status(200)
                return c.json({
                    msg:"sigin succesfull redirecting to main page.",
                    token:token,
                    username:response.username
                })
            }
            else {
                c.status(204)
                return c.json({
                    msg:"No user exist with given credintials,chech your email and password carefully"
                })
            }
    
        }catch(e){
            c.status(403)
            return c.json({
                msg:"network error check your connection" 
            })
        }

        }

})
siginRouter.get('/getusername',AuthMiddleware,async(c)=>{
    // @ts-ignore
    const id = c.get("userID") as string
    if(!id) {
        c.status(401)
        return c.json({
            id:id,
            msg:"No header found"
        })

    }
    else {
        const prisma  = new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL
        }).$extends(withAccelerate())

        const response = await prisma.user.findUnique({
            where:{
                id:id
            },
            select:{
                username:true
            }
        })

        if(response?.username) {
            c.status(200)
            return c.json({
                username:response.username
            })

        }
        else {
            c.status(403)
            return c.json({
                msg:"no userfound with the given userid"
            })
        }
    }
})


