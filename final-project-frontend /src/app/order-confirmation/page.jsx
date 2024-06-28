import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";


const OrderConfirmation = () => {
    return(
        <div className='flex justify-center my-20'>
            <div className='border shadow-md flex flex-col justify-center p-20 rounded-md items-center gap-3 px-32'>
                <CheckCircle2 className='h-24 w-24 text-green-700'/>
                <h2 className='font-medium text-3xl text-green-700'>Order Successfull!</h2>
                <h2>Thank you so much for your order</h2>
                <Link href={'/my-orders'}>
                    <Button className="mt-8 bg-green-700 hover:bg-green-600">View your order</Button>
                </Link>
                
            </div>
        </div>
    )
}

export default OrderConfirmation;