import { Hono } from "hono";
import { AuthMiddleware } from "../authentication";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { editValidation, postValidation, readValidation } from "@kvarma/medium-common";
import { editedValidation } from "../../validation";

export const HotelRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
    }
    Varibles:{
        userID:String
    }
}>();

type postschema =  {
    title:string,
    content:string,
    userId:string,
    Available:boolean
}


HotelRouter.post('/post',AuthMiddleware,async(c)=>{
    // @ts-ignore
    const userID = c.get('userID') as string | "";
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const createPayload = await c.req.json()
    const parsedPayload = postValidation.safeParse(createPayload)
    if(!parsedPayload.success) {
        c.status(403)
        return c.json({
            msg:"sorry something up with given inputs"
        })
    }
    else {
        try {
            const response = await prisma.hotels.create({
                data:{
                    title:parsedPayload.data.title,
                    content:parsedPayload.data.content,
                    userId:userID,
                    Available:false
                } as postschema
            })
            if(response) {
                const updated = await prisma.hotels.update({
                    where:{
                        id:response.id
                    },
                    data:{
                        Available:true
                    }
                })
                if(updated) {
                    return c.json({
                        msg:"hotel details uploaded successfully",
                        id:response.id
                    })
                }
            }
            else {
                c.status(403)
                return c.json({
                    msg:"hotel not created due to internal error"
                })
            }
        }catch(e) {
            c.status(403)
            return c.json({
                msg:"invalid user signin or signup first",
            })
        }
    }

})
HotelRouter.put('/edit',AuthMiddleware,async(c)=>{
    // @ts-ignore
    const userID = c.get('userID') as string | undefined
    const createpayload = await c.req.json()
    const parsedpayload = editedValidation.safeParse(createpayload)
    if(!parsedpayload.success) {
        c.status(403)
        return c.json({
            msg:parsedpayload,
            createpayload:createpayload
        })
    }
    else {
        try {
            const prisma  =  new PrismaClient({
                datasourceUrl:c.env.DATABASE_URL,
            }).$extends(withAccelerate())
            const response = await prisma.hotels.update({
                where:{
                    id:parsedpayload.data.id,
                    userId:userID
                },
                data:{
                    title:parsedpayload.data.Title,
                    content:parsedpayload.data.Content,
                    Available:parsedpayload.data.Available,
                    Address:parsedpayload.data.Address,
                    location:parsedpayload.data.Location
                }
            })
            if(response) {
                c.status(200)
            return c.json({
                msg:"hotel details succesfully updated",
                response:response
            })
            }
            else {
                c.status(403)
                return c.json({
                    msg:"hotel not found"
                })
            }
        }catch(err) {
            c.status(403)
            return c.json({
                msg:"please check the internet connection"
            })
        }
    }

})
//userposts!!
HotelRouter.get('/myposts',AuthMiddleware,async(c)=>{
    // @ts-ignore
    const id = c.get('userID') as string 
    if(!id) {
        c.status(204)
        return c.json({
            msg:"id mapping failed"
        })
    }
    else {
        try{
            const prisma = new PrismaClient({
                datasourceUrl:c.env.DATABASE_URL
            }).$extends(withAccelerate())
            const response = await prisma.user.findUnique({
                where:{
                    id:id
                },
                select:{
                    hotels:{
                        select:{
                            id:true,
                            title:true,
                            content: true,
                            location:true,
                            Available:true,
                            Address:true,
                            user: {
                                select:{
                                    username:true
                                }
                            }
                        }
                    },
                    username:true,
                    email:true,
                    password:true
                }
            })
            if(response) {
                c.status(200)
                return c.json({
                    msg:"hotels successfully loaded",
                    response:response
                })
            }
            else {
                c.status(204)
                return c.json({
                    msg:"no hotels posts yet"
                })
            }
        }catch(err) {
            c.status(204)
            return c.json({
                msg:"some Internal error occured while fetching posts"
            })
        }
    }
    
})

HotelRouter.get('/:id',async(c)=>{
    const createpayload = c.req.param("id")
    if(!createpayload) {
        c.status(403)
        return c.json({
            msg:"invalid inputs"
        })
    }
    else {
        try {
            const prisma = new PrismaClient({
                datasourceUrl:c.env.DATABASE_URL
            }).$extends(withAccelerate())

            const response = await prisma.hotels.findUnique({
                where:{
                    id:createpayload
                },
                select:{
                    id: true,
                    title: true,
                    content: true,
                    Available:true,
                    location:true,
                    Address:true,
                    user: {
                        select: {
                            username: true
                        }
                    }
                }
            })

            if(response) {
                c.status(200)
                return c.json({
                    msg:"this is the article",
                    response:response
                })
            }
            else {
                c.status(403)
                return c.json({
                    msg:"check the internet connection"
                })
            }
        }catch(err) {
            c.status(403)
            return c.json({
                msg:"some error ocurred while fetching the blog"
            })
        }
    }
})

