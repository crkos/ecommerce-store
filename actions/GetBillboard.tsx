import { Billboard } from "@/types";
import {id} from "postcss-selector-parser";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (id: string): Promise<Billboard> => {
    const res = await fetch(`${URL}/${id}`, {next: {revalidate: 10}});

    return res.json();
}

export default getBillboard;