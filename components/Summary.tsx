"use client"

import axios from "axios";
import useCart from "@/hooks/UseCart";
import Currency from "@/components/ui/Currency";
import Button from "@/components/ui/Button";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";


const Summary = () => {
    const searchParams = useSearchParams();
    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll);
    const [isMounted, setIsMounted] = useState<boolean>(false)

    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.price)
    }, 0);

    const onCheckout = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
            productIds: items.map((item) => item.id)
        });

        window.location = response.data.url
    }

    useEffect(() => {
        setIsMounted(true)
        if(searchParams.get("success")) {
            toast.success("Payment completed");
            removeAll();
        }

        if(searchParams.get("canceled")) {
            toast.error("Something went wrong")
        }
    }, [searchParams, removeAll])

    if(!isMounted) {
        return null
    }

    return (
        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">
                Order Summary
            </h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">
                        Order total
                    </div>
                    <Currency value={totalPrice}/>
                </div>
            </div>
            <Button className="mt-6 w-full" onClick={onCheckout} disabled={items.length === 0}>
                Checkout
            </Button>
        </div>
    );
};

export default Summary;