HotelRouter.post('/bulk',async(c)=>{
    try {
        const prisma = new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL
        }).$extends(withAccelerate())
        const response = await prisma.hotels.findMany({
            select:{
                id:true,
                title:true,
                content:true,
                location:true,
                Available:true,
                Address:true,
                user:{
                    select:{
                        username:true
                    }
                }
            }
        })
        if(response) {
            c.status(200)
            return c.json(response)
        }
        else {
            c.status(403)
            return c.json({
                msg:"no data found!"
            })
        }
    }catch(err) {
        c.status(403)
        return c.json({
            msg:"network issues while generating the prismaclient"
        })
    }

})

HotelRouter.put('/delete',AuthMiddleware,async(c)=>{
    // @ts-ignore
    const userID = c.get('userID') as string | undefined
    const createpayload = await c.req.json()
    const parsedpayload = readValidation.safeParse(createpayload)
    if(!parsedpayload.success) {
        c.status(403)
        return c.json({
            msg:"invalid inputs"
        })
    }
    else {
        try {
            const prisma  =  new PrismaClient({
                datasourceUrl:c.env.DATABASE_URL,
            }).$extends(withAccelerate())
            const response =await prisma.hotels.delete({
                where:{
                    id:parsedpayload.data.id,
                    userId:userID
                }
            })
            if(response) {
                c.status(200)
            return c.json({
                msg:"post succesfully deleted",
                response:response
            })
            }
            else {
                c.status(403)
                return c.json({
                    msg:"post not found"
                })
            }
        }catch(err) {
            c.status(403)
            return c.json({
                msg:"please check the internet connection"
            })
        }
    }

})


HotelRouter.post('/reserve', AuthMiddleware, async (c) => {
    // @ts-ignore
    const userID = c.get('userID') as string;
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Extract reservation data from request body
    const { hotelId, rooms, members, startDate, endDate } = await c.req.json();

    // Validate input fields
    if (!hotelId || !rooms || !members || !startDate || !endDate) {
        c.status(400);
        return c.json({
            msg: "Please provide hotelId, rooms, members, startDate, and endDate.",
        });
    }

    try {
        // Create a new reservation
        const reservation = await prisma.reservation.create({
            data: {
                userId: userID,
                hotelId: hotelId,
                rooms,
                members,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            },
        });

        c.status(201);
        return c.json({
            msg: "Reservation created successfully.",
            reservation,
        });
    }catch(err) {
        console.error("Error details:", err);
        c.status(500);
        return c.json({
            msg: "An error occurred while creating the reservation.",
            error:err, // Send the error message for more clarity
        });
    }
    
});


HotelRouter.post('/myreservations',AuthMiddleware,async(c)=>{
    // @ts-ignore
    const id = c.get('userID') as string 
    if(!id) {
        c.status(204)
        return c.json({
            msg:"id mapping failed"
        })
    }
    else {
        try{
            const prisma = new PrismaClient({
                datasourceUrl:c.env.DATABASE_URL
            }).$extends(withAccelerate())
            const response = await prisma.user.findUnique({
                where:{
                    id:id
                },
                select:{
                    reservation:true
                }
            })
            if(response) {
                c.status(200)
                return c.json({
                    msg:"hotels successfully loaded",
                    response:response
                })
            }
            else {
                c.status(204)
                return c.json({
                    msg:"no hotels posts yet"
                })
            }
        }catch(err) {
            c.status(204)
            return c.json({
                msg:"some Internal error occured while fetching posts"
            })
        }
    }
    
})


HotelRouter.post('/getname',AuthMiddleware,async(c)=>{
    // @ts-ignore

    const id = c.get('userID') as string 
    if(!id) {
        c.status(204)
        return c.json({
            msg:"id mapping failed"
        })
    }
    else {
        try{
            const prisma = new PrismaClient({
                datasourceUrl:c.env.DATABASE_URL
            }).$extends(withAccelerate())
            const {hotelid} = await c.req.json();
            const response = await prisma.hotels.findUnique({
                where:{
                    id:hotelid
                },
                select:{
                    title:true
                }
            })

            if(response) {
                c.status(200)
                return c.json({
                    msg:"name of the hotel",
                    name:response.title
                })
            }

        }catch(err) {
            console.error("Error details:", err);
        c.status(500);
        return c.json({
            msg: "An error occurred while creating the reservation.",
            error:err, // Send the error message for more clarity
        });

        }
}
});