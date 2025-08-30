import {json} from"@remix-run/node"
import PrismaConnection from "./../db.server.js";
import {cors} from "remix-utils/cors";

export async function loader() {
    return json({
        ok: true,
        messsage: "Hello from the API",
    });
}


export async function action({request}) {   

    const method = request.method;
    let data = await request.formData();
    data = Object.fromEntries(data);
    const customerId = data.customerId;
    const productId = data.productId;
    const shop = data.shop;


    if(!customerId || !productId || !shop){
        return json({
            message: "Missing data. Required data.customerId, productId, shop",
            method: method
        });
    }

    switch(method){
        case "POST":
            const wishlist = await PrismaConnection.wishlist.create({
            data: {
                customerId,
                productId,
                shop,
            },
            });
        const response = json({ message: "Product added to wishlist", method: "POST", wishlist: wishlist});
        return cors(request, response);

        case "PATCH":
            return json({message: "Success", method: "Patch"})
        case "DELETE":            
        default:
            return new Response("Method Not Alloweed", {status: 405});
    }

}