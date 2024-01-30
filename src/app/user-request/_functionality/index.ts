import UserRequest from "@/models/UserRequest";

export const getReqsReceived = async (my_email: string): Promise<Array<any>> => await UserRequest.find({ to_user: my_email }).lean().exec();
export const getReqsSent = async (my_email: string): Promise<Array<any>> => await UserRequest.find({ from_user: my_email }).lean().exec();