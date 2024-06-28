"use client"
import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Image from 'next/image';

const Slider = ({sliderList}) => {
    
    return(
        <div>
           <Carousel
           opts={{
            align: "start",
            loop: true,
          }}>
            <CarouselContent>
                {sliderList.map((slider,index)=>(
                    <CarouselItem key={index}>
                            <div className="relative w-full" style={{ paddingTop: '39.71%' }}> {/* 540 / 1360 = 0.3971 */}
                                <div className="absolute inset-0 transform scale-100"> 
                                    <Image 
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA}${slider?.attributes?.image?.data[0]?.attributes?.url}`}
                                        fill
                                        style={{objectFit:"contain"}}
                                        alt='slider'
                                        className="rounded-2xl"
                                    />
                                </div>
                            </div>
                       
                    
                    </CarouselItem>

                ))}
                
            
            
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

        </div>
    )
}

export default Slider;