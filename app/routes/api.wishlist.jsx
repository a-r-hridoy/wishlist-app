import { json } from "@remix-run/node"
import prisma from "./../db.server.js";
import { cors } from "remix-utils/cors";

export async function loader({ request }) {
    const url = new URL(request.url);
    const customerId = url.searchParams.get("customerId");
    const shop = url.searchParams.get("shop");
    const productId = url.searchParams.get("productId");


    if (!customerId || !shop || !productId) {
        return json({
            message: "Missing data. Required data: customerId, productId, shop",
            method: "GET"
        });
    }

    // If customerId, shop, productId is provided, return wishlist items for that customer.
    const wishlist = await prisma.wishlist.findMany({
        where: {
            customerId: customerId,
            shop: shop,
            productId: productId,
        },
    });

    const response = json({
        ok: true,
        message: "Success",
        data: wishlist,
    });

    return cors(request, response);

}

export async function action({ request }) {

    const method = request.method;
    let data = await request.formData();
    data = Object.fromEntries(data);
    const customerId = data.customerId;
    const productId = data.productId;
    const shop = data.shop;
    const _action = data._action;


    if (!customerId || !productId || !shop || !_action) {
        return json({
            message: "Missing data. Required data: customerId, productId, shop, _action",
            method: _action
        });
    }

    let response;

    switch (_action) {
        case "CREATE":
            const wishlist = await prisma.wishlist.create({
                data: {
                    customerId,
                    productId,
                    shop,
                },
            });
            response = json({ message: "Product added to wishlist", method: _action, wishlisted: true });
            return cors(request, response);

        case "PATCH":
            return json({ message: "Success", method: "Patch" })
        case "DELETE":
            await prisma.wishlist.deleteMany({
                where: {
                    customerId: customerId,
                    shop: shop,
                    productId: productId,
                },
            });

            response = json({ message: "Product removed from your wishlist", method: _action, wishlisted: false });
            return cors(request, response);
        default:
            // Optional: handle other methods or return a method not allowed response
            return new Response("Method Not Allowed", { status: 405 });
    }

}