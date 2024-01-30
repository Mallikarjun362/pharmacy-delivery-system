import Order from "@/models/Order"

export const getOrdersMade = async ({ my_db_id }: { my_db_id: string }) => {
    return (await Order
        .find({ buyer: my_db_id })
        .select({ prescription: 1, seller: 1, buyer: 1 })
        .populate({ path: "prescription", select: { title: 1 } })
        .populate({ path: "seller", select: { primary_email: 1 } })
        .populate({ path: "buyer", select: { primary_email: 1 } })
        .exec()).map((ele: any) => JSON.parse(JSON.stringify(ele._doc)));
}