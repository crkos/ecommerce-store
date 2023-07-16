import {Color} from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

const getBillboard = async (): Promise<Color[]> => {
    const res = await fetch(URL, {next: {revalidate: 10}});

    return res.json();
}

export default getBillboard;