import Image from 'next/image';
import Link from "next/link";
import * as React from 'react';

function CategoryList({categoryList}) {
    return (
        <div className='mt-5'>
            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {categoryList.map((category,index)=>(
                    <Link href={"/category/" + category.id }
                        key = {index} className='flex flex-col item-center bg-orange-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-orange-300'
                        style={{ width: '150px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image 
                        src={`${process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA}${category?.attributes?.icon?.data[0]?.attributes?.url}`} 
                        width={50}
                        height={50}
                        alt='icon'
                        className='group-hover:scale-125 transition-all ease-in-out'
                        />
                        <h2 className='text-orange-600 text-center font-semibold'>{category?.attributes?.name}</h2>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CategoryList;