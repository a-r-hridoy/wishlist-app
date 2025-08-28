import {json} from"@remix-run/node"

export async function loader() {
    return json({
        ok: true,
        messsage: "Hello from the API",
    });
}


export async function action({request}) {
    const method = request.method;

    switch(method){
        case "POST":
            return json({message: "Success", method: "POST"})
        case "PATCH":
            return json({message: "Success", method: "Patch"})
        default:
            return new Response("Method Not Alloweed", {status: 405});
    }

}